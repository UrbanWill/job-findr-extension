export default function SidePanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen text-base bg-zinc-50">
      <main className="flex flex-1 p-4">{children}</main>
    </div>
  );
}
