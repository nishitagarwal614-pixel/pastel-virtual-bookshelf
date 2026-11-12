import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Search, Plus, Check, BookOpen, AlertCircle, Sparkles, Layers } from "lucide-react";
import { searchBooksApi } from "../api";
import { BOOK_SPINE_PALETTES } from "../constants";
import BookSpine from "./BookSpine";
import { calculateSpineThickness } from "../utils/bookDimensions";

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
  const [selectedBookForEditions, setSelectedBookForEditions] = useState(null);

  // Form State
  const [form, setForm] = useState(
    initialBook || {
      title: "",
      author: "",
      genre: "Literature",
      year: new Date().getFullYear().toString(),
      pages: 280,
      format: "Hardcover",
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
    setSelectedBookForEditions(null);
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
    // If the book has multiple editions, allow the user to select the edition
    if (selectedBook.editionsList && selectedBook.editionsList.length > 1) {
      setSelectedBookForEditions(selectedBook);
      return;
    }
    applySelectedBook(selectedBook);
  };

  const applySelectedBook = (selectedBook, chosenEdition = null) => {
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

    const pages = chosenEdition?.pages || selectedBook.pages || 280;
    const year = chosenEdition?.year || selectedBook.year || "";
    const publisher = chosenEdition?.publisher || selectedBook.publisher || "Library Edition";
    const format = chosenEdition?.format || selectedBook.format || "Hardcover";

    setForm((prev) => ({
      ...prev,
      title: selectedBook.title,
      author: selectedBook.author,
      year,
      pages,
      format,
      publisher,
      isbn: selectedBook.isbn,
      cover: selectedBook.cover,
      genre: selectedBook.genre,
      spineColor: selectedBook.spineColor || prev.spineColor
    }));

    setSelectedBookForEditions(null);
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
      pages: Math.max(50, Number(form.pages) || 280),
      rating: Number(form.rating) || 0,
      completed:
        form.status === "read" && !form.completed
          ? new Date().toISOString().slice(0, 10)
          : form.completed
    };

    onSaveBook(finalBook);
    onClose();
  };

  const previewThickness = calculateSpineThickness(form.pages, false);

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
            Search Open Library for verified editions, covers, and real page counts to model accurate book spines.
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
                setSelectedBookForEditions(null);
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
              <BookOpen size={15} /> Manual &amp; Custom Entry
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
                      ? "Search by book title (e.g. The Secret History)..."
                      : searchType === "author"
                      ? "Search by author name (e.g. Donna Tartt)..."
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

            {/* Edition Selection Drawer if triggered */}
            {selectedBookForEditions && (
              <div className="editions-selection-card">
                <div className="editions-header">
                  <h4>Choose Edition for &ldquo;{selectedBookForEditions.title}&rdquo;</h4>
                  <button
                    type="button"
                    className="close-editions-btn"
                    onClick={() => setSelectedBookForEditions(null)}
                  >
                    Cancel
                  </button>
                </div>
                <p className="editions-desc">
                  Different editions have different page counts and bindings, which determines your physical book spine thickness:
                </p>
                <div className="editions-grid">
                  <div
                    className="edition-choice-item"
                    onClick={() => applySelectedBook(selectedBookForEditions)}
                  >
                    <strong>Primary Edition ({selectedBookForEditions.year || "Standard"})</strong>
                    <small>{selectedBookForEditions.pages} pages • {selectedBookForEditions.format || "Hardcover"}</small>
                    <span className="publisher-tag">{selectedBookForEditions.publisher}</span>
                  </div>
                  {selectedBookForEditions.editionsList.map((ed, eIdx) => (
                    <div
                      key={eIdx}
                      className="edition-choice-item"
                      onClick={() => applySelectedBook(selectedBookForEditions, ed)}
                    >
                      <strong>{ed.format} ({ed.year})</strong>
                      <small>{ed.pages} pages</small>
                      <span className="publisher-tag">{ed.publisher}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results Grid */}
            <div className="search-results-container">
              {isSearching ? (
                <div className="search-loading-state">
                  <span className="spinner-sparkle">✦</span>
                  <p>Searching Open Library archives for editions...</p>
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
                            <span>• {book.pages}p</span>
                          </div>

                          {isAlreadyAdded ? (
                            <span className="already-on-shelf-badge">Already on Shelf ✓</span>
                          ) : (
                            <button
                              type="button"
                              className="select-book-btn"
                              onClick={() => handleSelectSearchResult(book)}
                            >
                              <Plus size={14} /> Select &amp; Review
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
                  <p>Type a book title or author above to browse editions with verified page counts and covers.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MANUAL / EDIT MODE */}
        {mode === "manual" && (
          <form onSubmit={handleSubmitForm} className="manual-form-grid">
            {/* Live Spine Preview Sidebar */}
            <div className="spine-live-preview-box">
              <span className="preview-label">Live Spine Preview</span>
              <div className="preview-spine-stage">
                <BookSpine
                  book={form}
                  thickness={previewThickness}
                  height={220}
                  orientation="vertical"
                />
              </div>
              <small className="thickness-indicator">
                {form.pages || 280} pages → {previewThickness}px thickness
              </small>
            </div>

            <div className="manual-inputs-fields">
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
                <label>Number of Pages (Determines Spine Thickness) *</label>
                <input
                  type="number"
                  min="50"
                  max="3500"
                  required
                  value={form.pages}
                  onChange={(e) => setForm({ ...form, pages: e.target.value })}
                  placeholder="e.g. 350"
                />
              </div>

              <div className="form-field">
                <label>Edition Format</label>
                <select
                  value={form.format}
                  onChange={(e) => setForm({ ...form, format: e.target.value })}
                >
                  <option value="Hardcover">Hardcover Edition</option>
                  <option value="Paperback">Paperback Edition</option>
                  <option value="Leatherbound">Deluxe Leatherbound</option>
                </select>
              </div>

              <div className="form-field">
                <label>Genre / Category</label>
                <input
                  type="text"
                  value={form.genre}
                  onChange={(e) => setForm({ ...form, genre: e.target.value })}
                  placeholder="e.g. Classic Literature, Gothic, Mystery"
                />
              </div>

              <div className="form-field">
                <label>Reading Status *</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="status-dropdown"
                >
                  <option value="want">Want to Read (Goes to 3-Shelf Bookshelf)</option>
                  <option value="currently">Currently Reading (Ribbon on Bookshelf)</option>
                  <option value="read">Already Read (Goes to Top of 3D Stack)</option>
                </select>
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
                <label>Publication Year</label>
                <input
                  type="text"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  placeholder="e.g. 1992"
                />
              </div>

              <div className="form-field full-width">
                <label>Cover Image URL (Direct Link)</label>
                <input
                  type="url"
                  value={form.cover}
                  onChange={(e) => setForm({ ...form, cover: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="form-field full-width">
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
                <label>Short Synopsis / Summary</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="A gentle overview of this book's world..."
                />
              </div>
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
