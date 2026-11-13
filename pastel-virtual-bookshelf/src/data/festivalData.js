/**
 * festivalData.js
 * Comprehensive configuration for the Interactive Festival Theme System.
 * Covers 12 distinct themes: Normal Theme + 11 Festivals:
 * 1. Normal Theme (Serene Sage & Cream)
 * 2. Diwali (Festival of Lights)
 * 3. Holi (Festival of Colours)
 * 4. Christmas (Winter Magic & Joy)
 * 5. Halloween (Enchanted Autumn Mystery)
 * 6. Eid (Celebration & Peace)
 * 7. Durga Puja / Navratri (Divine Grace & Courage)
 * 8. Raksha Bandhan (Bonds of Love & Kinship)
 * 9. Valentine's Day (Romance & Literature)
 * 10. Easter (Spring Blossoms & Rebirth)
 * 11. Makar Sankranti (Solar Harvest & Soaring Kites)
 * 12. Chinese New Year (Lunar Prosperity & Spring Festival)
 */

export const FESTIVAL_THEMES = [
  {
    id: "sage-cream",
    slug: "normal",
    name: "Normal Theme",
    subtitle: "Serene Sage & Cream Library",
    badge: "Default Sanctuary",
    icon: "📚",
    greeting: "Welcome to your serene reading sanctuary",
    quote: "A room without books is like a body without a soul.",
    countdownLabel: "Reading Reflection Time",
    targetMonth: 11, // Ongoing
    targetDay: 31,
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
      shelfTrim: "#84725d",
      glowColor: "rgba(106, 123, 103, 0.25)",
      haloGrad: "radial-gradient(ellipse at 50% 0%, rgba(200, 186, 166, 0.2) 0%, transparent 70%)"
    },
    swatches: ["#7a8d76", "#fdfcf9", "#e7e2d6", "#5a6856"],
    particleType: "gentle_pages",
    challenge: {
      id: "ch_normal",
      title: "Mindful Reader Ritual",
      targetCount: 3,
      description: "Read 3 uplifting titles to enrich your mind and spirit this month.",
      badgeName: "Tranquil Bibliophile",
      badgeIcon: "🌿"
    },
    surpriseGift: {
      title: "Before the Coffee Gets Cold",
      author: "Toshikazu Kawaguchi",
      genre: "Magical Realism",
      pages: 224,
      coverColor: "#7a8d76",
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
      festiveMessage: "A quiet, contemplative tale about love, time, and cherished memories."
    },
    recommendations: [
      {
        id: "rec_norm_1",
        title: "The Midnight Library",
        author: "Matt Haig",
        genre: "Philosophical Fiction",
        pages: 304,
        rating: 4.8,
        coverColor: "#2b4c6f",
        description: "Between life and death there is a library containing millions of lives you could have lived."
      },
      {
        id: "rec_norm_2",
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        genre: "Literary Sci-Fi",
        pages: 320,
        rating: 4.6,
        coverColor: "#8c6e53",
        description: "A luminous story of loyalty, human heart, and observing the world with gentle wonder."
      },
      {
        id: "rec_norm_3",
        title: "Days at the Morisaki Bookshop",
        author: "Satoshi Yagisawa",
        genre: "Cozy Fiction",
        pages: 160,
        rating: 4.7,
        coverColor: "#6a7b67",
        description: "A tender, heartwarming Japanese novel set in the beloved Jimbocho book quarter."
      }
    ],
    achievementBadge: {
      id: "badge_normal",
      name: "Sanctuary Guardian",
      icon: "🕯️",
      description: "Cultivated a serene, mindful daily reading ritual in the library."
    }
  },

  {
    id: "festive-diwali",
    slug: "diwali",
    name: "Diwali",
    subtitle: "Festival of Lights & Prosperity",
    badge: "Festival of Lights",
    icon: "🪔",
    greeting: "Shubh Deepavali! May divine light illuminate your reading path",
    quote: "May every story kindle a gentle golden light within your soul.",
    countdownLabel: "Diwali Festival Night",
    targetMonth: 10, // Nov
    targetDay: 1,
    colors: {
      primary: "#943b29",
      primaryHover: "#7b2f20",
      accent: "#d49a37",
      bgMain: "#fef8ee",
      bgCard: "#fffdf9",
      bgMuted: "#faedd3",
      border: "#ecd5a3",
      textHead: "#451c14",
      textBody: "#66362b",
      textMuted: "#9a6a4f",
      woodLight: "#a35f3d",
      woodDark: "#6e3b23",
      shelfPlank: "linear-gradient(180deg, #af6a46, #894b2a 48%, #643118)",
      shelfTrim: "#532511",
      glowColor: "rgba(212, 154, 55, 0.45)",
      haloGrad: "radial-gradient(ellipse at 50% 0%, rgba(212, 154, 55, 0.35) 0%, transparent 70%)"
    },
    swatches: ["#d4af37", "#fef8ee", "#b85332", "#661825"],
    particleType: "diya_sparkles",
    challenge: {
      id: "ch_diwali",
      title: "Luminescence Quest",
      targetCount: 3,
      description: "Read 3 books that brought inspiration, light, or triumph into your life.",
      badgeName: "Diwali Illuminator",
      badgeIcon: "🪔"
    },
    surpriseGift: {
      title: "The Palace of Illusions",
      author: "Chitra Banerjee Divakaruni",
      genre: "Mythology & Fiction",
      pages: 360,
      coverColor: "#b85332",
      coverImage: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=400&q=80",
      festiveMessage: "A glowing, magical retelling of the Mahabharata from Panchaali's viewpoint."
    },
    recommendations: [
      {
        id: "rec_diw_1",
        title: "The Forest of Enchantments",
        author: "Chitra Banerjee Divakaruni",
        genre: "Mythological Fiction",
        pages: 384,
        rating: 4.8,
        coverColor: "#943b29",
        description: "The Ramayana told from Sita's perspective: an enduring song of courage and unconditional grace."
      },
      {
        id: "rec_diw_2",
        title: "Sita: Warrior of Mithila",
        author: "Amish Tripathi",
        genre: "Epic Mythological Thriller",
        pages: 376,
        rating: 4.7,
        coverColor: "#d49a37",
        description: "Witness the fierce, intellectual, and courageous rise of the legendary warrior princess."
      },
      {
        id: "rec_diw_3",
        title: "The Immortals of Meluha",
        author: "Amish Tripathi",
        genre: "Fantasy & Mythology",
        pages: 412,
        rating: 4.9,
        coverColor: "#365c78",
        description: "Near the holy lake of Mansarovar, a humble Tibetan immigrant's destiny is revealed."
      }
    ],
    achievementBadge: {
      id: "badge_diwali",
      name: "Golden Diya Keeper",
      icon: "🪔",
      description: "Celebrated Diwali with golden lanterns, warm diyas, and heartwarming stories."
    }
  },

  {
    id: "festive-holi",
    slug: "holi",
    name: "Holi",
    subtitle: "Festival of Vibrant Colours & Joy",
    badge: "Festival of Colours",
    icon: "🎨",
    greeting: "Bura na mano, Holi hai! Celebrate with a splash of stories",
    quote: "Life is a pristine canvas painted with every colourful story we embrace.",
    countdownLabel: "Holi Gulal Celebration",
    targetMonth: 2, // March
    targetDay: 14,
    colors: {
      primary: "#c8527a",
      primaryHover: "#ae3b63",
      accent: "#3b82f6",
      bgMain: "#fef9fd",
      bgCard: "#ffffff",
      bgMuted: "#faeef6",
      border: "#eed6e7",
      textHead: "#48213b",
      textBody: "#6d3e5e",
      textMuted: "#9e6f90",
      woodLight: "#c89dbf",
      woodDark: "#94638a",
      shelfPlank: "linear-gradient(180deg, #d8bed2, #b58fab 48%, #8e6284)",
      shelfTrim: "#784b6f",
      glowColor: "rgba(200, 82, 122, 0.35)",
      haloGrad: "radial-gradient(ellipse at 50% 0%, rgba(244, 114, 182, 0.25) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 75%)"
    },
    swatches: ["#ec4899", "#f59e0b", "#8b5cf6", "#10b981"],
    particleType: "holi_gulal",
    challenge: {
      id: "ch_holi",
      title: "Spectrum of Stories",
      targetCount: 3,
      description: "Read 3 books across 3 vibrant, diverse genres (Romance, Mystery, Sci-Fi).",
      badgeName: "Prismatic Bibliophile",
      badgeIcon: "🎨"
    },
    surpriseGift: {
      title: "A Man Called Ove",
      author: "Fredrik Backman",
      genre: "Heartwarming Comedy",
      pages: 337,
      coverColor: "#ec4899",
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
      festiveMessage: "A burst of joy, laughter, and touching friendship that paints the world bright."
    },
    recommendations: [
      {
        id: "rec_holi_1",
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        genre: "Glamour & Drama",
        pages: 400,
        rating: 4.9,
        coverColor: "#059669",
        description: "An intoxicating voyage through Old Hollywood in dazzling, full cinematic technicolor."
      },
      {
        id: "rec_holi_2",
        title: "Red, White & Royal Blue",
        author: "Casey McQuiston",
        genre: "Romantic Comedy",
        pages: 421,
        rating: 4.7,
        coverColor: "#c8527a",
        description: "An irresistible, witty royal romance filled with sparkling humor and boundless heart."
      },
      {
        id: "rec_holi_3",
        title: "The House in the Cerulean Sea",
        author: "TJ Klune",
        genre: "Cozy Fantasy",
        pages: 396,
        rating: 4.9,
        coverColor: "#0284c7",
        description: "A delightful, warm hug of a book bursting with quirky magic and chosen family."
      }
    ],
    achievementBadge: {
      id: "badge_holi",
      name: "Gulal Splash Master",
      icon: "🎉",
      description: "Draped your digital bookshelf in the vibrant joy of colourful springtime stories."
    }
  },

  {
    id: "festive-christmas",
    slug: "christmas",
    name: "Christmas",
    subtitle: "Winter Magic & Fireside Stories",
    badge: "Winter Magic",
    icon: "🎄",
    greeting: "Merry Christmas! Cozy evenings & heartwarming tales",
    quote: "Cold winter evenings, warm blankets, and stories to keep you company.",
    countdownLabel: "Christmas Eve Reading",
    targetMonth: 11, // Dec
    targetDay: 25,
    colors: {
      primary: "#23533b",
      primaryHover: "#19412d",
      accent: "#b91c1c",
      bgMain: "#f8fbf9",
      bgCard: "#ffffff",
      bgMuted: "#eaf3ee",
      border: "#cde3d6",
      textHead: "#143323",
      textBody: "#2e533e",
      textMuted: "#5e846f",
      woodLight: "#6e5546",
      woodDark: "#453228",
      shelfPlank: "linear-gradient(180deg, #7c6252, #5c4436 48%, #412e23)",
      shelfTrim: "#342217",
      glowColor: "rgba(185, 28, 28, 0.35)",
      haloGrad: "radial-gradient(ellipse at 50% 0%, rgba(35, 83, 59, 0.3) 0%, rgba(185, 28, 28, 0.15) 50%, transparent 70%)"
    },
    swatches: ["#23533b", "#b91c1c", "#fef3c7", "#f8fbf9"],
    particleType: "snowflakes",
    challenge: {
      id: "ch_xmas",
      title: "Winter Wonderland Readathon",
      targetCount: 2,
      description: "Curl up and complete 2 cozy winter comfort reads beside the fireside.",
      badgeName: "Fireside Bibliophile",
      badgeIcon: "❄️"
    },
    surpriseGift: {
      title: "A Christmas Carol",
      author: "Charles Dickens",
      genre: "Holiday Classic",
      pages: 116,
      coverColor: "#23533b",
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80",
      festiveMessage: "The timeless tale of Ebenezer Scrooge and the enduring warmth of human kindness."
    },
    recommendations: [
      {
        id: "rec_xmas_1",
        title: "Little Women",
        author: "Louisa May Alcott",
        genre: "Classic Coming-of-Age",
        pages: 449,
        rating: 4.8,
        coverColor: "#b91c1c",
        description: "The heartwarming lives, loves, and snowy New England winters of the four March sisters."
      },
      {
        id: "rec_xmas_2",
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        genre: "High Fantasy",
        pages: 208,
        rating: 4.9,
        coverColor: "#1d4ed8",
        description: "Step through the fur coats into the enchanted snowy land of always winter and Narnia."
      },
      {
        id: "rec_xmas_3",
        title: "In a Holidaze",
        author: "Christina Lauren",
        genre: "Holiday Romance",
        pages: 320,
        rating: 4.6,
        coverColor: "#047857",
        description: "A festive snowy time-loop in a Utah cabin with family, friends, and holiday sparks."
      }
    ],
    achievementBadge: {
      id: "badge_xmas",
      name: "Starlight Noel",
      icon: "⭐",
      description: "Decked the shelves in pine garlands, falling snow, and festive holiday cheer."
    }
  },

  {
    id: "festive-halloween",
    slug: "halloween",
    name: "Halloween",
    subtitle: "Enchanted Autumn & Midnight Mysteries",
    badge: "Autumn Mystery",
    icon: "🎃",
    greeting: "Happy Haunting! Cozy thrills and magical pages await",
    quote: "There is magic in the night when pages whisper ancient secrets.",
    countdownLabel: "All Hallows' Eve",
    targetMonth: 9, // Oct
    targetDay: 31,
    colors: {
      primary: "#c2541f",
      primaryHover: "#a24113",
      accent: "#7e3a9c",
      bgMain: "#faf5ef",
      bgCard: "#ffffff",
      bgMuted: "#f3e9dc",
      border: "#e5d3c0",
      textHead: "#301d14",
      textBody: "#533425",
      textMuted: "#87604d",
      woodLight: "#5a4540",
      woodDark: "#392b27",
      shelfPlank: "linear-gradient(180deg, #6c534c, #4f3b35 48%, #362621)",
      shelfTrim: "#271b17",
      glowColor: "rgba(194, 84, 31, 0.4)",
      haloGrad: "radial-gradient(ellipse at 50% 0%, rgba(194, 84, 31, 0.3) 0%, rgba(126, 58, 156, 0.2) 60%, transparent 80%)"
    },
    swatches: ["#ea580c", "#7e22ce", "#1e1b4b", "#fed7aa"],
    particleType: "halloween_bats_fog",
    challenge: {
      id: "ch_hallow",
      title: "Shadows & Secrets",
      targetCount: 2,
      description: "Conquer 2 spine-chilling thrillers, gothic mysteries, or supernatural tales.",
      badgeName: "Phantom Bibliophile",
      badgeIcon: "🦇"
    },
    surpriseGift: {
      title: "Mexican Gothic",
      author: "Silvia Moreno-Garcia",
      genre: "Gothic Thriller",
      pages: 320,
      coverColor: "#7e22ce",
      coverImage: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=400&q=80",
      festiveMessage: "An isolated mansion, chilling secrets, and atmospheric thrills behind every door."
    },
    recommendations: [
      {
        id: "rec_hal_1",
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "Psychological Thriller",
        pages: 336,
        rating: 4.8,
        coverColor: "#334155",
        description: "Alicia Berenson shoots her husband five times and never speaks another word."
      },
      {
        id: "rec_hal_2",
        title: "Frankenstein",
        author: "Mary Shelley",
        genre: "Gothic Horror Classic",
        pages: 280,
        rating: 4.7,
        coverColor: "#15803d",
        description: "The quintessential gothic science-fiction masterpiece of creation, guilt, and vengeance."
      },
      {
        id: "rec_hal_3",
        title: "Coraline",
        author: "Neil Gaiman",
        genre: "Dark Fantasy",
        pages: 176,
        rating: 4.9,
        coverColor: "#ea580c",
        description: "Through the secret little door lies an alternate home with button eyes and eerie whispers."
      }
    ],
    achievementBadge: {
      id: "badge_halloween",
      name: "Pumpkin King",
      icon: "🎃",
      description: "Braved the midnight shadows and welcomed friendly bats and glowing jack-o'-lanterns."
    }
  },

  {
    id: "festive-eid",
    slug: "eid",
    name: "Eid",
    subtitle: "Celebration, Generosity & Peace",
    badge: "Celebration & Peace",
    icon: "🌙",
    greeting: "Eid Mubarak! Wishing you peace, joy, and inspiring tales",
    quote: "Wishing you peace, harmony, and beautiful tales to inspire the heart.",
    countdownLabel: "Eid Hilal Crescent",
    targetMonth: 3, // April
    targetDay: 10,
    colors: {
      primary: "#1d6150",
      primaryHover: "#154d3f",
      accent: "#d9a744",
      bgMain: "#f7fbf9",
      bgCard: "#ffffff",
      bgMuted: "#e7f4ef",
      border: "#cde5dc",
      textHead: "#133f34",
      textBody: "#2a594b",
      textMuted: "#5e8c7e",
      woodLight: "#8c7e68",
      woodDark: "#5c503e",
      shelfPlank: "linear-gradient(180deg, #9b8d76, #796c56 48%, #574c3a)",
      shelfTrim: "#463c2c",
      glowColor: "rgba(217, 167, 68, 0.4)",
      haloGrad: "radial-gradient(ellipse at 50% 0%, rgba(29, 97, 80, 0.3) 0%, rgba(217, 167, 68, 0.2) 50%, transparent 75%)"
    },
    swatches: ["#1d6150", "#d9a744", "#fef3c7", "#064e3b"],
    particleType: "eid_crescent_lanterns",
    challenge: {
      id: "ch_eid",
      title: "Tales of Grace & Humanity",
      targetCount: 2,
      description: "Read 2 heartwarming stories celebrating kindness, family, and universal empathy.",
      badgeName: "Crescent Scholar",
      badgeIcon: "🌙"
    },
    surpriseGift: {
      title: "The Forty Rules of Love",
      author: "Elif Shafak",
      genre: "Spiritual Historical Fiction",
      pages: 368,
      coverColor: "#1d6150",
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
      festiveMessage: "A luminous tapestry intertwining Rumi and Shams of Tabriz across centuries."
    },
    recommendations: [
      {
        id: "rec_eid_1",
        title: "The Kite Runner",
        author: "Khaled Hosseini",
        genre: "Contemporary Classic",
        pages: 371,
        rating: 4.9,
        coverColor: "#047857",
        description: "An unforgettable, heartbreaking story of the unlikely friendship between Amir and Hassan."
      },
      {
        id: "rec_eid_2",
        title: "A Thousand Splendid Suns",
        author: "Khaled Hosseini",
        genre: "Historical Fiction",
        pages: 432,
        rating: 4.9,
        coverColor: "#d97706",
        description: "A breathtaking chronicle of thirty years of Afghan history through the lives of two brave women."
      },
      {
        id: "rec_eid_3",
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Philosophical Allegory",
        pages: 208,
        rating: 4.8,
        coverColor: "#d9a744",
        description: "Santiago's journey across the Egyptian desert to find his personal legend and destiny."
      }
    ],
    achievementBadge: {
      id: "badge_eid",
      name: "Crescent & Star",
      icon: "🕌",
      description: "Adorned your reading space with shimmering stars, crescent moons, and brass lanterns."
    }
  },

  {
    id: "festive-navratri",
    slug: "durga-puja",
    name: "Durga Puja & Navratri",
    subtitle: "Divine Grace, Rhythm & Courage",
    badge: "Divine Grace",
    icon: "🪕",
    greeting: "Subho Sharodiya! Celebrating strength, triumph, and wisdom",
    quote: "Celebrating devotion, courage, and timeless wisdom in every written line.",
    countdownLabel: "Maha Ashtami Celebration",
    targetMonth: 9, // Oct
    targetDay: 12,
    colors: {
      primary: "#b9382a",
      primaryHover: "#9a2a1d",
      accent: "#e59f2a",
      bgMain: "#fff9f2",
      bgCard: "#ffffff",
      bgMuted: "#faedd8",
      border: "#ecd5b5",
      textHead: "#4a1912",
      textBody: "#6f3126",
      textMuted: "#9c6356",
      woodLight: "#995d43",
      woodDark: "#673a27",
      shelfPlank: "linear-gradient(180deg, #a7674a, #82472e 48%, #5e301d)",
      shelfTrim: "#4e2514",
      glowColor: "rgba(185, 56, 42, 0.4)",
      haloGrad: "radial-gradient(ellipse at 50% 0%, rgba(229, 159, 42, 0.35) 0%, rgba(185, 56, 42, 0.2) 60%, transparent 75%)"
    },
    swatches: ["#dc2626", "#f59e0b", "#991b1b", "#fffbeb"],
    particleType: "durga_marigolds",
    challenge: {
      id: "ch_navratri",
      title: "Valor & Victory Challenge",
      targetCount: 3,
      description: "Read 3 stories featuring courageous, resilient heroes who triumph over adversity.",
      badgeName: "Shakti Scholar",
      badgeIcon: "🌺"
    },
    surpriseGift: {
      title: "Gitanjali",
      author: "Rabindranath Tagore",
      genre: "Poetry & Spiritual Classic",
      pages: 104,
      coverColor: "#b9382a",
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
      festiveMessage: "Tagore's Nobel Prize-winning song offerings of love, devotion, and supreme grace."
    },
    recommendations: [
      {
        id: "rec_durg_1",
        title: "Devdas and Other Stories",
        author: "Sarat Chandra Chattopadhyay",
        genre: "Classic Literature",
        pages: 256,
        rating: 4.7,
        coverColor: "#b91c1c",
        description: "Enduring classic tales exploring passion, loyalty, and Bengal's social canvas."
      },
      {
        id: "rec_durg_2",
        title: "The Namesake",
        author: "Jhumpa Lahiri",
        genre: "Literary Fiction",
        pages: 291,
        rating: 4.8,
        coverColor: "#d97706",
        description: "A poignant portrait of the Ganguli family bridging Calcutta traditions and American dreams."
      },
      {
        id: "rec_durg_3",
        title: "Selected Short Stories",
        author: "Rabindranath Tagore",
        genre: "Bengali Classic Fiction",
        pages: 320,
        rating: 4.9,
        coverColor: "#7f1d1d",
        description: "The timeless Kabuliwala, The Postmaster, and gems of rural Indian life."
      }
    ],
    achievementBadge: {
      id: "badge_durga",
      name: "Marigold Bloom",
      icon: "🏵️",
      description: "Wove auspicious marigold garlands and sacred alpana motifs onto the bookshelf crown."
    }
  },

  {
    id: "festive-rakhi",
    slug: "raksha-bandhan",
    name: "Raksha Bandhan",
    subtitle: "Bonds of Love, Kinship & Protection",
    badge: "Bonds of Love",
    icon: "🧵",
    greeting: "Happy Raksha Bandhan! Celebrating sacred bonds of lifelong love",
    quote: "A sibling and a true friend are life's rarest, sweetest chapters.",
    countdownLabel: "Rakhi Purnima Celebration",
    targetMonth: 7, // August
    targetDay: 19,
    colors: {
      primary: "#b83260",
      primaryHover: "#9a234e",
      accent: "#e09e32",
      bgMain: "#fff8fb",
      bgCard: "#ffffff",
      bgMuted: "#faedf3",
      border: "#ecd3e0",
      textHead: "#451829",
      textBody: "#683348",
      textMuted: "#96657a",
      woodLight: "#bd8aa4",
      woodDark: "#85516b",
      shelfPlank: "linear-gradient(180deg, #ca9db3, #a97790 48%, #815269)",
      shelfTrim: "#6b3f55",
      glowColor: "rgba(184, 50, 96, 0.35)",
      haloGrad: "radial-gradient(ellipse at 50% 0%, rgba(224, 158, 50, 0.3) 0%, rgba(184, 50, 96, 0.2) 60%, transparent 75%)"
    },
    swatches: ["#db2777", "#f59e0b", "#06b6d4", "#fdf2f8"],
    particleType: "rakhi_threads",
    challenge: {
      id: "ch_rakhi",
      title: "Bonds of Kinship",
      targetCount: 2,
      description: "Read 2 heartwarming stories celebrating deep family bonds, sisters, brothers, or true friends.",
      badgeName: "Silken Thread Keeper",
      badgeIcon: "🧵"
    },
    surpriseGift: {
      title: "Little Fires Everywhere",
      author: "Celeste Ng",
      genre: "Family Drama",
      pages: 338,
      coverColor: "#b83260",
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
      festiveMessage: "A gripping, nuanced story of motherhood, sisterhood, and the choices that shape family."
    },
    recommendations: [
      {
        id: "rec_rak_1",
        title: "The Vanishing Half",
        author: "Brit Bennett",
        genre: "Multi-generational Fiction",
        pages: 343,
        rating: 4.8,
        coverColor: "#db2777",
        description: "The riveting lives of twin sisters whose paths diverge dramatically in adulthood."
      },
      {
        id: "rec_rak_2",
        title: "The God of Small Things",
        author: "Arundhati Roy",
        genre: "Literary Masterpiece",
        pages: 340,
        rating: 4.9,
        coverColor: "#0284c7",
        description: "Estha and Rahel: two fraternal twins bonded by innocence, love, and fate in Kerala."
      },
      {
        id: "rec_rak_3",
        title: "East of Eden",
        author: "John Steinbeck",
        genre: "Epic Classic",
        pages: 601,
        rating: 4.9,
        coverColor: "#d97706",
        description: "The monumental generational saga of two families and the complexities of sibling brotherhood."
      }
    ],
    achievementBadge: {
      id: "badge_rakhi",
      name: "Golden Rakhi Medallion",
      icon: "✨",
      description: "Tied the sacred golden silk thread of camaraderie and loyalty around the library."
    }
  },

  {
    id: "festive-valentines",
    slug: "valentines",
    name: "Valentine's Day",
    subtitle: "Love, Poetry & Romantic Pages",
    badge: "Romance & Poetry",
    icon: "💖",
    greeting: "Happy Valentine's! May your days be filled with heartwarming love stories",
    quote: "Whatever our souls are made of, his and mine are the same.",
    countdownLabel: "Valentine's Day",
    targetMonth: 1, // Feb
    targetDay: 14,
    colors: {
      primary: "#be185d",
      primaryHover: "#9d174d",
      accent: "#f43f5e",
      bgMain: "#fff5f8",
      bgCard: "#ffffff",
      bgMuted: "#fce7ef",
      border: "#f9ccd9",
      textHead: "#4a0e26",
      textBody: "#701a3e",
      textMuted: "#9e3f65",
      woodLight: "#cfa6b9",
      woodDark: "#94637a",
      shelfPlank: "linear-gradient(180deg, #d8b7c7, #b88ba0 48%, #8f5f74)",
      shelfTrim: "#784b5f",
      glowColor: "rgba(244, 63, 94, 0.35)",
      haloGrad: "radial-gradient(ellipse at 50% 0%, rgba(244, 63, 94, 0.3) 0%, rgba(190, 24, 93, 0.15) 60%, transparent 75%)"
    },
    swatches: ["#be185d", "#f43f5e", "#fda4af", "#fff1f2"],
    particleType: "valentines_hearts",
    challenge: {
      id: "ch_val",
      title: "Heartstrings Journey",
      targetCount: 2,
      description: "Read 2 romance, poetry, or heartwarming novels that make your heart flutter.",
      badgeName: "Literary Sweetheart",
      badgeIcon: "💝"
    },
    surpriseGift: {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romantic Classic",
      pages: 279,
      coverColor: "#be185d",
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
      festiveMessage: "The quintessential, sparkling comedy of manners between Elizabeth Bennet & Mr. Darcy."
    },
    recommendations: [
      {
        id: "rec_val_1",
        title: "Normal People",
        author: "Sally Rooney",
        genre: "Contemporary Romance",
        pages: 273,
        rating: 4.6,
        coverColor: "#be185d",
        description: "The exquisite, tender, and complex intimacy between Marianne and Connell through the years."
      },
      {
        id: "rec_val_2",
        title: "Song of Achilles",
        author: "Madeline Miller",
        genre: "Mythological Romance",
        pages: 378,
        rating: 4.9,
        coverColor: "#d97706",
        description: "A profound, luminous retelling of the Trojan War and the unbreakable bond of Achilles & Patroclus."
      },
      {
        id: "rec_val_3",
        title: "Book Lovers",
        author: "Emily Henry",
        genre: "Romantic Comedy",
        pages: 384,
        rating: 4.8,
        coverColor: "#0284c7",
        description: "A fierce literary agent and a brooding editor keep crossing paths in a quaint North Carolina town."
      }
    ],
    achievementBadge: {
      id: "badge_val",
      name: "Cupid's Bookmark",
      icon: "💌",
      description: "Surrounded the bookshelf with drifting rose petals, soft blush glows, and romantic tales."
    }
  },

  {
    id: "festive-easter",
    slug: "easter",
    name: "Easter",
    subtitle: "Spring Rebirth, Blossoms & Hope",
    badge: "Spring Renewal",
    icon: "🐣",
    greeting: "Happy Easter! Celebrating spring blossoms, hope, and new chapters",
    quote: "Spring is far more than just a changing of seasons; it is a rebirth of the spirit.",
    countdownLabel: "Easter Sunday",
    targetMonth: 3, // April
    targetDay: 20,
    colors: {
      primary: "#6d597a",
      primaryHover: "#554460",
      accent: "#b56576",
      bgMain: "#faf8fc",
      bgCard: "#ffffff",
      bgMuted: "#f1ebf5",
      border: "#e2d6ea",
      textHead: "#35283e",
      textBody: "#584664",
      textMuted: "#8a7596",
      woodLight: "#cbbcd4",
      woodDark: "#94829e",
      shelfPlank: "linear-gradient(180deg, #d3c6db, #b09eb8 48%, #887491)",
      shelfTrim: "#725f7a",
      glowColor: "rgba(181, 101, 118, 0.35)",
      haloGrad: "radial-gradient(ellipse at 50% 0%, rgba(109, 89, 122, 0.25) 0%, rgba(251, 191, 36, 0.15) 50%, transparent 75%)"
    },
    swatches: ["#a78bfa", "#fde047", "#6ee7b7", "#f472b6"],
    particleType: "easter_blossoms",
    challenge: {
      id: "ch_easter",
      title: "Spring Renewal Challenge",
      targetCount: 2,
      description: "Read 2 uplifting books about hope, healing, and embarking on fresh beginnings.",
      badgeName: "Springtime Dreamer",
      badgeIcon: "🌸"
    },
    surpriseGift: {
      title: "The Secret Garden",
      author: "Frances Hodgson Burnett",
      genre: "Children's Classic",
      pages: 250,
      coverColor: "#6d597a",
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
      festiveMessage: "The magical revival of a forgotten locked garden and the healing power of nature."
    },
    recommendations: [
      {
        id: "rec_eas_1",
        title: "Anne of Green Gables",
        author: "L.M. Montgomery",
        genre: "Classic Coming-of-Age",
        pages: 320,
        rating: 4.9,
        coverColor: "#059669",
        description: "The spirited, imaginative orphan girl who brings joy, humor, and renewal to Prince Edward Island."
      },
      {
        id: "rec_eas_2",
        title: "The Blue Castle",
        author: "L.M. Montgomery",
        genre: "Cozy Romance",
        pages: 218,
        rating: 4.8,
        coverColor: "#6d597a",
        description: "Valancy Stirling breaks free from her stifling family to discover wild woods and true courage."
      },
      {
        id: "rec_eas_3",
        title: "The Wind in the Willows",
        author: "Kenneth Grahame",
        genre: "Pastoral Classic",
        pages: 192,
        rating: 4.7,
        coverColor: "#d97706",
        description: "Messing about in boats along the riverbank with Mole, Ratty, and Toad in golden spring."
      }
    ],
    achievementBadge: {
      id: "badge_easter",
      name: "Pastel Spring Egg",
      icon: "🥚",
      description: "Nestled hand-painted pastel eggs and fresh wildflowers along the bookcase shelves."
    }
  },

  {
    id: "festive-sankranti",
    slug: "makar-sankranti",
    name: "Makar Sankranti",
    subtitle: "Solar Harvest, Soaring Kites & Warmth",
    badge: "Solar Harvest",
    icon: "🪁",
    greeting: "Happy Makar Sankranti & Pongal! May your aspirations soar like kites",
    quote: "Til-gul ghya, god god bola: May your words and stories sweeten every day.",
    countdownLabel: "Uttarayan Sunrise",
    targetMonth: 0, // Jan
    targetDay: 14,
    colors: {
      primary: "#2563eb",
      primaryHover: "#1d4ed8",
      accent: "#f59e0b",
      bgMain: "#f6faff",
      bgCard: "#ffffff",
      bgMuted: "#eaf2fd",
      border: "#d0e1f9",
      textHead: "#152c5b",
      textBody: "#29467d",
      textMuted: "#5e7cb5",
      woodLight: "#a3b8cc",
      woodDark: "#677f99",
      shelfPlank: "linear-gradient(180deg, #b0c4d8, #869cb3 48%, #5f748a)",
      shelfTrim: "#4e6175",
      glowColor: "rgba(245, 158, 11, 0.4)",
      haloGrad: "radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.3) 0%, rgba(37, 99, 235, 0.15) 50%, transparent 75%)"
    },
    swatches: ["#0284c7", "#f59e0b", "#10b981", "#ffedd5"],
    particleType: "sankranti_kites",
    challenge: {
      id: "ch_sankranti",
      title: "Soar Higher Challenge",
      targetCount: 2,
      description: "Read 2 books that elevate your mindset, broaden your horizons, or spark big dreams.",
      badgeName: "High Flyer Scholar",
      badgeIcon: "🪁"
    },
    surpriseGift: {
      title: "Wings of Fire",
      author: "A.P.J. Abdul Kalam",
      genre: "Autobiography & Inspiration",
      pages: 180,
      coverColor: "#2563eb",
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
      festiveMessage: "The inspiring journey of India's Missile Man from humble shores to the presidency."
    },
    recommendations: [
      {
        id: "rec_san_1",
        title: "Ignited Minds",
        author: "A.P.J. Abdul Kalam",
        genre: "Youth Leadership & Vision",
        pages: 205,
        rating: 4.8,
        coverColor: "#d97706",
        description: "Unleashing the extraordinary latent power within India's youth to reach for the skies."
      },
      {
        id: "rec_san_2",
        title: "Jonathan Livingston Seagull",
        author: "Richard Bach",
        genre: "Philosophical Novella",
        pages: 112,
        rating: 4.8,
        coverColor: "#0284c7",
        description: "A seagull who seeks perfection in the joy of flight, transcending ordinary flock limits."
      },
      {
        id: "rec_san_3",
        title: "The Boy Who Harnessed the Wind",
        author: "William Kamkwamba",
        genre: "Memoir & Innovation",
        pages: 304,
        rating: 4.9,
        coverColor: "#059669",
        description: "A Malawian teenager builds a windmill from scrap metal, bringing electricity and hope to his village."
      }
    ],
    achievementBadge: {
      id: "badge_sankranti",
      name: "Solar Sky Kite",
      icon: "🪁",
      description: "Filled the library skies with dancing kites, golden til-gul sweets, and soaring dreams."
    }
  },

  {
    id: "festive-cny",
    slug: "chinese-new-year",
    name: "Chinese New Year",
    subtitle: "Lunar Spring Festival & Prosperity",
    badge: "Lunar Prosperity",
    icon: "🧧",
    greeting: "Gong Xi Fa Cai! Wishing you abundance, wisdom, and good fortune",
    quote: "A book is like a garden carried in the pocket.",
    countdownLabel: "Spring Festival Eve",
    targetMonth: 1, // Feb
    targetDay: 10,
    colors: {
      primary: "#b91c1c",
      primaryHover: "#991b1b",
      accent: "#eab308",
      bgMain: "#fffaf7",
      bgCard: "#ffffff",
      bgMuted: "#faeee7",
      border: "#eed5c8",
      textHead: "#451212",
      textBody: "#692525",
      textMuted: "#965555",
      woodLight: "#8c5643",
      woodDark: "#5c3324",
      shelfPlank: "linear-gradient(180deg, #9b614c, #774330 48%, #542b1c)",
      shelfTrim: "#441e12",
      glowColor: "rgba(234, 179, 8, 0.45)",
      haloGrad: "radial-gradient(ellipse at 50% 0%, rgba(185, 28, 28, 0.35) 0%, rgba(234, 179, 8, 0.25) 50%, transparent 75%)"
    },
    swatches: ["#dc2626", "#eab308", "#7f1d1d", "#fef08a"],
    particleType: "cny_lanterns",
    challenge: {
      id: "ch_cny",
      title: "Prosperity of Wisdom",
      targetCount: 3,
      description: "Read 3 books rooted in folklore, philosophy, or transformative journeys.",
      badgeName: "Golden Dragon Scholar",
      badgeIcon: "🐉"
    },
    surpriseGift: {
      title: "The Art of War",
      author: "Sun Tzu",
      genre: "Ancient Philosophy & Strategy",
      pages: 112,
      coverColor: "#b91c1c",
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
      festiveMessage: "Timeless strategies on conflict resolution, diplomacy, and inner mastery."
    },
    recommendations: [
      {
        id: "rec_cny_1",
        title: "Pachinko",
        author: "Min Jin Lee",
        genre: "Epic Historical Saga",
        pages: 496,
        rating: 4.9,
        coverColor: "#b91c1c",
        description: "Four generations of a Korean family in Japan enduring with indomitable resilience and love."
      },
      {
        id: "rec_cny_2",
        title: "The Joy Luck Club",
        author: "Amy Tan",
        genre: "Family & Cultural Fiction",
        pages: 352,
        rating: 4.8,
        coverColor: "#d97706",
        description: "Four immigrant Chinese mothers and their American-born daughters bound by bittersweet love."
      },
      {
        id: "rec_cny_3",
        title: "Iron Widow",
        author: "Xiran Jay Zhao",
        genre: "Sci-Fi Fantasy & Myth",
        pages: 394,
        rating: 4.7,
        coverColor: "#7f1d1d",
        description: "Wu Zetian rises to conquer giant mechas in a thrilling sci-fi reimagining of China's only female emperor."
      }
    ],
    achievementBadge: {
      id: "badge_cny",
      name: "Lucky Red Envelope",
      icon: "🧧",
      description: "Hung red paper lanterns, golden tassels, and plum blossoms around the bookshelf."
    }
  }
];

export function getFestivalThemeById(themeId) {
  return (
    FESTIVAL_THEMES.find(
      (t) => t.id === themeId || t.slug === themeId
    ) || FESTIVAL_THEMES[0]
  );
}

