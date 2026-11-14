import React, { useState } from "react";
import { Plus, BookOpen, Sparkles } from "lucide-react";
import FrontCoverBookshelf from "./FrontCoverBookshelf";
import FestivalDecorations from "./festivals/FestivalDecorations";

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
  onUpdateShelfPosition,
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

  // Active books for the front cover shelf based on filter
  const activeBooks =
    filter === "all"
      ? books
      : filter === "currently"
      ? currentlyReading
      : filter === "want"
      ? wantToRead
      : readBooks;

  // Render subtle festive decorations along the crown of the bookcase
  const renderFestiveCrownDecorations = () => {
    return <FestivalDecorations themeId={activeTheme} enabled={festiveAnimationEnabled} />;
  };

  return (
    <section className="wooden-bookshelf-section" id="virtual-bookshelf">
      {/* Section Header Controls */}
      <div className="bookshelf-header-bar">
        <div className="bookshelf-header-titles">
          <div className="aesthetic-badge">
            <Sparkles size={13} /> VIRTUAL BOOKSHELF
          </div>
          <h2>My Wooden Bookshelf</h2>
          <p className="bookshelf-header-sub">
            Handcrafted golden oak wooden shelves with front-facing book covers, ambient lighting, and cozy reading accessories.
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

          <button type="button" className="add-book-to-shelf-btn" onClick={onOpenAdd}>
            <Plus size={16} /> Add Book to Shelf
          </button>
        </div>
      </div>

      {/* Festive Garland Framing Crown */}
      {renderFestiveCrownDecorations()}

      {/* RENDER CURRENT VIEW MODE (Default: Front Cover Golden Oak Bookshelf) */}
      <FrontCoverBookshelf
        books={activeBooks}
        onSelectBook={onSelectBook}
        onOpenAdd={onOpenAdd}
        onMarkAsRead={onMarkAsRead}
        onUpdateShelfPosition={onUpdateShelfPosition}
      />
    </section>
  );
}
