import React from "react";
import { motion } from "framer-motion";

/**
 * ShelfDecorations.jsx
 * 
 * Aesthetic shelf accessories crafted to match the user's reference screenshot:
 * 1. FramedPhotoProp: Vintage gold beveled picture frame with puppy portrait
 * 2. HimalayanSaltLampProp: Crystalline salt rock with warm glowing amber light
 * 3. ClassicalBustProp: Classical Roman/Greek museum sculpture bust on pedestal
 * 4. VintageFigurineProp: Vintage literary collector bust / figure
 */

export function FramedPhotoProp({
  imageUrl = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
  caption = "Little Reading Companion",
  className = ""
}) {
  return (
    <motion.div
      className={`shelf-prop-item shelf-framed-photo ${className}`}
      whileHover={{ scale: 1.04, y: -4, rotate: -1, transition: { duration: 0.2 } }}
      title={caption}
    >
      <div className="picture-frame-outer">
        {/* Brass Corner Brackets */}
        <span className="frame-bracket bracket-tl" />
        <span className="frame-bracket bracket-tr" />
        <span className="frame-bracket bracket-bl" />
        <span className="frame-bracket bracket-br" />

        {/* Inner Wooden Matting */}
        <div className="picture-frame-mat">
          {/* Framed Image */}
          <div className="picture-frame-canvas">
            <img
              src={imageUrl}
              alt="Framed pet portrait"
              className="framed-photo-img"
              loading="lazy"
              onError={(e) => {
                // Fallback to warm illustrated puppy if network is offline
                e.target.style.display = "none";
                e.target.parentNode.classList.add("puppy-svg-fallback");
              }}
            />
            {/* Glass Glare Reflection */}
            <div className="frame-glass-reflection" />
          </div>
        </div>

        {/* Frame Shadow */}
        <div className="frame-shelf-contact-shadow" />
      </div>
    </motion.div>
  );
}

export function HimalayanSaltLampProp({ className = "" }) {
  return (
    <motion.div
      className={`shelf-prop-item shelf-salt-lamp ${className}`}
      whileHover={{ scale: 1.05, y: -3, transition: { duration: 0.2 } }}
      title="Himalayan Salt Crystal Lamp (Warm Ambient Glow)"
    >
      <div className="salt-lamp-assembly">
        {/* Ambient Halo Radiance */}
        <div className="salt-lamp-ambient-glow" />

        {/* Sculpted Crystalline Rock Body */}
        <div className="salt-lamp-crystal-rock">
          {/* Crystal facets and mineral striations */}
          <div className="crystal-facet facet-1" />
          <div className="crystal-facet facet-2" />
          <div className="crystal-facet facet-3" />
          <div className="crystal-hotspot-light" />
        </div>

        {/* Dark Turned Wood / Mahogany Base */}
        <div className="salt-lamp-wood-base">
          <div className="base-ring-top" />
          <div className="base-body" />
        </div>

        {/* Shelf Glow Spill Shadow */}
        <div className="salt-lamp-shelf-spill" />
      </div>
    </motion.div>
  );
}

export function ClassicalBustProp({ className = "" }) {
  return (
    <motion.div
      className={`shelf-prop-item shelf-classical-bust ${className}`}
      whileHover={{ scale: 1.04, y: -4, rotate: 1, transition: { duration: 0.2 } }}
      title="Classical Antiquities Marble & Bronze Sculpture Bust"
    >
      <div className="classical-bust-assembly">
        {/* Sculpted Bust (Head & Shoulders) */}
        <svg
          className="bust-silhouette-svg"
          viewBox="0 0 100 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bustGradient" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#d1b89d" />
              <stop offset="40%" stopColor="#9a7f65" />
              <stop offset="70%" stopColor="#5f4a38" />
              <stop offset="100%" stopColor="#3d2d20" />
            </linearGradient>
            <linearGradient id="pedestalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4a392b" />
              <stop offset="35%" stopColor="#a38971" />
              <stop offset="70%" stopColor="#c5ad96" />
              <stop offset="100%" stopColor="#3d2d20" />
            </linearGradient>
            <filter id="bustHighlight" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Classical Head, Hair Curls & Face */}
          <g filter="url(#bustHighlight)">
            {/* Hair volume & laurel crown */}
            <path
              d="M50 12C36 12 30 22 30 32C28 35 27 40 30 46C29 50 32 55 35 56C36 60 40 66 43 70C46 74 48 76 50 76C52 76 54 74 57 70C60 66 64 60 65 56C68 55 71 50 70 46C73 40 72 35 70 32C70 22 64 12 50 12Z"
              fill="url(#bustGradient)"
            />
            {/* Classical nose, cheek, eye shadow relief */}
            <path
              d="M48 34L47 48L53 50L49 53L44 53"
              stroke="#2e1f14"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Eyes */}
            <ellipse cx="43" cy="38" rx="2.5" ry="1.2" fill="#2e1f14" opacity="0.6" />
            <ellipse cx="57" cy="38" rx="2.5" ry="1.2" fill="#2e1f14" opacity="0.6" />
            {/* Lips */}
            <path d="M46 59C48 58 52 58 54 59C52 61 48 61 46 59Z" fill="#2e1f14" opacity="0.6" />

            {/* Neck */}
            <path d="M43 70V82C43 85 40 88 38 90H62C60 88 57 85 57 82V70" fill="url(#bustGradient)" />

            {/* Shoulders with classic Greek toga drapery */}
            <path
              d="M38 90C28 92 12 98 10 108C9 113 14 115 22 116H78C86 115 91 113 90 108C88 98 72 92 62 90H38Z"
              fill="url(#bustGradient)"
            />
            {/* Toga folds / drapery creases */}
            <path d="M24 100C32 108 42 112 52 114" stroke="#e8d5bf" strokeWidth="1.8" opacity="0.4" />
            <path d="M68 98C60 106 50 111 38 114" stroke="#25170d" strokeWidth="2" opacity="0.6" />
          </g>

          {/* Classical Turned Pedestal / Base */}
          <path d="M36 116H64L62 124H38L36 116Z" fill="url(#pedestalGrad)" />
          <rect x="32" y="124" width="36" height="6" rx="1" fill="url(#pedestalGrad)" />
          <rect x="26" y="130" width="48" height="8" rx="2" fill="url(#pedestalGrad)" />
        </svg>

        {/* Shelf Cast Shadow */}
        <div className="bust-shelf-contact-shadow" />
      </div>
    </motion.div>
  );
}

export function VintageFigurineProp({ className = "" }) {
  return (
    <motion.div
      className={`shelf-prop-item shelf-vintage-figurine ${className}`}
      whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.2 } }}
      title="Vintage Detective / Gentleman Bust Prop"
    >
      <div className="vintage-figurine-assembly">
        <svg
          className="figurine-svg"
          viewBox="0 0 90 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="tweedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8d6e63" />
              <stop offset="60%" stopColor="#5d4037" />
              <stop offset="100%" stopColor="#3e2723" />
            </linearGradient>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0b99c" />
              <stop offset="100%" stopColor="#b2886a" />
            </linearGradient>
          </defs>

          {/* Tweed Flat Cap / Bowler Hat */}
          <path d="M22 38C22 24 32 18 45 18C58 18 68 24 68 38H72L75 42H15L18 38H22Z" fill="#3e2723" />
          {/* Hat Brim highlight */}
          <path d="M15 42H75" stroke="#a1887f" strokeWidth="1.5" />

          {/* Gentleman Face */}
          <path d="M28 42H62V66C62 74 54 80 45 80C36 80 28 74 28 66V42Z" fill="url(#skinGrad)" />
          {/* Prominent Vintage Mustache */}
          <path d="M34 65C38 68 45 68 45 65C45 68 52 68 56 65C59 66 61 69 57 71C50 73 45 70 45 70C45 70 40 73 33 71C29 69 31 66 34 65Z" fill="#2d1d16" />

          {/* Vintage Smoking Pipe */}
          <path d="M46 68L36 76H30L27 68H23L27 80H37L50 69" stroke="#d7ccc8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M21 68H27V76H21V68Z" fill="#5d4037" />

          {/* Tweed Jacket Collar & Lapels */}
          <path d="M15 88L30 82L45 98L60 82L75 88L82 120H8L15 88Z" fill="url(#tweedGrad)" />
          {/* Crisp shirt & collar */}
          <path d="M38 82L45 92L52 82H38Z" fill="#fafafa" />
          <path d="M43 92L45 110L47 92H43Z" fill="#c62828" />

          {/* Pedestal Base */}
          <rect x="20" y="120" width="50" height="8" rx="2" fill="#212121" />
        </svg>

        {/* Shelf shadow */}
        <div className="bust-shelf-contact-shadow" />
      </div>
    </motion.div>
  );
}
