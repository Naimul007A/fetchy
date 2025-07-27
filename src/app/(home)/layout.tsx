import MigrationBanner from "@/components/migration-banner";
import Script from "next/script";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MigrationBanner />
      {children}
    </>
  );
}
