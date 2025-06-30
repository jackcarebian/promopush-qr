
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { useCampaigns, Campaign } from "../../contexts/campaign-context";
import { useRouter } from "next/navigation";
import { interestCategories, businessCategories } from "../data/categories";
import { useCustomers } from "../../contexts/customer-context";
import { useAuth } from "../../contexts/auth-context";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, Calendar as CalendarIcon, Send, X, Tag, Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Schema for form validation
const formSchema = z.object({
  campaignName: z.string().min(5, { message: "Nama kampanye minimal 5 karakter." }),
  businessCategory: z.string({ required_error: "Pilih kategori bisnis." }),
  interests: z.array(z.string()).refine(value => value.length > 0, {
    message: "Pilih setidaknya satu preferensi minat.",
  }),
  message: z.string().min(10, { message: "Pesan minimal 10 karakter." }).max(200, { message: "Pesan maksimal 200 karakter." }),
  dateRange: z.object({
      from: z.date({ required_error: "Tanggal mulai harus diisi." }),
      to: z.date({ required_error: "Tanggal berakhir harus diisi." }),
  }, { required_error: "Pilih rentang tanggal kampanye." }),
});


export function CreateCampaignForm() {
    const { addCampaign } = useCampaigns();
    const { customers } = useCustomers();
    const { user } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [targetedCustomerCount, setTargetedCustomerCount] = React.useState(0);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            campaignName: "",
            businessCategory: undefined,
            interests: [],
            message: "",
            dateRange: undefined
        },
    });

    const watchBusinessCategory = form.watch("businessCategory");
    const watchInterests = form.watch("interests");

    React.useEffect(() => {
        form.setValue("interests", []);
    }, [watchBusinessCategory, form]);

    React.useEffect(() => {
        if (!watchInterests || watchInterests.length === 0) {
            setTargetedCustomerCount(0);
            return;
        }

        const targeted = customers.filter(customer =>
            customer.interests.some(interest => watchInterests.includes(interest))
        );
        setTargetedCustomerCount(targeted.length);
    }, [watchInterests, customers]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
            toast({
                variant: "destructive",
                title: "File tidak valid",
                description: "Silakan pilih file gambar (PNG, JPG, GIF).",
            });
        }
    };
    
    const handleRemoveImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        setProgress(0);

        const newCampaignData: Omit<Campaign, 'id' | 'status' | 'outletId'> = {
            title: values.campaignName,
            startDate: format(values.dateRange.from, "yyyy-MM-dd"),
            endDate: format(values.dateRange.to, "yyyy-MM-dd"),
            description: values.message,
            image: imagePreview || "https://placehold.co/600x400",
            dataAiHint: "new campaign",
            businessCategory: values.businessCategory,
            interests: values.interests,
            variant: "default",
        };

        const success = addCampaign(newCampaignData);
        
        if (!success) {
            toast({
                variant: "destructive",
                title: "Batas Kampanye Tercapai",
                description: "Akun demo hanya dapat membuat satu kampanye.",
            });
            setIsSubmitting(false);
            return;
        }

        // Simulate submission process for visual feedback
        const interval = setInterval(() => {
            setProgress(prev => Math.min(prev + 20, 100));
        }, 300);

        setTimeout(() => {
            clearInterval(interval);
            setProgress(100);
            
            toast({
                title: "Kampanye Berhasil Dibuat!",
                description: `Kampanye "${values.campaignName}" telah berhasil dibuat dan ditambahkan ke daftar.`,
            });
            
            form.reset();
            handleRemoveImage();
            setIsSubmitting(false);
        }, 1500);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="campaignName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Kampanye</FormLabel>
                                <FormControl>
                                    <Input placeholder="Contoh: Diskon Kemerdekaan" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="dateRange"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Tanggal Berlaku Kampanye</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !field.value?.from && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value?.from ? (
                                                    field.value.to ? (
                                                        <>
                                                            {format(field.value.from, "d MMMM yyyy", {locale: id})} -{" "}
                                                            {format(field.value.to, "d MMMM yyyy", {locale: id})}
                                                        </>
                                                    ) : (
                                                        format(field.value.from, "d MMMM yyyy", {locale: id})
                                                    )
                                                ) : (
                                                    <span>Pilih rentang tanggal</span>
                                                )}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={field.value?.from}
                                            selected={field.value}
                                            onSelect={field.onChange as (range: DateRange | undefined) => void}
                                            numberOfMonths={2}
                                            locale={id}
                                            disabled={(date) =>
                                                date < new Date(new Date().setHours(0,0,0,0))
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                     <FormField
                        control={form.control}
                        name="businessCategory"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kategori Bisnis</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kategori bisnis Anda" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {businessCategories.map(category => (
                                            <SelectItem key={category} value={category}>
                                                {interestCategories[category].emoji} {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="interests"
                        render={() => (
                            <FormItem>
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <FormLabel>Preferensi Minat Pelanggan</FormLabel>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-medium p-2 rounded-lg bg-secondary text-secondary-foreground shrink-0">
                                        <Users className="h-5 w-5 text-primary" />
                                        <span>{targetedCustomerCount} Pelanggan Tertarget</span>
                                    </div>
                                </div>
                                <div className="space-y-2 rounded-md border p-4 max-h-40 overflow-y-auto">
                                {!watchBusinessCategory ? (
                                    <p className="text-sm text-muted-foreground">Pilih kategori bisnis terlebih dahulu.</p>
                                ) : (
                                    interestCategories[watchBusinessCategory].interests.map((item) => (
                                      <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="interests"
                                        render={({ field }) => {
                                          return (
                                            <FormItem
                                              key={item.id}
                                              className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                              <FormControl>
                                                <Checkbox
                                                  checked={field.value?.includes(item.id)}
                                                  onCheckedChange={(checked) => {
                                                    return checked
                                                      ? field.onChange([...field.value, item.id])
                                                      : field.onChange(
                                                          field.value?.filter(
                                                            (value) => value !== item.id
                                                          )
                                                        );
                                                  }}
                                                />
                                              </FormControl>
                                              <FormLabel className="font-normal">{item.label}</FormLabel>
                                            </FormItem>
                                          );
                                        }}
                                      />
                                    ))
                                )}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormItem>
                    <FormLabel>Gambar Kampanye</FormLabel>
                    <FormControl>
                        {imagePreview ? (
                            <div className="relative w-full h-48 rounded-lg border overflow-hidden">
                                <Image
                                    src={imagePreview}
                                    alt="Pratinjau gambar kampanye"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 h-7 w-7"
                                    onClick={handleRemoveImage}
                                >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Hapus gambar</span>
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Klik untuk mengunggah</span> atau seret dan lepas</p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG atau GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input
                                      id="dropzone-file"
                                      type="file"
                                      className="hidden"
                                      ref={fileInputRef}
                                      onChange={handleFileChange}
                                      accept="image/png, image/jpeg, image/gif"
                                    />
                                </label>
                            </div>
                        )}
                    </FormControl>
                    <FormDescription>
                        Gambar yang menarik dapat meningkatkan keterlibatan.
                    </FormDescription>
                </FormItem>

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Deskripsi Kampanye</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Jelaskan detail promo atau kampanye Anda di sini..."
                                    className="resize-none"
                                    rows={4}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {isSubmitting && (
                    <div className="space-y-2">
                        <Label>Menyimpan Kampanye...</Label>
                        <Progress value={progress} className="w-full" />
                        <p className="text-sm text-muted-foreground text-center">{progress}%</p>
                    </div>
                )}
                
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Menyimpan...' : 'Simpan dan Publikasikan Kampanye'}
                </Button>
            </form>
        </Form>
    )
}
