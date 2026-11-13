/**
 * bookDimensions.js
 * 
 * Computes realistic physical book dimensions based on page count,
 * format (hardcover vs paperback), and unique book attributes.
 */

/**
 * Calculates physical spine thickness (in pixels) according to the user's
 * proportional thickness system:
 * 
 * 100–150 pages: Very thin book (~18px - 22px)
 * 150–250 pages: Thin book (~24px - 30px)
 * 250–400 pages: Medium book (~32px - 42px)
 * 400–600 pages: Thick book (~44px - 56px)
 * 600–900 pages: Very thick book (~58px - 72px)
 * 900+ pages:    Extra thick book (~74px - 88px)
 */
export function calculateSpineThickness(pages = 280, isStacked = false) {
  const p = Math.max(50, Math.min(3000, Number(pages) || 280));
  let width;

  if (p <= 150) {
    // 100 - 150: 18px to 22px
    width = 18 + ((p - 100) / 50) * 4;
  } else if (p <= 250) {
    // 150 - 250: 22px to 30px
    width = 22 + ((p - 150) / 100) * 8;
  } else if (p <= 400) {
    // 250 - 400: 30px to 42px
    width = 30 + ((p - 250) / 150) * 12;
  } else if (p <= 600) {
    // 400 - 600: 42px to 56px
    width = 42 + ((p - 400) / 200) * 14;
  } else if (p <= 900) {
    // 600 - 900: 56px to 72px
    width = 56 + ((p - 600) / 300) * 16;
  } else {
    // 900+: 72px to 88px
    width = 72 + Math.min(16, ((p - 900) / 600) * 16);
  }

  // When books are stacked horizontally, height represents their spine thickness
  if (isStacked) {
    return Math.round(Math.max(28, Math.min(68, width * 0.85)));
  }

  return Math.round(Math.max(18, Math.min(88, width)));
}

/**
 * Calculates organic vertical book height on the shelf (in pixels)
 * Realistic variation between standard mass paperback (~195px) and tall hardcover (~240px).
 */
export function calculateBookHeight(pages = 280, id = "") {
  const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) || 0;
  // Variations: 205, 210, 215, 220, 225, 230, 235, 240
  const heightVariants = [205, 212, 218, 224, 230, 236, 242];
  const baseHeight = heightVariants[hash % heightVariants.length];

  // Thick books are often taller hardcovers
  const p = Number(pages) || 280;
  if (p > 500) {
    return Math.min(245, baseHeight + 6);
  }
  return baseHeight;
}

/**
 * Determines spine styling attributes:
 * - Color palette (cloth, leather, paper)
 * - Foil color (gold, silver, blind deboss)
 * - Orientation (vertical for thin/medium, horizontal or stacked for thick)
 * - Typography styling
 */
export function getSpineAttributes(book, thickness) {
  const isThick = thickness >= 40;
  const isVeryThin = thickness <= 24;

  // Compute a consistent color if book.spineColor not already set
  const title = book.title || "Untitled";
  const author = book.author || "";
  const spineColor = book.spineColor || "#5a6856";

  // Derive foil accent
  const foilColor = book.foilColor || (spineColor === "#cfbeaa" ? "#4a3c31" : "#e5c365");

  return {
    isThick,
    isVeryThin,
    spineColor,
    foilColor,
    hasAuthenticSpine: Boolean(book.authenticSpineUrl),
    publisherName: book.publisher || "Library Edition"
  };
}
