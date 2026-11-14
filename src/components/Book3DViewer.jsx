import React, { useState, useRef, useEffect } from "react";
import {
  RotateCw,
  Compass,
  BookOpen,
  Book,
  Bookmark,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { calculateSpineThickness } from "../utils/bookDimensions";
import { getBookThematicDetails, BookThematicIcon } from "../utils/bookThematics.jsx";

/**
 * Book3DViewer.jsx
 * 
 * Physically authentic 3D Book Viewer with interactive Virtual Bookmark System:
 * - 2 Viewing Modes:
 *   1. "Closed 3D Hardcover": 6-sided 3D geometry with front/back boards, spine, fore-edge paper block,
 *      and physical bookmark ribbon sticking out from head and tail.
 *   2. "Open 3D Book & Bookmark": Fully opened 3D volume with curved left/right pages, deckle edge paper,
 *      and an exquisite, dynamic 3D silk ribbon bookmark placed at the exact page the user specifies!
 * - Interactive 3D Bookmark Placer:
 *   - Real-time scrubber slider & steppers to reposition the bookmark across the 3D pages.
 *   - "Place Bookmark" button with instant tactile feedback.
 * - 360-degree interactive rotation (drag or cursor follow) across all modes.
 */
export default function Book3DViewer({
  book,
  currentPage = 1,
  originalPages = 320,
  onUpdateBookmark
}) {
  // Default to "open" if user is currently reading this book
  const [viewMode, setViewMode] = useState(
    book.status === "currently" ? "open" : "closed"
  );
  const [targetPage, setTargetPage] = useState(
    Number(currentPage) && Number(currentPage) > 0 ? Number(currentPage) : 1
  );
  const [isSavedBookmark, setIsSavedBookmark] = useState(false);

  const [rotY, setRotY] = useState(viewMode === "open" ? -12 : -26);
  const [rotX, setRotX] = useState(viewMode === "open" ? 18 : 8);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const stageRef = useRef(null);

  const totalPages = Math.max(20, Number(originalPages) || 320);

  // Synchronize targetPage when currentPage prop changes
  useEffect(() => {
    if (currentPage && Number(currentPage) > 0) {
      setTargetPage(Math.min(totalPages, Math.max(1, Number(currentPage))));
    }
  }, [currentPage, totalPages]);

  const thickness = calculateSpineThickness(totalPages, false);
  const bookWidth = 190;
  const bookHeight = 265;
  const bookDepth = Math.max(26, thickness);
  const lip = 3;

  const { icon, spineColor, textColor, foilColor, isDark } = getBookThematicDetails(book, 0);

  // Bookmark ribbon color tailored to book palette
  const ribbonColor =
    spineColor === "#8b1e1e" || spineColor === "#e11d48"
      ? "#d97706" // Gold on red
      : spineColor === "#047857" || spineColor === "#0f766e"
      ? "#e11d48" // Rose on emerald
      : spineColor === "#1d4ed8" || spineColor === "#0891b2"
      ? "#f59e0b" // Warm amber on sapphire
      : "#b91c1c"; // Crimson on neutral/dark

  const title = book.title || "Untitled Work";
  const author = book.author || "Unknown Author";

  // Auto-rotation turntable loop
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setRotY((prev) => (prev - 1) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Pointer drag controls
  const handlePointerDown = (e) => {
    isDragging.current = true;
    lastMousePos.current = {
      x: e.clientX || e.touches?.[0]?.clientX || 0,
      y: e.clientY || e.touches?.[0]?.clientY || 0
    };
  };

  const handlePointerMove = (e) => {
    if (isDragging.current) {
      const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
      const clientY = e.clientY || e.touches?.[0]?.clientY || 0;

      const deltaX = clientX - lastMousePos.current.x;
      const deltaY = clientY - lastMousePos.current.y;

      lastMousePos.current = { x: clientX, y: clientY };

      setRotY((prev) => (prev + deltaX * 0.7) % 360);
      setRotX((prev) => Math.max(-45, Math.min(45, prev - deltaY * 0.4)));
      return;
    }

    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const clientY = e.clientY || e.touches?.[0]?.clientY || 0;

    const normX = Math.max(-1, Math.min(1, (clientX - (rect.left + rect.width / 2)) / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, (clientY - (rect.top + rect.height / 2)) / (rect.height / 2)));

    if (viewMode === "open") {
      setRotY(Math.round(normX * 45 - 8));
      setRotX(Math.round(-normY * 20 + 16));
    } else {
      setRotY(Math.round(normX * 75));
      setRotX(Math.round(-normY * 25));
    }
  };

  const handlePointerEnter = () => {
    setIsHovering(true);
    setIsAutoRotating(false);
  };

  const handlePointerLeave = () => {
    setIsHovering(false);
    isDragging.current = false;
    if (viewMode === "open") {
      setRotY(-10);
      setRotX(18);
    } else {
      setRotY(-26);
      setRotX(8);
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Switch between open book and closed volume
  const handleToggleViewMode = (mode) => {
    setViewMode(mode);
    if (mode === "open") {
      setRotY(-10);
      setRotX(18);
    } else {
      setRotY(-26);
      setRotX(8);
    }
  };

  // Save bookmark action
  const handleApplyBookmark = () => {
    if (onUpdateBookmark) {
      onUpdateBookmark(book.id, targetPage);
    }
    setIsSavedBookmark(true);
    setTimeout(() => setIsSavedBookmark(false), 2400);
  };

  const progressPercent = Math.min(100, Math.max(1, Math.round((targetPage / totalPages) * 100)));

  // Ribbon X position across the open pages (from 22% on left page to 78% on right page)
  const ribbonPositionPercent = 20 + (progressPercent / 100) * 58;

  return (
    <div className="book-3d-viewer-wrapper">
      {/* Top 3D Control Bar: Mode Toggle & Auto Spin */}
      <div className="viewer-controls-bar">
        <div className="view-mode-pill-toggle">
          <button
            type="button"
            className={`view-mode-tab-btn ${viewMode === "closed" ? "active" : ""}`}
            onClick={() => handleToggleViewMode("closed")}
            title="Inspect closed 3D hardcover volume"
          >
            <Book size={12} /> Closed 3D
          </button>
          <button
            type="button"
            className={`view-mode-tab-btn ${viewMode === "open" ? "active" : ""}`}
            onClick={() => handleToggleViewMode("open")}
            title="Open book in 3D to see and place your virtual bookmark"
          >
            <BookOpen size={12} /> Open &amp; Bookmark 🔖
          </button>
        </div>

        <button
          type="button"
          className={`turntable-btn ${isAutoRotating ? "rotating" : ""}`}
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          title="Toggle 360° Turntable Rotation"
        >
          <RotateCw size={13} /> {isAutoRotating ? "Pause" : "Auto Spin"}
        </button>
      </div>

      {/* 3D Viewport Stage */}
      <div
        ref={stageRef}
        className={`viewer-stage ${viewMode === "open" ? "stage-open-book" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        {/* ==============================================================
            MODE 1: CLOSED 3D HARDCOVER WITH PEEKING BOOKMARK RIBBON
            ============================================================== */}
        {viewMode === "closed" && (
          <div
            className="hardcover-physical-model"
            style={{
              width: `${bookWidth}px`,
              height: `${bookHeight}px`,
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transition: isDragging.current ? "none" : "transform 0.12s cubic-bezier(0.2, 0, 0.2, 1)",
              "--model-thickness": `${bookDepth}px`,
              "--spine-color": spineColor,
              "--text-color": textColor,
              "--foil-color": foilColor
            }}
          >
            {/* Peeking Silk Ribbon Bookmark Loop at Head of Book */}
            <div
              className="closed-ribbon-loop-head"
              style={{
                backgroundColor: ribbonColor,
                left: `${Math.min(85, Math.max(25, progressPercent))}%`
              }}
              title={`Virtual Bookmark Loop at page ${targetPage}`}
            />

            {/* Hanging Silk Ribbon Bookmark Tail at Tail of Book */}
            <div
              className="closed-ribbon-tail-drop"
              style={{
                backgroundColor: ribbonColor,
                left: `${Math.min(85, Math.max(25, progressPercent))}%`
              }}
              title={`Virtual Bookmark at page ${targetPage}`}
            >
              <span className="ribbon-charm-gem" style={{ color: foilColor }}>✦</span>
            </div>

            {/* FACE 1: FRONT COVER BOARD */}
            <div
              className="model-face model-front-cover"
              style={{
                width: `${bookWidth}px`,
                height: `${bookHeight}px`,
                transform: `translateZ(${bookDepth / 2}px)`,
                backgroundColor: spineColor
              }}
            >
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={title}
                  className="cover-image-face"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.parentNode.querySelector(".typographic-cover-fallback");
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
              ) : null}

              <div
                className="typographic-cover-fallback"
                style={{
                  display: book.cover ? "none" : "flex",
                  backgroundColor: spineColor,
                  color: textColor
                }}
              >
                <div className="typo-cover-inner" style={{ borderColor: foilColor }}>
                  <span className="typo-ornament" style={{ color: foilColor }}>❦</span>
                  <div className="typo-center">
                    <h4 style={{ color: textColor }}>{title}</h4>
                    <p style={{ color: textColor }}>{author}</p>
                  </div>
                  <span className="typo-ornament" style={{ color: foilColor }}>✦</span>
                </div>
              </div>

              <div className="front-hinge-crease" />
              <div className="cover-lighting-sheen" />
              <div className="front-board-rim-highlight" />
            </div>

            {/* FACE 2: PHYSICAL SPINE */}
            <div
              className="model-face model-spine-face"
              style={{
                width: `${bookDepth}px`,
                height: `${bookHeight}px`,
                transformOrigin: "center center",
                transform: `translateX(-50%) rotateY(-90deg)`,
                backgroundColor: spineColor,
                color: textColor
              }}
            >
              <div className="spine-cloth-headband headband-top" />
              <div className="spine-3d-rules rules-top">
                <span className="rule-bar" style={{ backgroundColor: foilColor }} />
                <span className="rule-bar" style={{ backgroundColor: foilColor }} />
              </div>

              <div className="spine-3d-body">
                <div className="spine-3d-accent-dot" style={{ backgroundColor: foilColor }} />
                <div className="spine-3d-text-track">
                  <span className="spine-3d-title" style={{ color: textColor }} title={title}>
                    {title}
                  </span>
                  {author && (
                    <span className="spine-3d-author" style={{ color: textColor }}>
                      {author}
                    </span>
                  )}
                </div>
                <div className="spine-3d-glyph-anchor">
                  <BookThematicIcon
                    name={icon}
                    color={foilColor}
                    size={Math.min(20, Math.max(12, bookDepth - 8))}
                  />
                </div>
              </div>

              <div className="spine-3d-rules rules-bottom">
                <span className="rule-bar" style={{ backgroundColor: foilColor }} />
                <span className="rule-bar" style={{ backgroundColor: foilColor }} />
              </div>
              <div className="spine-cloth-headband headband-bottom" />
              <div className="spine-cylinder-lighting" />
            </div>

            {/* FACE 3: BACK COVER BOARD */}
            <div
              className="model-face model-back-cover"
              style={{
                width: `${bookWidth}px`,
                height: `${bookHeight}px`,
                transform: `rotateY(180deg) translateZ(${bookDepth / 2}px)`,
                backgroundColor: spineColor,
                color: textColor
              }}
            >
              <div className="back-cover-canvas">
                <div className="back-critic-quote" style={{ borderColor: `${foilColor}40` }}>
                  <span className="critic-quote-mark" style={{ color: foilColor }}>“</span>
                  <p className="critic-quote-text">
                    “An unforgettable, masterfully woven work of art. Captivating from the opening line to the final page.”
                  </p>
                  <span className="critic-attribution">— LITERARY REVIEW</span>
                </div>

                <div className="back-synopsis-box">
                  <p className="back-blurb-text">
                    {book.notes
                      ? book.notes.slice(0, 160) + (book.notes.length > 160 ? "..." : "")
                      : `In this celebrated work, ${author} crafts an evocative journey through memory, truth, and wonder.`}
                  </p>
                </div>

                <div className="back-barcode-plate">
                  <div className="barcode-left-meta">
                    <span className="barcode-genre">{book.genre || "LITERATURE"}</span>
                    <span className="barcode-price">$18.99 US / $24.99 CAN</span>
                    <span className="barcode-colophon">❦ {book.publisher || "Between the Pages"}</span>
                  </div>
                  <div className="barcode-graphic-box">
                    <div className="barcode-stripes" />
                    <span className="barcode-isbn-text">
                      {book.isbn ? `978-${book.isbn.slice(0, 9)}` : "978-0-14-312774-1"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="back-hinge-crease" />
              <div className="cover-lighting-sheen" />
            </div>

            {/* FACE 4: FORE-EDGE PAGE BLOCK */}
            <div
              className="model-face model-fore-edge-pages"
              style={{
                width: `${bookDepth - 4}px`,
                height: `${bookHeight - 2 * lip}px`,
                top: `${lip}px`,
                right: `${lip}px`,
                transformOrigin: "center center",
                transform: `translateX(50%) rotateY(90deg)`
              }}
            >
              <div className="paper-deckle-lines-layer" />
              <div className="paper-depth-concave-shadow" />
            </div>

            {/* FACE 5: TOP PAGE BLOCK */}
            <div
              className="model-face model-top-pages"
              style={{
                width: `${bookWidth - lip}px`,
                height: `${bookDepth - 4}px`,
                left: 0,
                top: `${lip}px`,
                transformOrigin: "center center",
                transform: `translateY(-50%) rotateX(90deg)`
              }}
            >
              <div className="top-pages-trim-pattern" />
            </div>

            {/* FACE 6: BOTTOM PAGE BLOCK */}
            <div
              className="model-face model-bottom-pages"
              style={{
                width: `${bookWidth - lip}px`,
                height: `${bookDepth - 4}px`,
                left: 0,
                bottom: `${lip}px`,
                transformOrigin: "center center",
                transform: `translateY(50%) rotateX(-90deg)`
              }}
            >
              <div className="top-pages-trim-pattern" />
            </div>

            <div className="model-cast-shadow" />
          </div>
        )}

        {/* ==============================================================
            MODE 2: OPEN 3D BOOK & VIRTUAL BOOKMARK RIBBON SYSTEM
            ============================================================== */}
        {viewMode === "open" && (
          <div
            className="open-book-3d-container"
            style={{
              width: "310px",
              height: "235px",
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transition: isDragging.current ? "none" : "transform 0.12s cubic-bezier(0.2, 0, 0.2, 1)"
            }}
          >
            {/* Hardcover Casing Outer Backing */}
            <div
              className="open-hardcover-backing-board"
              style={{ backgroundColor: spineColor }}
            />

            {/* LEFT OPEN PAGE WING */}
            <div className="open-page-wing wing-left">
              <div className="page-paper-card">
                <div className="open-page-header">
                  <span className="page-header-title">{title}</span>
                </div>

                <div className="open-page-typography">
                  <span className="drop-cap-serif" style={{ color: spineColor }}>
                    {title.charAt(0) || "T"}
                  </span>
                  <p className="open-body-text">
                    {book.notes
                      ? book.notes.slice(0, 130) + "..."
                      : `Between the quiet lines of this story, reflection begins. Every chapter opens a world that remains within us.`}
                  </p>
                  <p className="open-body-text secondary">
                    {author ? `Penned with care by ${author}.` : "From the library collection."}
                  </p>
                </div>

                <div className="open-page-footer">
                  <span className="page-folio-num">
                    p. {Math.max(1, targetPage - 1)}
                  </span>
                </div>
              </div>

              {/* Realistic curved page shadow into spine gutter */}
              <div className="page-gutter-gradient gradient-left" />
            </div>

            {/* RECESSED CENTER SPINE VALLEY */}
            <div className="open-spine-valley-crease">
              <div className="spine-valley-shadow" />
              <div className="spine-headband-stitch" style={{ backgroundColor: foilColor }} />
            </div>

            {/* RIGHT OPEN PAGE WING */}
            <div className="open-page-wing wing-right">
              <div className="page-paper-card">
                <div className="open-page-header">
                  <span className="page-header-author">{author || "Reading Progress"}</span>
                </div>

                <div className="open-page-typography">
                  <div className="bookmark-page-feature-box">
                    <span className="bookmark-ribbon-icon-small">🔖</span>
                    <span className="bookmark-feature-label">BOOKMARK PLACED</span>
                    <h5 className="bookmark-page-big">Page {targetPage}</h5>
                    <span className="bookmark-percent-text">
                      {progressPercent}% completed of {totalPages} pages
                    </span>
                  </div>

                  <p className="open-body-quote">
                    &ldquo;Between the pages of a book is a lovely place to be.&rdquo;
                  </p>
                </div>

                <div className="open-page-footer">
                  <span className="page-folio-num">
                    p. {targetPage} / {totalPages}
                  </span>
                </div>
              </div>

              <div className="page-gutter-gradient gradient-right" />
            </div>

            {/* ==============================================================
                THE 3D VIRTUAL SILK RIBBON BOOKMARK
                Placed dynamically at the user's reading percentage
                ============================================================== */}
            <div
              className="virtual-bookmark-ribbon-3d"
              style={{
                left: `${ribbonPositionPercent}%`,
                "--ribbon-color": ribbonColor
              }}
              title={`Virtual Bookmark placed at page ${targetPage}`}
            >
              {/* Top loop draped over the head of the book */}
              <div className="ribbon-loop-over-head" style={{ backgroundColor: ribbonColor }} />

              {/* Main silk ribbon body with gold-stitched borders */}
              <div className="ribbon-silk-strip" style={{ backgroundColor: ribbonColor }}>
                <div className="ribbon-gold-stitching" />
                <span className="ribbon-active-page-badge">p.{targetPage}</span>
              </div>

              {/* Swallow-tail fishtail cut dangling past the bottom edge */}
              <div className="ribbon-fishtail-cut" style={{ borderTopColor: ribbonColor }}>
                <span className="ribbon-gold-charm">✦</span>
              </div>
            </div>

            {/* Open Book Shadow on Desk */}
            <div className="open-book-desk-shadow" />
          </div>
        )}
      </div>

      {/* ==============================================================
          INTERACTIVE VIRTUAL BOOKMARK SCRUBBER & PLACER
          ============================================================== */}
      <div className="bookmark-interactive-dock">
        <div className="dock-status-header">
          <div className="dock-title-group">
            <span className="dock-emoji">🔖</span>
            <span className="dock-title">
              {viewMode === "open" ? "Virtual Bookmark Position:" : "Current Bookmark:"}
            </span>
          </div>
          <span className="dock-page-indicator">
            p. <strong>{targetPage}</strong> of {totalPages} ({progressPercent}%)
          </span>
        </div>

        {/* Real-time Bookmark Position Scrubber Slider */}
        <div className="dock-slider-row">
          <input
            type="range"
            min="1"
            max={totalPages}
            value={targetPage}
            onChange={(e) => setTargetPage(Number(e.target.value))}
            className="virtual-bookmark-scrubber-slider"
            style={{
              "--track-progress": `${progressPercent}%`,
              "--ribbon-accent": ribbonColor
            }}
          />
        </div>

        {/* Quick Steppers & Save Bookmark Button */}
        <div className="dock-actions-row">
          <div className="dock-steppers-group">
            <button
              type="button"
              className="dock-step-btn"
              onClick={() => setTargetPage((p) => Math.max(1, p - 10))}
              title="Step back 10 pages"
            >
              -10
            </button>
            <button
              type="button"
              className="dock-step-btn"
              onClick={() => setTargetPage((p) => Math.max(1, p - 1))}
              title="Step back 1 page"
            >
              -1
            </button>
            <button
              type="button"
              className="dock-step-btn"
              onClick={() => setTargetPage((p) => Math.min(totalPages, p + 1))}
              title="Step forward 1 page"
            >
              +1
            </button>
            <button
              type="button"
              className="dock-step-btn"
              onClick={() => setTargetPage((p) => Math.min(totalPages, p + 10))}
              title="Step forward 10 pages"
            >
              +10
            </button>
          </div>

          <button
            type="button"
            className={`dock-save-bookmark-btn ${isSavedBookmark ? "saved" : ""}`}
            onClick={handleApplyBookmark}
          >
            {isSavedBookmark ? "Bookmark Placed! ✓" : `Place Bookmark at p.${targetPage} 🔖`}
          </button>
        </div>
      </div>
    </div>
  );
}
