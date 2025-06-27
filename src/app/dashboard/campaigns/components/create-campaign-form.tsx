"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";

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
import { Upload, Calendar, Send } from "lucide-react";

const formSchema = z.object({
  campaignName: z.string().min(5, { message: "Nama kampanye minimal 5 karakter." }),
  message: z.string().min(10, { message: "Pesan minimal 10 karakter." }).max(160, { message: "Pesan maksimal 160 karakter." }),
  sendTime: z.enum(["now", "scheduled"], {
    required_error: "Anda perlu memilih waktu pengiriman.",
  }),
});

export function CreateCampaignForm() {
    const [isSending, setIsSending] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            campaignName: "",
            message: "",
            sendTime: "now",
        },
    });

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
                    description: `Kampanye "${values.campaignName}" telah berhasil dikirim.`,
                });
                form.reset();
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
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Klik untuk mengunggah</span> atau seret dan lepas</p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG atau GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div> 
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
                                            <Calendar className="w-4 h-4" /> Jadwalkan untuk Nanti (Fitur segera hadir)
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
