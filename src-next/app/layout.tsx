import '../css/index.css';
import AppLayout from 'components/AppLayout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppLayout>
         {children}
        </AppLayout>
      </body>
    </html>
  )
}
