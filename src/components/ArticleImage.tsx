import type { Article } from "@/data/types";

/**
 * Portada de artículo.
 * El degradado de marca actúa como fondo permanente; la fotografía se monta
 * encima. Si la imagen remota no carga, la tarjeta nunca se ve rota.
 */
export function ArticleImage({
  image,
  photo,
  alt = "",
  className = "",
  rounded = "rounded-xl",
}: {
  image: Article["image"];
  photo?: string;
  alt?: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{ background: `linear-gradient(135deg, ${image.from} 0%, ${image.to} 100%)` }}
    >
      {photo ? (
        <img
          src={photo}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
            backgroundSize: "28px 28px, 36px 36px",
          }}
        />
      )}
      {/* velo inferior para que la etiqueta sea legible sobre cualquier foto */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-3 left-3">
        <span className="rounded-md bg-black/40 px-2 py-1 text-[11px] font-600 uppercase tracking-wide text-white backdrop-blur">
          {image.label}
        </span>
      </div>
    </div>
  );
}
