import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ChildrenProps } from "@/types";
import { TooltipProvider } from "@/components/ui/tooltip";

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Sport",
  description:
    "Smart Sport — sport maktablari faoliyatini avtomatlashtiruvchi zamonaviy platforma. O‘quvchilarni ro‘yxatga olish, murabbiylarni boshqarish, mashg‘ulotlar jadvalini tuzish, to‘lovlarni nazorat qilish va hisobotlarni bir joyda yuritish imkonini beradi.",
};

export default function RootLayout({
  children,
}: ChildrenProps) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        notoSans.variable,
        playfairDisplayHeading.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>{" "}
        </ThemeProvider>
      </body>
    </html>
  );
}
