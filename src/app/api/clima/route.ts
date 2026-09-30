// Clima atual em Brasília (Open-Meteo: gratuito, sem chave). O servidor do site consulta e guarda por 15 min,
// então o visitante não fala com terceiros e a página não depende da resposta.
export const revalidate = 900;

const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=-15.7942&longitude=-47.8822&current=temperature_2m,weather_code,is_day&timezone=America%2FSao_Paulo";

export async function GET() {
  try {
    const res = await fetch(URL, { next: { revalidate: 900 } });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const c = data.current;
    return Response.json({ temp: Math.round(c.temperature_2m), code: c.weather_code, isDay: c.is_day === 1, at: c.time });
  } catch {
    return Response.json({ error: true }, { status: 503 });
  }
}
