import { AppProps } from 'next/app';  // Import AppProps for typing
import "../globals.css"; // Import global CSS

// Define the custom MyApp component with correct typing
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;