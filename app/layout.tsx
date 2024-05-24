import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/storeProvider";
import { Navbar } from "@/components/custom/navbar";
import { ThemeProvider } from "@/components/custom/themeProvider";
import SessionProvider from "@/components/SessionProvider"
import { getServerSession } from "next-auth";
import { NavLinksType } from "@/lib/types";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

const websiteName = "Reactify"

const routes: NavLinksType[] = [
  { name: "Snippets", href: "/snippets", isProtected: false },
  { name: "Project", href: "/project?tab=layers", isProtected: true },
  { name: "About", href: "/about", isProtected: false}
]

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
                  {children}
                {/* </div> */}
                <Toaster />
              </ThemeProvider>
            </SessionProvider>
          </StoreProvider>
        </body>
    </html>
  );
}
