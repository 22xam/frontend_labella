export default function MobileScreen({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-white blur-3xl" />
        <div className="absolute top-1/3 -right-28 h-80 w-80 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-white blur-3xl" />
      </div>
      <main className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-8 pt-8">
        {children}
      </main>
    </div>
  );
}
