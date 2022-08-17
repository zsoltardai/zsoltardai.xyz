import PoemsGrid from '../../components/poem/poems-grid';
import { getAllPoems } from '../../lib/poems-util';

export default function Poems({ poems }) { return <PoemsGrid poems={poems} />; }

export async function getServerSideProps() {
    const poems = await getAllPoems();
    return {
        props: {
            poems: poems
        }
    };
}
