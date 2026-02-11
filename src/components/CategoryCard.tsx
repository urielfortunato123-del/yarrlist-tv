import { useRef, useCallback, useState } from "react";
import type { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [focused, setFocused] = useState(false);
  const Icon = category.icon;

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
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
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="group relative flex flex-col items-center justify-center gap-4 rounded-lg border-2 bg-card p-6 transition-all duration-300 ease-out focus:outline-none xl:p-8"
      style={{
        animationDelay: `${index * 80}ms`,
        animationFillMode: "both",
        borderColor: focused ? `hsl(${category.color})` : undefined,
        boxShadow: focused
          ? `0 0 30px hsl(${category.color} / 0.4), 0 0 60px hsl(${category.color} / 0.15), inset 0 0 20px hsl(${category.color} / 0.05)`
          : undefined,
        transform: focused ? "scale(1.1)" : undefined,
      }}
    >
      {/* Animated glow ring on focus */}
      {focused && (
        <div
          className="pointer-events-none absolute inset-0 rounded-lg animate-pulse-glow"
          style={{
            border: `2px solid hsl(${category.color} / 0.5)`,
          }}
        />
      )}

      <div
        className="flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 xl:h-20 xl:w-20"
        style={{
          backgroundColor: focused
            ? `hsl(${category.color} / 0.25)`
            : `hsl(${category.color} / 0.15)`,
        }}
      >
        <Icon
          className="h-8 w-8 transition-all duration-300 xl:h-10 xl:w-10"
          style={{
            color: `hsl(${category.color})`,
            filter: focused ? `drop-shadow(0 0 8px hsl(${category.color} / 0.6))` : undefined,
          }}
        />
      </div>
      <span
        className="font-display text-sm font-bold tracking-wider xl:text-base transition-colors duration-300"
        style={{
          color: focused ? `hsl(${category.color})` : undefined,
        }}
      >
        {category.name}
      </span>

      {/* Selection indicator arrow */}
      {focused && (
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full"
          style={{ backgroundColor: `hsl(${category.color})` }}
        />
      )}
    </a>
  );
};

export default CategoryCard;
