import { AppProps } from 'next/app';

import '../styles.scss';

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
