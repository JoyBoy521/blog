export function NeoButton({ children }: { children: React.ReactNode }) {
  return <button className="border-2 border-black bg-acid-green px-4 py-2 hover:translate-x-1 hover:translate-y-1 transition-transform">{children}</button>;
}