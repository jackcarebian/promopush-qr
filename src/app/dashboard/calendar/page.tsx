
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
import { useCampaigns } from "../contexts/campaign-context";


export default function CalendarPage() {
    const { campaigns } = useCampaigns();

    const calendarEvents = campaigns.map(campaign => ({
        title: campaign.title,
        start: campaign.date,
        allDay: true,
        className: campaign.status === 'Berakhir' ? 'fc-event-past' : 'fc-event-upcoming'
    }));

    const formatDisplayDate = (dateString: string) => {
        try {
            // The date is already in YYYY-MM-DD format, which parse handles correctly.
            const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
            return format(parsedDate, 'd MMMM yyyy', { locale: idLocaleDateFns });
        } catch {
            return dateString;
        }
    };


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
                                    <span>{formatDisplayDate(campaign.date)}</span>
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
