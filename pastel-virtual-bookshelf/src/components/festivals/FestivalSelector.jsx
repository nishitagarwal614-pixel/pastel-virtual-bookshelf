import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, RotateCcw, Eye, EyeOff } from "lucide-react";
import { getFestivalThemeById } from "../../data/festivalData";
import { getSeasonalThemeSuggestion } from "../../constants";

/**
 * FestivalSelector.jsx
 * 
 * Seasonal Festival Selector:
 * - Appears in the navbar ONLY when a festival is around the corner (e.g. Diwali in Nov)
 *   OR when a festive theme is currently activated.
 * - Shows ONLY the single upcoming festival (no clutter of other festivals).
 * - Provides 1-click switch between everyday daily theme and the seasonal festival.
 */

export default function FestivalSelector({
  currentThemeId = "sage-cream",
  onSelectTheme,
  onReturnToDailyTheme,
  animationEnabled = true,
  onToggleAnimation
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const seasonalFestival = getSeasonalThemeSuggestion();
  const isFestiveActive = currentThemeId.startsWith("festive-");
  const activeFestival = isFestiveActive ? getFestivalThemeById(currentThemeId) : null;
  const targetThemeId = isFestiveActive ? currentThemeId : seasonalFestival?.themeId;
  const featuredFestival = targetThemeId ? getFestivalThemeById(targetThemeId) : null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ONLY show if a festive theme is active OR a festival is around the corner
  if (!isFestiveActive && !seasonalFestival) {
    return null;
  }

  const handleSelect = (themeId) => {
    onSelectTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="festival-selector-wrapper" ref={dropdownRef}>
      <div className="festive-trigger-button-cluster">
        {/* Navbar Trigger Pill */}
        <button
          type="button"
          className={`festival-nav-trigger ${
            isFestiveActive ? "festive-active" : "festive-around-corner"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          title={
            isFestiveActive
              ? `Currently in ${activeFestival?.name || "Festive"} Mode`
              : `${seasonalFestival?.name} is around the corner! Tap to celebrate.`
          }
          aria-expanded={isOpen}
        >
          <span className="fest-trigger-icon">
            {isFestiveActive ? activeFestival?.icon : seasonalFestival?.icon || "✨"}
          </span>
          <span className="fest-trigger-name">
            {isFestiveActive ? activeFestival?.name : `${seasonalFestival?.name} ✨`}
          </span>
          <ChevronDown size={13} className={`fest-chevron ${isOpen ? "open" : ""}`} />
        </button>

        {/* 1-Click Quick Exit button back to Daily Theme */}
        {isFestiveActive && onReturnToDailyTheme && (
          <button
            type="button"
            className="exit-festive-mode-btn"
            onClick={onReturnToDailyTheme}
            title="Return to your saved Daily Aesthetic Theme"
          >
            <RotateCcw size={12} />
            <span>Daily Mode</span>
          </button>
        )}
      </div>

      {/* Dropdown Menu - Strictly ONLY for the festival around the corner */}
      <AnimatePresence>
        {isOpen && featuredFestival && (
          <motion.div
            className="festival-dropdown-menu single-festival-menu"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.16 }}
          >
            {/* Dropdown Header */}
            <div className="fest-drop-head">
              <div className="fest-drop-title">
                <Sparkles size={14} />
                <span>
                  {isFestiveActive ? "Festive Atmosphere" : "Upcoming Festival"}
                </span>
              </div>
              <span className="fest-drop-count">
                {isFestiveActive ? "Active Now" : "Around The Corner"}
              </span>
            </div>

            {/* Single Spotlight Card */}
            <div className="fest-single-spotlight-card">
              <div className="fest-single-spotlight-top">
                <span className="fest-single-icon">{featuredFestival.icon}</span>
                <div className="fest-single-info">
                  <div className="fest-single-title-row">
                    <strong className="fest-single-title">{featuredFestival.name}</strong>
                    <span className="fest-single-badge-pill">
                      {isFestiveActive ? "Active" : featuredFestival.badge || "Seasonal"}
                    </span>
                  </div>
                  <p className="fest-single-desc">
                    {seasonalFestival?.reason || featuredFestival.description}
                  </p>
                </div>
              </div>

              {/* Color Swatches */}
              {featuredFestival.swatches && (
                <div className="fest-single-swatches">
                  <span className="swatches-label">Palette:</span>
                  <div className="swatches-dots">
                    {featuredFestival.swatches.slice(0, 4).map((col, idx) => (
                      <span
                        key={idx}
                        className="opt-dot"
                        style={{ backgroundColor: col }}
                        title={col}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="fest-single-actions">
                {!isFestiveActive ? (
                  <button
                    type="button"
                    className="fest-celebrate-primary-btn"
                    onClick={() => handleSelect(featuredFestival.id)}
                  >
                    Celebrate {featuredFestival.name} {featuredFestival.icon}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="fest-return-daily-action-btn"
                    onClick={() => {
                      setIsOpen(false);
                      onReturnToDailyTheme?.();
                    }}
                  >
                    <RotateCcw size={13} /> Exit to Daily Theme
                  </button>
                )}
              </div>
            </div>

            {/* Quick Animation Toggle Switch (Only for festive effects) */}
            <div className="fest-animation-toggle-row">
              <div className="toggle-label-wrap">
                {animationEnabled ? <Eye size={13} /> : <EyeOff size={13} />}
                <span>Floating Festival Effects</span>
              </div>
              <button
                type="button"
                className={`mini-pill-toggle ${animationEnabled ? "on" : "off"}`}
                onClick={onToggleAnimation}
                title={animationEnabled ? "Turn animations OFF" : "Turn animations ON"}
              >
                {animationEnabled ? "ON" : "OFF"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
