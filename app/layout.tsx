import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/storeProvider";
import { NavLinksType, Navbar } from "@/components/custom/navbar";
import { ThemeProvider } from "@/components/custom/themeProvider";

const inter = Inter({ subsets: ["latin"] });

const websiteName = "Reactify"

const routes: NavLinksType[] = [
  { name: "Templates", href: "/templates" },
  { name: "Project", href: "/project" },
]

export const mainHeightClass = "h-[calc(100vh-4rem)]"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <StoreProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
              <Navbar name={websiteName} routes={routes} />
              <div className={`w-screen ${mainHeightClass}`}>
                {children}
              </div>
            </ThemeProvider>
          </StoreProvider>
        </body>
    </html>
  );
}
