import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Eye, Bookmark, Sparkles } from "lucide-react";
import { getBookThematicDetails } from "../utils/bookThematics.jsx";

/**
 * FrontCoverBook.jsx
 * 
 * Renders a book standing upright on the shelf showing its FULL FRONT COVER,
 * perfectly matching the user's reference screenshot:
 * - High quality cover image or elegant crafted clothbound cover
 * - 3D book thickness visible along the right edge
 * - Realistic contact shadow on the wooden shelf
 * - Smooth hover lift effect with quick actions
 */
export default function FrontCoverBook({
  book,
  index = 0,
  onSelectBook,
  onMarkAsRead
}) {
  const [imageError, setImageError] = useState(!book.cover);
  const { spineColor, textColor, foilColor } = getBookThematicDetails(book, index);

  const title = book.title || "Untitled Book";
  const author = book.author || "Unknown Author";
  const isCurrentlyReading = book.status === "currently";
  const isCompleted = book.status === "read";

  return (
    <motion.div
      className="front-cover-book-card"
      whileHover={{
        y: -10,
        scale: 1.03,
        transition: { type: "spring", stiffness: 350, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelectBook(book)}
      title={`"${title}" by ${author} — Click to inspect`}
    >
      <div className="front-cover-3d-wrapper">
        {/* Bookmark Ribbon on top if currently reading */}
        {isCurrentlyReading && (
          <div className="cover-ribbon-tag" title="Currently Reading">
            <span className="ribbon-tail" />
          </div>
        )}

        {/* Read status golden seal if completed */}
        {isCompleted && (
          <div className="cover-read-seal" title="Completed">
            ✓
          </div>
        )}

        {/* The Front Cover Surface */}
        {!imageError && book.cover ? (
          <div className="cover-artwork-surface">
            <img
              src={book.cover}
              alt={title}
              className="cover-img"
              loading="lazy"
              onError={() => setImageError(true)}
            />
            {/* Paper sheen / lighting overlay */}
            <div className="cover-glare-overlay" />
          </div>
        ) : (
          /* Crafted Vintage Hardcover when no external image is provided */
          <div
            className="crafted-hardcover-surface"
            style={{
              backgroundColor: spineColor,
              color: textColor
            }}
          >
            <div className="crafted-cover-border" style={{ borderColor: foilColor }}>
              <div className="crafted-title-wrap">
                <span className="crafted-title" style={{ color: textColor }}>
                  {title}
                </span>
                <span className="crafted-author" style={{ color: textColor }}>
                  {author}
                </span>
              </div>
              <div className="crafted-foil-motif" style={{ color: foilColor }}>
                ✦ ❦ ✦
              </div>
            </div>
            <div className="cover-glare-overlay" />
          </div>
        )}

        {/* 3D Side Pages Edge (Thickness depth) */}
        <div className="book-right-page-block" />

        {/* Contact Shadow on Wooden Shelf */}
        <div className="book-shelf-contact-shadow" />
      </div>

      {/* Quick Hover Controls */}
      <div className="front-book-hover-actions">
        {book.status !== "read" && (
          <button
            type="button"
            className="hover-action-pill read-pill"
            onClick={(e) => {
              e.stopPropagation();
              onMarkAsRead(book);
            }}
            title="Mark as Read"
          >
            <CheckCircle size={11} /> Read
          </button>
        )}
        <button
          type="button"
          className="hover-action-pill view-pill"
          onClick={(e) => {
            e.stopPropagation();
            onSelectBook(book);
          }}
          title="Inspect 3D Hardcover Model"
        >
          <Eye size={11} /> 3D View
        </button>
      </div>
    </motion.div>
  );
}
