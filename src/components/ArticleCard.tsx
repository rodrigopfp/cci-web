import Link from "next/link";
import type { Article } from "@/data/types";
import { formatDate, categoryShort } from "@/lib/format";
import { ArticleImage } from "./ArticleImage";
import { CategoryBadge, ContentTypeBadge } from "./Badges";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/noticias/${article.slug}`} className="card-rise group relative flex flex-col overflow-hidden rounded-xl border border-cci-line bg-white shadow-card">
      <ArticleImage image={article.image} photo={article.photo} alt={article.title} className="aspect-[16/10]" rounded="rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Fila de metadatos en una sola línea: la categoría se muestra
            abreviada para que todas las tarjetas queden alineadas. */}
        <div className="flex min-h-[26px] flex-nowrap items-center gap-2 overflow-hidden">
          <ContentTypeBadge type={article.type} />
          <span className="truncate text-[11px] font-600 uppercase tracking-wide text-cci-slate-light">
            {categoryShort[article.category]}
          </span>
        </div>
        <h3 className="font-display text-lg font-800 leading-snug text-cci-ink transition-colors group-hover:text-cci-orange">{article.title}</h3>
        <p className="text-sm leading-relaxed text-cci-slate line-clamp-3">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-cci-slate-light">
          <span>{article.author}</span><span>{formatDate(article.date)}</span>
        </div>
      </div>
      <span className="sweep" />
    </Link>
  );
}

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <Link href={`/noticias/${article.slug}`} className="group relative grid overflow-hidden rounded-2xl border border-cci-line bg-white shadow-card transition-shadow hover:shadow-card-hover md:grid-cols-2">
      <ArticleImage image={article.image} photo={article.photo} alt={article.title} className="min-h-[260px] md:min-h-[420px]" rounded="rounded-none" />
      <div className="flex flex-col justify-center gap-4 p-7 md:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <ContentTypeBadge type={article.type} /><CategoryBadge category={article.category} />
        </div>
        <h2 className="font-display text-2xl font-800 leading-tight text-cci-ink md:text-4xl transition-colors group-hover:text-cci-orange">{article.title}</h2>
        <p className="text-base leading-relaxed text-cci-slate md:text-lg">{article.excerpt}</p>
        <div className="flex items-center gap-3 text-sm text-cci-slate-light">
          <span className="font-medium text-cci-graphite">{article.author}</span><span>·</span><span>{formatDate(article.date)}</span><span>·</span><span>{article.readingMinutes} min</span>
        </div>
        <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-cci-orange">Leer artículo
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
      <span className="sweep" />
    </Link>
  );
}
