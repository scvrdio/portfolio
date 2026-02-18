type Item = { label: string; value: string };

function MetricPill({ title, value }: { title: string; value: string }) {
  return (
    <div className="inline-flex flex-col items-start">
      {/* верхняя капсула */}
      <div className="relative z-10 inline-flex items-center rounded-[24px] border border-[#0033FF] bg-white px-2 py-[2px]">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0033FF]">
          {title}
        </span>
      </div>

      {/* нижняя капсула, перекрытие как в фигме */}
      <div className="-mt-[4px] inline-flex items-center rounded-[44px] bg-[#0033FF] px-3 py-1 h-[36px]">
        <span className="text-[18px] font-bold leading-none text-white">
          {value}
        </span>
      </div>
    </div>
  );
}

export function MetricPills({ items }: { items: Item[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((x) => (
        <MetricPill key={`${x.label}-${x.value}`} title={x.label} value={x.value} />
      ))}
    </div>
  );
}
