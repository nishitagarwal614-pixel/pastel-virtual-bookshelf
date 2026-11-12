import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Sparkles, BookOpen } from "lucide-react";
import { calculateSpineThickness } from "../utils/bookDimensions";
import { getBookThematicDetails, BookThematicIcon } from "../utils/bookThematics.jsx";

/**
 * SpiralJengaStack.jsx
 * 
 * Recreates the exact, photorealistic physical stack of books from Image 2:
 * - Books are stacked HORIZONTALLY (level, resting securely on top of each other)
 * - Natural human staggering offsets (translateX: -16px to +20px)
 * - Subtle 3D perspective yaw (rotateY: -3deg to +4deg, NOT 2D diagonal tilt!)
 * - Real paperback spines with score lines, bold typography, and publisher emblems
 * - Deep ambient occlusion contact shadows between adjacent books
 * - Glossy reflective tabletop at the base with inverted mirror reflection
 * - Tap to inspect notes & 3D model
 */

// Natural horizontal stacking offsets (simulating real hand-stacked books, completely horizontal)
const HORIZONTAL_OFFSETS = [
  { x: 0, yaw: 0 },         // Bottom book: resting squarely on the glass table
  { x: 14, yaw: -1.2 },
  { x: -18, yaw: 1.8 },
  { x: 10, yaw: -1.0 },
  { x: -14, yaw: 1.5 },
  { x: 18, yaw: -2.0 },
  { x: -22, yaw: 2.2 },
  { x: 8, yaw: -1.0 },
  { x: -16, yaw: 1.8 },
  { x: 16, yaw: -2.0 },
  { x: -10, yaw: 1.4 },
  { x: 20, yaw: -2.4 },
  { x: -18, yaw: 2.0 },
  { x: 12, yaw: -1.5 },
  { x: -15, yaw: 2.2 },
  { x: 10, yaw: -1.4 },
  { x: -20, yaw: 2.5 },
  { x: 14, yaw: -1.8 },
  { x: -12, yaw: 1.6 },
  { x: 16, yaw: -2.2 },
  { x: -8, yaw: 1.2 }
];

// Curated 21-book thriller stack matching the user's exact reference photo (Freida McFadden collection)
// Ordered bottom-to-top (index 0 is resting directly on the reflective glass table)
const DEMO_THRILLER_STACK = [
  { id: "th_intruder", title: "THE INTRUDER", author: "FREIDA MCFADDEN", pages: 330, spineColor: "#102347", textColor: "#ff4d6d", foilColor: "#ff758f", icon: "key", genre: "THRILLER" },
  { id: "th_inmate", title: "THE INMATE", author: "FREIDA MCFADDEN", pages: 350, spineColor: "#2a4d53", textColor: "#e0f2f1", foilColor: "#80cbc4", icon: "fingerprint", genre: "THRILLER" },
  { id: "th_locked_door", title: "THE LOCKED DOOR", author: "FREIDA MCFADDEN", pages: 320, spineColor: "#141414", textColor: "#ffffff", foilColor: "#ff5252", icon: "door", genre: "THRILLER" },
  { id: "th_boyfriend", title: "THE BOYFRIEND", author: "FREIDA MCFADDEN", pages: 360, spineColor: "#f5f3ef", textColor: "#b71c1c", foilColor: "#d32f2f", icon: "heart", dark: false, genre: "THRILLER" },
  { id: "th_crash", title: "THE CRASH", author: "FREIDA MCFADDEN", pages: 340, spineColor: "#172738", textColor: "#80d8ff", foilColor: "#40c4ff", icon: "compass", genre: "THRILLER" },
  { id: "th_teacher", title: "THE TEACHER", author: "FREIDA MCFADDEN", pages: 380, spineColor: "#1a1e27", textColor: "#ffffff", foilColor: "#ff4081", icon: "book", genre: "THRILLER" },
  { id: "th_ward_d", title: "WARD D", author: "FREIDA MCFADDEN", pages: 330, spineColor: "#102027", textColor: "#00e5ff", foilColor: "#18ffff", icon: "key", genre: "THRILLER" },
  { id: "th_tenant", title: "THE TENANT", author: "FREIDA MCFADDEN", pages: 310, spineColor: "#932f3e", textColor: "#ffffff", foilColor: "#ffcdd2", icon: "door", genre: "THRILLER" },
  { id: "th_surrogate", title: "THE SURROGATE MOTHER", author: "FREIDA MCFADDEN", pages: 340, spineColor: "#181416", textColor: "#f48fb1", foilColor: "#f06292", icon: "flower", genre: "THRILLER" },
  { id: "th_perfect_son", title: "THE PERFECT SON", author: "FREIDA MCFADDEN", pages: 320, spineColor: "#1e1e1e", textColor: "#ffd54f", foilColor: "#ffe082", icon: "chess", genre: "THRILLER" },
  { id: "th_divorce", title: "THE DIVORCE", author: "FREIDA MCFADDEN", pages: 300, spineColor: "#880e4f", textColor: "#fce4ec", foilColor: "#f48fb1", icon: "heart", genre: "THRILLER" },
  { id: "th_dear_debbie", title: "DEAR DEBBIE", author: "FREIDA MCFADDEN", pages: 290, spineColor: "#1c602b", textColor: "#b9f6ca", foilColor: "#69f0ae", icon: "speech", genre: "THRILLER" },
  { id: "th_brain_damage", title: "BRAIN DAMAGE", author: "FREIDA MCFADDEN", pages: 310, spineColor: "#e6c280", textColor: "#2e1c0c", foilColor: "#4a3219", icon: "chart", dark: false, genre: "THRILLER" },
  { id: "th_secret", title: "WANT TO KNOW A SECRET?", author: "FREIDA MCFADDEN", pages: 320, spineColor: "#a33446", textColor: "#ffffff", foilColor: "#ffcdd2", icon: "key", genre: "THRILLER" },
  { id: "th_coworker", title: "THE COWORKER", author: "FREIDA MCFADDEN", pages: 330, spineColor: "#141414", textColor: "#e53935", foilColor: "#ef5350", icon: "fingerprint", genre: "THRILLER" },
  { id: "th_never_lie", title: "NEVER LIE", author: "FREIDA MCFADDEN", pages: 340, spineColor: "#ffffff", textColor: "#c62828", foilColor: "#b71c1c", icon: "fingerprint", dark: false, genre: "THRILLER" },
  { id: "th_do_not_disturb", title: "DO NOT DISTURB", author: "FREIDA MCFADDEN", pages: 320, spineColor: "#1e1e1e", textColor: "#ffee58", foilColor: "#fff176", icon: "key", genre: "THRILLER" },
  { id: "th_housemaid_watching", title: "THE HOUSEMAID IS WATCHING", author: "FREIDA MCFADDEN", pages: 330, spineColor: "#fafafa", textColor: "#c62828", foilColor: "#b71c1c", icon: "eye", dark: false, genre: "THRILLER" },
  { id: "th_housemaid_secret", title: "THE HOUSEMAID'S SECRET", author: "FREIDA MCFADDEN", pages: 350, spineColor: "#b71c1c", textColor: "#ffd54f", foilColor: "#ffeb3b", icon: "key", genre: "THRILLER" },
  { id: "th_housemaid", title: "THE HOUSEMAID", author: "FREIDA MCFADDEN", pages: 340, spineColor: "#1a4478", textColor: "#ffe082", foilColor: "#ffd54f", icon: "key", genre: "THRILLER" },
  { id: "th_devil_you_know", title: "THE DEVIL YOU KNOW", author: "FREIDA MCFADDEN", pages: 310, spineColor: "#f8f7f5", textColor: "#4a148c", foilColor: "#7b1fa2", icon: "fingerprint", dark: false, genre: "THRILLER" }
];

export default function SpiralJengaStack({
  books = [],
  onSelectBook,
  onOpenAdd,
  isEmbeddedInShelf = false
}) {
  const readBooks = books.filter((b) => b.status === "read");

  // If user has read books, use their books; otherwise show the full atmospheric thriller stack
  const isDemo = readBooks.length === 0;
  const activeBooks = isDemo ? DEMO_THRILLER_STACK : readBooks;

  // Bottom-to-top stacking: Oldest at index 0 (resting on table), Newest at top
  const stackedBooks = isDemo
    ? activeBooks
    : [...activeBooks].sort((a, b) => {
        const timeA = a.completed ? new Date(a.completed).getTime() : 0;
        const timeB = b.completed ? new Date(b.completed).getTime() : 0;
        return timeA - timeB;
      });

  const totalPagesRead = stackedBooks.reduce(
    (sum, b) => sum + (Number(b.pages) || 320),
    0
  );

  return (
    <div className={`real-stack-container ${isEmbeddedInShelf ? "is-shelf-embed" : ""}`}>
      {/* Header Headline */}
      <div className="real-stack-header-box">
        <div className="real-stack-gold-badge">COMPLETED BOOKS</div>
        <h2 className="real-stack-headline">
          <span className="count-num">{stackedBooks.length}</span>
          <span className="count-text">books read</span>
        </h2>
        <p className="real-stack-sub">
          {totalPagesRead.toLocaleString()} pages conquered so far
        </p>

        {isDemo && (
          <div className="demo-stack-note">
            <span>✦ Photorealistic physical stack inspired by your photo. Mark books read to build your own tower!</span>
          </div>
        )}
      </div>

      {/* Main 3D Perspective Stack Stage */}
      <div className="real-stack-viewport-stage">
        {/* Soft Bookstore Background Bokeh / Bookshelves in Background */}
        <div className="bookstore-background-bokeh" />

        {/* The Vertical Column of Physical Books */}
        <div className="real-books-stack-column">
          {stackedBooks.map((book, idx) => {
            const offset = HORIZONTAL_OFFSETS[idx % HORIZONTAL_OFFSETS.length];
            const thickness = calculateSpineThickness(book.pages, true);
            const thematic = getBookThematicDetails(book, idx);

            const spineColor = book.spineColor || thematic.spineColor;
            const textColor = book.textColor || thematic.textColor;
            const foilColor = book.foilColor || thematic.foilColor;
            const icon = book.icon || thematic.icon;

            const title = book.title || "Untitled";
            const author = book.author || "Author";

            // Z-index: Upper books sit in front of lower books
            const zIndex = idx + 10;
            // Base physical width with slight human variation
            const bookWidth = 410 + ((idx * 5) % 25);

            return (
              <motion.div
                key={book.id || `stk_${idx}`}
                className="real-book-stack-item"
                style={{
                  zIndex,
                  width: `${bookWidth}px`,
                  height: `${thickness}px`,
                  transform: `translateX(${offset.x}px) rotateY(${offset.yaw}deg)`,
                  "--book-color": spineColor,
                  "--book-text": textColor,
                  "--book-foil": foilColor
                }}
                whileHover={{
                  scale: 1.03,
                  y: -4,
                  z: 20,
                  transition: { duration: 0.16 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectBook(book)}
                title={`"${title}" by ${author} — Click to inspect`}
              >
                {/* Real Physical Paperback Spine */}
                <div className="real-paperback-spine">
                  {/* Top Edge Crease / Score Line */}
                  <div className="spine-edge-score score-top" />

                  {/* Left Headband / Accent */}
                  <div className="spine-left-block">
                    <span className="spine-accent-pill" style={{ backgroundColor: foilColor }} />
                  </div>

                  {/* Title & Author Typography */}
                  <div className="spine-center-typography">
                    <span className="spine-main-title" style={{ color: textColor }}>
                      {title.toUpperCase()}
                    </span>
                    <div className="spine-author-block">
                      <span className="spine-bestseller-tag">#1 BESTSELLING AUTHOR</span>
                      <span className="spine-author-name" style={{ color: textColor }}>
                        {author.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Right Colophon / Publisher Emblem Box */}
                  <div className="spine-right-emblem">
                    <div className="spine-colophon-box" style={{ borderColor: `${foilColor}80` }}>
                      <BookThematicIcon
                        name={icon}
                        color={foilColor}
                        size={Math.min(16, Math.max(11, thickness - 16))}
                      />
                    </div>
                  </div>

                  {/* Bottom Edge Crease / Score Line */}
                  <div className="spine-edge-score score-bottom" />

                  {/* Realistic Cylindrical Lighting Sheen */}
                  <div className="paperback-lighting-sheen" />

                  {/* Hinge Reading Crease */}
                  <div className="paperback-hinge-groove" />
                </div>

                {/* Ambient Contact Shadow Underneath (Cast onto Book Below) */}
                <div className="real-inter-book-shadow" />
              </motion.div>
            );
          })}
        </div>

        {/* GLOSSY REFLECTIVE GLASS TABLE SURFACE (Exact Match to Image 2) */}
        <div className="glossy-glass-tabletop">
          {/* Glass Horizon Rim Line with Specular Light */}
          <div className="glass-horizon-specular" />

          {/* Mirror Reflection of Bottom Book ("THE INTRUDER") */}
          {stackedBooks.length > 0 && (
            <div className="glass-reflection-viewport">
              <div
                className="reflection-spine-mirror"
                style={{
                  width: "410px",
                  height: `${calculateSpineThickness(stackedBooks[0].pages, true)}px`,
                  backgroundColor: stackedBooks[0].spineColor || getBookThematicDetails(stackedBooks[0], 0).spineColor,
                  color: stackedBooks[0].textColor || getBookThematicDetails(stackedBooks[0], 0).textColor
                }}
              >
                <div className="reflection-inner-content">
                  <span className="reflection-title-text">
                    {(stackedBooks[0].title || "THE INTRUDER").toUpperCase()}
                  </span>
                  <span className="reflection-author-text">
                    {(stackedBooks[0].author || "FREIDA MCFADDEN").toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Deep Dark Table Base */}
          <div className="glass-table-body" />
        </div>
      </div>

      {/* Footer Pill Action Button */}
      <div className="real-stack-footer-bar">
        <button
          type="button"
          className="real-stack-note-btn"
          onClick={() => onSelectBook(stackedBooks[stackedBooks.length - 1])}
        >
          <em>Tap any book in the stack to inspect 3D volume &amp; reading note</em>
        </button>
      </div>
    </div>
  );
}
