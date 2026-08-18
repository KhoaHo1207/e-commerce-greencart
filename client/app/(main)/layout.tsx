import AppLayout from "@/components/layout/app-layout";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return <AppLayout>{children}</AppLayout>;
}
