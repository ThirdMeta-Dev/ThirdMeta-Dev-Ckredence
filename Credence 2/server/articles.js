import { load } from "cheerio";
import fallback from "../src/articles.json" with { type: "json" };

const homepage = new URL("https://ckredencewealth.com/");
let articles = fallback;
let refreshAfter = 0;
let refreshing;

function sourceUrl(value) {
  if (!value) return null;
  const url = new URL(value, homepage);
  return url.origin === homepage.origin ? url.href : null;
}

async function refresh() {
  const response = await fetch(homepage, { signal: AbortSignal.timeout(4500) });
  if (!response.ok) throw new Error("Article source unavailable");
  const $ = load(await response.text());
  const published = [];
  for (const heading of $('main a[href*="/our-resources/"] h3')) {
    const card = $(heading).closest("a");
    const url = sourceUrl(card.attr("href"));
    const title = $(heading).text().trim();
    const date = card.find("p").last().text().trim();
    const saved = fallback.find((article) => article.url === url);
    const image =
      saved?.image ||
      sourceUrl(card.find('img[alt]:not([alt=""])').attr("src"));
    if (
      !url ||
      !title ||
      !date ||
      !image ||
      published.some((item) => item.url === url)
    )
      continue;
    published.push({ title, url, date, image });
    if (published.length === 4) break;
  }
  if (published.length !== 4)
    throw new Error("Incomplete published article list");
  articles = published;
  refreshAfter = Date.now() + 60 * 60 * 1000;
}

export async function latestArticles(_request, response) {
  if (Date.now() >= refreshAfter) {
    refreshing ??= refresh()
      .catch(() => {
        refreshAfter = Date.now() + 60 * 1000;
      })
      .finally(() => {
        refreshing = undefined;
      });
    await refreshing;
  }
  response.json(articles);
}
