export default function PanelCard({ title, subtitle, children, className = "" }) {
  return (
    <section className={`rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur ${className}`}>
      {(title || subtitle) && (
        <div className="mb-3">
          {title ? <h2 className="text-sm font-semibold text-white">{title}</h2> : null}
          {subtitle ? <p className="mt-1 text-xs text-neutral-400">{subtitle}</p> : null}
        </div>
      )}
      {children}
    </section>
  );
}
