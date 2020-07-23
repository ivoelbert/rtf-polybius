import Head from 'next/head';
import { Game } from '../components/Game';

export default function Home() {
    return (
        <>
            <Head>
                <title>Polybius</title>
            </Head>
            <Game />
        </>
    );
}
