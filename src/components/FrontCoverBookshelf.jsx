import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Sparkles,
  Eye,
  CheckCircle,
  Sliders,
  Search,
  Compass,
  Layers,
  ChevronRight
} from "lucide-react";
import FrontCoverBook from "./FrontCoverBook";
import {
  FramedPhotoProp,
  HimalayanSaltLampProp,
  ClassicalBustProp,
  VintageFigurineProp
} from "./ShelfDecorations";
import { USER_AUTHENTIC_COLLECTION } from "../data/screenshotBooks";

const MAX_BOOKS_PER_SHELF = 4;

/**
 * FrontCoverBookshelf.jsx
 * 
 * Recreates the exact bookshelf design from the user's reference screenshot:
 * - Deep midnight plum background wall (#191224)
 * - Multi-tier golden oak wooden shelf planks with top bevel highlights
 * - Front-facing books standing upright with real cover artwork & shadows
 * - Dynamic Shelf Allocation: Distributes books across all shelves up to capacity (4 books/shelf),
 *   creating new shelves automatically when full.
 * - Top Shelf Navigation Bar: Quick jump pills for each shelf, "+ Add Shelf" button,
 *   and direct book selector that scrolls and spotlights exactly where each book is placed.
 * - Exact decorative shelf props (Puppy photo, Salt lamp, Classical bust, Figurine).
 */
export default function FrontCoverBookshelf({
  books = [],
  onSelectBook,
  onOpenAdd,
  onMarkAsRead,
  onUpdateShelfPosition
}) {
  const [showProps, setShowProps] = useState(true);
  const [additionalShelves, setAdditionalShelves] = useState(0);
  const [highlightedBookId, setHighlightedBookId] = useState(null);
  const [selectedBookJump, setSelectedBookJump] = useState("");
  const [activeShelfHighlight, setActiveShelfHighlight] = useState(null);

  // If user has no books yet, use the authentic collection
  const effectiveBooks = books.length > 0 ? books : USER_AUTHENTIC_COLLECTION;

  // Determine highest explicit shelf position
  const maxExplicitShelf = effectiveBooks.reduce(
    (max, b) => Math.max(max, Number(b.shelfPosition) || 1),
    1
  );

  // Minimum 4 shelves (matching authentic screenshot), expanding dynamically as books fill
  const minShelvesNeeded = Math.max(
    4,
    maxExplicitShelf,
    Math.ceil(effectiveBooks.length / MAX_BOOKS_PER_SHELF)
  );
  const totalShelvesCount = minShelvesNeeded + additionalShelves;

  // Initialize shelf buckets
  const shelfBuckets = Array.from({ length: totalShelvesCount }, () => []);

  // Step 1: Place books that have an explicit shelfPosition
  const unassignedBooks = [];
  effectiveBooks.forEach((book) => {
    if (book.shelfPosition && Number(book.shelfPosition) >= 1) {
      const targetIdx = Number(book.shelfPosition) - 1;
      while (shelfBuckets.length <= targetIdx) {
        shelfBuckets.push([]);
      }
      shelfBuckets[targetIdx].push(book);
    } else {
      unassignedBooks.push(book);
    }
  });

  // Step 2: Distribute unassigned books to the first shelf that has space (< 4 books)
  unassignedBooks.forEach((book) => {
    let placed = false;
    for (let i = 0; i < shelfBuckets.length; i++) {
      if (shelfBuckets[i].length < MAX_BOOKS_PER_SHELF) {
        shelfBuckets[i].push(book);
        placed = true;
        break;
      }
    }
    // If all current shelves are full, spill into a new shelf tier
    if (!placed) {
      shelfBuckets.push([book]);
    }
  });

  // Smooth scroll and highlight a shelf
  const handleScrollToShelf = (shelfNum) => {
    setActiveShelfHighlight(shelfNum);
    const el = document.getElementById(`shelf-tier-${shelfNum}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setTimeout(() => setActiveShelfHighlight(null), 2400);
  };

  // Direct Book Finder: Scroll and spotlight exactly where the book is placed
  const handleJumpToBook = (bookId) => {
    if (!bookId) return;
    setSelectedBookJump(bookId);
    setHighlightedBookId(bookId);

    const bookEl = document.getElementById(`shelf-book-${bookId}`);
    if (bookEl) {
      bookEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    setTimeout(() => {
      setHighlightedBookId(null);
      setSelectedBookJump("");
    }, 3200);
  };

  // Render authentic shelf props by tier
  const renderPropForTier = (tierIndex) => {
    if (!showProps) return null;
    const tierNum = tierIndex + 1;

    if (tierNum === 1) {
      return (
        <div className="shelf-prop-anchor anchor-left">
          <FramedPhotoProp caption="Fluffy Companion in Gold Frame" />
        </div>
      );
    }
    if (tierNum === 2) {
      return (
        <div className="shelf-prop-anchor anchor-right">
          <HimalayanSaltLampProp />
        </div>
      );
    }
    if (tierNum === 3) {
      return (
        <div className="shelf-prop-anchor anchor-left">
          <ClassicalBustProp />
        </div>
      );
    }
    if (tierNum === 4) {
      return (
        <div className="shelf-prop-anchor anchor-right">
          <VintageFigurineProp />
        </div>
      );
    }
    // Alternating subtle props for additional dynamic shelves (5+)
    if (tierNum % 2 === 1) {
      return (
        <div className="shelf-prop-anchor anchor-left">
          <FramedPhotoProp caption="Timeless Memories" />
        </div>
      );
    }
    return (
      <div className="shelf-prop-anchor anchor-right">
        <HimalayanSaltLampProp />
      </div>
    );
  };

  return (
    <div className="front-cover-bookshelf-container">
      {/* ==============================================================
          SHELF TOP NAVIGATION BAR: DIRECT JUMP & ROW MANAGEMENT
          ============================================================== */}
      <div className="shelf-top-navigation-bar">
        <div className="shelf-nav-left">
          <div className="shelf-nav-label-wrap">
            <Sliders size={13} className="shelf-nav-icon" />
            <span className="shelf-nav-label">Shelf Rows ({shelfBuckets.length}):</span>
          </div>

          <div className="shelf-pills-scroll-track">
            {shelfBuckets.map((bucket, sIdx) => {
              const shelfNum = sIdx + 1;
              const isFull = bucket.length >= MAX_BOOKS_PER_SHELF;
              const isHighlighted = activeShelfHighlight === shelfNum;

              return (
                <button
                  key={`nav_shelf_pill_${shelfNum}`}
                  type="button"
                  className={`shelf-nav-pill ${isHighlighted ? "active-highlight" : ""}`}
                  onClick={() => handleScrollToShelf(shelfNum)}
                  title={`Jump to Shelf ${shelfNum} (${bucket.length}/${MAX_BOOKS_PER_SHELF} books)`}
                >
                  <span className="pill-shelf-title">Shelf {shelfNum}</span>
                  <span className={`pill-shelf-badge ${isFull ? "badge-full" : ""}`}>
                    {bucket.length}/{MAX_BOOKS_PER_SHELF}
                  </span>
                </button>
              );
            })}

            <button
              type="button"
              className="add-new-shelf-pill-btn"
              onClick={() => {
                setAdditionalShelves((prev) => prev + 1);
                setTimeout(() => {
                  handleScrollToShelf(shelfBuckets.length + 1);
                }, 100);
              }}
              title="Add a new wooden shelf tier to your bookcase"
            >
              <Plus size={13} /> Add Shelf
            </button>
          </div>
        </div>

        {/* Right: Direct Book Finder Dropdown */}
        <div className="shelf-nav-right">
          <div className="direct-book-jumper-box">
            <Search size={13} className="jumper-search-icon" />
            <select
              value={selectedBookJump}
              onChange={(e) => handleJumpToBook(e.target.value)}
              className="direct-book-select"
              title="Select a book to jump directly to where it is placed on the shelf"
            >
              <option value="">✦ Find book on shelf...</option>
              {shelfBuckets.flatMap((bucket, sIdx) =>
                bucket.map((b) => (
                  <option key={`jump_opt_${b.id}`} value={b.id}>
                    Shelf {sIdx + 1}: {b.title} by {b.author || "Unknown"}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </div>

      {/* ==============================================================
          MAIN WOODEN SHELVING UNIT
          ============================================================== */}
      <div className="front-cover-shelving-unit">
        {shelfBuckets.map((bucket, sIdx) => {
          const shelfNum = sIdx + 1;
          const isHighlighted = activeShelfHighlight === shelfNum;

          return (
            <div
              key={`shelf_tier_${shelfNum}`}
              className={`front-shelf-tier ${isHighlighted ? "tier-spotlight-active" : ""}`}
              id={`shelf-tier-${shelfNum}`}
            >
              {/* Shelf Tier Header Strip */}
              <div className="shelf-tier-info-header">
                <span className="shelf-tier-title">
                  ✦ Shelf {shelfNum}
                </span>
                <span className="shelf-tier-count">
                  {bucket.length} of {MAX_BOOKS_PER_SHELF} books
                </span>
              </div>

              {/* Books & Props Stage */}
              <div className="front-shelf-stage">
                {/* Prop on this tier */}
                {renderPropForTier(sIdx)}

                {/* Books Row */}
                <div className="front-shelf-books-row">
                  {bucket.map((book, bIdx) => (
                    <FrontCoverBook
                      key={book.id || `s${shelfNum}_${bIdx}`}
                      book={book}
                      index={sIdx * MAX_BOOKS_PER_SHELF + bIdx}
                      onSelectBook={onSelectBook}
                      onMarkAsRead={onMarkAsRead}
                      isHighlighted={book.id === highlightedBookId}
                    />
                  ))}

                  {/* Empty Slot Placeholder if shelf has room */}
                  {bucket.length < MAX_BOOKS_PER_SHELF && (
                    <button
                      type="button"
                      className="empty-shelf-slot-btn"
                      onClick={() => onOpenAdd && onOpenAdd(shelfNum)}
                      title={`Add a new book directly to Shelf ${shelfNum}`}
                    >
                      <Plus size={16} />
                      <span>Add to Shelf {shelfNum}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Wooden Shelf Board with Bevel & Cast Shadow */}
              <div className="golden-oak-shelf-plank">
                <div className="plank-highlight-edge" />
                <div className="plank-wood-face" />
                <div className="plank-cast-shadow" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
