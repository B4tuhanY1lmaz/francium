import { Inter } from "next/font/google";
import "./globals.css";

import ThemesProvider from "@/components/body/theme-provider"
import ModalProvider from "@/components/providers/modal-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={`min-h-screen py-10 bg-[#E1E5F4] dark:bg-[#080e1e] ${inter.className}`}>
        <ThemesProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
        >
            <ModalProvider/>
            {children}
        </ThemesProvider>
        </body>
    </html>
  )
}
