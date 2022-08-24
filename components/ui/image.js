import { useAmp } from 'next/amp';
import NextImage from 'next/image';

export default function Image({
 src,
 alt,
 width,
 height,
 layout
}) {
  const isAmp = useAmp();
  if (isAmp) return (
      <amp-img
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout={layout}
      />
  );
  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      layout={layout}
    />
  );
}
