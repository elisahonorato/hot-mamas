import '../styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { StoreProvider } from '../utils/Store';
import { useRouter } from 'next/router';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { Barlow, Josefin_Sans } from '@next/font/google'
import Head from 'next/head';

// If loading a variable font, you don't need to specify the font weight

const headingFont = Josefin_Sans({ subsets: ['latin'], variable: '--font-heading' });
const bodyFont = Barlow({ subsets: ['latin'], variable: '--font-body', weight: ['500', '700'] });




function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>

          {Component.auth ? (
            <Auth adminOnly={Component.auth.adminOnly}>
              <html className={`${headingFont.className} ${bodyFont.className}`}>
                <body>
                  <Component {...pageProps} />
                </body>
              </html>
            </Auth>
          ) : (
            <html className={`${headingFont.className} ${bodyFont.className}`}>
              <Head>
                <title>HotMamas</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="google-site-verification" content="Cl676eRtm3ZhuUKj1EhEbYUJgtd6uwZ7e2x17LQOZoM" />
              </Head>
            <body>
              <Component {...pageProps} />
            </body>
          </html>
          )}
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}

function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push('/unauthorized?message=admin login required');
  }

  return children;
}

export default MyApp;
