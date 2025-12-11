export function Badge({ text }: { text: string }) {
  return <span className="bg-hot-pink text-white px-2 py-0.5 text-xs font-bold border border-black">{text}</span>;
}