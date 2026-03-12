import "./globals.css";

export const metadata = {
  title: "Asia Drone Store",
  description: "Drone e-commerce platform by asia softlab",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}