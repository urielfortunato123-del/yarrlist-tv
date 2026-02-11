import { useRef, useCallback } from "react";
import type { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const Icon = category.icon;

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // TV remote navigation
    const cards = document.querySelectorAll<HTMLElement>("[data-tv-card]");
    const currentIndex = Array.from(cards).indexOf(ref.current!);
    const cols = window.innerWidth >= 1280 ? 4 : window.innerWidth >= 768 ? 3 : 2;

    let nextIndex = -1;
    if (e.key === "ArrowRight") nextIndex = Math.min(currentIndex + 1, cards.length - 1);
    if (e.key === "ArrowLeft") nextIndex = Math.max(currentIndex - 1, 0);
    if (e.key === "ArrowDown") nextIndex = Math.min(currentIndex + cols, cards.length - 1);
    if (e.key === "ArrowUp") nextIndex = Math.max(currentIndex - cols, 0);

    if (nextIndex >= 0) {
      e.preventDefault();
      cards[nextIndex]?.focus();
    }
  }, []);

  return (
    <a
      ref={ref}
      href={category.url}
      target="_blank"
      rel="noopener noreferrer"
      data-tv-card
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="group relative flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-border bg-card p-6 transition-all duration-300 ease-out hover:scale-105 hover:border-primary hover:shadow-[var(--shadow-glow-hover)] focus:tv-card-focus focus:scale-105 focus:border-primary focus:shadow-[var(--shadow-glow-hover)] focus:outline-none xl:p-8"
      style={{
        animationDelay: `${index * 80}ms`,
        animationFillMode: "both",
      }}
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 xl:h-20 xl:w-20"
        style={{ backgroundColor: `hsl(${category.color} / 0.15)` }}
      >
        <Icon
          className="h-8 w-8 xl:h-10 xl:w-10"
          style={{ color: `hsl(${category.color})` }}
        />
      </div>
      <span className="font-display text-sm font-bold tracking-wider text-foreground xl:text-base">
        {category.name}
      </span>
    </a>
  );
};

export default CategoryCard;
