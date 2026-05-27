import { ListIcon, MapIcon } from "@/components/ui/icons";

/** Floating list/map switch — the Airbnb pattern, in Copia forest. */
export function ViewToggle({
  view,
  onToggle,
}: {
  view: "list" | "map";
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute bottom-[20px] left-1/2 z-[6] flex h-[44px] -translate-x-1/2 items-center gap-[8px] rounded-full bg-forest px-[20px] font-mono text-[10px] uppercase tracking-[0.12em] text-cream shadow-[var(--shadow-md)] transition-transform active:scale-[0.97]"
    >
      {view === "list" ? (
        <>
          <MapIcon className="h-[16px] w-[16px]" />
          Map
        </>
      ) : (
        <>
          <ListIcon className="h-[16px] w-[16px]" />
          List
        </>
      )}
    </button>
  );
}
