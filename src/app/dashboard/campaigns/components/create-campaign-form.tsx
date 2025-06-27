
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, Calendar as CalendarIcon, Send, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  campaignName: z.string().min(5, { message: "Nama kampanye minimal 5 karakter." }),
  message: z.string().min(10, { message: "Pesan minimal 10 karakter." }).max(160, { message: "Pesan maksimal 160 karakter." }),
  sendTime: z.enum(["now", "scheduled"], {
    required_error: "Anda perlu memilih waktu pengiriman.",
  }),
  scheduledDate: z.date().optional(),
}).refine(data => {
    if (data.sendTime === 'scheduled' && !data.scheduledDate) {
        return false;
    }
    return true;
}, {
    message: "Silakan pilih tanggal penjadwalan.",
    path: ["scheduledDate"],
});


export function CreateCampaignForm() {
    const [isSending, setIsSending] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            campaignName: "",
            message: "",
            sendTime: "now",
            scheduledDate: undefined,
        },
    });

    const watchSendTime = form.watch("sendTime");

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
        }
    };
    
    const handleRemoveImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Starting campaign:", values);
        setIsSending(true);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    return 100;
                }
                return prev + 10;
            });
        }, 300);

        setTimeout(() => {
            clearInterval(interval);
            setProgress(100);
            setTimeout(() => {
                setIsSending(false);
                toast({
                    title: "Kampanye Terkirim!",
                    description: `Kampanye "${values.campaignName}" telah berhasil ${values.sendTime === 'scheduled' ? `dijadwalkan pada ${format(values.scheduledDate!, 'PPP')}` : 'dikirim'}.`,
                });
                form.reset();
                handleRemoveImage();
            }, 500);
        }, 3000);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                            <FormLabel>Pesan Notifikasi</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tulis pesan menarik Anda di sini..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="sendTime"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Waktu Pengiriman</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="now" />
                                        </FormControl>
                                        <FormLabel className="font-normal flex items-center gap-2">
                                            <Send className="w-4 h-4"/> Kirim Sekarang
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="scheduled" />
                                        </FormControl>
                                        <FormLabel className="font-normal flex items-center gap-2">
                                            <CalendarIcon className="w-4 h-4" /> Jadwalkan Kampanye
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {watchSendTime === "scheduled" && (
                     <FormField
                        control={form.control}
                        name="scheduledDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Tanggal Penjadwalan</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pilih tanggal</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date(new Date().setHours(0, 0, 0, 0))
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Kampanye Anda akan dikirim pada tanggal yang dipilih.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {isSending && (
                    <div className="space-y-2">
                        <Label>Mengirim Kampanye...</Label>
                        <Progress value={progress} className="w-full" />
                        <p className="text-sm text-muted-foreground text-center">{progress}%</p>
                    </div>
                )}
                
                <Button type="submit" disabled={isSending}>
                    {isSending ? 'Mengirim...' : 'Kirim Kampanye'}
                </Button>
            </form>
        </Form>
    )
}
