import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Sparkles, Palette, Check, RefreshCw, SunMedium, Flame, Moon, Gift } from "lucide-react";
import { REGULAR_THEMES, FESTIVE_THEMES, getSeasonalThemeSuggestion } from "../constants";

export default function ThemeModal({
  currentThemeId,
  initialTab = null,
  onSelectTheme,
  festiveAnimationEnabled,
  onToggleFestiveAnimation,
  onClose
}) {
  const seasonalSuggestion = getSeasonalThemeSuggestion();
  const festiveThemesToShow = FESTIVE_THEMES.filter(
    (t) =>
      (seasonalSuggestion && t.id === seasonalSuggestion.themeId) ||
      (currentThemeId.startsWith("festive-") && t.id === currentThemeId)
  );

  const [activeTab, setActiveTab] = useState(
    initialTab || (currentThemeId.startsWith("festive-") ? "festive" : "regular")
  );
  const [previewThemeId, setPreviewThemeId] = useState(currentThemeId);

  const handleApplyTheme = (themeId) => {
    onSelectTheme(themeId);
    setPreviewThemeId(themeId);
  };

  const handleResetDefault = () => {
    onSelectTheme("sage-cream");
    setPreviewThemeId("sage-cream");
  };

  return (
    <div className="modal-backdrop-aesthetic" onClick={onClose}>
      <motion.div
        className="theme-modal-card"
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="theme-modal-head">
          <div className="aesthetic-badge">
            <Palette size={13} /> PALETTE & ATMOSPHERE
          </div>
          <h2>Theme Customisation</h2>
          <p className="modal-subtitle">
            Personalise your digital reading sanctuary with elegant muted palettes or complete celebratory festive atmospheres.
          </p>
        </div>

        {/* Categories Tab: Regular Palettes vs Festive Themes */}
        <div className="theme-category-tabs">
          <button
            type="button"
            className={`cat-tab ${activeTab === "regular" ? "active" : ""}`}
            onClick={() => setActiveTab("regular")}
          >
            <Palette size={15} />
            <span>Daily Themes</span>
            <span className="cat-count">{REGULAR_THEMES.length} (Light &amp; Dark)</span>
          </button>
          <button
            type="button"
            className={`cat-tab ${activeTab === "festive" ? "active" : ""}`}
            onClick={() => setActiveTab("festive")}
          >
            <Sparkles size={15} />
            <span>Upcoming Festival</span>
            <span className="cat-badge-festive">Around Corner</span>
          </button>
        </div>

        {/* Ambient Animation Toggle */}
        <div className="animation-toggle-bar">
          <div className="toggle-info">
            <strong>Festive Ambient Animations</strong>
            <small>Gentle twinkling lights, falling snowflakes, or golden sparkles</small>
          </div>
          <button
            type="button"
            className={`aesthetic-switch ${festiveAnimationEnabled ? "on" : "off"}`}
            onClick={onToggleFestiveAnimation}
            aria-label="Toggle festive animations"
          >
            <span className="switch-handle" />
          </button>
        </div>

        {/* REGULAR THEMES GRID */}
        {activeTab === "regular" && (
          <div className="themes-display-grid">
            {REGULAR_THEMES.map((theme) => {
              const isActive = currentThemeId === theme.id;
              const isDefault = theme.isDefault;

              return (
                <div
                  key={theme.id}
                  className={`theme-swatch-card ${isActive ? "selected-theme" : ""}`}
                  onClick={() => handleApplyTheme(theme.id)}
                >
                  <div className="swatch-card-header">
                    <h4>{theme.name}</h4>
                    {isDefault && <span className="default-tag">Default</span>}
                    {theme.isDark && <span className="dark-theme-pill">🌙 Dark</span>}
                    {isActive && (
                      <span className="active-tag">
                        <Check size={12} /> Active
                      </span>
                    )}
                  </div>
                  <p className="theme-card-desc">{theme.description}</p>

                  {/* Swatches strip */}
                  <div className="swatches-strip">
                    {theme.swatches.map((color, i) => (
                      <span
                        key={i}
                        className="color-dot"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>

                  <div className="theme-card-footer">
                    <button
                      type="button"
                      className={`apply-theme-btn ${isActive ? "btn-current" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyTheme(theme.id);
                      }}
                    >
                      {isActive ? "Currently Active" : "Apply Palette"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FESTIVE THEMES: Strictly ONLY the festival around the corner */}
        {activeTab === "festive" && (
          <div className="festive-display-grid">
            {festiveThemesToShow.map((theme) => {
              const isActive = currentThemeId === theme.id;

              return (
                <div
                  key={theme.id}
                  className={`festive-theme-card ${isActive ? "selected-festive" : ""}`}
                  onClick={() => handleApplyTheme(theme.id)}
                >
                  <div className="festive-card-top">
                    <span className="festive-badge">{theme.badge}</span>
                    {isActive && (
                      <span className="active-tag">
                        <Check size={12} /> Active
                      </span>
                    )}
                  </div>

                  <h4>{theme.name}</h4>
                  <p className="festive-desc">{theme.description}</p>

                  <div className="festive-quote-preview">
                    <em>&ldquo;{theme.decorations.quote}&rdquo;</em>
                  </div>

                  {/* Swatches */}
                  <div className="swatches-strip">
                    {theme.swatches.map((color, i) => (
                      <span
                        key={i}
                        className="color-dot"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>

                  <div className="festive-card-footer">
                    <button
                      type="button"
                      className={`apply-theme-btn ${isActive ? "btn-current" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyTheme(theme.id);
                      }}
                    >
                      {isActive ? "Currently Active" : "Activate Celebration"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="theme-modal-actions">
          <button
            type="button"
            className="restore-default-link"
            onClick={handleResetDefault}
          >
            <RefreshCw size={13} /> Restore Default (Sage Green &amp; Cream)
          </button>
          <button type="button" className="close-theme-btn" onClick={onClose}>
            Done &amp; Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
