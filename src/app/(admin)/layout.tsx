import "@/app/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProtectedRoute from "./components/ProtectedRoute";
export { metadata, viewport } from "../layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <html
        className="no-scrollbar overflow-x-hidden scroll-smooth"
        lang="en"
        suppressHydrationWarning={true}
      >
        <body className={`antialiased overflow-x-hidden`}>
          <ProtectedRoute>{children}</ProtectedRoute>
        </body>
      </html>
    </TooltipProvider>
  );
}
