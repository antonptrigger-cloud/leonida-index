import Image from "next/image";

/** Official screenshot with a visible "© Rockstar Games" credit. No logos in the file itself. */
export function CreditImage({
  src,
  alt,
  width,
  height,
  credit = "© Rockstar Games",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit?: string;
}) {
  return (
    <figure className="mt-8x max-w-3xl">
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
      <figcaption className="mt-2x text-xs tracking-wide text-faint">{credit}</figcaption>
    </figure>
  );
}
