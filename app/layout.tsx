import type { Metadata, Viewport } from "next";
import { Outfit, Lora, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});


const description =
  "Portfólio de Crijolise Morglia Marçal, Junior Full-Stack Web Developer em Portugal. Aplicações web com foco no frontend e no backend.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Crijolise Marçal — Full-Stack Web Developer",
    template: "%s — Crijolise Marçal",
  },
  description,
  icons: { icon: "/assets/favicon.svg?v=2" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Crijolise Marçal",
    title: "Crijolise Marçal — Full-Stack Web Developer",
    description,
    images: [{ url: "/assets/retrato.png", alt: "Ilustração de Crijolise Marçal" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0E0E",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-PT"
      className={`${outfit.variable} ${lora.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen overflow-x-clip">
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
