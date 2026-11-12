import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, BookOpen, CheckCircle, Trash2, ArrowUpRight, Bookmark, Sparkles } from "lucide-react";

export default function VirtualBookshelf({
  books,
  activeTheme,
  onSelectBook,
  onOpenAdd,
  onMarkAsRead,
  onDeleteBook,
  festiveAnimationEnabled
}) {
  const [filter, setFilter] = useState("all"); // 'all' | 'currently' | 'want'

  const filteredBooks = books.filter((b) => {
    if (b.status === "read") return false; // Read books live in Section B (Read Stack)
    if (filter === "currently") return b.status === "currently";
    if (filter === "want") return b.status === "want";
    return true;
  });

  // Split books into shelves of up to 7-8 books each so it feels like a real multi-tier library
  const BOOKS_PER_SHELF = 8;
  const shelves = [];
  if (filteredBooks.length === 0) {
    shelves.push([]);
  } else {
    for (let i = 0; i < filteredBooks.length; i += BOOKS_PER_SHELF) {
      shelves.push(filteredBooks.slice(i, i + BOOKS_PER_SHELF));
    }
  }

  // Festival shelf ornament renderer
  const renderFestiveShelfOrnaments = (shelfIndex) => {
    if (!activeTheme?.startsWith("festive-")) return null;

    if (activeTheme === "festive-diwali") {
      return (
        <div className="festive-shelf-decorations diwali-decorations" aria-hidden="true">
          <div className="diya diya-left">
            <span className="diya-clay">🪔</span>
            {festiveAnimationEnabled && <span className="flame-glow" />}
          </div>
          <div className="diwali-rangoli-center">✦ ॐ ✦</div>
          <div className="diya diya-right">
            <span className="diya-clay">🪔</span>
            {festiveAnimationEnabled && <span className="flame-glow" />}
          </div>
        </div>
      );
    }

    if (activeTheme === "festive-christmas") {
      return (
        <div className="festive-shelf-decorations christmas-decorations" aria-hidden="true">
          <div className="pine-garland">
            <span className="garland-sprig">🌿✨</span>
            <span className="fairy-light fl-1" />
            <span className="fairy-light fl-2" />
            <span className="fairy-light fl-3" />
            <span className="fairy-light fl-4" />
            <span className="fairy-light fl-5" />
            <span className="garland-sprig">✨🌿</span>
          </div>
        </div>
      );
    }

    if (activeTheme === "festive-halloween") {
      return (
        <div className="festive-shelf-decorations halloween-decorations" aria-hidden="true">
          <span className="pumpkin-prop left">🎃</span>
          <span className="autumn-leaf">🍂</span>
          <span className="pumpkin-prop right">🎃</span>
        </div>
      );
    }

    if (activeTheme === "festive-eid") {
      return (
        <div className="festive-shelf-decorations eid-decorations" aria-hidden="true">
          <div className="hanging-lantern">
            <span className="lantern-cord" />
            <span className="lantern-body">🏮</span>
            {festiveAnimationEnabled && <span className="lantern-glow" />}
          </div>
          <span className="eid-crescent">🌙 ✧</span>
        </div>
      );
    }

    if (activeTheme === "festive-navratri") {
      return (
        <div className="festive-shelf-decorations navratri-decorations" aria-hidden="true">
          <div className="marigold-garland">
            <span>🌼</span><span>🏵️</span><span>🌼</span><span>🏵️</span><span>🌼</span>
          </div>
        </div>
      );
    }

    if (activeTheme === "festive-newyear") {
      return (
        <div className="festive-shelf-decorations newyear-decorations" aria-hidden="true">
          <div className="champagne-fairy-lights">
            <span className="ny-star">⭐</span>
            <span className="ny-sparkle">✦</span>
            <span className="ny-star">✨</span>
          </div>
        </div>
      );
    }

    if (activeTheme === "festive-holi") {
      return (
        <div className="festive-shelf-decorations holi-decorations" aria-hidden="true">
          <div className="gulal-petals">
            <span className="petal p1">🌸</span>
            <span className="petal p2">🌼</span>
            <span className="petal p3">🌺</span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="virtual-bookshelf-section" id="virtual-bookshelf">
      {/* Section Header */}
      <div className="shelf-header-row">
        <div className="shelf-title-area">
          <div className="aesthetic-badge">
            <Sparkles size={13} /> SECTION A · TO BE READ
          </div>
          <h2>My Virtual Bookshelf</h2>
          <p className="shelf-subtitle">
            Curated stories waiting on your handcrafted wooden shelves. Click any book to open its 3D copy.
          </p>
        </div>

        <div className="shelf-controls">
          {/* Sub-filter tabs */}
          <div className="shelf-pill-filters">
            <button
              type="button"
              className={`filter-pill ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Shelved ({books.filter((b) => b.status !== "read").length})
            </button>
            <button
              type="button"
              className={`filter-pill ${filter === "currently" ? "active" : ""}`}
              onClick={() => setFilter("currently")}
            >
              Reading Now ({books.filter((b) => b.status === "currently").length})
            </button>
            <button
              type="button"
              className={`filter-pill ${filter === "want" ? "active" : ""}`}
              onClick={() => setFilter("want")}
            >
              Wishlist ({books.filter((b) => b.status === "want").length})
            </button>
          </div>

          <button type="button" className="add-shelf-btn" onClick={onOpenAdd}>
            <Plus size={16} /> Add Book to Shelf
          </button>
        </div>
      </div>

      {/* 3D Realistic Bookshelf Case */}
      <div className="bookcase-frame">
        <div className="bookcase-top-crown" />
        <div className="bookcase-side bookcase-left" />
        <div className="bookcase-side bookcase-right" />

        <div className="bookcase-shelves-container">
          {filteredBooks.length === 0 ? (
            <div className="empty-bookshelf-state">
              <div className="empty-shelf-illustration">
                <BookOpen size={42} strokeWidth={1.4} />
              </div>
              <h3>Your Bookshelf Awaits</h3>
              <p>
                There are no stories waiting on this shelf yet. Add books you wish to read to build your dream library!
              </p>
              <button type="button" className="cozy-add-btn" onClick={onOpenAdd}>
                <Plus size={16} /> Place Your First Book
              </button>
              <div className="empty-shelf-plank">
                <div className="wood-trim" />
              </div>
            </div>
          ) : (
            shelves.map((shelfBooks, shelfIdx) => (
              <div key={`shelf-${shelfIdx}`} className="individual-shelf-unit">
                {/* Festival decorations attached along the shelf top */}
                {renderFestiveShelfOrnaments(shelfIdx)}

                {/* Books standing / resting on the shelf */}
                <div className="shelf-books-row">
                  {shelfBooks.map((book, bIdx) => {
                    const isLeaning = bIdx === shelfBooks.length - 1 && shelfBooks.length > 2;
                    const isHorizontalStack = bIdx === 0 && shelfBooks.length >= 6;
                    const isCurrentlyReading = book.status === "currently";

                    // Dynamic height and spine width according to pages
                    const pagesNum = Number(book.pages) || 280;
                    const spineWidth = Math.min(54, Math.max(30, Math.round(pagesNum / 13)));
                    const spineHeight = Math.min(235, Math.max(180, 185 + (bIdx % 4) * 12));

                    return (
                      <motion.div
                        key={book.id}
                        className={`standing-book-wrapper ${isLeaning ? "book-leaning" : ""} ${
                          isHorizontalStack ? "book-horizontal" : ""
                        }`}
                        whileHover={{
                          y: -16,
                          z: 32,
                          scale: 1.05,
                          transition: { type: "spring", stiffness: 350, damping: 20 }
                        }}
                        onClick={() => onSelectBook(book)}
                        style={{
                          "--spine-width": `${spineWidth}px`,
                          "--spine-height": `${spineHeight}px`,
                          "--book-color": book.spineColor || "#7c8f7a"
                        }}
                        title={`Click to open 3D mockup of "${book.title}" by ${book.author}`}
                      >
                        {/* 3D Spine and Book Body */}
                        <div className="book-3d-standing">
                          {/* Bookmark Ribbon Peeking out if Currently Reading */}
                          {isCurrentlyReading && (
                            <div className="bookmark-ribbon" title="Currently Reading">
                              <span className="ribbon-tail" />
                            </div>
                          )}

                          {/* Front cover edge highlight */}
                          <div className="book-cover-hinge" />

                          {/* Main Spine Face */}
                          <div className="book-spine-face">
                            {/* Gold Embossed Spine Headband & Grooves */}
                            <div className="spine-groove spine-groove-top" />
                            <div className="spine-title-container">
                              <span className="spine-text-title">{book.title}</span>
                              <span className="spine-text-author">{book.author}</span>
                            </div>
                            <div className="spine-groove spine-groove-bottom" />
                          </div>

                          {/* Top page edge visibility in 3D */}
                          <div className="book-top-pages" />
                          {/* Side page depth in 3D */}
                          <div className="book-side-pages" />
                        </div>

                        {/* Interactive floating quick-pill on hover */}
                        <div className="book-hover-actions">
                          <button
                            type="button"
                            className="quick-action-pill mark-read"
                            onClick={(e) => {
                              e.stopPropagation();
                              onMarkAsRead(book);
                            }}
                            title="Mark as Read & move to 3D Stack"
                          >
                            <CheckCircle size={13} /> Read
                          </button>
                          <button
                            type="button"
                            className="quick-action-pill inspect-pill"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectBook(book);
                            }}
                            title="View 3D Hardcover Mockup"
                          >
                            <ArrowUpRight size={13} /> View
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* 3D Handcrafted Wooden Plank for this shelf */}
                <div className="wooden-shelf-plank">
                  <div className="plank-top-surface" />
                  <div className="plank-front-face">
                    <div className="wood-grain-overlay" />
                    <div className="brass-shelf-bracket bracket-left" />
                    <div className="brass-shelf-bracket bracket-right" />
                  </div>
                  <div className="plank-under-shadow" />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bookcase-bottom-base" />
      </div>
    </section>
  );
}
