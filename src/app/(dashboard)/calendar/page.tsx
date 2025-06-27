import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import Image from "next/image";

const campaigns = [
  {
    title: "Diskon Gajian",
    date: "1 Juli 2024",
    status: "Akan Datang",
    description: "Nikmati diskon 25% untuk semua produk elektronik. Persiapan untuk tanggal gajian!",
    image: "https://placehold.co/600x400",
    dataAiHint: "sale promotion",
    audience: 1200,
    variant: "default",
  },
  {
    title: "Promo Musim Panas",
    date: "15 Juli 2024",
    status: "Akan Datang",
    description: "Koleksi fashion musim panas terbaru telah tiba! Dapatkan penawaran spesial beli 1 gratis 1.",
    image: "https://placehold.co/600x400",
    dataAiHint: "summer fashion",
    audience: 2500,
    variant: "default",
  },
  {
    title: "Flash Sale 7.7",
    date: "7 Juli 2024",
    status: "Akan Datang",
    description: "Jangan lewatkan flash sale terbesar kami! Diskon hingga 77% hanya selama 24 jam.",
    image: "https://placehold.co/600x400",
    dataAiHint: "online shopping",
    audience: 5000,
    variant: "default",
  },
  {
    title: "Promo Akhir Pekan",
    date: "28 Juni 2024",
    status: "Berakhir",
    description: "Promo spesial untuk menemani akhir pekan Anda. Diskon 20% untuk makanan & minuman.",
    image: "https://placehold.co/600x400",
    dataAiHint: "food delivery",
    audience: 850,
    variant: "secondary",
  },
  {
    title: "Diskon Hari Sekolah",
    date: "17 Juni 2024",
    status: "Berakhir",
    description: "Kembali ke sekolah dengan semangat baru! Diskon 30% untuk semua perlengkapan sekolah.",
    image: "https://placehold.co/600x400",
    dataAiHint: "school supplies",
    audience: 970,
    variant: "secondary",
  },
];


export default function CalendarPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold">Kalender Kampanye</h1>
                <p className="text-muted-foreground">Lihat jadwal kampanye yang akan datang dan yang sudah berakhir.</p>
            </div>

            <div className="grid gap-6">
                {campaigns.map((campaign, index) => (
                    <Card key={index} className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                        <div className="md:w-1/3">
                            <Image
                              src={campaign.image}
                              alt={campaign.title}
                              width={600}
                              height={400}
                              data-ai-hint={campaign.dataAiHint}
                              className="object-cover h-full w-full"
                            />
                        </div>
                        <div className="md:w-2/3 flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="font-headline text-2xl">{campaign.title}</CardTitle>
                                    <Badge variant={campaign.status === 'Akan Datang' ? 'default' : 'outline'}>
                                        {campaign.status}
                                    </Badge>
                                </div>
                                <CardDescription className="flex items-center gap-2 pt-1">
                                    <CalendarIcon className="w-4 h-4" />
                                    <span>{campaign.date}</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">{campaign.description}</p>
                            </CardContent>
                            <CardFooter>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="w-4 h-4" />
                                    <span>Target Audiens: {campaign.audience.toLocaleString()} orang</span>
                                </div>
                            </CardFooter>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
