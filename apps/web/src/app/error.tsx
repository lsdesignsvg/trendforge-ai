"use client";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Algo salió mal</h1>
        <p className="mt-3 text-zinc-400">Estamos solucionando el problema.</p>
      </div>
    </div>
  );
}
