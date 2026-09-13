import type { Author, Category, Province } from "@/db/schema";
import type { Article } from "@/db/schema";

export function AdminArticleForm({
  article,
  authors,
  categories,
  provinces,
}: {
  article?: Article;
  authors: Author[];
  categories: Category[];
  provinces: Province[];
}) {
  return (
    <form action="/api/admin/articles" method="post" className="space-y-4">
      {article ? <input type="hidden" name="_method" value="PATCH" /> : null}
      {article ? <input type="hidden" name="id" value={article.id} /> : null}
      <label className="block text-sm">
        Headline
        <input
          name="title"
          required
          defaultValue={article?.title}
          className="mt-1 w-full border border-white/20 bg-white/5 px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Slug
        <input
          name="slug"
          defaultValue={article?.slug}
          className="mt-1 w-full border border-white/20 bg-white/5 px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Standfirst
        <textarea
          name="excerpt"
          required
          rows={3}
          defaultValue={article?.excerpt}
          className="mt-1 w-full border border-white/20 bg-white/5 px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Body
        <textarea
          name="content"
          required
          rows={12}
          defaultValue={article?.content}
          className="mt-1 w-full border border-white/20 bg-white/5 px-3 py-2"
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          Image URL
          <input
            name="imageUrl"
            defaultValue={article?.imageUrl}
            className="mt-1 w-full border border-white/20 bg-white/5 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Image caption
          <input
            name="imageAlt"
            defaultValue={article?.imageAlt}
            className="mt-1 w-full border border-white/20 bg-white/5 px-3 py-2"
          />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block text-sm">
          Category
          <select
            name="categoryId"
            defaultValue={article?.categoryId}
            className="mt-1 w-full border border-white/20 bg-[#081226] px-3 py-2"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Author
          <select
            name="authorId"
            defaultValue={article?.authorId}
            className="mt-1 w-full border border-white/20 bg-[#081226] px-3 py-2"
          >
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Province
          <select
            name="provinceId"
            defaultValue={article?.provinceId ?? ""}
            className="mt-1 w-full border border-white/20 bg-[#081226] px-3 py-2"
          >
            <option value="">None</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block text-sm">
          Scope
          <select
            name="scope"
            defaultValue={article?.scope ?? "national"}
            className="mt-1 w-full border border-white/20 bg-[#081226] px-3 py-2"
          >
            <option value="national">National</option>
            <option value="provincial">Provincial</option>
            <option value="international">International</option>
          </select>
        </label>
        <label className="block text-sm">
          Minutes
          <input
            name="readingMinutes"
            type="number"
            min={1}
            defaultValue={article?.readingMinutes ?? 4}
            className="mt-1 w-full border border-white/20 bg-white/5 px-3 py-2"
          />
        </label>
        <div className="flex items-end gap-4 pb-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isBreaking" defaultChecked={article?.isBreaking} />
            Breaking
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isFeatured" defaultChecked={article?.isFeatured} />
            Featured
          </label>
        </div>
      </div>
      <button type="submit" className="bg-[#8f1520] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em]">
        {article ? "Save story" : "Publish story"}
      </button>
    </form>
  );
}
