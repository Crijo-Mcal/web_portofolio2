import Button from "@/components/Button";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[640px] flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo href="/" />
      <h1 className="font-display text-[40px] font-extrabold tracking-[-0.03em]">Página não encontrada</h1>
      <p className="font-serif text-[16px] leading-[1.7] text-muted">A página que procura não existe ou foi removida.</p>
      <Button href="/">Voltar ao início</Button>
    </main>
  );
}
