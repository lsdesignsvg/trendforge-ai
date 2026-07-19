"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

type LibraryItem = {
  title: string;
  type: string;
  content: string;
};

const LIBRARY_KEY = "trendforge-library-items";

function buildSuggestion(prompt: string): LibraryItem[] {
  const normalized = prompt.toLowerCase();
  const isSalesPrompt = normalized.includes("vender") || normalized.includes("venta") || normalized.includes("ventas");
  const isLaunchPrompt = normalized.includes("lanzar") || normalized.includes("lanzamiento");

  if (isSalesPrompt) {
    return [
      {
        title: "Hook de venta",
        type: "Reel",
        content: `Hook: “El jersey que más vende no es el más caro, sino el más claro.”\nCTA: “Escribe 'INFO' y te comparto el pack.”`,
      },
      {
        title: "Copy de carrusel",
        type: "Copy",
        content: `1. Muestra el problema\n2. Presenta la solución\n3. Cierra con urgencia y prueba social`,
      },
      {
        title: "Hashtags de alcance",
        type: "Hashtags",
        content: "#marketingdigital #ventas #marca #sportswear #contenido",
      },
    ];
  }

  if (isLaunchPrompt) {
    return [
      {
        title: "Idea de lanzamiento",
        type: "Concepto",
        content: `Crea una secuencia de 3 piezas para anunciar el lanzamiento: teaser, prueba social y oferta final.`,
      },
      {
        title: "Guion de video",
        type: "Guion",
        content: `0:00 - Hook de sorpresa\n0:08 - Presentación del producto\n0:20 - Beneficio principal`,
      },
      {
        title: "CTA",
        type: "CTA",
        content: `“Descubre el producto antes de que se agote y entra a la lista de espera.”`,
      },
    ];
  }

  return [
    {
      title: "Idea base",
      type: "Contenido",
      content: `Convierte la idea en una propuesta clara con 3 ángulos: emoción, utilidad y prueba social.`,
    },
    {
      title: "Formato sugerido",
      type: "Formato",
      content: `Usa un reel corto, un carrusel y un mensaje de cierre con CTA claro.`,
    },
    {
      title: "Hashtags",
      type: "Hashtags",
      content: "#creatividad #contenido #estrategia #marca",
    },
  ];
}

export default function AiPage() {
  const [prompt, setPrompt] = useState("Necesito vender jerseys para una marca deportiva.");
  const [suggestions, setSuggestions] = useState<LibraryItem[]>([]);

  const handleGenerate = () => {
    setSuggestions(buildSuggestion(prompt));
  };

  const handleSaveToLibrary = () => {
    const currentItems = JSON.parse(localStorage.getItem(LIBRARY_KEY) ?? "[]") as LibraryItem[];
    const nextItems = [
      ...currentItems,
      {
        title: `Generado: ${prompt.slice(0, 36)}`,
        type: "IA",
        content: suggestions.map((item) => `${item.title}: ${item.content}`).join("\n\n"),
      },
    ];
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(nextItems));
    setSuggestions([]);
    setPrompt("");
  };

  const preview = useMemo(() => suggestions[0]?.content ?? "", [suggestions]);

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Asistente IA</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Genera ideas listas para publicar</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-zinc-400">
          Escribe tu objetivo de marketing y la IA te devolverá hooks, copies, CTA y hashtags listos para usar.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[24px] border border-white/10 bg-slate-950/70 p-6">
          <p className="text-sm font-semibold text-cyan-300">Entrada del usuario</p>
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            className="mt-4 min-h-32 w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200 outline-none ring-0"
            placeholder="Ej. Necesito vender jerseys para una marca deportiva."
          />
          <button
            onClick={handleGenerate}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20"
          >
            <Sparkles className="h-4 w-4" />
            Generar propuesta
          </button>
        </article>

        <article className="rounded-[24px] border border-white/10 bg-slate-950/70 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-cyan-300">Respuesta sugerida</p>
            {suggestions.length > 0 ? (
              <button
                onClick={handleSaveToLibrary}
                className="rounded-xl border border-white/10 px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/5"
              >
                Guardar en biblioteca
              </button>
            ) : null}
          </div>

          {suggestions.length > 0 ? (
            <div className="mt-4 space-y-3 text-sm text-zinc-400">
              {suggestions.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-zinc-400">{item.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm leading-7 text-zinc-400">
              {preview || "Tu propuesta aparecerá aquí con hooks, copy y CTA listos para publicar."}
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
