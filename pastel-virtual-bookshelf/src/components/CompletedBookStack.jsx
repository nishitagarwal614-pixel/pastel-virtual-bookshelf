import React from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { getOriginalBookPages } from "../data/verifiedBookPages.js";

/**
 * CompletedBookStack.jsx
 * 
 * Physically authentic, vibrant paperback book stack:
 * - Natural authentic book trim widths (books can be stacked in ANY order,
 *   NOT forced into a continuous shortest-to-longest pyramid)
 * - Highly vibrant, rich jewel-toned color palette
 * - Dynamic spine thickness calibrated directly to real verified page counts
 * - Clean title & author layout with guaranteed zero overlap
 * - Cylindrical 3D lighting sheen & foil embossing
 * - Golden oak wooden shelf plank below the stack
 */

export const VIBRANT_READ_STACK_BOOKS = [
  {
    id: "stack_subtle_art",
    title: "THE SUBTLE ART OF NOT GIVING A F*CK",
    fullTitle: "The Subtle Art of Not Giving a F*ck",
    author: "MARK MANSON",
    pages: 224,
    thickness: 28,
    widthPercent: 96,
    maxWidth: 390,
    bgColor: "#047857", // Jewel Emerald Green
    accentBarColor: "#fde047",
    titleColor: "#fef08a",
    authorColor: "#fef9c3",
    bestsellerColor: "#fde047",
    iconColor: "#fde047",
    iconBoxBorder: "rgba(253, 224, 71, 0.7)",
    icon: "key",
    notes: "A counterintuitive approach to living a good life."
  },
  {
    id: "stack_too_good",
    title: "TOO GOOD TO BE TRUE",
    fullTitle: "Too Good To Be True",
    author: "PRAJAKTA KOLI",
    pages: 240,
    thickness: 30,
    widthPercent: 95,
    maxWidth: 385,
    bgColor: "#e11d48", // Rose Ruby
    accentBarColor: "#fecdd3",
    titleColor: "#ffffff",
    authorColor: "#ffe4e6",
    bestsellerColor: "#fecdd3",
    iconColor: "#fecdd3",
    iconBoxBorder: "rgba(254, 205, 211, 0.7)",
    icon: "heart",
    notes: "A tender, heartfelt romance exploring love and second chances."
  },
  {
    id: "stack_housemaid",
    title: "THE HOUSEMAID",
    fullTitle: "The Housemaid",
    author: "FREIDA MCFADDEN",
    pages: 336,
    thickness: 38,
    widthPercent: 97,
    maxWidth: 395,
    bgColor: "#d97706", // Amber / Warm Honey Gold
    accentBarColor: "#ffffff",
    titleColor: "#ffffff",
    authorColor: "#fef3c7",
    bestsellerColor: "#fef08a",
    iconColor: "#fef3c7",
    iconBoxBorder: "rgba(254, 243, 199, 0.75)",
    icon: "bird",
    notes: "A thrilling, addictive masterpiece. Millie's journey with the Winchesters is unforgettable."
  },
  {
    id: "stack_dont_love_you",
    title: "I DON'T LOVE YOU ANYMORE",
    fullTitle: "I Don't Love You Anymore",
    author: "RITHVIK SINGH",
    pages: 220,
    thickness: 26,
    widthPercent: 94,
    maxWidth: 380,
    bgColor: "#ea580c", // Fiery Sunset Coral
    accentBarColor: "#ffedd5",
    titleColor: "#ffffff",
    authorColor: "#ffedd5",
    bestsellerColor: "#fed7aa",
    iconColor: "#fed7aa",
    iconBoxBorder: "rgba(254, 215, 170, 0.75)",
    icon: "book",
    notes: "Moving words on letting go of people who could not love you the way you needed."
  },
  {
    id: "stack_warmth",
    title: "WARMTH",
    fullTitle: "Warmth",
    author: "RITHVIK SINGH",
    pages: 208,
    thickness: 24,
    widthPercent: 95,
    maxWidth: 385,
    bgColor: "#1d4ed8", // Royal Cobalt Sapphire
    accentBarColor: "#bfdbfe",
    titleColor: "#ffffff",
    authorColor: "#dbeafe",
    bestsellerColor: "#93c5fd",
    iconColor: "#bfdbfe",
    iconBoxBorder: "rgba(191, 219, 254, 0.75)",
    icon: "book",
    notes: "A gentle reminder that kindness and soft days will find you again."
  },
  {
    id: "stack_as_good_as_dead",
    title: "AS GOOD AS DEAD",
    fullTitle: "As Good as Dead",
    author: "HOLLY JACKSON",
    pages: 464,
    thickness: 52,
    widthPercent: 98,
    maxWidth: 395,
    bgColor: "#86198f", // Royal Orchid Magenta
    accentBarColor: "#f5d0fe",
    titleColor: "#ffffff",
    authorColor: "#fae8ff",
    bestsellerColor: "#f5d0fe",
    iconColor: "#f5d0fe",
    iconBoxBorder: "rgba(245, 208, 254, 0.75)",
    icon: "book",
    notes: "The heart-stopping finale of A Good Girl's Guide to Murder series."
  },
  {
    id: "stack_good_girl_bad_blood",
    title: "GOOD GIRL, BAD BLOOD",
    fullTitle: "Good Girl, Bad Blood",
    author: "HOLLY JACKSON",
    pages: 432,
    thickness: 48,
    widthPercent: 96,
    maxWidth: 390,
    bgColor: "#0891b2", // Ocean Peacock Turquoise
    accentBarColor: "#cffafe",
    titleColor: "#ffffff",
    authorColor: "#ecfeff",
    bestsellerColor: "#a5f3fc",
    iconColor: "#cffafe",
    iconBoxBorder: "rgba(207, 250, 254, 0.75)",
    icon: "quill",
    notes: "Pip Fitz-Amobi is back with a podcast and a missing person case."
  },
  {
    id: "stack_good_girls_guide",
    title: "A GOOD GIRL'S GUIDE TO MURDER",
    fullTitle: "A Good Girl's Guide to Murder",
    author: "HOLLY JACKSON",
    pages: 448,
    thickness: 50,
    widthPercent: 97,
    maxWidth: 395,
    bgColor: "#047857", // Forest Emerald
    accentBarColor: "#fde047",
    titleColor: "#fef08a",
    authorColor: "#fef9c3",
    bestsellerColor: "#fde047",
    iconColor: "#fde047",
    iconBoxBorder: "rgba(253, 224, 71, 0.7)",
    icon: "key",
    notes: "The investigation into Sal Singh and Andie Bell that started it all."
  },
  {
    id: "stack_silent_patient",
    title: "THE SILENT PATIENT",
    fullTitle: "The Silent Patient",
    author: "ALEX MICHAELIDES",
    pages: 336,
    thickness: 38,
    widthPercent: 96,
    maxWidth: 390,
    bgColor: "#e11d48", // Ruby Crimson
    accentBarColor: "#fecdd3",
    titleColor: "#ffffff",
    authorColor: "#ffe4e6",
    bestsellerColor: "#fecdd3",
    iconColor: "#fecdd3",
    iconBoxBorder: "rgba(254, 205, 211, 0.7)",
    icon: "heart",
    notes: "Alicia Berenson's silence hides the deepest secret of all."
  }
];

function ColophonIcon({ name, color, size = 12 }) {
  if (name === "key") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7.5" cy="15.5" r="4.5" />
        <path d="m21 3-9.5 9.5" />
        <path d="m15.5 7.5 3 3" />
        <path d="m18 5 2 2" />
      </svg>
    );
  }
  if (name === "heart") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    );
  }
  if (name === "bird") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 7h.01" />
        <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 18Z" />
        <path d="m20 7 2 .5-2 .5" />
      </svg>
    );
  }
  if (name === "quill" || name === "pen") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
      </svg>
    );
  }
  // Default: open book
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

// Vibrant color palette generator for dynamic user-added books
const VIBRANT_PALETTE = [
  { bg: "#047857", bar: "#fde047", text: "#fef08a", tag: "#fde047", border: "rgba(253, 224, 71, 0.7)", icon: "key" },
  { bg: "#e11d48", bar: "#fecdd3", text: "#ffffff", tag: "#fecdd3", border: "rgba(254, 205, 211, 0.7)", icon: "heart" },
  { bg: "#d97706", bar: "#ffffff", text: "#ffffff", tag: "#fef08a", border: "rgba(254, 243, 199, 0.75)", icon: "bird" },
  { bg: "#ea580c", bar: "#ffedd5", text: "#ffffff", tag: "#fed7aa", border: "rgba(254, 215, 170, 0.75)", icon: "book" },
  { bg: "#1d4ed8", bar: "#bfdbfe", text: "#ffffff", tag: "#93c5fd", border: "rgba(191, 219, 254, 0.75)", icon: "book" },
  { bg: "#86198f", bar: "#f5d0fe", text: "#ffffff", tag: "#f5d0fe", border: "rgba(245, 208, 254, 0.75)", icon: "book" },
  { bg: "#0891b2", bar: "#cffafe", text: "#ffffff", tag: "#a5f3fc", border: "rgba(207, 250, 254, 0.75)", icon: "quill" }
];

export default function CompletedBookStack({
  books = [],
  onSelectBook,
  onOpenAdd,
  onOpenLayers
}) {
  const userReadBooks = books.filter((b) => b.status === "read");
  const isDemo = userReadBooks.length === 0;

  // Use the curated vibrant collection by default, or user's books when marked read
  const displayBooks = isDemo
    ? VIBRANT_READ_STACK_BOOKS
    : userReadBooks.map((b, idx) => {
        const pages = getOriginalBookPages(b.title, b.author, b.pages);
        // Dynamically compute spine thickness directly from real page count (24px to 54px)
        const thickness = Math.min(54, Math.max(24, Math.round(14 + pages * 0.082)));
        // Natural realistic trim width: 94% to 98% with subtle organic variance (NOT a monotonic pyramid)
        // Can be displayed in ANY order as requested ("they can be in any order")
        const hash = Math.abs((b.title || "").split("").reduce((acc, c) => acc + c.charCodeAt(0), idx * 13));
        const widthPercent = (93.5 + (hash % 5) * 1.1).toFixed(1);
        const palette = VIBRANT_PALETTE[idx % VIBRANT_PALETTE.length];
        
        return {
          id: b.id,
          title: (b.title || "UNTITLED").toUpperCase(),
          fullTitle: b.title,
          author: (b.author || "AUTHOR").toUpperCase(),
          pages,
          thickness,
          widthPercent,
          maxWidth: 385 + (hash % 12),
          bgColor: b.coverColor || palette.bg,
          accentBarColor: palette.bar,
          titleColor: palette.text,
          authorColor: palette.text,
          bestsellerColor: palette.tag,
          iconColor: palette.bar,
          iconBoxBorder: palette.border,
          icon: palette.icon,
          notes: b.notes,
          currentPage: b.currentPage
        };
      });

  const totalCount = displayBooks.length;
  const totalPagesRead = displayBooks.reduce((sum, b) => sum + (Number(b.pages) || 0), 0);

  return (
    <section className="exact-screenshot-stack-panel" id="read-books-stack">
      {/* Top Header */}
      <div className="exact-stack-header">
        <div className="exact-gold-read-badge">READ</div>
        <div className="exact-read-headline">
          <span className="exact-count-num">{totalCount}</span>
          <span className="exact-count-text">books read</span>
        </div>
        <div className="exact-pages-sub">
          {totalPagesRead.toLocaleString()} pages so far
        </div>
      </div>

      {/* The 7 Books Stack */}
      <div className="exact-books-stack-wrap">
        {displayBooks.map((book, idx) => {
          const isThin = book.thickness < 30;
          const isThick = book.thickness >= 46;
          const titleLength = book.title.length;

          // Responsive typographic sizing based on title length & spine height
          let titleFontSize = "13px";
          let titleLetterSpacing = "0.4px";

          if (isThin) {
            if (titleLength > 24) {
              titleFontSize = "9.5px";
              titleLetterSpacing = "0.1px";
            } else if (titleLength > 16) {
              titleFontSize = "10.5px";
              titleLetterSpacing = "0.2px";
            } else {
              titleFontSize = "11.5px";
              titleLetterSpacing = "0.4px";
            }
          } else if (isThick) {
            if (titleLength > 26) {
              titleFontSize = "11px";
              titleLetterSpacing = "0.2px";
            } else if (titleLength > 16) {
              titleFontSize = "12.5px";
              titleLetterSpacing = "0.3px";
            } else {
              titleFontSize = "14px";
              titleLetterSpacing = "0.6px";
            }
          } else {
            if (titleLength > 26) {
              titleFontSize = "10.5px";
              titleLetterSpacing = "0.15px";
            } else if (titleLength > 18) {
              titleFontSize = "11.5px";
              titleLetterSpacing = "0.25px";
            } else {
              titleFontSize = "13px";
              titleLetterSpacing = "0.4px";
            }
          }

          return (
            <motion.div
              key={book.id || `stk_${idx}`}
              className="exact-book-item-row"
              style={{
                width: `${book.widthPercent}%`,
                maxWidth: `${book.maxWidth || 395}px`,
                zIndex: displayBooks.length - idx
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (onSelectBook) {
                  const origUserBook = userReadBooks.find((ub) => ub.id === book.id);
                  onSelectBook(origUserBook ? { ...origUserBook, pages: book.pages } : {
                    id: book.id,
                    title: book.fullTitle || book.title,
                    author: book.author,
                    pages: book.pages,
                    status: "read",
                    notes: book.notes,
                    coverColor: book.bgColor
                  });
                }
              }}
              title={`"${book.fullTitle || book.title}" by ${book.author} (${book.pages} pages) — Tap to view note`}
            >
              <div
                className={`exact-paperback-spine ${isThin ? "spine-thin" : ""} ${isThick ? "spine-thick" : ""}`}
                style={{
                  height: `${book.thickness}px`,
                  backgroundColor: book.bgColor
                }}
              >
                {/* Specular Cylindrical Lighting Overlay */}
                <div className="spine-cylindrical-sheen" />

                {/* Left Accent Bar */}
                <div
                  className="exact-spine-vertical-bar"
                  style={{
                    backgroundColor: book.accentBarColor,
                    height: isThin ? "12px" : isThick ? "24px" : "18px"
                  }}
                />

                {/* Embossed Title - Fully Visible, No Truncation */}
                <div
                  className="exact-spine-title"
                  style={{
                    color: book.titleColor,
                    fontSize: titleFontSize,
                    letterSpacing: titleLetterSpacing
                  }}
                >
                  {book.title}
                </div>

                {/* Author & Bestseller Block */}
                <div className="exact-spine-author-block">
                  <span
                    className="exact-spine-bestseller"
                    style={{
                      color: book.bestsellerColor,
                      fontSize: isThin ? "6px" : isThick ? "8px" : "7px"
                    }}
                  >
                    #1 BESTSELLER
                  </span>
                  <span
                    className="exact-spine-author-name"
                    style={{
                      color: book.authorColor,
                      fontSize: isThin ? "8.5px" : isThick ? "11px" : "10px"
                    }}
                  >
                    {book.author}
                  </span>
                </div>

                {/* Colophon Icon Badge */}
                <div
                  className="exact-spine-colophon"
                  style={{
                    borderColor: book.iconBoxBorder,
                    height: isThin ? "15px" : isThick ? "23px" : "19px",
                    width: isThin ? "21px" : isThick ? "29px" : "25px"
                  }}
                >
                  <ColophonIcon
                    name={book.icon}
                    color={book.iconColor}
                    size={isThin ? 10 : isThick ? 14 : 12}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Italic Tap Note Link */}
      <button
        type="button"
        className="exact-tap-note-btn"
        onClick={() => onSelectBook && onSelectBook(displayBooks[0])}
      >
        tap one to read your note
      </button>
    </section>
  );
}