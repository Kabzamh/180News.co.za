import { splitParagraphs } from "@/lib/utils";

export function summarizeArticle(title: string, content: string) {
  const paragraphs = splitParagraphs(content);
  const bullets = paragraphs
    .slice(0, 6)
    .map((paragraph) => {
      const sentence = paragraph.split(/(?<=[.?!])\s+/)[0]?.trim() ?? paragraph.trim();
      return sentence.length > 220 ? `${sentence.slice(0, 217)}…` : sentence;
    })
    .filter((line, index, list) => line.length > 40 && list.indexOf(line) === index)
    .slice(0, 4);

  if (bullets.length === 0) {
    return [`${title} — full briefing available to subscribers.`];
  }
  return bullets;
}

export function speechScript(title: string, author: string, paragraphs: string[]) {
  return `${title}. Reported by ${author}. ${paragraphs.join(" ")}`;
}
