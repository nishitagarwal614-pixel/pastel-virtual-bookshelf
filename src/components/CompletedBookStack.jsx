import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Sparkles, Layers } from "lucide-react";
import SpiralJengaStack from "./SpiralJengaStack";
import BookSpine from "./BookSpine";
import { calculateSpineThickness } from "../utils/bookDimensions";

/**
 * CompletedBookStack.jsx
 * 
 * Displays completed read books with two authentic presentation styles:
 * 1. Spiral Jenga Tower (Default - exact 1:1 match to the user's uploaded Image 2):
 *    - Alternating angled rotations (-11deg to +10deg)
 *    - Exposed side paper blocks with deckle paper lines
 *    - Glossy reflective glass table with bottom book mirror reflection
 * 2. Classic Tapered Stack (Earlier reference):
 *    - Rounded pill spines with thematic foil glyphs
 */
export default function CompletedBookStack({
  books = [],
  onSelectBook,
  onOpenAdd,
  isEmbeddedInShelf = false
}) {
  const [stackStyle, setStackStyle] = useState("jenga"); // 'jenga' (Image 2) | 'classic'

  // Filter read books
  const readBooks = books.filter((b) => b.status === "read");

  // Sort by completed date descending for classic stack
  const sortedStack = [...readBooks].sort((a, b) => {
    const timeA = a.completed ? new Date(a.completed).getTime() : 0;
    const timeB = b.completed ? new Date(b.completed).getTime() : 0;
    return timeB - timeA;
  });

  const totalPagesRead = sortedStack.reduce(
    (sum, b) => sum + (Number(b.pages) || 280),
    0
  );

  return (
    <section className={`reference-completed-stack-section ${isEmbeddedInShelf ? "embedded-shelf-mode" : ""}`} id="read-books-stack">
      {/* Top Stack Style Toggle */}
      <div className="stack-style-toggle-bar">
        <button
          type="button"
          className={`style-pill-btn ${stackStyle === "jenga" ? "active" : ""}`}
          onClick={() => setStackStyle("jenga")}
          title="Physical Paperback Tower on Reflective Glass Table (Exact Match to Reference Photo)"
        >
          📚 Physical Paperback Tower
        </button>
        <button
          type="button"
          className={`style-pill-btn ${stackStyle === "classic" ? "active" : ""}`}
          onClick={() => setStackStyle("classic")}
          title="Classic Tapered Stack"
        >
          📖 Classic Tapered
        </button>
      </div>

      {stackStyle === "jenga" ? (
        /* Image 2: Alternating-angle spiral jenga stack with glass reflection */
        <SpiralJengaStack
          books={books}
          onSelectBook={onSelectBook}
          onOpenAdd={onOpenAdd}
          isEmbeddedInShelf={isEmbeddedInShelf}
        />
      ) : (
        /* Classic Stack */
        <>
          {/* Reference Header */}
          <div className="reference-stack-header">
            <div className="golden-read-badge">READ</div>
            <div className="read-count-headline">
              <span className="count-number">{readBooks.length}</span>
              <span className="count-phrase">books read</span>
            </div>
            <div className="pages-count-subtitle">
              {totalPagesRead.toLocaleString()} pages so far
            </div>
          </div>

          {/* Main Stack Container */}
          <div className="reference-stack-viewport">
            {sortedStack.length === 0 ? (
              <div className="empty-reference-stack">
                <div className="empty-stack-icon-ring">☕</div>
                <h3>No Completed Books Yet</h3>
                <p>
                  When you finish reading a story from your shelves, mark it as read. It will gracefully take its place at the top of your stack.
                </p>
                <button type="button" className="reference-add-btn" onClick={onOpenAdd}>
                  <Plus size={15} /> Add a Book You've Read
                </button>
              </div>
            ) : (
              <div className="reference-books-pile">
                {sortedStack.map((book, idx) => {
                  const zIndex = sortedStack.length - idx;
                  const thickness = calculateSpineThickness(book.pages, true);
                  const total = sortedStack.length;
                  const progress = total > 1 ? idx / (total - 1) : 1;
                  const widthPercent = (84 + progress * 16).toFixed(1);

                  return (
                    <motion.div
                      key={book.id}
                      className="reference-stacked-book-item"
                      style={{
                        zIndex,
                        width: `${widthPercent}%`,
                        maxWidth: "520px"
                      }}
                      whileHover={{
                        scale: 1.025,
                        y: -4,
                        transition: { duration: 0.18 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelectBook(book)}
                      title={`"${book.title}" by ${book.author} — Tap to view note`}
                    >
                      <BookSpine
                        book={book}
                        thickness={thickness}
                        orientation="horizontal"
                        index={idx}
                      />
                      <div className="reference-inter-book-shadow" />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Reference Footer Button */}
          {sortedStack.length > 0 && (
            <div className="reference-stack-footer">
              <button
                type="button"
                className="tap-note-pill-button"
                onClick={() => onSelectBook(sortedStack[0])}
              >
                <em>Tap one to read your note</em>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
