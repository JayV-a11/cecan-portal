import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={montserrat.className}>
                <AppRouterCacheProvider>
                    <ToastContainer />
                    {children}
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
