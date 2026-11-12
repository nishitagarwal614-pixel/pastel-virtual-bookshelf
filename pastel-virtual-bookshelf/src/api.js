import { BOOK_SPINE_PALETTES } from "./constants";

export async function searchBooksApi(query, searchType = "all") {
  if (!query || !query.trim()) return [];

  const trimmed = query.trim();
  const encoded = encodeURIComponent(trimmed);
  let url = `https://openlibrary.org/search.json?limit=12&`;

  if (searchType === "title") {
    url += `title=${encoded}`;
  } else if (searchType === "author") {
    url += `author=${encoded}`;
  } else {
    url += `q=${encoded}`;
  }

  try {
    const res = await fetch(url, { headers: { "Accept": "application/json" } });
    if (!res.ok) throw new Error("Search service unavailable");
    const data = await res.json();
    const docs = data.docs || [];

    return docs.map((doc, idx) => {
      const title = doc.title || "Untitled Work";
      const author = Array.isArray(doc.author_name)
        ? doc.author_name.slice(0, 2).join(", ")
        : doc.author_name || "Unknown Author";

      const year = doc.first_publish_year ? String(doc.first_publish_year) : "";
      const pages = doc.number_of_pages_median
        ? Number(doc.number_of_pages_median)
        : doc.number_of_pages
        ? Number(doc.number_of_pages)
        : 280;

      const publisher = Array.isArray(doc.publisher)
        ? doc.publisher[0]
        : doc.publisher || "";

      const isbn = Array.isArray(doc.isbn) ? doc.isbn[0] : doc.isbn || "";

      let cover = "";
      if (doc.cover_i) {
        cover = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
      } else if (isbn) {
        cover = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
      }

      const genres = Array.isArray(doc.subject)
        ? doc.subject.slice(0, 3).join(", ")
        : "Literature";

      const spineColor = BOOK_SPINE_PALETTES[idx % BOOK_SPINE_PALETTES.length].bg;

      return {
        id: "book_" + Math.random().toString(36).substring(2, 9),
        title,
        author,
        year,
        pages,
        publisher,
        isbn,
        cover,
        genre: genres,
        description: "", // Keep empty if no genuine verified synopsis was returned
        spineColor,
        openLibraryKey: doc.key || ""
      };
    });
  } catch (err) {
    console.warn("Open Library search error:", err);
    return [];
  }
}
