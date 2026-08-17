import AppLayout from "@/layouts/app-layout";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return <AppLayout>{children}</AppLayout>;
}
