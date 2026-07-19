import { NextResponse } from "next/server";
import { aiRequestSchema } from "@/lib/validation/schemas";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const validation = aiRequestSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: "Solicitud inválida" },
      { status: 400 }
    );
  }

  const prompt = validation.data.prompt;
  const normalized = prompt.toLowerCase();

  let suggestion = `Actúa como estratega de marketing para una marca deportiva y transforma este objetivo en una propuesta concreta para ${prompt}.`;

  if (normalized.includes("vender") || normalized.includes("venta") || normalized.includes("ventas")) {
    suggestion = `Actúa como estratega de marketing para una marca deportiva y diseña un plan de ventas con hook, CTA, guion y carrusel para convertir más.`;
  }

  if (normalized.includes("lanzar") || normalized.includes("lanzamiento")) {
    suggestion = `Actúa como estratega de marketing para una marca deportiva y crea una campaña de lanzamiento con teaser, storytelling y oferta final.`;
  }

  return NextResponse.json({ ok: true, suggestion });
}
