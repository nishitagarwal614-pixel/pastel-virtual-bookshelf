import React from "react";
import { motion } from "framer-motion";

/**
 * FestivalDecorations.jsx
 * 
 * Elegant, non-intrusive ornaments framing the wooden bookshelf:
 * - Draped garland along the top crown molding
 * - Side hanging pendants & corner motifs
 * - Subtle ambient lighting halo
 * 
 * STRICT RULE: Does not overlap, rearrange, or obscure any books on the shelves.
 */

export default function FestivalDecorations({ themeId = "sage-cream", enabled = true }) {
  if (!enabled || !themeId || themeId === "sage-cream" || themeId === "normal") {
    return null;
  }

  // 1. DIWALI
  if (themeId === "festive-diwali") {
    return (
      <div className="festival-decor-overlay diwali-decor" aria-hidden="true">
        {/* Top Shelf Crown Garland */}
        <div className="crown-garland-wrap">
          <div className="diwali-crown-lights">
            <span className="diya-fixture diya-left">🪔</span>
            <div className="golden-marigold-strand">
              <span>✦</span>
              <span className="marigold-dot m1" />
              <span>ॐ</span>
              <span className="marigold-dot m2" />
              <span>🪔</span>
              <span className="marigold-dot m1" />
              <span>ॐ</span>
              <span className="marigold-dot m2" />
              <span>✦</span>
            </div>
            <span className="diya-fixture diya-right">🪔</span>
          </div>
        </div>

        {/* Side Lantern Pendants */}
        <div className="side-pendant side-pendant-left diwali-kandil">
          <div className="pendant-wire" />
          <div className="kandil-body">🪔</div>
        </div>
        <div className="side-pendant side-pendant-right diwali-kandil">
          <div className="pendant-wire" />
          <div className="kandil-body">🪔</div>
        </div>
      </div>
    );
  }

  // 2. HOLI
  if (themeId === "festive-holi") {
    return (
      <div className="festival-decor-overlay holi-decor" aria-hidden="true">
        <div className="crown-garland-wrap">
          <div className="holi-crown-garland">
            <span className="gulal-splash-badge s-pink">🌸</span>
            <div className="pastel-rainbow-garland">
              <span className="p-dot c-pink" />
              <span className="p-dot c-yellow" />
              <span className="p-dot c-cyan" />
              <span className="p-dot c-mint" />
              <span className="p-dot c-lavender" />
              <span className="p-dot c-pink" />
              <span className="p-dot c-yellow" />
            </div>
            <span className="gulal-splash-badge s-yellow">🎨</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. CHRISTMAS
  if (themeId === "festive-christmas") {
    return (
      <div className="festival-decor-overlay christmas-decor" aria-hidden="true">
        <div className="crown-garland-wrap">
          <div className="pine-garland-crown">
            <span className="pine-sprig">🌿</span>
            <div className="fairy-lights-string">
              <span className="light-bulb bulb-gold" />
              <span className="light-bulb bulb-red" />
              <span className="light-bulb bulb-green" />
              <span className="holly-accent">🍒</span>
              <span className="light-bulb bulb-gold" />
              <span className="light-bulb bulb-blue" />
              <span className="light-bulb bulb-red" />
            </div>
            <span className="pine-sprig">🌿</span>
          </div>
        </div>

        {/* Hanging Holiday Baubles */}
        <div className="side-pendant side-pendant-left xmas-bauble">
          <div className="pendant-wire" />
          <div className="bauble-body">🎄</div>
        </div>
        <div className="side-pendant side-pendant-right xmas-bauble">
          <div className="pendant-wire" />
          <div className="bauble-body">⭐</div>
        </div>
      </div>
    );
  }

  // 4. HALLOWEEN
  if (themeId === "festive-halloween") {
    return (
      <div className="festival-decor-overlay halloween-decor" aria-hidden="true">
        <div className="crown-garland-wrap">
          <div className="autumn-gothic-crown">
            <span className="pumpkin-fixture p-left">🎃</span>
            <div className="autumn-leaves-strand">
              <span>🍂</span>
              <span className="bat-silhouette">🦇</span>
              <span>🍁</span>
              <span className="moon-charm">🌙</span>
              <span>🍂</span>
              <span className="bat-silhouette">🦇</span>
              <span>🍁</span>
            </div>
            <span className="pumpkin-fixture p-right">🎃</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. EID
  if (themeId === "festive-eid") {
    return (
      <div className="festival-decor-overlay eid-decor" aria-hidden="true">
        <div className="crown-garland-wrap">
          <div className="eid-celestial-crown">
            <span className="fanous-fixture f-left">🏮</span>
            <div className="crescent-stars-strand">
              <span>✧</span>
              <span>⭐</span>
              <span className="center-crescent">🌙</span>
              <span>⭐</span>
              <span>✧</span>
            </div>
            <span className="fanous-fixture f-right">🏮</span>
          </div>
        </div>
        <div className="side-pendant side-pendant-left eid-lantern">
          <div className="pendant-wire" />
          <div className="lantern-ornament">🏮</div>
        </div>
        <div className="side-pendant side-pendant-right eid-lantern">
          <div className="pendant-wire" />
          <div className="lantern-ornament">🏮</div>
        </div>
      </div>
    );
  }

  // 6. DURGA PUJA / NAVRATRI
  if (themeId === "festive-navratri") {
    return (
      <div className="festival-decor-overlay durga-decor" aria-hidden="true">
        <div className="crown-garland-wrap">
          <div className="durga-marigold-crown">
            <span className="kalash-fixture">🪔</span>
            <div className="marigold-dense-chain">
              <span>🏵️</span>
              <span>🌼</span>
              <span>🌺</span>
              <span className="sacred-alpana">✦</span>
              <span>🌺</span>
              <span>🌼</span>
              <span>🏵️</span>
            </div>
            <span className="kalash-fixture">🪔</span>
          </div>
        </div>
      </div>
    );
  }

  // 7. RAKSHA BANDHAN
  if (themeId === "festive-rakhi") {
    return (
      <div className="festival-decor-overlay rakhi-decor" aria-hidden="true">
        <div className="crown-garland-wrap">
          <div className="rakhi-silk-crown">
            <span className="rakhi-motif r-left">🧵</span>
            <div className="silk-threads-chain">
              <span className="silk-bead b-gold" />
              <span className="silk-tassel">✨</span>
              <span className="rakhi-centerpiece">🏵️</span>
              <span className="silk-tassel">✨</span>
              <span className="silk-bead b-gold" />
            </div>
            <span className="rakhi-motif r-right">🧵</span>
          </div>
        </div>
      </div>
    );
  }

  // 8. VALENTINE'S DAY
  if (themeId === "festive-valentines") {
    return (
      <div className="festival-decor-overlay valentines-decor" aria-hidden="true">
        <div className="crown-garland-wrap">
          <div className="valentines-rose-crown">
            <span className="heart-fixture">💖</span>
            <div className="rose-petals-chain">
              <span>🌹</span>
              <span className="heart-dot" />
              <span>💌</span>
              <span className="heart-center">💕</span>
              <span>💌</span>
              <span className="heart-dot" />
              <span>🌹</span>
            </div>
            <span className="heart-fixture">💖</span>
          </div>
        </div>
      </div>
    );
  }

  // 9. EASTER
  if (themeId === "festive-easter") {
    return (
      <div className="festival-decor-overlay easter-decor" aria-hidden="true">
        <div className="crown-garland-wrap">
          <div className="easter-spring-crown">
            <span className="egg-fixture">🥚</span>
            <div className="spring-daisy-chain">
              <span>🌸</span>
              <span>🦋</span>
              <span className="chick-accent">🐣</span>
              <span>🦋</span>
              <span>🌸</span>
            </div>
            <span className="egg-fixture">🥚</span>
          </div>
        </div>
      </div>
    );
  }

  // 10. MAKAR SANKRANTI
  if (themeId === "festive-sankranti") {
    return (
      <div className="festival-decor-overlay sankranti-decor" aria-hidden="true">
        <div className="crown-garland-wrap">
          <div className="sankranti-kite-crown">
            <span className="mini-kite k-left">🪁</span>
            <div className="kite-garland-chain">
              <span>☀️</span>
              <span className="kite-diamond kd-orange">✦</span>
              <span className="firki-spool">🧵</span>
              <span className="kite-diamond kd-blue">✦</span>
              <span>☀️</span>
            </div>
            <span className="mini-kite k-right">🪁</span>
          </div>
        </div>
      </div>
    );
  }

  // 11. CHINESE NEW YEAR
  if (themeId === "festive-cny") {
    return (
      <div className="festival-decor-overlay cny-decor" aria-hidden="true">
        <div className="crown-garland-wrap">
          <div className="cny-lantern-crown">
            <span className="paper-lantern pl-left">🏮</span>
            <div className="cny-garland-chain">
              <span>🧧</span>
              <span className="gold-ingot">🪙</span>
              <span className="plum-flower">🌸</span>
              <span className="gold-ingot">🪙</span>
              <span>🧧</span>
            </div>
            <span className="paper-lantern pl-right">🏮</span>
          </div>
        </div>
        <div className="side-pendant side-pendant-left cny-knot">
          <div className="pendant-wire" />
          <div className="knot-ornament">🏮</div>
        </div>
        <div className="side-pendant side-pendant-right cny-knot">
          <div className="pendant-wire" />
          <div className="knot-ornament">🏮</div>
        </div>
      </div>
    );
  }

  return null;
}