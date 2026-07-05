import Image from "next/image";

type PhoneFrameProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
};

/**
 * Cadre téléphone éditorial — bezel d'encre mince, coins généreux.
 * Compagnon du BrowserFrame pour les compositions desktop + mobile.
 */
export function PhoneFrame({
  src,
  alt,
  className = "",
  sizes = "220px",
}: PhoneFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-[26px] bg-ink p-[6px] shadow-[0_30px_60px_-30px_rgba(36,26,18,0.5)] motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-editorial motion-safe:group-hover:-translate-y-2 ${className}`}
    >
      <div className="relative aspect-[390/800] overflow-hidden rounded-[20px] bg-wash">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
