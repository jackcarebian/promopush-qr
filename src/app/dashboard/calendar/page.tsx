
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
import { format, parseISO } from 'date-fns';
import { id as idLocaleDateFns } from 'date-fns/locale';
import { useCampaigns } from "../contexts/campaign-context";


export default function CalendarPage() {
    // Get campaigns from the global context. This is the single source of truth.
    const { campaigns } = useCampaigns();

    // Map campaigns to the format required by FullCalendar
    const calendarEvents = campaigns.map(campaign => ({
        title: campaign.title,
        start: campaign.date, // The date is already in YYYY-MM-DD format
        allDay: true,
        // Add a class to style past and upcoming events differently
        className: campaign.status === 'Berakhir' ? 'fc-event-past' : 'fc-event-upcoming'
    }));

    // Helper function to format the date for display in the list
    const formatDisplayDate = (dateString: string) => {
        try {
            // dateString is in "YYYY-MM-DD" format, parseISO handles this correctly
            const parsedDate = parseISO(dateString);
            return format(parsedDate, 'd MMMM yyyy', { locale: idLocaleDateFns });
        } catch {
            // Fallback for any invalid date string
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
                            right: 'dayGridMonth,timeGridWeek,listWeek'
                        }}
                        buttonText={{
                            today:    'hari ini',
                            month:    'bulan',
                            week:     'minggu',
                            list:     'daftar'
                        }}
                        initialView="dayGridMonth"
                        events={calendarEvents}
                        locale={idLocale}
                        height="auto"
                        contentHeight="auto"
                        editable={true} // Allows dragging and resizing
                        selectable={true}
                        dayMaxEvents={true} // a.k.a. "+ more" link
                    />
                </CardContent>
            </Card>

            <div>
                <h2 className="text-2xl font-headline font-bold">Daftar Kampanye</h2>
                 <p className="text-muted-foreground">Rincian semua kampanye, baik yang akan datang maupun yang sudah berakhir.</p>
            </div>

            <div className="grid gap-6">
                {campaigns.length === 0 ? (
                    <p className="text-muted-foreground text-center">Belum ada kampanye. Buat kampanye baru untuk memulai!</p>
                ) : (
                    campaigns.map((campaign, index) => (
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
                    ))
                )}
            </div>
        </div>
    );
}
