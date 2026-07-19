"use client";

import { useEffect, useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import ContentCard from "./components/ContentCard";
import { deleteLibraryItem, getLibraryItems, saveLibraryItem } from "@/lib/supabase/services";

type ContentItem = {
  title: string;
  type: string;
  content: string;
  id?: string;
};

const initialContents: ContentItem[] = [
  {
    title: "Reel jerseys deportivos",
    type: "Reel",
    content: "Hook: Así fabricamos un jersey desde cero...",
  },
  {
    title: "Ideas de venta",
    type: "Copy",
    content: "3 formas de aumentar tus ventas...",
  },
  {
    title: "Hashtags deportivos",
    type: "Hashtags",
    content: "#sportswear #jersey",
  },
];

export default function LibraryPage() {
  const { user } = useAuth();
  const [contents, setContents] = useState<ContentItem[]>(initialContents);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function loadItems() {
      if (!user?.id) return;
      const { data } = await getLibraryItems(user.id);
      if (data && data.length > 0) {
        setContents(data as ContentItem[]);
      }
    }

    loadItems();
  }, [user]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim() || !user?.id) return;

    const nextItem = { title: title.trim(), type: type.trim() || "Idea", content: content.trim() };
    const { data } = await saveLibraryItem(user.id, nextItem);

    if (data) {
      setContents((current) => [{ ...nextItem, id: data.id }, ...current]);
      setTitle("");
      setType("");
      setContent("");
    }
  };

  const handleRemove = async (itemId?: string) => {
    if (!user?.id || !itemId) return;
    const { error } = await deleteLibraryItem(user.id, itemId);
    if (!error) {
      setContents((current) => current.filter((item) => item.id !== itemId));
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Biblioteca</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Guarda y organiza tus mejores ideas</h1>
        <p className="mt-3 text-lg leading-8 text-zinc-400">
          Tu archivo inteligente de contenido, listo para reutilizar, editar o publicar.
        </p>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
        <div className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-cyan-300" />
          <h2 className="text-lg font-semibold text-white">Agregar un nuevo bloque</h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Título"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 outline-none"
          />
          <input
            value={type}
            onChange={(event) => setType(event.target.value)}
            placeholder="Tipo (Reel, Copy, IA...)"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 outline-none"
          />
        </div>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Escribe el contenido o el prompt que quieras guardar"
          className="mt-4 min-h-28 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 outline-none"
        />
        <button
          onClick={handleSave}
          className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20"
        >
          Guardar en biblioteca
        </button>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {contents.map((item) => (
          <div key={item.id ?? `${item.title}-${item.type}`} className="relative">
            <button
              onClick={() => handleRemove(item.id)}
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-slate-950/70 p-2 text-zinc-400 transition hover:text-white"
              aria-label={`Eliminar ${item.title}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <ContentCard title={item.title} type={item.type} content={item.content} />
          </div>
        ))}
      </div>
    </div>
  );
}
