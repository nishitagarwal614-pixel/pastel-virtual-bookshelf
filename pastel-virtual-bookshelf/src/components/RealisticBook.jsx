import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Eye, Bookmark } from "lucide-react";
import BookSpine from "./BookSpine";
import { calculateSpineThickness, calculateBookHeight } from "../utils/bookDimensions";

/**
 * RealisticBook.jsx
 * 
 * Renders an individual 3D physical book standing on a wooden shelf:
 * - Dynamic spine width based on page count
 * - Dynamic height variation
 * - 3D top paper block & board edges
 * - Bookmark ribbon if Currently Reading
 * - Optional natural leaning angle
 * - 3D lift hover interaction
 */
export default function RealisticBook({
  book,
  isLeaning = false,
  leanDirection = "right", // 'left' | 'right'
  onSelectBook,
  onMarkAsRead
}) {
  const thickness = calculateSpineThickness(book.pages, false);
  const height = calculateBookHeight(book.pages, book.id);
  const isCurrentlyReading = book.status === "currently";

  // Calculate lean rotation
  const leanAngle = isLeaning ? (leanDirection === "right" ? 8 : -8) : 0;
  const leanTranslateY = isLeaning ? 5 : 0;

  return (
    <motion.div
      className={`realistic-book-standing ${isLeaning ? "is-leaning" : ""}`}
      style={{
        "--book-thickness": `${thickness}px`,
        "--book-height": `${height}px`,
        "--lean-angle": `${leanAngle}deg`,
        "--lean-y": `${leanTranslateY}px`
      }}
      whileHover={{
        y: -14,
        z: 32,
        scale: 1.03,
        transition: { type: "spring", stiffness: 350, damping: 22 }
      }}
      onClick={() => onSelectBook(book)}
      title={`"${book.title}" by ${book.author} (${book.pages || 280} pages)`}
    >
      {/* 3D Physical Book Structure */}
      <div className="physical-book-3d-box">
        {/* Bookmark Ribbon (If currently reading) */}
        {isCurrentlyReading && (
          <div className="bookmark-ribbon-tag" title="Currently Reading">
            <span className="ribbon-tail-v" />
          </div>
        )}

        {/* Top Paper Block (visible in 3D perspective) */}
        <div className="book-top-paper-block">
          <div className="paper-deckle-lines" />
        </div>

        {/* Front Board Edge Lip (Overhang) */}
        <div className="front-board-edge-lip" />

        {/* Actual Book Spine */}
        <BookSpine
          book={book}
          thickness={thickness}
          height={height}
          orientation="vertical"
        />

        {/* Back Board Edge Lip (Overhang) */}
        <div className="back-board-edge-lip" />

        {/* Cast shadow directly underneath on the wooden shelf */}
        <div className="book-shelf-shadow" />
      </div>

      {/* Floating Hover Quick Controls */}
      <div className="book-hover-pill-bar">
        <button
          type="button"
          className="hover-action-btn read-btn"
          onClick={(e) => {
            e.stopPropagation();
            onMarkAsRead(book);
          }}
          title="Mark as Read & move to 3D Stack"
        >
          <CheckCircle size={12} /> Read
        </button>
        <button
          type="button"
          className="hover-action-btn view-btn"
          onClick={(e) => {
            e.stopPropagation();
            onSelectBook(book);
          }}
          title="Inspect 3D Hardcover Model"
        >
          <Eye size={12} /> View
        </button>
      </div>
    </motion.div>
  );
}
