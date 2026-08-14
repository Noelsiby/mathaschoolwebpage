import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TransitionProvider from '@/components/TransitionProvider';
import ScrollToTop from '@/components/ScrollToTop';
import CustomCursor from '@/components/CustomCursor';
import IntroWrapper from '@/components/IntroWrapper';

export const metadata = {
  title: {
    default: `${process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"} — Path to Success`,
    template: `%s | ${process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"}`,
  },
  description:
    `${process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"} in Kaikalur — nurturing young minds with quality education, strong values, and a path to success.`,
  keywords: ['Matha School', 'Kaikalur school', 'English medium school', 'Andhra Pradesh school', 'mathaschool.in'],
  authors: [{ name: process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School" }],
  metadataBase: new URL('https://mathaschool.in'),
  openGraph: {
    title: `${process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School"} — Path to Success`,
    description: 'Quality education in Kaikalur, Andhra Pradesh.',
    url: 'https://mathaschool.in',
    siteName: process.env.NEXT_PUBLIC_SCHOOL_NAME || "Matha English Medium School",
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col font-body">
        <CustomCursor />
        <IntroWrapper>
          <Navbar />
          <TransitionProvider>
            <main className="flex-1" role="main">
              {children}
            </main>
          </TransitionProvider>
          <Footer />
          <ScrollToTop />
        </IntroWrapper>
      </body>
    </html>
  );
}


