import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="w-full h-full" lang="en">
      <body className="w-full h-full">
        {children}
      </body>
    </html>
  );
}
