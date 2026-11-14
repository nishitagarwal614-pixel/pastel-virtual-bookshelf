import React from "react";
import { motion } from "framer-motion";
import { BookCheck, Sparkles, Layers, Star, Plus, Coffee } from "lucide-react";
import { getOriginalBookPages } from "../data/verifiedBookPages";

export default function BookStack({ books, onSelectBook, onOpenAdd }) {
  // Filter read books:
  const readBooks = books.filter((b) => b.status === "read");

  // Newest completed book must always appear at the VERY TOP of the stack!
  // Sort by completed date descending or reverse insertion order
  const sortedStack = [...readBooks].sort((a, b) => {
    const dateA = a.completed ? new Date(a.completed).getTime() : 0;
    const dateB = b.completed ? new Date(b.completed).getTime() : 0;
    return dateB - dateA; // Newest first
  });

  // Calculate total pages in stack
  const totalPagesInStack = sortedStack.reduce((acc, b) => acc + (Number(b.pages) || 260), 0);

  return (
    <section className="read-stack-section" id="read-books-stack">
      {/* Section Header */}
      <div className="stack-header-row">
        <div className="stack-title-area">
          <div className="aesthetic-badge">
            <Sparkles size={13} /> SECTION B · COMPLETED TALES
          </div>
          <h2>My Read Books Collection</h2>
          <p className="stack-subtitle">
            Every story you finish is lovingly stacked here. The newest completed book rests proudly on top.
          </p>
        </div>

        {readBooks.length > 0 && (
          <div className="stack-stats-pill">
            <span className="pill-item">
              <Layers size={14} /> <strong>{readBooks.length}</strong> stories stacked
            </span>
            <span className="pill-divider">•</span>
            <span className="pill-item">
              📖 approx. <strong>{totalPagesInStack.toLocaleString()}</strong> pages traveled
            </span>
          </div>
        )}
      </div>

      {/* Main 3D Book Stack Scene */}
      <div className="stack-scene-stage">
        {sortedStack.length === 0 ? (
          <div className="empty-stack-card">
            <div className="empty-stack-art">
              <span className="empty-mug">☕</span>
              <span className="empty-sparkle">✧</span>
            </div>
            <h3>No Finished Stories Yet</h3>
            <p>
              When you finish reading a story from your virtual bookshelf, mark it as read. It will gracefully rise to the top of your 3D stack of achievements.
            </p>
            <button type="button" className="cozy-add-btn" onClick={onOpenAdd}>
              <Plus size={16} /> Add a Story You've Finished
            </button>
          </div>
        ) : (
          <div className="stack-display-wrap">
            {/* The Physical 3D Books Stack */}
            <div className="realistic-book-pile">
              {sortedStack.map((book, idx) => {
                // idx = 0 is the NEWEST (top of stack)
                // total - 1 - idx gives layering from bottom to top
                const stackHeightIndex = sortedStack.length - 1 - idx;
                // Organic tilt angle mimicking a Pinterest photographed stack
                const tiltAngle = ((idx % 2 === 0 ? 1 : -1) * ((idx % 4) * 0.9 + 0.6)).toFixed(1);
                const shiftX = ((idx % 3 - 1) * 7).toFixed(1);

                // Book thickness based on verified pages
                const pagesNum = getOriginalBookPages(book.title, book.author, book.pages);
                const bookThickness = Math.min(50, Math.max(34, Math.round(pagesNum / 12)));

                return (
                  <motion.div
                    key={book.id}
                    className="stacked-volume"
                    style={{
                      zIndex: sortedStack.length - idx, // Top book has highest z-index
                      "--book-height": `${bookThickness}px`,
                      "--book-color": book.spineColor || "#889b85",
                      "--stack-tilt": `${tiltAngle}deg`,
                      "--stack-shift": `${shiftX}px`
                    }}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    onClick={() => onSelectBook(book)}
                    title={`"${book.title}" by ${book.author} (Completed ${book.completed || "recently"})`}
                  >
                    {/* Realistic 3D Hardcover Book Slab */}
                    <div className="slab-book-body">
                      {/* Hardcover Top Board Lip */}
                      <div className="slab-hardcover-top" />

                      {/* Main Spine / Front Exposed Edge */}
                      <div className="slab-exposed-edge">
                        {/* Realistic Cover Hinge Stripe */}
                        <div className="slab-hinge" />

                        {/* Spine Details */}
                        <div className="slab-content">
                          <div className="slab-title-group">
                            <span className="slab-title">{book.title}</span>
                            <span className="slab-author">— {book.author}</span>
                          </div>
                          {book.rating > 0 && (
                            <div className="slab-rating-badge">
                              <Star size={12} fill="#d4af37" color="#d4af37" />
                              <span>{book.rating}</span>
                            </div>
                          )}
                        </div>

                        {/* Page edges block showing paper lines */}
                        <div className="slab-paper-edges" />
                      </div>

                      {/* Hardcover Bottom Board Lip */}
                      <div className="slab-hardcover-bottom" />

                      {/* Drop shadow onto the volume below */}
                      <div className="slab-under-shadow" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Aesthetic Tabletop / Desk Platform */}
            <div className="stack-tabletop-pedestal">
              <div className="tabletop-surface">
                {/* Decorative Pinterest Accents on the Table */}
                <div className="table-prop ceramic-mug" title="Cozy warm cup of tea">
                  <span className="mug-art">☕</span>
                  <span className="mug-steam" />
                </div>
                <div className="table-prop dried-lavender" title="Dried botanical sprig">
                  <span>🌾</span>
                </div>
                <div className="table-prop reading-glasses" title="Reading spectacles">
                  <span>👓</span>
                </div>
                <div className="table-wood-grain" />
              </div>
              <div className="tabletop-bevel" />
              <div className="tabletop-shadow" />
            </div>

            <div className="stack-footer-caption">
              <span>✦</span> A growing tower of completed chapters and memories <span>✦</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
