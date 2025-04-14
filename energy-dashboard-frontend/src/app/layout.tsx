import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Nvidia Dashboard",
  icons: {
    icon: '/favicon.ico' //Ico foi criado no site https://www.favicon.cc/? -- Ficou mais ou menos
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="relative font-sans text-gray-900">
        <div className="absolute inset-0 z-[-1] bg-[url('/background.jpg')] bg-cover bg-center bg-fixed before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/60 before:to-black/20"/>
        {children}
      </body>
    </html>
  );
}
