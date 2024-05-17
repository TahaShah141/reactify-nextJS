import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/storeProvider";
import { Navbar } from "@/components/custom/navbar";
import { ThemeProvider } from "@/components/custom/themeProvider";
import SessionProvider from "@/components/SessionProvider"
import { getServerSession } from "next-auth";
import { NavLinksType } from "@/lib/types";

const inter = Inter({ subsets: ["latin"] });

const websiteName = "Reactify"

const routes: NavLinksType[] = [
  { name: "Snippets", href: "/snippets", isProtected: false },
  { name: "Project", href: "/project", isProtected: true },
]

export const mainHeightClass = "h-[calc(100vh-4rem)]"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession()

  return (
    <html lang="en">
        <body className={inter.className}>
          <StoreProvider>
            <SessionProvider session={session}>
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                <Navbar name={websiteName} routes={routes} />
                <div className={`w-screen ${mainHeightClass}`}>
                  {children}
                </div>
              </ThemeProvider>
            </SessionProvider>
          </StoreProvider>
        </body>
    </html>
  );
}
