import { DemoShell } from "@/components/demo/demo-shell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DemoShell>{children}</DemoShell>;
}
