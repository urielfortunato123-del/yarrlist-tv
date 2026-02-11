import { useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const CategoryCard = ({ category, index, isFavorite, onToggleFavorite }: CategoryCardProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [focused, setFocused] = useState(false);
  const Icon = category.icon;

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Toggle favorite with "f" key
    if (e.key === "f" || e.key === "F") {
      e.preventDefault();
      onToggleFavorite(category.id);
      return;
    }

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
  }, [category.id, onToggleFavorite]);

  const handleFavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(category.id);
  };

  return (
    <motion.a
      ref={ref}
      href={category.url}
      target="_blank"
      rel="noopener noreferrer"
      data-tv-card
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.05 }}
      className="group relative flex flex-col items-center justify-center gap-4 rounded-lg border-2 bg-card p-6 transition-[border-color,box-shadow] duration-300 ease-out focus:outline-none xl:p-8"
      style={{
        borderColor: focused ? `hsl(${category.color})` : undefined,
        boxShadow: focused
          ? `0 0 30px hsl(${category.color} / 0.4), 0 0 60px hsl(${category.color} / 0.15), inset 0 0 20px hsl(${category.color} / 0.05)`
          : undefined,
        transform: focused ? "scale(1.1)" : undefined,
      }}
    >
      {/* Favorite button */}
      <button
        onClick={handleFavClick}
        className="absolute top-3 right-3 z-10 rounded-full p-1.5 transition-all duration-200 hover:scale-125 focus:outline-none"
        tabIndex={-1}
        aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Star
          className="h-5 w-5 transition-all duration-200"
          style={{
            color: isFavorite ? `hsl(${category.color})` : "hsl(var(--muted-foreground))",
            fill: isFavorite ? `hsl(${category.color})` : "none",
            filter: isFavorite ? `drop-shadow(0 0 4px hsl(${category.color} / 0.5))` : undefined,
          }}
        />
      </button>

      {/* Glow ring */}
      {focused && (
        <div
          className="pointer-events-none absolute inset-0 rounded-lg animate-pulse-glow"
          style={{ border: `2px solid hsl(${category.color} / 0.5)` }}
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
        style={{ color: focused ? `hsl(${category.color})` : undefined }}
      >
        {category.name}
      </span>

      {focused && (
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full"
          style={{ backgroundColor: `hsl(${category.color})` }}
        />
      )}
    </motion.a>
  );
};

export default CategoryCard;
