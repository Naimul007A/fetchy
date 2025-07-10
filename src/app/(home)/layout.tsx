import MigrationBanner from "@/components/migration-banner";

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
