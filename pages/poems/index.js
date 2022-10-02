import Head from 'next/head';
import PoemsGrid from '../../components/poem/poems-grid';
import getPoem from "../../lib/poems/getPoem";

export default function Poems({ poems }) {
    return (
        <>
            <Head>
                <title>Poems</title>
                <meta name='description' content='This is a page for all my poems.' />
            </Head>
            <PoemsGrid poems={poems} />
        </>
    );
}

export async function getStaticProps() {
    const poems = await getPoem();
    return {props: {poems: poems}, revalidate: 60};
}
