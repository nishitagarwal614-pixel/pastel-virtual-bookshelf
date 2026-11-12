import React, { useState } from "react";
import { Plus, BookOpen, Sparkles, Filter, Layers, LayoutGrid } from "lucide-react";
import BookshelfShelf from "./BookshelfShelf";
import FrontCoverBookshelf from "./FrontCoverBookshelf";

/**
 * WoodenBookshelf.jsx
 * 
 * Supports two distinct, breathtaking bookshelf views:
 * 1. Front Cover Display: Exact 1:1 match to reference screenshot with golden oak
 *    shelves, front-facing covers, framed puppy photo, glowing salt lamp, classical bust,
 *    and floating purple layers button.
 * 2. 3D Spines & Stack: Handcrafted wooden bookcase furniture with authentic physical
 *    proportional spines and completed horizontal stack on the last shelf.
 */
export default function WoodenBookshelf({
  books = [],
  activeTheme = "sage-cream",
  festiveAnimationEnabled = true,
  onSelectBook,
  onOpenAdd,
  onMarkAsRead,
  onLoadReferenceBooks
}) {
  const [displayMode, setDisplayMode] = useState("cover"); // 'cover' (matches screenshot) | 'spine'
  const [filter, setFilter] = useState("all"); // 'all' | 'currently' | 'want' | 'read'

  const readBooks = books.filter((b) => b.status === "read");
  const currentlyReading = books.filter((b) => b.status === "currently");
  const wantToRead = books.filter((b) => b.status === "want");

  // Sort read books descending: Newest completed is ALWAYS index 0 (top of stack)
  const sortedReadBooks = [...readBooks].sort((a, b) => {
    const timeA = a.completed ? new Date(a.completed).getTime() : 0;
    const timeB = b.completed ? new Date(b.completed).getTime() : 0;
    return timeB - timeA;
  });

  // Determine books on each of the EXACTLY THREE shelves:
  let shelf1Books = [];
  let shelf2Books = [];
  let shelf3Books = [];
  let shelf3IsStack = true;

  if (filter === "all") {
    // Top Shelf: Want to Read / Wishlist
    shelf1Books = wantToRead.length > 0 ? wantToRead : [];
    // Middle Shelf: Currently Reading
    shelf2Books = currentlyReading.length > 0 ? currentlyReading : [];
    // Bottom Shelf (Last Shelf): Books I Have Read Stack!
    shelf3Books = sortedReadBooks;
    shelf3IsStack = true;

    // If a user has no currently reading books, distribute wishlist between Shelf 1 & 2
    if (shelf2Books.length === 0 && shelf1Books.length > 4) {
      const half = Math.ceil(shelf1Books.length / 2);
      shelf2Books = shelf1Books.slice(half);
      shelf1Books = shelf1Books.slice(0, half);
    }
  } else if (filter === "currently") {
    shelf1Books = [];
    shelf2Books = currentlyReading;
    shelf3Books = [];
    shelf3IsStack = false;
  } else if (filter === "want") {
    // Distribute across shelves 1 and 2
    const half = Math.ceil(wantToRead.length / 2);
    shelf1Books = wantToRead.slice(0, half);
    shelf2Books = wantToRead.slice(half);
    shelf3Books = [];
    shelf3IsStack = false;
  } else if (filter === "read") {
    shelf1Books = [];
    shelf2Books = [];
    shelf3Books = sortedReadBooks;
    shelf3IsStack = true;
  }

  // Render subtle festive decorations along the crown of the bookcase
  const renderFestiveCrownDecorations = () => {
    if (!activeTheme?.startsWith("festive-")) return null;

    if (activeTheme === "festive-diwali") {
      return (
        <div className="festive-bookcase-decorations diwali-crown" aria-hidden="true">
          <span className="diya-glow-left">🪔</span>
          <span className="festive-diwali-garland">✦ ॐ ✦ 🪔 ✦ ॐ ✦</span>
          <span className="diya-glow-right">🪔</span>
        </div>
      );
    }

    if (activeTheme === "festive-christmas") {
      return (
        <div className="festive-bookcase-decorations christmas-crown" aria-hidden="true">
          <div className="pine-garland-drape">
            <span>🌿</span>
            <span className="fairy-light fl-1" />
            <span>✨</span>
            <span className="fairy-light fl-2" />
            <span>🌿</span>
            <span className="fairy-light fl-3" />
            <span>✨</span>
            <span>🌿</span>
          </div>
        </div>
      );
    }

    if (activeTheme === "festive-halloween") {
      return (
        <div className="festive-bookcase-decorations halloween-crown" aria-hidden="true">
          <span>🎃</span>
          <span className="autumn-garland">🍂 ✦ 🍂 ✦ 🍂</span>
          <span>🎃</span>
        </div>
      );
    }

    if (activeTheme === "festive-eid") {
      return (
        <div className="festive-bookcase-decorations eid-crown" aria-hidden="true">
          <span>🏮</span>
          <span className="eid-stars">🌙 ✧ ✦ ✧ 🌙</span>
          <span>🏮</span>
        </div>
      );
    }

    if (activeTheme === "festive-navratri") {
      return (
        <div className="festive-bookcase-decorations navratri-crown" aria-hidden="true">
          <span className="marigold-strand">🏵️ 🌼 🏵️ 🌼 🏵️ 🌼 🏵️</span>
        </div>
      );
    }

    if (activeTheme === "festive-newyear") {
      return (
        <div className="festive-bookcase-decorations newyear-crown" aria-hidden="true">
          <span>⭐</span>
          <span className="ny-lights">✨ ✦ ✨ ✦ ✨</span>
          <span>⭐</span>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="wooden-bookshelf-section" id="virtual-bookshelf">
      {/* Section Header Controls */}
      <div className="bookshelf-header-bar">
        <div className="bookshelf-header-titles">
          <div className="aesthetic-badge">
            <Sparkles size={13} /> SECTION 1 · THREE-SHELF VIRTUAL LIBRARY
          </div>
          <h2>My Wooden Bookshelf</h2>
          <p className="bookshelf-header-sub">
            Three handcrafted wooden shelves with authentic book spines, proportional thickness, and completed stack on the last shelf.
          </p>
        </div>

        <div className="bookshelf-header-actions">
          {/* Sub-filter tabs */}
          <div className="bookshelf-filter-pills">
            <button
              type="button"
              className={`pill-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Shelves ({books.length})
            </button>
            <button
              type="button"
              className={`pill-btn ${filter === "currently" ? "active" : ""}`}
              onClick={() => setFilter("currently")}
            >
              Reading Now ({currentlyReading.length})
            </button>
            <button
              type="button"
              className={`pill-btn ${filter === "want" ? "active" : ""}`}
              onClick={() => setFilter("want")}
            >
              Wishlist ({wantToRead.length})
            </button>
            <button
              type="button"
              className={`pill-btn ${filter === "read" ? "active" : ""}`}
              onClick={() => setFilter("read")}
            >
              Read Stack ({readBooks.length})
            </button>
          </div>

          {/* View Mode Switcher */}
          <div className="bookshelf-view-switcher">
            <button
              type="button"
              className={`view-mode-btn ${displayMode === "cover" ? "active" : ""}`}
              onClick={() => setDisplayMode("cover")}
              title="Front Cover Display (Reference Screenshot)"
            >
              🖼️ Front Covers
            </button>
            <button
              type="button"
              className={`view-mode-btn ${displayMode === "spine" ? "active" : ""}`}
              onClick={() => setDisplayMode("spine")}
              title="3D Spines & Last-Shelf Stack"
            >
              📚 3D Spines
            </button>
          </div>

          <button type="button" className="add-book-to-shelf-btn" onClick={onOpenAdd}>
            <Plus size={16} /> Add Book to Shelf
          </button>
        </div>
      </div>

      {/* RENDER CURRENT VIEW MODE */}
      {displayMode === "cover" ? (
        <FrontCoverBookshelf
          books={books}
          onSelectBook={onSelectBook}
          onOpenAdd={onOpenAdd}
          onMarkAsRead={onMarkAsRead}
          onToggleViewMode={(mode) => setDisplayMode(mode)}
          onLoadReferenceBooks={onLoadReferenceBooks}
        />
      ) : (
        /* Realistic 3-Shelf Wooden Bookcase Furniture */
        <div className="three-shelf-bookcase-furniture">
          {/* Festive Crown Ornaments */}
          {renderFestiveCrownDecorations()}

          {/* Crown Molding Top */}
          <div className="bookcase-crown-molding">
            <div className="crown-upper-lip" />
            <div className="crown-bevel-face">
              <div className="wood-grain-overlay" />
            </div>
            <div className="crown-lower-trim" />
          </div>

          {/* Main Furniture Body (Sides + Backing + 3 Shelves) */}
          <div className="bookcase-cabinet-body">
            {/* Left Wooden Side Gable */}
            <div className="cabinet-side-panel panel-left">
              <div className="panel-inner-edge" />
            </div>

            {/* Wooden Backboard Panel */}
            <div className="cabinet-backboard-panel">
              <div className="backboard-plank-stripes" />
              <div className="ambient-depth-shadow-top" />
              <div className="ambient-depth-shadow-sides" />

              {/* Exactly THREE Horizontal Shelves */}
              <div className="shelves-stack-container">
                {/* Shelf 1: Top Shelf (Wishlist / Up Next) */}
                <BookshelfShelf
                  shelfNumber={1}
                  shelfLabel="Top Shelf · Wishlist &amp; Up Next"
                  books={shelf1Books}
                  isStackMode={false}
                  onSelectBook={onSelectBook}
                  onMarkAsRead={onMarkAsRead}
                />

                {/* Shelf 2: Middle Shelf (Currently Reading with Ribbons) */}
                <BookshelfShelf
                  shelfNumber={2}
                  shelfLabel="Middle Shelf · Currently Reading"
                  books={shelf2Books}
                  isStackMode={false}
                  onSelectBook={onSelectBook}
                  onMarkAsRead={onMarkAsRead}
                />

                {/* Shelf 3: Bottom Shelf / Last Shelf (Completed Reads Stack!) */}
                <BookshelfShelf
                  shelfNumber={3}
                  shelfLabel="Last Shelf · Completed Reads Stack"
                  books={shelf3Books}
                  isStackMode={shelf3IsStack}
                  onSelectBook={onSelectBook}
                  onMarkAsRead={onMarkAsRead}
                />
              </div>
            </div>

            {/* Right Wooden Side Gable */}
            <div className="cabinet-side-panel panel-right">
              <div className="panel-inner-edge" />
            </div>
          </div>

          {/* Base Plinth & Furniture Feet */}
          <div className="bookcase-base-plinth">
            <div className="plinth-front-face">
              <div className="wood-grain-overlay" />
            </div>
            <div className="furniture-foot foot-left" />
            <div className="furniture-foot foot-right" />
            <div className="bookcase-ground-shadow" />
          </div>
        </div>
      )}
    </section>
  );
}
