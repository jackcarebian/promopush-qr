import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Megaphone, Users, BarChart2, Calendar } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Selamat datang kembali! Berikut adalah ringkasan aktivitas Anda.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pelanggan
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +5.2% dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Kampanye Terkirim
            </CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">57</div>
            <p className="text-xs text-muted-foreground">
              +3 kampanye bulan ini
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tingkat Konversi</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">
              +1.1% dari kampanye terakhir
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Aksi Cepat</CardTitle>
            <CardDescription>Mulai aktivitas baru dengan satu klik.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
            <Button asChild>
                <Link href="/dashboard/campaigns">
                    <Megaphone className="mr-2 h-4 w-4" /> Buat Kampanye Baru
                </Link>
            </Button>
            <Button variant="secondary" asChild>
                <Link href="/dashboard/customers">
                    <Users className="mr-2 h-4 w-4" /> Lihat Pelanggan
                </Link>
            </Button>
             <Button variant="secondary" asChild>
                <Link href="/dashboard/calendar">
                    <Calendar className="mr-2 h-4 w-4" /> Kalender Kampanye
                </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
