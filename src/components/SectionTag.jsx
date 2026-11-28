export default function SectionTag({ children, orange = false }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
        orange
          ? "bg-protein-orange/12 text-protein-orange"
          : "bg-protein-soft text-protein-dark"
      }`}
    >
      {children}
    </span>
  );
}