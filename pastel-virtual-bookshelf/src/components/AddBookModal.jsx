import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Search, Plus, Check, BookOpen, AlertCircle, Sparkles } from "lucide-react";
import { searchBooksApi } from "../api";
import { BOOK_SPINE_PALETTES } from "../constants";

export default function AddBookModal({
  existingBooks = [],
  onClose,
  onSaveBook,
  initialBook = null
}) {
  const [mode, setMode] = useState(initialBook ? "manual" : "search"); // 'search' | 'manual'
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all"); // 'all' | 'title' | 'author'
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState("");

  // Form State
  const [form, setForm] = useState(
    initialBook || {
      title: "",
      author: "",
      genre: "Literature",
      year: new Date().getFullYear().toString(),
      pages: 280,
      publisher: "",
      isbn: "",
      cover: "",
      description: "",
      status: "want", // 'want' | 'currently' | 'read'
      rating: 0,
      notes: "",
      started: "",
      completed: "",
      spineColor: BOOK_SPINE_PALETTES[Math.floor(Math.random() * BOOK_SPINE_PALETTES.length)].bg
    }
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setHasSearched(true);
    setDuplicateWarning("");
    try {
      const results = await searchBooksApi(searchQuery, searchType);
      setSearchResults(results);
    } catch {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (selectedBook) => {
    // Check duplicate
    const isDup = existingBooks.some(
      (b) =>
        (!initialBook || b.id !== initialBook.id) &&
        (b.title.trim().toLowerCase() === selectedBook.title.trim().toLowerCase() ||
          (selectedBook.isbn && b.isbn && b.isbn === selectedBook.isbn))
    );

    if (isDup) {
      setDuplicateWarning(
        `"${selectedBook.title}" is already in your library collection! We prevent duplicates to keep your shelves organized.`
      );
      return;
    }

    setForm((prev) => ({
      ...prev,
      title: selectedBook.title,
      author: selectedBook.author,
      year: selectedBook.year,
      pages: selectedBook.pages,
      publisher: selectedBook.publisher,
      isbn: selectedBook.isbn,
      cover: selectedBook.cover,
      genre: selectedBook.genre,
      spineColor: selectedBook.spineColor || prev.spineColor
    }));

    setMode("manual"); // Switch to review & add
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    // Check duplicate if manually typed
    const isDup = existingBooks.some(
      (b) =>
        (!initialBook || b.id !== initialBook.id) &&
        b.title.trim().toLowerCase() === form.title.trim().toLowerCase()
    );

    if (isDup) {
      setDuplicateWarning(
        `"${form.title}" is already in your library! Duplicate additions are prevented.`
      );
      return;
    }

    const finalBook = {
      ...form,
      id: initialBook?.id || "book_" + Math.random().toString(36).substring(2, 9),
      pages: Number(form.pages) || 250,
      rating: Number(form.rating) || 0,
      completed:
        form.status === "read" && !form.completed
          ? new Date().toISOString().slice(0, 10)
          : form.completed
    };

    onSaveBook(finalBook);
    onClose();
  };

  return (
    <div className="modal-backdrop-aesthetic" onClick={onClose}>
      <motion.div
        className="add-book-modal"
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="add-modal-header">
          <div className="aesthetic-badge">
            <Sparkles size={13} /> {initialBook ? "EDIT STORY" : "ENRICH YOUR LIBRARY"}
          </div>
          <h2>{initialBook ? "Edit Book Details" : "Add a New Book"}</h2>
          <p className="modal-subtitle">
            Search Open Library for verified covers and details, or craft your own custom book entry.
          </p>
        </div>

        {/* Tab switch between Search and Manual Entry (if adding new) */}
        {!initialBook && (
          <div className="add-mode-toggle">
            <button
              type="button"
              className={`mode-btn ${mode === "search" ? "active" : ""}`}
              onClick={() => {
                setMode("search");
                setDuplicateWarning("");
              }}
            >
              <Search size={15} /> Search Book Database
            </button>
            <button
              type="button"
              className={`mode-btn ${mode === "manual" ? "active" : ""}`}
              onClick={() => {
                setMode("manual");
                setDuplicateWarning("");
              }}
            >
              <BookOpen size={15} /> Manual & Custom Entry
            </button>
          </div>
        )}

        {duplicateWarning && (
          <div className="duplicate-alert-banner">
            <AlertCircle size={17} />
            <span>{duplicateWarning}</span>
          </div>
        )}

        {/* SEARCH MODE */}
        {mode === "search" && (
          <div className="search-pane-content">
            <form onSubmit={handleSearch} className="search-box-row">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="search-type-select"
              >
                <option value="all">All Fields</option>
                <option value="title">By Title</option>
                <option value="author">By Author</option>
              </select>

              <div className="search-input-field">
                <Search size={16} />
                <input
                  type="text"
                  placeholder={
                    searchType === "title"
                      ? "Search by book title (e.g. Pride and Prejudice)..."
                      : searchType === "author"
                      ? "Search by author name (e.g. Virginia Woolf)..."
                      : "Search by book title or author..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>

              <button type="submit" className="search-go-btn" disabled={isSearching}>
                {isSearching ? "Searching..." : "Search"}
              </button>
            </form>

            {/* Results Grid */}
            <div className="search-results-container">
              {isSearching ? (
                <div className="search-loading-state">
                  <span className="spinner-sparkle">✦</span>
                  <p>Leafing through library archives...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="results-pinterest-grid">
                  {searchResults.map((book) => {
                    const isAlreadyAdded = existingBooks.some(
                      (b) =>
                        b.title.trim().toLowerCase() === book.title.trim().toLowerCase() ||
                        (book.isbn && b.isbn && b.isbn === book.isbn)
                    );

                    return (
                      <div
                        key={book.openLibraryKey || book.title}
                        className={`pinterest-book-card ${isAlreadyAdded ? "already-added" : ""}`}
                      >
                        <div className="card-cover-wrap">
                          {book.cover ? (
                            <img src={book.cover} alt={book.title} loading="lazy" />
                          ) : (
                            <div
                              className="card-cover-fallback"
                              style={{ backgroundColor: book.spineColor }}
                            >
                              <span>{book.title}</span>
                            </div>
                          )}
                        </div>
                        <div className="card-details">
                          <h4 className="card-title" title={book.title}>
                            {book.title}
                          </h4>
                          <p className="card-author">{book.author}</p>
                          <div className="card-sub-info">
                            {book.year && <span>{book.year}</span>}
                            {book.pages && <span>• {book.pages}p</span>}
                          </div>

                          {isAlreadyAdded ? (
                            <span className="already-on-shelf-badge">Already on Shelf ✓</span>
                          ) : (
                            <button
                              type="button"
                              className="select-book-btn"
                              onClick={() => handleSelectSearchResult(book)}
                            >
                              <Plus size={14} /> Select & Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : hasSearched ? (
                <div className="no-search-results">
                  <p>No matching titles found in Open Library.</p>
                  <button
                    type="button"
                    className="switch-manual-link"
                    onClick={() => {
                      setForm((f) => ({ ...f, title: searchQuery }));
                      setMode("manual");
                    }}
                  >
                    Click here to enter this book manually ✦
                  </button>
                </div>
              ) : (
                <div className="search-placeholder-prompt">
                  <p>Type a book title or author above to browse matching editions.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MANUAL / EDIT MODE */}
        {mode === "manual" && (
          <form onSubmit={handleSubmitForm} className="manual-form-grid">
            <div className="form-field">
              <label>Book Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Title of the story"
              />
            </div>

            <div className="form-field">
              <label>Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Author name"
              />
            </div>

            <div className="form-field">
              <label>Genre / Category</label>
              <input
                type="text"
                value={form.genre}
                onChange={(e) => setForm({ ...form, genre: e.target.value })}
                placeholder="e.g. Classic Literature, Mystery, Poetry"
              />
            </div>

            <div className="form-field">
              <label>Reading Status *</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="status-dropdown"
              >
                <option value="want">Want to Read (Goes to Virtual Bookshelf)</option>
                <option value="currently">Currently Reading (Ribbon on Bookshelf)</option>
                <option value="read">Already Read (Goes to 3D Read Stack)</option>
              </select>
            </div>

            <div className="form-field">
              <label>Publication Year</label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                placeholder="e.g. 1925"
              />
            </div>

            <div className="form-field">
              <label>Number of Pages</label>
              <input
                type="number"
                min="1"
                max="5000"
                value={form.pages}
                onChange={(e) => setForm({ ...form, pages: e.target.value })}
                placeholder="e.g. 320"
              />
            </div>

            <div className="form-field">
              <label>Publisher</label>
              <input
                type="text"
                value={form.publisher}
                onChange={(e) => setForm({ ...form, publisher: e.target.value })}
                placeholder="e.g. Penguin Classics"
              />
            </div>

            <div className="form-field">
              <label>ISBN</label>
              <input
                type="text"
                value={form.isbn}
                onChange={(e) => setForm({ ...form, isbn: e.target.value })}
                placeholder="e.g. 9780141439518"
              />
            </div>

            <div className="form-field full-width">
              <label>Cover Image URL (Direct Link)</label>
              <input
                type="url"
                value={form.cover}
                onChange={(e) => setForm({ ...form, cover: e.target.value })}
                placeholder="https://images... (optional, fallback generated if empty)"
              />
            </div>

            <div className="form-field full-width">
              <label>Short Synopsis / Summary</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="A gentle overview of this book's world..."
              />
            </div>

            <div className="form-field">
              <label>Your Rating</label>
              <select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              >
                <option value="0">Not rated yet</option>
                <option value="1">★☆☆☆☆ (1 star)</option>
                <option value="2">★★☆☆☆ (2 stars)</option>
                <option value="3">★★★☆☆ (3 stars)</option>
                <option value="4">★★★★☆ (4 stars)</option>
                <option value="5">★★★★★ (5 stars - Loved it)</option>
              </select>
            </div>

            <div className="form-field">
              <label>Spine Cloth Color</label>
              <div className="spine-color-swatches">
                {BOOK_SPINE_PALETTES.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    className={`swatch-circle ${form.spineColor === p.bg ? "active" : ""}`}
                    style={{ backgroundColor: p.bg }}
                    onClick={() => setForm({ ...form, spineColor: p.bg })}
                    title={p.name}
                  />
                ))}
              </div>
            </div>

            <div className="form-field full-width">
              <label>Personal Reading Notes / Reflections</label>
              <textarea
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Quotes, memorable scenes, reading thoughts..."
              />
            </div>

            <div className="form-modal-footer">
              <button
                type="button"
                className="modal-cancel-btn"
                onClick={() => (initialBook ? onClose() : setMode("search"))}
              >
                {initialBook ? "Cancel" : "← Back to Search"}
              </button>
              <button type="submit" className="modal-submit-btn">
                <Check size={16} /> {initialBook ? "Save Changes" : "Place in My Library"}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
