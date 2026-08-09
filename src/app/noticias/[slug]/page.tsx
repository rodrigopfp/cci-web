import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug, getRelatedArticles } from "@/data/articles";
import { ArticleImage } from "@/components/ArticleImage";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryBadge, ContentTypeBadge, SponsoredBadge } from "@/components/Badges";
import { PartnerLogo } from "@/components/Blocks";
import { formatDate } from "@/lib/format";

export function generateStaticParams() { return articles.map((a) => ({ slug: a.slug })); }

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();
  const related = getRelatedArticles(article);
  return (
    <article>
      <div className="container-cci max-w-3xl pt-10">
        <Link href="/noticias" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cci-slate hover:text-cci-orange-dark"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>Volver a actualidad</Link>
        <div className="mb-4 flex flex-wrap items-center gap-2"><ContentTypeBadge type={article.type} /><CategoryBadge category={article.category} /></div>
        <h1 className="font-display text-3xl font-900 leading-tight text-cci-ink md:text-5xl">{article.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-cci-slate">{article.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 border-y border-cci-line py-4 text-sm">
          <span className="font-600 text-cci-graphite">{article.author}</span><span className="text-cci-slate-light">·</span><span className="text-cci-slate">{formatDate(article.date)}</span><span className="text-cci-slate-light">·</span><span className="text-cci-slate">{article.readingMinutes} min de lectura</span>
          <div className="ml-auto flex items-center gap-2"><span className="text-xs text-cci-slate-light">Compartir</span>{["in", "X", "f"].map((s) => <button key={s} className="flex h-8 w-8 items-center justify-center rounded-full border border-cci-line text-xs font-700 text-cci-graphite transition hover:border-cci-orange hover:text-cci-orange">{s}</button>)}</div>
        </div>
      </div>
      <div className="container-cci max-w-4xl py-8"><ArticleImage image={article.image} photo={article.photo} alt={article.title} className="aspect-[21/9]" /></div>
      <div className="container-cci max-w-3xl">
        {article.type === "patrocinado" && <div className="mb-8"><SponsoredBadge /></div>}
        <div className="space-y-5 text-[17px] leading-[1.75] text-cci-ink/90">{article.content.map((par, i) => <p key={i}>{par}</p>)}</div>
        {/* Fuente original: la plataforma enlaza, no reemplaza a la fuente */}
        {article.sourceUrl && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cci-line bg-cci-paper p-5">
            <div>
              <div className="text-[11px] font-700 uppercase tracking-wide text-cci-orange">Fuente</div>
              <div className="mt-1 text-sm text-cci-slate">{article.sourceName}</div>
            </div>
            <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0">
              Ver publicación original
            </a>
          </div>
        )}

        {article.partner && (
          <div className="mt-10 rounded-2xl border border-cci-line bg-cci-paper p-7">
            <div className="mb-1 text-xs font-700 uppercase tracking-wide text-cci-orange">Sobre la empresa socia</div>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
              <PartnerLogo partner={article.partner} size={64} />
              <div className="flex-1"><h3 className="font-display text-xl font-700 text-cci-graphite">{article.partner.name}</h3><span className="badge mt-1 bg-white text-cci-slate">{article.partner.category}</span><p className="mt-2 text-sm leading-relaxed text-cci-slate">{article.partner.description}</p></div>
              <Link href={`/noticias?socio=${article.partner.slug}`} className="btn-ghost shrink-0">Ver noticias</Link>
            </div>
          </div>
        )}
      </div>
      <div className="container-cci py-16">
        <h2 className="mb-7 font-display text-2xl font-800 text-cci-ink">Noticias relacionadas</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((a) => <ArticleCard key={a.id} article={a} />)}</div>
      </div>
    </article>
  );
}
