export default function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <div className="flex items-center gap-4 mb-5">
        <span className="sx-eyebrow text-white">{index}</span>
        <span className="h-px w-12 bg-white/40" />
      </div>
      <h2 className="sx-display text-5xl sm:text-6xl lg:text-7xl text-white">{title}</h2>
    </div>
  );
}
