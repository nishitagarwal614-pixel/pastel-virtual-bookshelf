import React from "react";

/**
 * bookThematics.js
 * 
 * Provides authentic book spine color palettes, typography styles,
 * and charming thematic book icons (matching the reference design):
 * - Snitch, Botanical Leaf, Library Door, Antique Key, Chess Piece,
 *   Growth Chart, Compass Rose, Heart, Fingerprint, Speech Bubble,
 *   Peace Dove, Open Book, Golden Rosette, etc.
 */

// Authentic curated palette inspired by fine hardcover editions
export const SPINES_PALETTE = [
  { id: "dusty-rose", bg: "#d97d91", text: "#fff8fa", foil: "#ffffff", dark: false },
  { id: "crimson-red", bg: "#a82225", text: "#fff5f5", foil: "#f6d89b", dark: true },
  { id: "midnight-navy", bg: "#162c45", text: "#f6d89b", foil: "#f6d89b", dark: true },
  { id: "forest-green", bg: "#1f4233", text: "#f6d89b", foil: "#f6d89b", dark: true },
  { id: "prussian-blue", bg: "#25455f", text: "#ffffff", foil: "#f6d89b", dark: true },
  { id: "black-leather", bg: "#181717", text: "#f6d89b", foil: "#f6d89b", dark: true },
  { id: "parchment-cream", bg: "#eee2cb", text: "#24190e", foil: "#24190e", dark: false },
  { id: "scarlet-red", bg: "#9e1f1f", text: "#f6d89b", foil: "#f6d89b", dark: true },
  { id: "warm-ivory", bg: "#eae4d6", text: "#2a1d12", foil: "#2a1d12", dark: false },
  { id: "burgundy-wine", bg: "#851c27", text: "#f6d89b", foil: "#f6d89b", dark: true },
  { id: "bone-white", bg: "#e6e2db", text: "#281b10", foil: "#281b10", dark: false },
  { id: "amber-mustard", bg: "#dca032", text: "#291c0e", foil: "#291c0e", dark: false },
  { id: "powder-sky", bg: "#7eaecf", text: "#1b2f42", foil: "#1b2f42", dark: false },
  { id: "golden-marigold", bg: "#d99f2b", text: "#2c1c0a", foil: "#2c1c0a", dark: false }
];

export function getBookThematicDetails(book, index = 0) {
  const title = (book.title || "").toLowerCase();
  const genre = (book.genre || "").toLowerCase();
  const author = (book.author || "").toLowerCase();

  // 1. Identify Icon
  let icon = "book";
  if (title.includes("potter") || title.includes("magic") || genre.includes("fantasy") || genre.includes("witch")) {
    icon = "snitch";
  } else if (title.includes("patient") || title.includes("silent") || genre.includes("nature") || genre.includes("botany")) {
    icon = "leaf";
  } else if (title.includes("library") || title.includes("midnight") || title.includes("room") || title.includes("house of")) {
    icon = "door";
  } else if (title.includes("secret") || title.includes("housemaid") || title.includes("lock") || genre.includes("thriller")) {
    icon = "key";
  } else if (title.includes("evelyn hardcastle") || title.includes("game") || title.includes("chess") || genre.includes("mystery")) {
    icon = "chess";
  } else if (title.includes("ceo") || title.includes("diary") || title.includes("money") || genre.includes("business") || genre.includes("finance")) {
    icon = "chart";
  } else if (title.includes("harbor") || title.includes("strange") || title.includes("sea") || title.includes("ocean") || genre.includes("adventure")) {
    icon = "compass";
  } else if (title.includes("red flags") || title.includes("love") || title.includes("heart") || genre.includes("romance")) {
    icon = "heart";
  } else if (title.includes("lie") || title.includes("never") || title.includes("clue") || genre.includes("crime")) {
    icon = "fingerprint";
  } else if (title.includes("talk") || title.includes("someone") || genre.includes("psychology") || genre.includes("self-help")) {
    icon = "speech";
  } else if (title.includes("malala") || title.includes("peace") || title.includes("freedom") || genre.includes("biography") || genre.includes("memoir")) {
    icon = "dove";
  } else if (title.includes("seven husbands") || title.includes("evelyn hugo") || title.includes("flower") || title.includes("beauty")) {
    icon = "flower";
  } else if (title.includes("material") || title.includes("good") || genre.includes("classic")) {
    icon = "book";
  } else if (genre.includes("poetry")) {
    icon = "quill";
  } else {
    // Deterministic icon based on title string
    const iconList = ["flower", "leaf", "door", "key", "star", "heart", "compass", "book", "dove"];
    const hash = (title + author).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) || index;
    icon = iconList[hash % iconList.length];
  }

  // 2. Identify Palette
  let matchedPalette = null;
  if (book.spineColor) {
    matchedPalette = SPINES_PALETTE.find((p) => p.bg.toLowerCase() === book.spineColor.toLowerCase());
  }

  if (!matchedPalette) {
    // Custom matching for famous book styles
    if (title.includes("world's best")) matchedPalette = SPINES_PALETTE[0]; // dusty rose
    else if (title.includes("evelyn hugo")) matchedPalette = SPINES_PALETTE[1]; // crimson
    else if (title.includes("harry potter")) matchedPalette = SPINES_PALETTE[2]; // navy
    else if (title.includes("silent patient")) matchedPalette = SPINES_PALETTE[3]; // forest green
    else if (title.includes("midnight library")) matchedPalette = SPINES_PALETTE[4]; // prussian blue
    else if (title.includes("housemaid")) matchedPalette = SPINES_PALETTE[5]; // black leather
    else if (title.includes("evelyn hardcastle")) matchedPalette = SPINES_PALETTE[6]; // parchment cream
    else if (title.includes("diary of a ceo")) matchedPalette = SPINES_PALETTE[7]; // scarlet red
    else if (title.includes("strange harbors")) matchedPalette = SPINES_PALETTE[8]; // warm ivory
    else if (title.includes("red flags")) matchedPalette = SPINES_PALETTE[9]; // burgundy
    else if (title.includes("never lie")) matchedPalette = SPINES_PALETTE[10]; // bone white
    else if (title.includes("talk to someone")) matchedPalette = SPINES_PALETTE[11]; // amber mustard
    else if (title.includes("malala")) matchedPalette = SPINES_PALETTE[12]; // powder sky
    else if (title.includes("good material")) matchedPalette = SPINES_PALETTE[13]; // golden marigold
    else {
      const pHash = (title + author).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) || index;
      matchedPalette = SPINES_PALETTE[pHash % SPINES_PALETTE.length];
    }
  }

  return {
    icon,
    spineColor: book.spineColor || matchedPalette.bg,
    textColor: matchedPalette.text,
    foilColor: matchedPalette.foil,
    isDark: matchedPalette.dark
  };
}

/**
 * High-definition vector icons crafted in the exact aesthetic of the reference image
 */
export function BookThematicIcon({ name, color = "#f6d89b", size = 20 }) {
  const s = size;

  switch (name) {
    case "snitch":
      // Golden Flying Snitch (Winged sphere)
      return (
        <svg width={s * 1.5} height={s} viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Central golden ball */}
          <circle cx="18" cy="12" r="5" fill={color} />
          <circle cx="16.5" cy="10.5" r="1.5" fill="#fff" opacity="0.6" />
          {/* Left curved feathered wing */}
          <path d="M14 11C11 8 5 7 1 10C5 12 9 13 13 13Z" fill={color} opacity="0.9" />
          <path d="M13 12C9 13 6 15 2 15C6 16 9 15 13 13Z" fill={color} opacity="0.7" />
          {/* Right curved feathered wing */}
          <path d="M22 11C25 8 31 7 35 10C31 12 27 13 23 13Z" fill={color} opacity="0.9" />
          <path d="M23 12C27 13 30 15 34 15C30 16 27 15 23 13Z" fill={color} opacity="0.7" />
        </svg>
      );

    case "leaf":
      // Botanical sprig with 3 elegant leaves
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 20C9 17 14 12 18 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M18 5C14 5 12 8 13 11C15 11 18 9 18 5Z" fill={color} />
          <path d="M14 12C10 11 8 13 9 16C11 16 14 14 14 12Z" fill={color} />
          <path d="M9 16C6 15 4 17 5 19C7 19 9 18 9 16Z" fill={color} />
        </svg>
      );

    case "door":
      // Arched library door
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 21V9C5 5.13 8.13 2 12 2C15.87 2 19 5.13 19 9V21" stroke={color} strokeWidth="1.8" />
          <line x1="12" y1="3" x2="12" y2="21" stroke={color} strokeWidth="1.2" />
          <rect x="7" y="10" width="3" height="4" rx="0.5" stroke={color} strokeWidth="1.2" />
          <rect x="14" y="10" width="3" height="4" rx="0.5" stroke={color} strokeWidth="1.2" />
          <circle cx="10" cy="16" r="1" fill={color} />
          <circle cx="14" cy="16" r="1" fill={color} />
          <line x1="4" y1="21" x2="20" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "key":
      // Antique skeleton key
      return (
        <svg width={s * 1.3} height={s} viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="10" r="5" stroke={color} strokeWidth="1.8" />
          <circle cx="7" cy="10" r="2" fill={color} />
          <path d="M12 10H24" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M20 10V14" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M23 10V15" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "chess":
      // Chess King / Knight
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 2H13M12 1V4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8 8C8 5.79 9.79 5 12 5C14.21 5 16 5.79 16 8C16 10 14 11 14 13H10C10 11 8 10 8 8Z" fill={color} />
          <rect x="9" y="14" width="6" height="4" fill={color} />
          <path d="M6 21H18V19H6V21Z" fill={color} />
        </svg>
      );

    case "chart":
      // Bar growth chart with upward diagonal arrow
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="14" width="3" height="6" rx="0.5" fill={color} />
          <rect x="10" y="10" width="3" height="10" rx="0.5" fill={color} />
          <rect x="15" y="6" width="3" height="14" rx="0.5" fill={color} />
          <path d="M6 9L18 3M18 3H14M18 3V7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "compass":
      // Nautical compass rose
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
          <polygon points="12,4 14,10 20,12 14,14 12,20 10,14 4,12 10,10" fill={color} />
          <circle cx="12" cy="12" r="1.5" fill="#fff" />
        </svg>
      );

    case "heart":
      // Elegant heart outline
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 20.5C12 20.5 4 15.5 4 9C4 5.5 6.5 3.5 9.5 3.5C11.5 3.5 12 4.5 12 4.5C12 4.5 12.5 3.5 14.5 3.5C17.5 3.5 20 5.5 20 9C20 15.5 12 20.5 12 20.5Z"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "fingerprint":
      // Elegant fingerprint whorls
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4C8 4 6 7 6 10C6 14 8 18 12 20" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12 7C9.5 7 8.5 9 8.5 11C8.5 14 10 17 12 18" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M15 8C16 9.5 16 11 16 13C16 16 14.5 18 13.5 19" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18 10C18.5 11.5 18.5 13.5 18 16" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case "speech":
      // Minimalist dialogue speech bubble
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 12C19 7.58 15.87 4 12 4C8.13 4 5 7.58 5 12C5 13.78 5.7 15.4 6.89 16.66L6 20L9.4 18.9C10.22 19.3 11.09 19.5 12 19.5C15.87 19.5 19 16.42 19 12Z"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "dove":
      // Flying peace dove
      return (
        <svg width={s * 1.3} height={s} viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 14C7 14 10 12 12 9C12 5 15 2 19 3C18 6 19 8 22 9C24 9.5 26 8.5 26 8.5C25 11 23 13 20 14C17 15 15 17 12 18C8 19 5 17 4 14Z"
            fill={color}
          />
          <circle cx="21" cy="6" r="1" fill="#fff" />
        </svg>
      );

    case "flower":
      // Elegant 8-petal golden rosette
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" fill={color} />
          <circle cx="12" cy="6" r="2.5" fill={color} />
          <circle cx="12" cy="18" r="2.5" fill={color} />
          <circle cx="6" cy="12" r="2.5" fill={color} />
          <circle cx="18" cy="12" r="2.5" fill={color} />
          <circle cx="7.7" cy="7.7" r="2.5" fill={color} />
          <circle cx="16.3" cy="7.7" r="2.5" fill={color} />
          <circle cx="7.7" cy="16.3" r="2.5" fill={color} />
          <circle cx="16.3" cy="16.3" r="2.5" fill={color} />
        </svg>
      );

    case "quill":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 3C14 4 8 10 6 18L3 21L7 19C9 16 11 12 20 3Z" fill={color} />
          <line x1="6" y1="18" x2="14" y2="10" stroke="#fff" strokeWidth="1" />
        </svg>
      );

    case "star":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9" fill={color} />
        </svg>
      );

    case "book":
    default:
      // Open hardcover book
      return (
        <svg width={s * 1.3} height={s} viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 4C6 3 10 3 13 5V18C10 16 6 16 3 17V4Z"
            stroke={color}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M25 4C22 3 18 3 15 5V18C18 16 22 16 25 17V4Z"
            stroke={color}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <line x1="14" y1="5" x2="14" y2="18" stroke={color} strokeWidth="1.4" />
        </svg>
      );
  }
}
