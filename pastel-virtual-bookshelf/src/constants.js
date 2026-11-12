export const REGULAR_THEMES = [
  {
    id: "sage-cream",
    name: "Sage Green & Cream",
    description: "Muted sage, ivory, warm beige and olive. Calm, natural, and earthy.",
    isDefault: true,
    colors: {
      primary: "#6a7b67",
      primaryHover: "#586955",
      accent: "#8c9f87",
      bgMain: "#f9f8f4",
      bgCard: "#ffffff",
      bgMuted: "#f1efe8",
      border: "#e5e1d4",
      textHead: "#364134",
      textBody: "#536050",
      textMuted: "#889484",
      woodLight: "#c8baa6",
      woodDark: "#9e8e79",
      shelfPlank: "linear-gradient(180deg, #d2c5b3, #b4a38f 48%, #93816c)",
      shelfTrim: "#84725d"
    },
    swatches: ["#7a8d76", "#fdfcf9", "#e7e2d6", "#5a6856"]
  },
  {
    id: "dusty-rose",
    name: "Dusty Rose",
    description: "Dusty pink, blush, cream and muted mauve. Romantic and nostalgic.",
    colors: {
      primary: "#a87180",
      primaryHover: "#935c6b",
      accent: "#c796a3",
      bgMain: "#fdf8f9",
      bgCard: "#ffffff",
      bgMuted: "#f6ecef",
      border: "#ebdbe0",
      textHead: "#4a353c",
      textBody: "#6c535b",
      textMuted: "#9f868e",
      woodLight: "#d4bfbf",
      woodDark: "#a99293",
      shelfPlank: "linear-gradient(180deg, #d8c4c5, #bd9fa1 48%, #997b7e)",
      shelfTrim: "#87696b"
    },
    swatches: ["#ba8392", "#f6e8eb", "#fdfbfb", "#8b5f6e"]
  },
  {
    id: "lavender-dreams",
    name: "Lavender Dreams",
    description: "Muted lavender, pale lilac, off-white and soft grey. Dreamy and tranquil.",
    colors: {
      primary: "#8578a6",
      primaryHover: "#716492",
      accent: "#a99ec5",
      bgMain: "#faf8fc",
      bgCard: "#ffffff",
      bgMuted: "#f1edf7",
      border: "#e5def0",
      textHead: "#3d344d",
      textBody: "#5e556e",
      textMuted: "#9086a1",
      woodLight: "#cac1d4",
      woodDark: "#9d92a9",
      shelfPlank: "linear-gradient(180deg, #d1c7dc, #b4a7c2 48%, #8e7f9f)",
      shelfTrim: "#7e6f8f"
    },
    swatches: ["#9487b5", "#eae4f4", "#fcfbfe", "#6e618b"]
  },
  {
    id: "vintage-academia",
    name: "Vintage Academia",
    description: "Dark brown, parchment, antique beige and burgundy. Stately and scholarly.",
    colors: {
      primary: "#6b353e",
      primaryHover: "#552830",
      accent: "#a16d53",
      bgMain: "#f7f2ea",
      bgCard: "#ffffff",
      bgMuted: "#eee5d7",
      border: "#ded1be",
      textHead: "#2d2019",
      textBody: "#4d3d34",
      textMuted: "#877366",
      woodLight: "#8c6e53",
      woodDark: "#573f2c",
      shelfPlank: "linear-gradient(180deg, #876a4f, #664d36 48%, #4a3422)",
      shelfTrim: "#3c2919"
    },
    swatches: ["#443226", "#ebdcc8", "#782d3b", "#bfa268"]
  },
  {
    id: "sky-blue",
    name: "Sky Blue",
    description: "Dusty blue, powder blue, ivory and muted navy. Serene, airy and crisp.",
    colors: {
      primary: "#5c7d96",
      primaryHover: "#496880",
      accent: "#83a4bd",
      bgMain: "#f7fafc",
      bgCard: "#ffffff",
      bgMuted: "#edf3f7",
      border: "#d9e5ed",
      textHead: "#2b3c48",
      textBody: "#495d6c",
      textMuted: "#7e93a3",
      woodLight: "#b5c5cf",
      woodDark: "#8597a3",
      shelfPlank: "linear-gradient(180deg, #c4d3dd, #a0b3c0 48%, #788d9c)",
      shelfTrim: "#677b89"
    },
    swatches: ["#6f8fa8", "#dbe8f0", "#fafcfd", "#375066"]
  },
  {
    id: "mocha-coffee",
    name: "Mocha & Coffee",
    description: "Coffee brown, caramel, taupe and cream. Warm, cozy, and comforting.",
    colors: {
      primary: "#7a5742",
      primaryHover: "#644431",
      accent: "#b08560",
      bgMain: "#f9f6f2",
      bgCard: "#ffffff",
      bgMuted: "#f1ebe2",
      border: "#e3d9cc",
      textHead: "#35261d",
      textBody: "#544236",
      textMuted: "#8e7869",
      woodLight: "#b79a83",
      woodDark: "#826650",
      shelfPlank: "linear-gradient(180deg, #ba9c83, #997c63 48%, #735740)",
      shelfTrim: "#5f442e"
    },
    swatches: ["#6a4c37", "#b88a62", "#f5eee4", "#8c705d"]
  }
];

export const FESTIVE_THEMES = [
  {
    id: "festive-diwali",
    name: "Diwali Celebration",
    badge: "Festival of Lights",
    description: "Warm golden, cream, amber and deep maroon. Glowing diyas, golden sparkles and rangoli motifs.",
    colors: {
      primary: "#943b29",
      primaryHover: "#7b2f20",
      accent: "#d49a37",
      bgMain: "#fdf8ee",
      bgCard: "#fffdf9",
      bgMuted: "#f6ecd4",
      border: "#edd7a8",
      textHead: "#451c14",
      textBody: "#66362b",
      textMuted: "#9a6a4f",
      woodLight: "#a35f3d",
      woodDark: "#6e3b23",
      shelfPlank: "linear-gradient(180deg, #af6a46, #894b2a 48%, #643118)",
      shelfTrim: "#532511"
    },
    swatches: ["#d4af37", "#fdf8ee", "#b85332", "#661825"],
    decorations: {
      shelfIcon: "diya",
      ambientIcon: "sparkle",
      cornerMotif: "rangoli",
      quote: "May every story kindle a gentle light within."
    }
  },
  {
    id: "festive-holi",
    name: "Holi Joy",
    badge: "Festival of Colours",
    description: "Soft pastel pink, yellow, lavender, mint and blue. Elegant abstract pastel splashes and joy.",
    colors: {
      primary: "#c86788",
      primaryHover: "#b25272",
      accent: "#76a6cf",
      bgMain: "#fcf8fd",
      bgCard: "#ffffff",
      bgMuted: "#faeff5",
      border: "#edd6e5",
      textHead: "#482b40",
      textBody: "#6d4a63",
      textMuted: "#9e7a93",
      woodLight: "#d4bcd0",
      woodDark: "#a88fa4",
      shelfPlank: "linear-gradient(180deg, #dec8da, #be9fb8 48%, #987892)",
      shelfTrim: "#82637b"
    },
    swatches: ["#f2a7bb", "#f6da86", "#c3b6e8", "#a8decb"],
    decorations: {
      shelfIcon: "color-splash",
      ambientIcon: "petal",
      cornerMotif: "floral-gulal",
      quote: "Life is a canvas painted with every story we embrace."
    }
  },
  {
    id: "festive-christmas",
    name: "Cosy Christmas",
    badge: "Winter Magic",
    description: "Forest green, muted red, ivory and champagne gold. Evergreen garland, stars, snowflakes and fairy lights.",
    colors: {
      primary: "#2e5645",
      primaryHover: "#234436",
      accent: "#a23c4a",
      bgMain: "#f9fbf9",
      bgCard: "#ffffff",
      bgMuted: "#eaf2eb",
      border: "#d2e3d5",
      textHead: "#1b3327",
      textBody: "#344e41",
      textMuted: "#698174",
      woodLight: "#6e5546",
      woodDark: "#453228",
      shelfPlank: "linear-gradient(180deg, #7c6252, #5c4436 48%, #412e23)",
      shelfTrim: "#342217"
    },
    swatches: ["#2d4a3e", "#9e3948", "#faf8f5", "#d1b87d"],
    decorations: {
      shelfIcon: "pine-lights",
      ambientIcon: "snow",
      cornerMotif: "holly",
      quote: "Cold winter evenings, warm blankets, and stories to keep you company."
    }
  },
  {
    id: "festive-halloween",
    name: "Enchanted Halloween",
    badge: "Autumn Mystery",
    description: "Muted burnt orange, plum, charcoal and cream. Small pumpkins, crescent moons, stars and mystery.",
    colors: {
      primary: "#b25f32",
      primaryHover: "#9a4e25",
      accent: "#694c6a",
      bgMain: "#faf7f4",
      bgCard: "#ffffff",
      bgMuted: "#f2ece4",
      border: "#e2d6c6",
      textHead: "#30262b",
      textBody: "#4f4148",
      textMuted: "#84747b",
      woodLight: "#5a4540",
      woodDark: "#392b27",
      shelfPlank: "linear-gradient(180deg, #6c534c, #4f3b35 48%, #362621)",
      shelfTrim: "#271b17"
    },
    swatches: ["#ba6233", "#543a52", "#2e2b34", "#f4eee3"],
    decorations: {
      shelfIcon: "pumpkin",
      ambientIcon: "bat-star",
      cornerMotif: "crescent",
      quote: "There is magic in the night when pages whisper ancient secrets."
    }
  },
  {
    id: "festive-eid",
    name: "Blessed Eid",
    badge: "Celebration & Peace",
    description: "Emerald green, champagne gold, ivory and muted teal. Crescent moons, stars and elegant brass lanterns.",
    colors: {
      primary: "#265b4c",
      primaryHover: "#1d493c",
      accent: "#c79e49",
      bgMain: "#f9fcfb",
      bgCard: "#ffffff",
      bgMuted: "#eaf3ef",
      border: "#d1e4dc",
      textHead: "#193c32",
      textBody: "#31564b",
      textMuted: "#66897e",
      woodLight: "#8c7e68",
      woodDark: "#5c503e",
      shelfPlank: "linear-gradient(180deg, #9b8d76, #796c56 48%, #574c3a)",
      shelfTrim: "#463c2c"
    },
    swatches: ["#245a4b", "#c79e49", "#f9faf6", "#356c73"],
    decorations: {
      shelfIcon: "lantern",
      ambientIcon: "crescent-star",
      cornerMotif: "arabesque",
      quote: "Wishing you peace, harmony, and beautiful tales to inspire the heart."
    }
  },
  {
    id: "festive-navratri",
    name: "Navratri & Durga Puja",
    badge: "Divine Grace",
    description: "Muted vermilion, cream, antique gold and deep red. Floral marigold garlands, traditional motifs and diyas.",
    colors: {
      primary: "#a83e32",
      primaryHover: "#8f3025",
      accent: "#d49a37",
      bgMain: "#fef9f4",
      bgCard: "#ffffff",
      bgMuted: "#f8ece0",
      border: "#ebd6c2",
      textHead: "#421e18",
      textBody: "#663830",
      textMuted: "#9c685f",
      woodLight: "#995d43",
      woodDark: "#673a27",
      shelfPlank: "linear-gradient(180deg, #a7674a, #82472e 48%, #5e301d)",
      shelfTrim: "#4e2514"
    },
    swatches: ["#b84435", "#d69a38", "#fcf8f2", "#6e1d27"],
    decorations: {
      shelfIcon: "marigold",
      ambientIcon: "sparkle",
      cornerMotif: "alpana",
      quote: "Celebrating devotion, courage, and timeless wisdom in every line."
    }
  },
  {
    id: "festive-newyear",
    name: "New Year Starlight",
    badge: "Fresh Beginnings",
    description: "Midnight blue, champagne gold, silver and ivory. Stars, subtle glitter and fresh-start journal aesthetic.",
    colors: {
      primary: "#2f4261",
      primaryHover: "#23334d",
      accent: "#c7a858",
      bgMain: "#f7f9fc",
      bgCard: "#ffffff",
      bgMuted: "#ebf0f7",
      border: "#d6e0ed",
      textHead: "#1e2a3c",
      textBody: "#3b4b63",
      textMuted: "#72849e",
      woodLight: "#707d91",
      woodDark: "#444e5d",
      shelfPlank: "linear-gradient(180deg, #7c8a9f, #5b677a 48%, #3e4857)",
      shelfTrim: "#313946"
    },
    swatches: ["#1f2a3c", "#cdae5b", "#d9dcde", "#f6f8fa"],
    decorations: {
      shelfIcon: "newyear-stars",
      ambientIcon: "firework-glitter",
      cornerMotif: "constellation",
      quote: "365 new chapters waiting to be written and lived."
    }
  }
];

export const ALL_THEMES = [...REGULAR_THEMES, ...FESTIVE_THEMES];

export const AVATAR_OPTIONS = [
  { id: "cozy-reader", name: "Cozy Sweater Reader", icon: "🧣", bg: "#f0e6dd", label: "Cozy Reader" },
  { id: "wise-cat", name: "Library Cat", icon: "🐱", bg: "#e9edf5", label: "Feline Bookworm" },
  { id: "tea-botanical", name: "Tea & Pressed Florals", icon: "🍵", bg: "#e9f2eb", label: "Botanical Tea" },
  { id: "antique-quill", name: "Antique Ink & Quill", icon: "🪶", bg: "#f5eee3", label: "Quiet Author" },
  { id: "stacked-books", name: "Tower of Hardcovers", icon: "📚", bg: "#ede7f5", label: "Collector" },
  { id: "starlit-dreamer", name: "Moonlit Pages", icon: "🌙", bg: "#e5eff8", label: "Night Reader" },
  { id: "coffee-journal", name: "Mocha & Journal", icon: "☕", bg: "#f3ebe2", label: "Journalist" },
  { id: "pressed-flower", name: "Wildflower Sprig", icon: "🌸", bg: "#fbebee", label: "Gentle Soul" }
];

export const BOOK_SPINE_PALETTES = [
  { name: "Sage Linen", bg: "#7f937d", text: "#f6fbf5", foil: "#dce7db" },
  { name: "Dusty Mauve", bg: "#a87889", text: "#fef6f8", foil: "#f6d8e2" },
  { name: "French Navy", bg: "#4a627a", text: "#f0f6fc", foil: "#c9ddf0" },
  { name: "Burnt Terracotta", bg: "#ad614b", text: "#fff6f3", foil: "#feded4" },
  { name: "Warm Parchment", bg: "#cfbeaa", text: "#43352b", foil: "#5c4a3c" },
  { name: "Espresso Leather", bg: "#524036", text: "#faeee6", foil: "#dfc1aa" },
  { name: "Forest Velvet", bg: "#3e5b4b", text: "#eef8f2", foil: "#c0ded0" },
  { name: "Deep Plum", bg: "#654968", text: "#faeefc", foil: "#debfe3" },
  { name: "Antique Gold", bg: "#b5944d", text: "#fffdf7", foil: "#faeec8" },
  { name: "Muted Clay", bg: "#9e7766", text: "#fff8f5", foil: "#f5d7cb" }
];

export const LITERARY_QUOTES = [
  { quote: "A reader lives a thousand lives before he dies . . . The man who never reads lives only one.", author: "George R.R. Martin" },
  { quote: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
  { quote: "Between the pages of a book is a lovely place to be.", author: "Anonymous" },
  { quote: "She read books as one would breathe air, to fill up and live.", author: "Annie Dillard" },
  { quote: "I have always imagined that Paradise will be a kind of library.", author: "Jorge Luis Borges" },
  { quote: "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.", author: "J.K. Rowling" },
  { quote: "Books are a uniquely portable magic.", author: "Stephen King" },
  { quote: "A room without books is like a body without a soul.", author: "Cicero" }
];

export function getSeasonalThemeSuggestion() {
  const now = new Date();
  const month = now.getMonth(); // 0 = Jan, 9 = Oct, 10 = Nov, 11 = Dec
  const day = now.getDate();

  // November (Diwali season)
  if (month === 10) {
    return {
      themeId: "festive-diwali",
      name: "Diwali Celebration",
      reason: "It's the festive season of Diwali! Celebrate with golden glowing lights."
    };
  }
  // December (Christmas season)
  if (month === 11) {
    return {
      themeId: "festive-christmas",
      name: "Cosy Christmas",
      reason: "Winter magic is here! Welcome festive fairy lights and snow."
    };
  }
  // January (New Year)
  if (month === 0) {
    return {
      themeId: "festive-newyear",
      name: "New Year Starlight",
      reason: "A brand new year of reading adventures awaits!"
    };
  }
  // March (Holi)
  if (month === 2) {
    return {
      themeId: "festive-holi",
      name: "Holi Joy",
      reason: "Celebrate spring with gentle pastel colour splashes."
    };
  }
  // October (Halloween)
  if (month === 9) {
    return {
      themeId: "festive-halloween",
      name: "Enchanted Halloween",
      reason: "Crisp autumn leaves and mysterious cozy evenings are here."
    };
  }
  // Default suggestion if no major festival matches this exact date
  return null;
}
