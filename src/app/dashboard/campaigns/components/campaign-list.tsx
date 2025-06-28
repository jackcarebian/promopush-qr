
"use client";

import React, { useState, useEffect } from "react";
import { useCampaigns, Campaign } from "../../contexts/campaign-context";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { businessCategories, interestCategories } from "../data/categories";

const formSchema = z.object({
  title: z.string().min(5, { message: "Nama kampanye minimal 5 karakter." }),
  description: z.string().min(10, { message: "Pesan minimal 10 karakter." }),
  businessCategory: z.string({ required_error: "Pilih kategori bisnis." }),
  interests: z.array(z.string()).refine(value => value.length > 0, {
    message: "Pilih setidaknya satu preferensi minat.",
  }),
});

function EditCampaignDialog({ campaign, onUpdate }: { campaign: Campaign, onUpdate: (id: string, data: Omit<Campaign, 'id'>) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: campaign.title,
      description: campaign.description,
      businessCategory: campaign.businessCategory,
      interests: campaign.interests,
    },
  });

  const watchBusinessCategory = form.watch("businessCategory");

  useEffect(() => {
    if (isOpen) {
      form.reset({
        title: campaign.title,
        description: campaign.description,
        businessCategory: campaign.businessCategory,
        interests: campaign.interests,
      });
    }
  }, [isOpen, campaign, form]);

  useEffect(() => {
      // Don't reset if the category hasn't changed from the initial one
      if (form.getValues("businessCategory") !== campaign.businessCategory && form.formState.isDirty) {
          form.setValue("interests", []);
      }
  }, [watchBusinessCategory, form, campaign.businessCategory]);


  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const updatedData = {
      ...campaign, // Preserve other properties like date, status, image etc.
      title: values.title,
      description: values.description,
      businessCategory: values.businessCategory,
      interests: values.interests,
    };

    // Remove id before passing to update function
    const { id, ...dataToUpdate } = updatedData;

    onUpdate(campaign.id, dataToUpdate);

    toast({
      title: "Kampanye Diperbarui!",
      description: `Kampanye "${values.title}" telah berhasil diperbarui.`,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Kampanye</DialogTitle>
          <DialogDescription>
            Lakukan perubahan pada kampanye Anda. Klik simpan jika sudah selesai.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kampanye</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl><Textarea {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                                        {interestCategories[category]?.emoji || '-'} {category}
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
                        <FormLabel>Preferensi Minat</FormLabel>
                        <div className="space-y-2 rounded-md border p-4 max-h-32 overflow-y-auto">
                        {!watchBusinessCategory || !interestCategories[watchBusinessCategory] ? (
                            <p className="text-sm text-muted-foreground">Pilih kategori bisnis terlebih dahulu.</p>
                        ) : (
                            interestCategories[watchBusinessCategory].interests.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="interests"
                                render={({ field }) => (
                                    <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item.id)}
                                          onCheckedChange={(checked) => {
                                            const updatedInterests = checked
                                              ? [...field.value, item.id]
                                              : field.value?.filter((value) => value !== item.id);
                                            field.onChange(updatedInterests);
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">{item.label}</FormLabel>
                                    </FormItem>
                                  )}
                              />
                            ))
                        )}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Batal</Button>
              </DialogClose>
              <Button type="submit">Simpan Perubahan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export function CampaignList() {
  const { campaigns, updateCampaign, deleteCampaign } = useCampaigns();
  const { toast } = useToast();

  const handleDelete = (id: string, title: string) => {
    deleteCampaign(id);
    toast({
      title: "Kampanye Dihapus!",
      description: `Kampanye "${title}" telah berhasil dihapus.`,
    });
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Kampanye</TableHead>
          <TableHead>Tanggal</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => (
          <TableRow key={campaign.id}>
            <TableCell className="font-medium">{campaign.title}</TableCell>
            <TableCell>{format(new Date(`${campaign.date}T00:00:00`), "dd MMMM yyyy", { locale: id })}</TableCell>
            <TableCell>{campaign.businessCategory}</TableCell>
            <TableCell>
              <Badge variant={campaign.status === "Berakhir" ? "secondary" : "default"}>
                {campaign.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right space-x-1">
              <EditCampaignDialog campaign={campaign} onUpdate={updateCampaign} />
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Hapus</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tindakan ini tidak dapat dibatalkan. Ini akan menghapus kampanye "{campaign.title}" secara permanen.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(campaign.id, campaign.title)}>Hapus</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
