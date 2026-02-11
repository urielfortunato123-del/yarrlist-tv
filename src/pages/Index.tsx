import { categories } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";
import { Anchor } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-6 py-10 xl:py-16">
      {/* Header */}
      <header className="mb-10 flex flex-col items-center gap-3 xl:mb-14">
        <div className="flex items-center gap-3">
          <Anchor className="h-8 w-8 text-primary xl:h-10 xl:w-10" />
          <h1 className="font-display text-3xl font-black tracking-widest text-gradient-gold xl:text-5xl">
            YARRLIST TV
          </h1>
        </div>
        <p className="font-body text-sm text-muted-foreground xl:text-base">
          Ahoy, Mateys! Selecione uma categoria.
        </p>
      </header>

      {/* Grid */}
      <main className="grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-6">
        {categories.map((cat, i) => (
          <CategoryCard key={cat.id} category={cat} index={i} />
        ))}
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-muted-foreground xl:mt-16">
        Powered by yarrlist.net
      </footer>
    </div>
  );
};

export default Index;
