import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-lg font-bold font-headline", className)}>
      <div className="p-1.5 bg-primary rounded-md">
        <Bell className="h-5 w-5 text-primary-foreground" />
      </div>
      <span>Notiflayer</span>
    </div>
  );
}
