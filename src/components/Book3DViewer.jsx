import React, { useState, useRef, useEffect } from "react";
import { RotateCw, Compass, BookOpen, Layers } from "lucide-react";
import { calculateSpineThickness } from "../utils/bookDimensions";
import { getBookThematicDetails, BookThematicIcon } from "../utils/bookThematics.jsx";

/**
 * Book3DViewer.jsx
 * 
 * Physically authentic 3D Hardcover Volume:
 * - Mathematical airtight 6-sided geometry with zero gaps or disconnected planes
 * - Realistic front board with protective overhang lip and hinge groove
 * - Seamless spine connected flush to front and back boards with cloth headbands
 * - Authentic back cover with critic review, synopsis blurb, and ISBN barcode plate
 * - Recessed fore-edge paper block (right side) with hundreds of textured paper pages
 * - Recessed top and bottom paper blocks (head & tail)
 * - 360-degree interactive rotation (drag or auto-turntable)
 */
export default function Book3DViewer({ book }) {
  const [rotY, setRotY] = useState(-25);
  const [rotX, setRotX] = useState(8);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const thickness = calculateSpineThickness(book.pages, false);
  const bookWidth = 190;
  const bookHeight = 265;
  const bookDepth = Math.max(26, thickness);
  const lip = 3; // Hardcover board protective overhang

  const { icon, spineColor, textColor, foilColor, isDark } = getBookThematicDetails(book, 0);

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

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (e) => {
    isDragging.current = true;
    lastMousePos.current = {
      x: e.clientX || e.touches?.[0]?.clientX || 0,
      y: e.clientY || e.touches?.[0]?.clientY || 0
    };
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const clientY = e.clientY || e.touches?.[0]?.clientY || 0;

    const deltaX = clientX - lastMousePos.current.x;
    const deltaY = clientY - lastMousePos.current.y;

    lastMousePos.current = { x: clientX, y: clientY };

    setRotY((prev) => (prev + deltaX * 0.7) % 360);
    setRotX((prev) => Math.max(-30, Math.min(30, prev - deltaY * 0.4)));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Preset Angle Selectors
  const setPresetAngle = (preset) => {
    setIsAutoRotating(false);
    if (preset === "front") {
      setRotY(0);
      setRotX(0);
    } else if (preset === "perspective") {
      setRotY(-32);
      setRotX(10);
    } else if (preset === "spine") {
      setRotY(-90);
      setRotX(0);
    } else if (preset === "fore-edge") {
      setRotY(90);
      setRotX(0);
    } else if (preset === "back") {
      setRotY(-180);
      setRotX(0);
    }
  };

  return (
    <div className="book-3d-viewer-wrapper">
      {/* Top Controls Bar */}
      <div className="viewer-controls-bar">
        <div className="preset-buttons-group">
          <button
            type="button"
            className={`preset-btn ${rotY === 0 ? "active" : ""}`}
            onClick={() => setPresetAngle("front")}
          >
            Front
          </button>
          <button
            type="button"
            className={`preset-btn ${rotY === -32 ? "active" : ""}`}
            onClick={() => setPresetAngle("perspective")}
          >
            3/4 View
          </button>
          <button
            type="button"
            className={`preset-btn ${rotY === -90 ? "active" : ""}`}
            onClick={() => setPresetAngle("spine")}
          >
            Spine
          </button>
          <button
            type="button"
            className={`preset-btn ${rotY === 90 ? "active" : ""}`}
            onClick={() => setPresetAngle("fore-edge")}
          >
            Pages
          </button>
          <button
            type="button"
            className={`preset-btn ${Math.abs(rotY) === 180 ? "active" : ""}`}
            onClick={() => setPresetAngle("back")}
          >
            Back
          </button>
        </div>

        <button
          type="button"
          className={`turntable-btn ${isAutoRotating ? "rotating" : ""}`}
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          title="Toggle 360° Turntable Rotation"
        >
          <RotateCw size={13} /> {isAutoRotating ? "Pause Spin" : "Auto Spin"}
        </button>
      </div>

      {/* 3D Viewport Stage */}
      <div
        className="viewer-stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        <div
          className="hardcover-physical-model"
          style={{
            width: `${bookWidth}px`,
            height: `${bookHeight}px`,
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            "--model-thickness": `${bookDepth}px`,
            "--spine-color": spineColor,
            "--text-color": textColor,
            "--foil-color": foilColor
          }}
        >
          {/* ==============================================================
              FACE 1: FRONT COVER BOARD (Z = +depth/2)
              ============================================================== */}
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

            {/* Elegant Vintage Typographic Cover when no image is available */}
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

            {/* Embossed Bookbinder Hinge Crease */}
            <div className="front-hinge-crease" />
            {/* Gloss & Matte Sheen Overlay */}
            <div className="cover-lighting-sheen" />
            {/* Front Board Edge Overhang Highlight */}
            <div className="front-board-rim-highlight" />
          </div>

          {/* ==============================================================
              FACE 2: PHYSICAL SPINE (Left side, connecting front & back)
              Centered at X=0, rotated -90deg, flush from -Z to +Z
              ============================================================== */}
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
            {/* Top Cloth Headband */}
            <div className="spine-cloth-headband headband-top" />

            {/* Top Embossed Double Rules */}
            <div className="spine-3d-rules rules-top">
              <span className="rule-bar" style={{ backgroundColor: foilColor }} />
              <span className="rule-bar" style={{ backgroundColor: foilColor }} />
            </div>

            {/* Main Spine Body */}
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

            {/* Bottom Embossed Double Rules */}
            <div className="spine-3d-rules rules-bottom">
              <span className="rule-bar" style={{ backgroundColor: foilColor }} />
              <span className="rule-bar" style={{ backgroundColor: foilColor }} />
            </div>

            {/* Bottom Cloth Footband */}
            <div className="spine-cloth-headband headband-bottom" />

            {/* Cylindrical Spine Curvature Shadow */}
            <div className="spine-cylinder-lighting" />
          </div>

          {/* ==============================================================
              FACE 3: BACK COVER BOARD (Z = -depth/2)
              Rotated 180deg so text faces outward to the viewer
              ============================================================== */}
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
            {/* Cloth texture & binding color */}
            <div className="back-cover-canvas">
              {/* Top Critic Acclaim Quote */}
              <div className="back-critic-quote" style={{ borderColor: `${foilColor}40` }}>
                <span className="critic-quote-mark" style={{ color: foilColor }}>“</span>
                <p className="critic-quote-text">
                  “An unforgettable, masterfully woven work of art. Captivating from the opening line to the final page.”
                </p>
                <span className="critic-attribution">— LITERARY REVIEW</span>
              </div>

              {/* Book Synopsis Blurb */}
              <div className="back-synopsis-box">
                <p className="back-blurb-text">
                  {book.notes
                    ? book.notes.slice(0, 160) + (book.notes.length > 160 ? "..." : "")
                    : `In this celebrated work, ${author} crafts an evocative and deeply rewarding journey through themes of memory, desire, and the transformative power of storytelling.`}
                </p>
              </div>

              {/* Bottom Metadata & Barcode Box (Authentic Book Plate) */}
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

            {/* Embossed Back Hinge Joint */}
            <div className="back-hinge-crease" />
            {/* Lighting Sheen */}
            <div className="cover-lighting-sheen" />
          </div>

          {/* ==============================================================
              FACE 4: FORE-EDGE PAGE BLOCK (Right side with paper pages)
              Centered at X = bookWidth - lip, rotated 90deg, recessed inside boards
              ============================================================== */}
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
            {/* Hundreds of fine cut book page lines */}
            <div className="paper-deckle-lines-layer" />
            <div className="paper-depth-concave-shadow" />
          </div>

          {/* ==============================================================
              FACE 5: TOP PAGE BLOCK (Head of book)
              Centered at Y = lip, rotated 90deg around X, recessed inside boards
              ============================================================== */}
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

          {/* ==============================================================
              FACE 6: BOTTOM PAGE BLOCK (Tail of book)
              Centered at Y = bookHeight - lip, rotated -90deg around X
              ============================================================== */}
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

          {/* Realistic Contact Ground Shadow */}
          <div className="model-cast-shadow" />
        </div>
      </div>

      <div className="viewer-hint-caption">
        <Compass size={13} />
        <span>Click &amp; drag anywhere to rotate the 3D book in full 360°</span>
      </div>
    </div>
  );
}
