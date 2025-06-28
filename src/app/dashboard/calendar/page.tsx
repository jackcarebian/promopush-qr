
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import Image from "next/image";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import idLocale from '@fullcalendar/core/locales/id';
import { parse, format } from 'date-fns';
import { id as idLocaleDateFns } from 'date-fns/locale';


const campaigns = [
  // 3 Past Campaigns
  {
    title: "Diskon Hari Valentine",
    date: "14 Februari 2024",
    status: "Berakhir",
    description: "Rayakan cinta dengan diskon spesial 20% untuk semua item cokelat dan bunga.",
    image: "https://placehold.co/600x400",
    dataAiHint: "valentine gift",
    audience: 1500,
    variant: "secondary",
  },
  {
    title: "Promo Lebaran Sale",
    date: "10 April 2024",
    status: "Berakhir",
    description: "Lengkapi kebutuhan Lebaran Anda dengan diskon hingga 50% untuk baju koko dan gamis.",
    image: "https://placehold.co/600x400",
    dataAiHint: "eid celebration",
    audience: 4200,
    variant: "secondary",
  },
  {
    title: "Promo Akhir Pekan Mei",
    date: "24 Mei 2024",
    status: "Berakhir",
    description: "Promo spesial untuk menemani akhir pekan Anda. Diskon 20% untuk makanan & minuman.",
    image: "https://placehold.co/600x400",
    dataAiHint: "food delivery",
    audience: 850,
    variant: "secondary",
  },

  // 7 Upcoming Campaigns (June & July)
  {
    title: "Diskon Liburan Sekolah",
    date: "25 Juni 2024",
    status: "Akan Datang",
    description: "Isi liburan anak dengan produk mainan edukatif, diskon spesial 30%.",
    image: "https://placehold.co/600x400",
    dataAiHint: "kids toys",
    audience: 1800,
    variant: "default",
  },
  {
    title: "Promo Gajian Juni",
    date: "28 Juni 2024",
    status: "Akan Datang",
    description: "Nikmati diskon gajian 25% untuk semua produk elektronik. Waktunya upgrade!",
    image: "https://placehold.co/600x400",
    dataAiHint: "electronics sale",
    audience: 2100,
    variant: "default",
  },
  {
    title: "Flash Sale 7.7",
    date: "7 Juli 2024",
    status: "Akan Datang",
    description: "Jangan lewatkan flash sale terbesar kami! Diskon hingga 77% hanya selama 24 jam.",
    image: "https://placehold.co/600x400",
    dataAiHint: "online shopping",
    audience: 7500,
    variant: "default",
  },
  {
    title: "Promo Kopi Tengah Bulan",
    date: "15 Juli 2024",
    status: "Akan Datang",
    description: "Semangat lagi di tengah bulan! Beli 2 gratis 1 untuk semua varian es kopi susu.",
    image: "https://placehold.co/600x400",
    dataAiHint: "iced coffee",
    audience: 950,
    variant: "default",
  },
  {
    title: "Spesial Hari Anak Nasional",
    date: "23 Juli 2024",
    status: "Akan Datang",
    description: "Hadiahkan yang terbaik untuk si kecil. Diskon 40% untuk semua pakaian anak.",
    image: "https://placehold.co/600x400",
    dataAiHint: "kids fashion",
    audience: 2300,
    variant: "default",
  },
  {
    title: "Payday Sale Juli",
    date: "26 Juli 2024",
    status: "Akan Datang",
    description: "Waktunya belanja! Dapatkan cashback hingga Rp 100.000 untuk semua kategori.",
    image: "https://placehold.co/600x400",
    dataAiHint: "shopping bags",
    audience: 3200,
    variant: "default",
  },
  {
    title: "Promo Back to Campus",
    date: "29 Juli 2024",
    status: "Akan Datang",
    description: "Siap kembali ke kampus? Dapatkan diskon 20% untuk laptop dan aksesorisnya.",
    image: "https://placehold.co/600x400",
    dataAiHint: "laptop student",
    audience: 1500,
    variant: "default",
  }
];

export default function CalendarPage() {

    const calendarEvents = campaigns.map(campaign => {
        try {
            const parsedDate = parse(campaign.date, 'd MMMM yyyy', new Date(), { locale: idLocaleDateFns });

            if (isNaN(parsedDate.getTime())) {
                console.error(`Gagal mem-parsing tanggal: ${campaign.date}`);
                return null;
            }
            
            const formattedDate = format(parsedDate, 'yyyy-MM-dd');

            return {
                title: campaign.title,
                start: formattedDate,
                allDay: true,
                className: campaign.status === 'Berakhir' ? 'fc-event-past' : 'fc-event-upcoming'
            };
        } catch (e) {
             console.error(`Error saat mem-parsing tanggal: ${campaign.date}`, e);
             return null;
        }
    }).filter((event): event is NonNullable<typeof event> => event !== null);


    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold">Kalender Kampanye</h1>
                <p className="text-muted-foreground">Lihat jadwal kampanye yang akan datang dan yang sudah berakhir.</p>
            </div>

            <Card>
                <CardContent className="p-4">
                     <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        }}
                        buttonText={{
                            today:    'hari ini',
                            month:    'bulan',
                            week:     'minggu',
                            day:      'hari',
                            list:     'daftar'
                        }}
                        initialView="dayGridMonth"
                        events={calendarEvents}
                        locale={idLocale}
                        height="auto"
                        contentHeight="auto"
                        editable={true}
                        selectable={true}
                        dayMaxEvents={true}
                    />
                </CardContent>
            </Card>

            <div>
                <h2 className="text-2xl font-headline font-bold">Daftar Kampanye</h2>
                 <p className="text-muted-foreground">Rincian kampanye yang akan datang dan yang sudah berakhir.</p>
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
                                    <span>Target Audiens: {campaign.audience.toLocaleString('id-ID')} orang</span>
                                </div>
                            </CardFooter>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
