
"use client";

import { useState } from "react";
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

function EditCampaignDialog({ campaign, onUpdate }: { campaign: Campaign, onUpdate: (id: string, data: Omit<Campaign, 'id'>) => void}) {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const updatedData = {
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          audience: Number(formData.get("audience")),
          // Keep other properties from the original campaign to avoid overwriting them
          date: campaign.date,
          status: campaign.status,
          image: campaign.image,
          dataAiHint: campaign.dataAiHint,
          variant: campaign.variant,
        };
        
        onUpdate(campaign.id, updatedData);
    
        toast({
          title: "Kampanye Diperbarui!",
          description: `Kampanye "${updatedData.title}" telah berhasil diperbarui.`,
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
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor={`title-${campaign.id}`}>Nama Kampanye</Label>
                        <Input id={`title-${campaign.id}`} name="title" defaultValue={campaign.title} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`description-${campaign.id}`}>Deskripsi</Label>
                        <Textarea id={`description-${campaign.id}`} name="description" defaultValue={campaign.description} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`audience-${campaign.id}`}>Target Audiens</Label>
                        <Input id={`audience-${campaign.id}`} name="audience" type="number" defaultValue={campaign.audience} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Batal</Button>
                        </DialogClose>
                        <Button type="submit">Simpan Perubahan</Button>
                    </DialogFooter>
                </form>
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
          <TableHead>Audiens</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => (
          <TableRow key={campaign.id}>
            <TableCell className="font-medium">{campaign.title}</TableCell>
            <TableCell>{format(new Date(`${campaign.date}T00:00:00`), "dd MMMM yyyy", { locale: id })}</TableCell>
            <TableCell>{campaign.audience.toLocaleString('id-ID')}</TableCell>
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
