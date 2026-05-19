import { notifications } from "@/lib/data";

export function NotificationList() {
  return (
    <div className="space-y-4">
      {notifications.map((item) => (
        <div key={item.title} className="flex gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-mint text-emerald-800">
            <item.icon className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold">{item.title}</p>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
