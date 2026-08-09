import type { ContentType } from "@/data/types";
import { contentTypeLabel, contentTypeStyle } from "@/lib/format";

export function CategoryBadge({ category }: { category: string }) {
  return <span className="badge bg-white/90 text-cci-graphite backdrop-blur border border-cci-line">{category}</span>;
}
export function ContentTypeBadge({ type }: { type: ContentType }) {
  return <span className={`badge ${contentTypeStyle[type]}`}>{contentTypeLabel[type]}</span>;
}
export function SponsoredBadge() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-cci-orange/30 bg-cci-orange-soft px-4 py-2.5 text-sm font-medium text-cci-orange-dark">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" strokeLinecap="round" /></svg>
      Contenido patrocinado / publirreportaje — elaborado junto a un socio del CCI.
    </div>
  );
}
