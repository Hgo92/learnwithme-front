export default function Footer() {
  return (
    <div className="fixed bottom-0 left-auto right-auto z-50 justify-around px-6 py-3 border-b border-border bg-cream/90 backdrop-blur-md">
      <p className="text-ink-muted">
        Réalisé par Hugo Monier avec JavaScript (TypeScript - React -
        TailwindCSS) et NestJS (TypeORM - Better Auth) -{" "}
        <a href="https://github.com/Hgo92/learnwithme-front">Voir le Github</a>
      </p>
    </div>
  );
}
