import { useState, useMemo } from "react";
import { categories } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";
import TvClock from "@/components/TvClock";
import { useFavorites } from "@/hooks/useFavorites";
import { motion } from "framer-motion";
import { Anchor, Star, Search } from "lucide-react";

const Index = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [search]);

  const favCategories = filtered.filter((c) => favorites.includes(c.id));
  const otherCategories = filtered.filter((c) => !favorites.includes(c.id));

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-6 py-10 xl:py-16">
      {/* Clock */}
      <div className="mb-8 w-full max-w-5xl flex justify-end">
        <TvClock />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-10 flex flex-col items-center gap-3 xl:mb-14"
      >
        <div className="flex items-center gap-3">
          <Anchor className="h-8 w-8 text-primary xl:h-10 xl:w-10" />
          <h1 className="font-display text-3xl font-black tracking-widest text-gradient-gold xl:text-5xl">
            YARRLIST TV
          </h1>
        </div>
        <p className="font-body text-sm text-muted-foreground xl:text-base">
          Ahoy, Mateys! Selecione uma categoria. Pressione <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 font-display text-xs text-foreground">F</kbd> para favoritar.
        </p>
      </motion.header>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md mb-8"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value.slice(0, 50))}
            placeholder="Buscar categoria..."
            className="w-full rounded-lg border-2 border-border bg-card py-3 pl-12 pr-4 font-body text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-200 focus:border-primary"
          />
        </div>
      </motion.div>
      {/* Favorites Section */}
      {favCategories.length > 0 && (
        <section className="w-full max-w-5xl mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-primary" style={{ fill: "hsl(var(--primary))" }} />
            <h2 className="font-display text-lg font-bold tracking-wider text-foreground xl:text-xl">
              Favoritos
            </h2>
          </div>
          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-6">
            {favCategories.map((cat, i) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                index={i}
                isFavorite
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Categories */}
      <section className="w-full max-w-5xl">
        {favCategories.length > 0 && (
          <h2 className="font-display text-lg font-bold tracking-wider text-muted-foreground mb-4 xl:text-xl">
            Todas as categorias
          </h2>
        )}
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-6">
          {otherCategories.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              index={i}
              isFavorite={false}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-muted-foreground xl:mt-16">
        Desenvolvido por Uriel da Fonseca Fortunato
      </footer>
    </div>
  );
};

export default Index;
