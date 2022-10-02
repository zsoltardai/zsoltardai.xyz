import Image from 'next/image';

const renderer = {
    p(p) {
        const { node } = p;
        if (node.children[0].tagName === 'img') {
            const image = node.children[0];
            return (
                <div style={{ alignSelf: 'center' }}>
                    <Image src={image.properties.src.toString()} alt={image.alt} width={400} height={400} />
                </div>
            );
        }
        return <p>{p.children}</p>;
    }
};

export default renderer;
