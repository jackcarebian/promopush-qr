
"use client";

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { useCampaigns, Campaign } from '../contexts/campaign-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Tag, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function CalendarPage() {
    const { campaigns } = useCampaigns();

    const calendarEvents = campaigns.map(campaign => ({
        title: campaign.title,
        start: campaign.date,
        allDay: true,
        className: campaign.status === 'Akan Datang' ? 'fc-event-upcoming' : 'fc-event-past',
    }));

    const upcomingCampaigns = campaigns
        .filter(c => c.status === 'Akan Datang')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const pastCampaigns = campaigns
        .filter(c => c.status === 'Berakhir')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
        <Card className="flex flex-col md:flex-row overflow-hidden w-full">
            <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                    data-ai-hint={campaign.dataAiHint}
                />
            </div>
            <div className="md:w-2/3 flex flex-col justify-between">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="font-headline">{campaign.title}</CardTitle>
                        <Badge variant={campaign.status === 'Berakhir' ? 'secondary' : 'default'}>{campaign.status}</Badge>
                    </div>
                    <CardDescription>{campaign.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{format(new Date(`${campaign.date}T00:00:00`), "dd MMMM yyyy", { locale: id })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Tag className="w-4 h-4" />
                        <span>Kategori: {campaign.businessCategory}</span>
                    </div>
                </CardFooter>
            </div>
        </Card>
    );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold">Kalender Kampanye</h1>
                <p className="text-muted-foreground">Lihat, kelola, dan lacak semua jadwal kampanye Anda di sini.</p>
            </div>

            <Card>
                <CardContent className="p-2 md:p-4">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,listWeek'
                        }}
                        events={calendarEvents}
                        height="auto"
                        locale="id"
                        buttonText={{
                            today: 'Hari Ini',
                            month: 'Bulan',
                            week: 'Daftar',
                            day: 'Hari',
                            list: 'Daftar'
                        }}
                        eventDisplay="block"
                        dayMaxEvents={2}
                    />
                </CardContent>
            </Card>

            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-headline font-semibold">Kampanye Akan Datang</h2>
                    <p className="text-muted-foreground">Berikut adalah kampanye yang sudah Anda jadwalkan.</p>
                </div>
                {upcomingCampaigns.length > 0 ? (
                    <div className="grid gap-6">
                        {upcomingCampaigns.map((campaign, index) => (
                           <CampaignCard key={`upcoming-${index}`} campaign={campaign} />
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                            Belum ada kampanye yang akan datang. Buat kampanye baru sekarang!
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-headline font-semibold">Riwayat Kampanye</h2>
                    <p className="text-muted-foreground">Kampanye yang telah berhasil dilaksanakan.</p>
                </div>
                 {pastCampaigns.length > 0 ? (
                    <div className="grid gap-6">
                        {pastCampaigns.map((campaign, index) => (
                           <div key={`past-${index}`} className="opacity-75">
                             <CampaignCard campaign={campaign} />
                           </div>
                        ))}
                    </div>
                ) : (
                     <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                           Tidak ada riwayat kampanye.
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
