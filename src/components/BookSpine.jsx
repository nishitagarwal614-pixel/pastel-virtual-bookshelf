import React from "react";
import { getBookThematicDetails, BookThematicIcon } from "../utils/bookThematics.jsx";

/**
 * BookSpine.jsx
 * 
 * Re-crafted to match the user's reference image:
 * - Rounded pill spine caps
 * - Embossed double rule borders
 * - Refined typography matching the specific title/genre
 * - Distinct gold / dark thematic glyph icon on the right (snitch, key, door, leaf, chess, etc.)
 * - 3D cylindrical curvature lighting
 * - Supports both horizontal (stack) and vertical (shelf) display
 */
export default function BookSpine({
  book,
  thickness = 38,
  height = 220,
  orientation = "horizontal", // 'horizontal' | 'vertical'
  index = 0,
  className = ""
}) {
  const { icon, spineColor, textColor, foilColor, isDark } = getBookThematicDetails(book, index);

  const title = book.title || "Untitled Work";
  const author = book.author ? book.author.split(",")[0].trim() : "";

  // Dynamic font choice based on title length / style
  const isUppercaseStyle =
    title.toUpperCase() === title ||
    title.length < 24 ||
    title.toLowerCase().includes("ceo") ||
    title.toLowerCase().includes("lie") ||
    title.toLowerCase().includes("malala") ||
    title.toLowerCase().includes("harbors") ||
    title.toLowerCase().includes("hugo");

  const isItalicStyle =
    title.toLowerCase().includes("silent patient") ||
    title.toLowerCase().includes("midnight library") ||
    title.toLowerCase().includes("talk to someone");

  const ruleColor = isDark ? "rgba(246, 216, 155, 0.4)" : "rgba(40, 25, 14, 0.25)";
  const iconColor = isDark ? foilColor : textColor;

  // HORIZONTAL SPINES (Exact match to the reference stack image)
  if (orientation === "horizontal") {
    return (
      <div
        className={`reference-spine-horizontal real-paperback-spine ${isDark ? "dark-cloth" : "light-cloth"} ${className}`}
        style={{
          "--spine-bg": spineColor,
          "--spine-text": textColor,
          "--spine-foil": foilColor,
          "--spine-thickness": `${thickness}px`,
          "--book-color": spineColor,
          "--book-text": textColor,
          "--book-foil": foilColor
        }}
      >
        {/* Top Edge Crease / Score Line */}
        <div className="spine-edge-score score-top" />

        {/* Left Headband / Accent */}
        <div className="spine-left-block">
          <span className="spine-accent-pill" style={{ backgroundColor: foilColor }} />
        </div>

        {/* Title & Author Typography */}
        <div className="spine-center-typography">
          <span className="spine-main-title" style={{ color: textColor }} title={title}>
            {title.toUpperCase()}
          </span>
          {author && (
            <div className="spine-author-block">
              <span className="spine-bestseller-tag">#1 BESTSELLER</span>
              <span className="spine-author-name" style={{ color: textColor }}>
                {author.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Right Colophon / Publisher Emblem */}
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

        {/* Cylindrical Lighting Sheen */}
        <div className="paperback-lighting-sheen" />

        {/* Hinge Reading Crease */}
        <div className="paperback-hinge-groove" />
      </div>
    );
  }

  // VERTICAL SPINES (For Standing Books on the Shelf)
  return (
    <div
      className={`reference-spine-vertical ${isDark ? "dark-cloth" : "light-cloth"} ${className}`}
      style={{
        "--spine-bg": spineColor,
        "--spine-text": textColor,
        "--spine-foil": foilColor,
        "--spine-width": `${thickness}px`,
        "--spine-height": `${height}px`
      }}
    >
      {/* Top Embossed Double Rules */}
      <div className="vertical-embossed-double-rules rules-top">
        <span className="rule-line-h" style={{ backgroundColor: ruleColor }} />
        <span className="rule-line-h" style={{ backgroundColor: ruleColor }} />
      </div>

      {/* Main Vertical Spine Track */}
      <div className="vertical-spine-body">
        {/* Top Decorative Sparkle / Accent */}
        <div className="vertical-top-accent">
          <span className="accent-dot" style={{ backgroundColor: iconColor }} />
        </div>

        {/* Vertical Title & Author */}
        <div className="vertical-text-holder">
          <span
            className={`vertical-spine-title ${isUppercaseStyle ? "is-uppercase" : ""} ${
              isItalicStyle ? "is-italic" : ""
            }`}
            style={{ color: textColor }}
            title={title}
          >
            {title}
          </span>
          {author && thickness >= 28 && (
            <span className="vertical-spine-author" style={{ color: textColor }}>
              {author}
            </span>
          )}
        </div>

        {/* Bottom Thematic Icon / Glyph */}
        <div className="vertical-thematic-glyph" title={`${title} motif`}>
          <BookThematicIcon name={icon} color={iconColor} size={Math.min(18, thickness - 8)} />
        </div>
      </div>

      {/* Bottom Embossed Double Rules */}
      <div className="vertical-embossed-double-rules rules-bottom">
        <span className="rule-line-h" style={{ backgroundColor: ruleColor }} />
        <span className="rule-line-h" style={{ backgroundColor: ruleColor }} />
      </div>

      {/* 3D Cylindrical Curvature Lighting */}
      <div className="spine-vertical-lighting-overlay" />
    </div>
  );
}
