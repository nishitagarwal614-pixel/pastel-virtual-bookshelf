import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Plus,
  Sparkles,
  Eye,
  CheckCircle,
  Image as ImageIcon,
  RotateCcw,
  Sliders,
  X
} from "lucide-react";
import FrontCoverBook from "./FrontCoverBook";
import {
  FramedPhotoProp,
  HimalayanSaltLampProp,
  ClassicalBustProp,
  VintageFigurineProp
} from "./ShelfDecorations";
import { SCREENSHOT_REFERENCE_BOOKS } from "../data/screenshotBooks";

/**
 * FrontCoverBookshelf.jsx
 * 
 * Recreates the exact bookshelf design from the user's reference screenshot:
 * - Deep midnight plum background wall (#191224)
 * - Multi-tier golden oak wooden shelf planks with top bevel highlights
 * - Front-facing books standing upright with real cover artwork & shadows
 * - Exact decorative shelf props:
 *   1. Shelf 1 Left: Vintage golden-framed puppy photo
 *   2. Shelf 2 Right: Glowing Himalayan amber salt crystal lamp
 *   3. Shelf 3 Left: Classical Roman/Greek museum sculpture bust
 *   4. Shelf 4 Right: Vintage collector figurine
 * - Floating circular purple layers button (matching the screenshot's bottom-right button)
 */
export default function FrontCoverBookshelf({
  books = [],
  onSelectBook,
  onOpenAdd,
  onMarkAsRead,
  onToggleViewMode,
  onLoadReferenceBooks
}) {
  const [showProps, setShowProps] = useState(true);
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // If user has no books yet, use the screenshot reference books so the shelf is instantly alive!
  const effectiveBooks = books.length > 0 ? books : SCREENSHOT_REFERENCE_BOOKS;
  const isUsingPreviewBooks = books.length === 0;

  // Distribute books across 4 horizontal shelves
  const shelfCount = 4;
  const shelfBooks = [[], [], [], []];

  effectiveBooks.forEach((book, idx) => {
    // If book has explicit shelfPosition, respect it; otherwise distribute evenly
    const targetShelf = book.shelfPosition ? book.shelfPosition - 1 : idx % shelfCount;
    shelfBooks[Math.min(shelfCount - 1, Math.max(0, targetShelf))].push(book);
  });

  return (
    <div className="front-cover-bookshelf-container">
      {/* Banner if previewing reference books */}
      {isUsingPreviewBooks && (
        <div className="reference-preview-banner">
          <div className="banner-left">
            <Sparkles size={14} className="banner-sparkle" />
            <span>Showing reference collection. Click to add these books permanently to your library:</span>
          </div>
          <button
            type="button"
            className="load-ref-action-btn"
            onClick={onLoadReferenceBooks}
          >
            Save Reference Books to Library
          </button>
        </div>
      )}

      {/* Main Wooden Shelving Unit */}
      <div className="front-cover-shelving-unit">
        {/* SHELF 1 (Top Shelf) */}
        <div className="front-shelf-tier" id="shelf-tier-1">
          <div className="front-shelf-stage">
            {/* Shelf 1 Left Prop: Framed Puppy Photo */}
            {showProps && (
              <div className="shelf-prop-anchor anchor-left">
                <FramedPhotoProp caption="Fluffy Companion in Gold Frame" />
              </div>
            )}

            {/* Shelf 1 Books */}
            <div className="front-shelf-books-row">
              {shelfBooks[0].map((book, idx) => (
                <FrontCoverBook
                  key={book.id || `s1_${idx}`}
                  book={book}
                  index={idx}
                  onSelectBook={onSelectBook}
                  onMarkAsRead={onMarkAsRead}
                />
              ))}
            </div>
          </div>

          {/* Wooden Shelf Board */}
          <div className="golden-oak-shelf-plank">
            <div className="plank-highlight-edge" />
            <div className="plank-wood-face" />
            <div className="plank-cast-shadow" />
          </div>
        </div>

        {/* SHELF 2 */}
        <div className="front-shelf-tier" id="shelf-tier-2">
          <div className="front-shelf-stage">
            {/* Shelf 2 Books */}
            <div className="front-shelf-books-row">
              {shelfBooks[1].map((book, idx) => (
                <FrontCoverBook
                  key={book.id || `s2_${idx}`}
                  book={book}
                  index={idx + 4}
                  onSelectBook={onSelectBook}
                  onMarkAsRead={onMarkAsRead}
                />
              ))}
            </div>

            {/* Shelf 2 Right Prop: Glowing Himalayan Salt Lamp */}
            {showProps && (
              <div className="shelf-prop-anchor anchor-right">
                <HimalayanSaltLampProp />
              </div>
            )}
          </div>

          {/* Wooden Shelf Board */}
          <div className="golden-oak-shelf-plank">
            <div className="plank-highlight-edge" />
            <div className="plank-wood-face" />
            <div className="plank-cast-shadow" />
          </div>
        </div>

        {/* SHELF 3 */}
        <div className="front-shelf-tier" id="shelf-tier-3">
          <div className="front-shelf-stage">
            {/* Shelf 3 Left Prop: Classical Antiquities Bust */}
            {showProps && (
              <div className="shelf-prop-anchor anchor-left">
                <ClassicalBustProp />
              </div>
            )}

            {/* Shelf 3 Books */}
            <div className="front-shelf-books-row">
              {shelfBooks[2].map((book, idx) => (
                <FrontCoverBook
                  key={book.id || `s3_${idx}`}
                  book={book}
                  index={idx + 8}
                  onSelectBook={onSelectBook}
                  onMarkAsRead={onMarkAsRead}
                />
              ))}
            </div>
          </div>

          {/* Wooden Shelf Board */}
          <div className="golden-oak-shelf-plank">
            <div className="plank-highlight-edge" />
            <div className="plank-wood-face" />
            <div className="plank-cast-shadow" />
          </div>
        </div>

        {/* SHELF 4 (Bottom Shelf) */}
        <div className="front-shelf-tier" id="shelf-tier-4">
          <div className="front-shelf-stage">
            {/* Shelf 4 Books */}
            <div className="front-shelf-books-row">
              {shelfBooks[3].map((book, idx) => (
                <FrontCoverBook
                  key={book.id || `s4_${idx}`}
                  book={book}
                  index={idx + 12}
                  onSelectBook={onSelectBook}
                  onMarkAsRead={onMarkAsRead}
                />
              ))}
            </div>

            {/* Shelf 4 Right Prop: Vintage Figurine / Gentleman Bust */}
            {showProps && (
              <div className="shelf-prop-anchor anchor-right">
                <VintageFigurineProp />
              </div>
            )}
          </div>

          {/* Wooden Shelf Board */}
          <div className="golden-oak-shelf-plank">
            <div className="plank-highlight-edge" />
            <div className="plank-wood-face" />
            <div className="plank-cast-shadow" />
          </div>
        </div>
      </div>

      {/* Floating Purple Layers Action Button (Exact match to screenshot bottom-right button) */}
      <div className="screenshot-floating-layers-anchor">
        <AnimatePresence>
          {showLayerMenu && (
            <motion.div
              className="floating-layers-popover"
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
            >
              <div className="popover-header">
                <span className="popover-title">Shelf Display &amp; Layers</span>
                <button
                  type="button"
                  className="popover-close-btn"
                  onClick={() => setShowLayerMenu(false)}
                >
                  <X size={14} />
                </button>
              </div>

              <div className="popover-actions-list">
                <button
                  type="button"
                  className="popover-item active"
                  onClick={() => {
                    // Already in cover mode
                    setShowLayerMenu(false);
                  }}
                >
                  <div className="item-icon-wrap">🖼️</div>
                  <div className="item-text">
                    <span className="item-heading">Front Cover Display</span>
                    <span className="item-desc">Matching your reference screenshot</span>
                  </div>
                </button>

                <button
                  type="button"
                  className="popover-item"
                  onClick={() => {
                    onToggleViewMode("spine");
                    setShowLayerMenu(false);
                  }}
                >
                  <div className="item-icon-wrap">📚</div>
                  <div className="item-text">
                    <span className="item-heading">3D Spines &amp; Stack</span>
                    <span className="item-desc">Wooden bookcase with spines &amp; stack</span>
                  </div>
                </button>

                <div className="popover-divider" />

                <button
                  type="button"
                  className="popover-item"
                  onClick={() => setShowProps(!showProps)}
                >
                  <div className="item-icon-wrap">🪴</div>
                  <div className="item-text">
                    <span className="item-heading">Shelf Decorations</span>
                    <span className="item-desc">{showProps ? "Currently Visible (Click to hide)" : "Currently Hidden (Click to show)"}</span>
                  </div>
                </button>

                <button
                  type="button"
                  className="popover-item"
                  onClick={() => {
                    onLoadReferenceBooks?.();
                    setShowLayerMenu(false);
                  }}
                >
                  <div className="item-icon-wrap">✨</div>
                  <div className="item-text">
                    <span className="item-heading">Load Screenshot Books</span>
                    <span className="item-desc">Populate all 12 books from screenshot</span>
                  </div>
                </button>

                <button
                  type="button"
                  className="popover-item"
                  onClick={() => {
                    onOpenAdd();
                    setShowLayerMenu(false);
                  }}
                >
                  <div className="item-icon-wrap">➕</div>
                  <div className="item-text">
                    <span className="item-heading">Add New Book</span>
                    <span className="item-desc">Search and place on shelf</span>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circular Floating Purple Button */}
        <motion.button
          type="button"
          className="purple-circular-layers-btn"
          whileHover={{ scale: 1.1, rotate: 6 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setShowLayerMenu(!showLayerMenu)}
          title="Shelf Layers & Display Options"
          aria-label="Shelf Layers & Display Options"
        >
          <Layers size={24} color="#ffffff" strokeWidth={2.2} />
        </motion.button>
      </div>
    </div>
  );
}
