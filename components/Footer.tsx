export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-alt">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-6 py-8 text-center tab:flex-row tab:text-left">
        <p className="font-display text-[14px] text-text/75">
          © 2026 Crijolise Morglia Marçal. Todos os direitos reservados.
        </p>
        <p className="font-mono text-[14px] text-text/75">
          <span className="text-accent">&lt;code exists /&gt;</span> aprendendo a construir.
        </p>
      </div>
    </footer>
  );
}
