import React, { useState } from "react";
import { Sparkles, X, ArrowRight, Wand2 } from "lucide-react";
import { getSeasonalThemeSuggestion } from "../constants";

export default function SeasonalBanner({ currentThemeId, onApplyTheme, onOpenFestivals }) {
  const [dismissed, setDismissed] = useState(false);
  const suggestion = getSeasonalThemeSuggestion();

  if (!suggestion || dismissed) return null;
  // If user is already on this festive theme, do not show suggestion banner
  if (currentThemeId === suggestion.themeId) return null;

  return (
    <div className="seasonal-suggestion-banner">
      <div className="banner-content">
        <span className="banner-sparkle">{suggestion.icon || "✨"}</span>
        <div className="banner-text">
          <strong>Festival Around the Corner: {suggestion.name}</strong>
          <span> — {suggestion.reason}</span>
        </div>
      </div>
      <div className="banner-actions">
        <button
          type="button"
          className="banner-apply-btn"
          onClick={() => onApplyTheme(suggestion.themeId)}
          title={`Activate ${suggestion.name} Festival Atmosphere`}
        >
          Celebrate {suggestion.name} {suggestion.icon} <ArrowRight size={13} />
        </button>
        <button
          type="button"
          className="banner-dismiss-btn"
          onClick={() => setDismissed(true)}
          title="Dismiss seasonal banner"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}