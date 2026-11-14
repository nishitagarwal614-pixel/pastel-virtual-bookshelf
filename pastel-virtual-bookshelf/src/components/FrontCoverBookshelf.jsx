import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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
import { USER_AUTHENTIC_COLLECTION } from "../data/screenshotBooks";

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
 */
export default function FrontCoverBookshelf({
  books = [],
  onSelectBook,
  onOpenAdd,
  onMarkAsRead
}) {
  const [showProps, setShowProps] = useState(true);

  // If user has no books yet, use the authentic collection
  const effectiveBooks = books.length > 0 ? books : USER_AUTHENTIC_COLLECTION;

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
    </div>
  );
}
