import React from "react";
import { motion } from "framer-motion";
import RealisticBook from "./RealisticBook";
import BookSpine from "./BookSpine";
import { calculateSpineThickness } from "../utils/bookDimensions";

/**
 * BookshelfShelf.jsx
 * 
 * Represents one of the 3 horizontal wooden shelves in the bookcase:
 * - Solid wooden shelf plank with bevel, depth, grain, and brass support pins
 * - Supports both vertical standing books and horizontal stack mode (for read books on the last shelf!)
 * - Vintage brass bookends and ambient shelf props
 */
export default function BookshelfShelf({
  shelfNumber = 1, // 1, 2, or 3
  shelfLabel = "Top Shelf",
  books = [],
  isStackMode = false,
  onSelectBook,
  onMarkAsRead
}) {
  return (
    <div className={`bookcase-shelf-unit shelf-tier-${shelfNumber} ${isStackMode ? "is-stack-shelf" : ""}`}>
      {/* Shelf Header Label / Tier Ribbon */}
      <div className="shelf-tier-indicator">
        <span className="tier-tag">{shelfLabel}</span>
      </div>

      {/* Books on the Shelf Stage */}
      <div className="shelf-books-stage">
        {/* If Horizontal Stack Mode (e.g. for Read Books on the last shelf) */}
        {isStackMode ? (
          books.length > 0 ? (
            <div className="shelf-horizontal-stack-stage">
              <div className="shelf-mini-stack-column">
                {books.map((book, idx) => {
                  const zIndex = books.length - idx;
                  const thickness = calculateSpineThickness(book.pages, true);
                  const total = books.length;
                  const progress = total > 1 ? idx / (total - 1) : 1;
                  const widthPercent = (86 + progress * 14).toFixed(1);
                  // Natural human staggering offsets (simulating real hand-stacked books, completely level)
                  const offsetX = idx === 0 ? 0 : (idx % 2 === 0 ? 1 : -1) * (8 + ((idx * 3) % 12));

                  return (
                    <motion.div
                      key={book.id}
                      className="shelf-stacked-book-volume"
                      style={{
                        zIndex,
                        width: `${widthPercent}%`,
                        maxWidth: "460px",
                        transform: `translateX(${offsetX}px)`
                      }}
                      whileHover={{ scale: 1.03, y: -3, transition: { duration: 0.15 } }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelectBook(book)}
                      title={`"${book.title}" by ${book.author} (Completed)`}
                    >
                      <BookSpine
                        book={book}
                        thickness={thickness}
                        orientation="horizontal"
                        index={idx}
                      />
                      <div className="shelf-inter-book-shadow" />
                    </motion.div>
                  );
                })}
              </div>

              {/* Cozy Shelf Props beside the stack */}
              <div className="shelf-stack-props-aside">
                <span className="shelf-aside-mug" title="Cozy Reading Mug">☕</span>
                <span className="shelf-aside-ivy" title="Trailing Ivy">🪴</span>
              </div>
            </div>
          ) : (
            <div className="shelf-empty-stack-stage">
              <div className="shelf-stack-coaster">
                <span className="coaster-icon">📖</span>
                <div className="coaster-text-wrap">
                  <span className="coaster-title">Completed Books Stack</span>
                  <span className="coaster-subtitle">Books you mark as read will rest here horizontally</span>
                </div>
              </div>
              <div className="shelf-stack-props-aside">
                <span className="shelf-aside-mug" title="Cozy Reading Mug">☕</span>
                <span className="shelf-aside-ivy" title="Trailing Ivy">🪴</span>
              </div>
            </div>
          )
        ) : (
          /* Normal Vertical Standing Mode */
          <>
            {/* Left Vintage Brass Bookend */}
            {books.length > 0 && (
              <div className="vintage-brass-bookend bookend-left" title="Vintage Brass Bookend">
                <span className="bookend-filigree">🏛️</span>
                <div className="bookend-base" />
              </div>
            )}

            {/* Books Array */}
            <div className="shelf-books-array">
              {books.map((book, idx) => {
                const isLast = idx === books.length - 1 && books.length > 1;
                const isMiddleLeaning = idx === 3 && books.length > 5;
                const isLeaning = isLast || isMiddleLeaning;
                const leanDirection = isLast ? "right" : "left";

                return (
                  <RealisticBook
                    key={book.id}
                    book={book}
                    index={idx}
                    isLeaning={isLeaning}
                    leanDirection={leanDirection}
                    onSelectBook={onSelectBook}
                    onMarkAsRead={onMarkAsRead}
                  />
                );
              })}
            </div>

            {/* Right Vintage Brass Bookend or Cozy Prop */}
            {books.length > 0 ? (
              <div className="vintage-brass-bookend bookend-right" title="Vintage Brass Bookend">
                <span className="bookend-filigree">🏛️</span>
                <div className="bookend-base" />
              </div>
            ) : (
              <div className="empty-shelf-prop-group">
                <span className="shelf-prop-plant" title="Small Potted Ivy">🪴</span>
                <span className="shelf-prop-candle" title="Brass Candlestick">🕯️</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Solid Handcrafted Wooden Shelf Board */}
      <div className="solid-wood-shelf-board">
        {/* Top Surface Depth */}
        <div className="shelf-board-top-surface" />

        {/* Front Facing Board with Wood Grain & Brass Pegs */}
        <div className="shelf-board-front-face">
          <div className="brass-shelf-peg peg-left" />
          <div className="shelf-wood-grain-texture" />
          <div className="brass-shelf-peg peg-right" />
        </div>

        {/* Underside Cast Shadow */}
        <div className="shelf-board-underside-shadow" />
      </div>
    </div>
  );
}
