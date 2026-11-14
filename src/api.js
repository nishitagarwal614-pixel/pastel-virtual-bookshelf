import { BOOK_SPINE_PALETTES } from "./constants.js";
import { VEDABASE_COLLECTION, VEDABASE_AUTHORS, isVedabaseQuery } from "./vedabaseData.js";
import { getOriginalBookPages } from "./data/verifiedBookPages.js";
export { VEDABASE_COLLECTION, VEDABASE_AUTHORS, isVedabaseQuery };

/**
 * api.js
 * 
 * Global Universal Book Database & Search Engine:
 * - Covers all genres: Spirituality, Philosophy, Eastern & Western Mysticism,
 *   Sacred Scriptures (Gita, Upanishads, Dhammapada, Tao Te Ching, Bible, Quran, Rumi),
 *   World Classics, Contemporary Fiction, Mystery, Sci-Fi, Romance, and Self-Growth.
 * - Books across languages worldwide: Hindi, Sanskrit, Spanish, French, German,
 *   Japanese, Chinese, Russian, Arabic, Bengali, Tamil, Urdu, Italian, Portuguese, etc.
 * - Multi-strategy search indexing Open Library's 40M+ global archive with subject and language filtering.
 * - Curated instant world library with verified high-res covers and spine data.
 */

export const LANGUAGE_LABELS = {
  eng: "English",
  hin: "Hindi (हिन्दी)",
  san: "Sanskrit (संस्कृतम्)",
  spa: "Spanish (Español)",
  fre: "French (Français)",
  fra: "French (Français)",
  ger: "German (Deutsch)",
  deu: "German (Deutsch)",
  jpn: "Japanese (日本語)",
  chi: "Chinese (中文)",
  zho: "Chinese (中文)",
  rus: "Russian (Русский)",
  ara: "Arabic (العربية)",
  ita: "Italian (Italiano)",
  por: "Portuguese (Português)",
  ben: "Bengali (বাংলা)",
  tam: "Tamil (தமிழ்)",
  tel: "Telugu (తెలుగు)",
  mar: "Marathi (मराठी)",
  urd: "Urdu (اردو)",
  kor: "Korean (한국어)",
  per: "Persian (فارسی)",
  fas: "Persian (فارسی)",
  lat: "Latin",
  grc: "Ancient Greek",
  dut: "Dutch",
  nld: "Dutch"
};

export function formatBookLanguage(langArray) {
  if (!langArray || langArray.length === 0) return "";
  const first = typeof langArray === "string" ? langArray : langArray[0];
  const code = first.toLowerCase().slice(0, 3);
  return LANGUAGE_LABELS[code] || first.toUpperCase();
}

export const POPULAR_AND_TRENDING_BOOKS = [
  // --- 1. SPIRITUALITY & SACRED ANCIENT TEXTS ---
  {
    title: "Bhagavad-Gita As It Is",
    author: "A.C. Bhaktivedanta Swami Prabhupada / Vyasa",
    year: "1972",
    pages: 720,
    publisher: "Bhaktivedanta Book Trust",
    isbn: "9780892131341",
    cover: "https://covers.openlibrary.org/b/id/11157767-L.jpg",
    genre: "Spirituality, Vedanta & Hindu Philosophy",
    language: "san, hin, eng",
    languageLabel: "🕉️ Sanskrit / Hindi / English",
    format: "Hardcover",
    description: "The timeless spiritual discourse delivered by Sri Krishna to Arjuna on the battlefield of Kurukshetra, illuminating yoga, karma, dharma, and supreme consciousness.",
    openLibraryKey: "/works/OL264706W"
  },
  {
    title: "Autobiography of a Yogi",
    author: "Paramahansa Yogananda",
    year: "1946",
    pages: 520,
    publisher: "Self-Realization Fellowship",
    isbn: "9780876120835",
    cover: "https://covers.openlibrary.org/b/id/805448-L.jpg",
    genre: "Spirituality, Kriya Yoga & Meditation",
    language: "eng, hin, ben",
    languageLabel: "🇮🇳 Indian / English / 15+ Languages",
    format: "Paperback",
    description: "A monumental spiritual memoir introducing the science of Kriya Yoga, Indian saints, self-realization, and the unity of world faiths.",
    openLibraryKey: "/works/OL528094W"
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    year: "1997",
    pages: 236,
    publisher: "New World Library",
    isbn: "9781577314806",
    cover: "https://covers.openlibrary.org/b/id/551262-L.jpg",
    genre: "Spirituality, Mindfulness & Consciousness",
    language: "eng, spa, fre, ger",
    languageLabel: "🌐 30+ Languages",
    format: "Paperback",
    description: "A profound guide to spiritual enlightenment, escaping the noise of the compulsive mind, and experiencing the radiant peace of the eternal present moment.",
    openLibraryKey: "/works/OL5727686W"
  },
  {
    title: "Siddhartha",
    author: "Hermann Hesse",
    year: "1922",
    pages: 152,
    publisher: "New Directions",
    isbn: "9780811200684",
    cover: "https://covers.openlibrary.org/b/id/6562535-L.jpg",
    genre: "Spirituality, Buddhism & Philosophical Quest",
    language: "ger, eng, hin, fre",
    languageLabel: "🇩🇪 German / World Editions",
    format: "Paperback",
    description: "A young Brahmin leaves his home to seek true spiritual awakening, walking through asceticism, worldly pleasure, and the song of the river to find unity with all existence.",
    openLibraryKey: "/works/OL872932W"
  },
  {
    title: "Tao Te Ching",
    author: "Laozi (老子 / Lao Tzu)",
    year: "400 BC",
    pages: 160,
    publisher: "Penguin Classics",
    isbn: "9780140441314",
    cover: "https://covers.openlibrary.org/b/id/662232-L.jpg",
    genre: "Taoism, Ancient Chinese Philosophy & Spirituality",
    language: "chi, eng, fre",
    languageLabel: "🇨🇳 Chinese (中文) / English",
    format: "Paperback",
    description: "The ancient fountainhead of Taoist wisdom, singing of wu-wei (effortless action), humility, simplicity, and living in effortless harmony with the flow of the cosmos.",
    openLibraryKey: "/works/OL45499W"
  },
  {
    title: "The Untethered Soul",
    author: "Michael A. Singer",
    year: "2007",
    pages: 200,
    publisher: "New Harbinger Publications",
    isbn: "9781572245372",
    cover: "https://covers.openlibrary.org/b/id/10630553-L.jpg",
    genre: "Spirituality, Meditation & Self-Realization",
    language: "eng, spa",
    languageLabel: "🇬🇧 English / Spanish",
    format: "Paperback",
    description: "What would it be like to free yourself from limitations and soar beyond your boundaries? A transformative exploration of who you are and the observer within.",
    openLibraryKey: "/works/OL15845722W"
  },
  {
    title: "The Prophet",
    author: "Kahlil Gibran",
    year: "1923",
    pages: 120,
    publisher: "Alfred A. Knopf",
    isbn: "9780394404288",
    cover: "https://covers.openlibrary.org/b/id/418324-L.jpg",
    genre: "Spiritual Poetry, Mysticism & Wisdom",
    language: "ara, eng, fre",
    languageLabel: "🇸🇦 Arabic / English / 40+ Languages",
    format: "Hardcover",
    description: "The prophet Almustafa shares poetic, timeless insights on love, marriage, work, sorrow, freedom, and the mystery of human spirit.",
    openLibraryKey: "/works/OL318900W"
  },
  {
    title: "The Essential Rumi",
    author: "Jalal al-Din Rumi (trans. Coleman Barks)",
    year: "1995",
    pages: 416,
    publisher: "HarperOne",
    isbn: "9780062509598",
    cover: "https://covers.openlibrary.org/b/id/10721468-L.jpg",
    genre: "Sufi Mysticism, Divine Love & Spiritual Poetry",
    language: "per, eng, ara",
    languageLabel: "🇮🇷 Persian (فارسی) / English",
    format: "Paperback",
    description: "Ecstatic poetry of longing, surrender, ecstasy, and divine union by the 13th-century Sufi master and mystic Jalal al-Din Rumi.",
    openLibraryKey: "/works/OL18987W"
  },
  {
    title: "The Upanishads",
    author: "Eknath Easwaran (trans.)",
    year: "1987",
    pages: 392,
    publisher: "Nilgiri Press",
    isbn: "9781586380212",
    cover: "https://covers.openlibrary.org/b/id/4788550-L.jpg",
    genre: "Vedanta, Sacred Sanskrit Scriptures & Mysticism",
    language: "san, eng, hin",
    languageLabel: "🕉️ Sanskrit / English",
    format: "Paperback",
    description: "The core mystical scriptures of ancient India, inquiring into the nature of Ultimate Reality (Brahman), the Self (Atman), and transcendent awareness.",
    openLibraryKey: "/works/OL15892579W"
  },
  {
    title: "The Yoga Sutras of Patanjali",
    author: "Patanjali (trans. Swami Satchidananda)",
    year: "1978",
    pages: 272,
    publisher: "Integral Yoga Publications",
    isbn: "9780932040381",
    cover: "https://covers.openlibrary.org/b/id/8866457-L.jpg",
    genre: "Classical Yoga, Ashtanga & Mind Control",
    language: "san, eng, hin",
    languageLabel: "🕉️ Sanskrit / English",
    format: "Paperback",
    description: "The classical masterwork on Raja Yoga, outlining the 8-limbed path of meditation, ethical living, and mastery over mental fluctuations.",
    openLibraryKey: "/works/OL20214983W"
  },
  {
    title: "Raja Yoga",
    author: "Swami Vivekananda",
    year: "1896",
    pages: 280,
    publisher: "Advaita Ashrama",
    isbn: "9788185301167",
    cover: "https://covers.openlibrary.org/b/id/5555814-L.jpg",
    genre: "Advaita Vedanta, Meditation & Spiritual Science",
    language: "eng, ben, hin",
    languageLabel: "🇮🇳 Indian / English / Bengali",
    format: "Paperback",
    description: "Swami Vivekananda's groundbreaking lectures explaining the inner architecture of meditation, concentration, and spiritual mastery.",
    openLibraryKey: "/works/OL311924W"
  },
  {
    title: "Inner Engineering: A Yogi's Guide to Joy",
    author: "Sadhguru (Jaggi Vasudev)",
    year: "2016",
    pages: 288,
    publisher: "Spiegel & Grau",
    isbn: "9780812997804",
    cover: "https://covers.openlibrary.org/b/id/9211848-L.jpg",
    genre: "Spirituality, Yoga & Wellbeing",
    language: "eng, hin, tam",
    languageLabel: "🇮🇳 Indian / English / Hindi",
    format: "Hardcover",
    description: "A yogic blueprint for joy, aligning mind, body, emotions, and life energies to cultivate unconditional bliss from within.",
    openLibraryKey: "/works/OL20569778W"
  },
  {
    title: "The Four Agreements",
    author: "Don Miguel Ruiz",
    year: "1997",
    pages: 160,
    publisher: "Amber-Allen Publishing",
    isbn: "9781878424310",
    cover: "https://covers.openlibrary.org/b/id/924521-L.jpg",
    genre: "Toltec Wisdom, Spirituality & Personal Freedom",
    language: "spa, eng",
    languageLabel: "🇪🇸 Spanish / English",
    format: "Paperback",
    description: "Four simple yet profound principles based on ancient Toltec wisdom to transform your life into an experience of freedom, true happiness, and love.",
    openLibraryKey: "/works/OL27203W"
  },

  // --- 2. WORLD LITERATURE IN MAJOR LANGUAGES ---
  {
    title: "Godan (गोदान)",
    author: "Munshi Premchand (मुंशी प्रेमचंद)",
    year: "1936",
    pages: 380,
    publisher: "Rajkamal Prakashan",
    isbn: "9788126705573",
    cover: "https://covers.openlibrary.org/b/id/12069261-L.jpg",
    genre: "Hindi Classic Literature, Social Realism",
    language: "hin, eng",
    languageLabel: "🇮🇳 Hindi (हिन्दी) / English",
    format: "Paperback",
    description: "The magnum opus of Hindi literature portraying the struggle, nobility, and socioeconomic tribulations of peasant life in colonial India through Hori and Dhania.",
    openLibraryKey: "/works/OL26112603W"
  },
  {
    title: "Gitanjali (গীতাঞ্জলি)",
    author: "Rabindranath Tagore (রবীন্দ্রনাথ ঠাকুর)",
    year: "1910",
    pages: 144,
    publisher: "Macmillan & Co.",
    isbn: "9780143420583",
    cover: "https://covers.openlibrary.org/b/id/8246100-L.jpg",
    genre: "Spiritual Poetry, Bengali Literature & Nobel Prize",
    language: "ben, eng, hin",
    languageLabel: "🇮🇳 Bengali (বাংলা) / English",
    format: "Paperback",
    description: "A devotional garland of song offerings to the Divine that won Rabindranath Tagore the Nobel Prize in Literature in 1913.",
    openLibraryKey: "/works/OL308575W"
  },
  {
    title: "Le Petit Prince (The Little Prince)",
    author: "Antoine de Saint-Exupéry",
    year: "1943",
    pages: 96,
    publisher: "Gallimard",
    isbn: "9780156012195",
    cover: "https://covers.openlibrary.org/b/id/10708272-L.jpg",
    genre: "French Literature, Philosophical Fable",
    language: "fre, eng, spa",
    languageLabel: "🇫🇷 French (Français) / 40+ Languages",
    format: "Paperback",
    description: "“One sees clearly only with the heart. Anything essential is invisible to the eyes.” A gentle, poignant French fable about love, loss, and innocence.",
    openLibraryKey: "/works/OL10263W"
  },
  {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    year: "1967",
    pages: 448,
    publisher: "Sudamericana",
    isbn: "9780307474728",
    cover: "https://covers.openlibrary.org/b/id/12627383-L.jpg",
    genre: "Magical Realism, Spanish & Latin American Classic",
    language: "spa, eng",
    languageLabel: "🇪🇸 Spanish (Español) / English",
    format: "Hardcover",
    description: "The multi-generational epic of the Buendía family in the mythical town of Macondo, blending fantasy, solitude, history, and wonder.",
    openLibraryKey: "/works/OL274505W"
  },
  {
    title: "Norwegian Wood (ノルウェイの森)",
    author: "Haruki Murakami (村上春樹)",
    year: "1987",
    pages: 400,
    publisher: "Kodansha",
    isbn: "9780375704024",
    cover: "https://covers.openlibrary.org/b/id/2237620-L.jpg",
    genre: "Japanese Contemporary Fiction, Coming of Age",
    language: "jpn, eng",
    languageLabel: "🇯🇵 Japanese (日本語) / English",
    format: "Paperback",
    description: "A nostalgic, bittersweet story of memory, youth, love, and grief set in 1960s Tokyo, accompanied by the melodies of The Beatles.",
    openLibraryKey: "/works/OL2625457W"
  },
  {
    title: "Crime and Punishment (Преступление и наказание)",
    author: "Fyodor Dostoevsky (Фёдор Достоевский)",
    year: "1866",
    pages: 576,
    publisher: "The Russian Messenger",
    isbn: "9780140449136",
    cover: "https://covers.openlibrary.org/b/id/13116014-L.jpg",
    genre: "Russian Classic, Psychological Drama & Redemption",
    language: "rus, eng",
    languageLabel: "🇷🇺 Russian (Русский) / English",
    format: "Hardcover",
    description: "Raskolnikov's harrowing descent into guilt, paranoia, and moral reckoning following a desperate murder, culminating in spiritual redemption through love.",
    openLibraryKey: "/works/OL32525579W"
  },
  {
    title: "The Art of War (孫子兵法)",
    author: "Sun Tzu (孫武)",
    year: "500 BC",
    pages: 112,
    publisher: "Penguin Classics",
    isbn: "9780140445206",
    cover: "https://covers.openlibrary.org/b/id/4849549-L.jpg",
    genre: "Ancient Chinese Philosophy & Strategy",
    language: "chi, eng",
    languageLabel: "🇨🇳 Chinese (中文) / English",
    format: "Hardcover",
    description: "The ancient military treatise that transcends warfare into a philosophical guide on psychology, discipline, patience, and victory without conflict.",
    openLibraryKey: "/works/OL244537W"
  },
  {
    title: "The Metamorphosis (Die Verwandlung)",
    author: "Franz Kafka",
    year: "1915",
    pages: 128,
    publisher: "Kurt Wolff Verlag",
    isbn: "9780143105244",
    cover: "https://covers.openlibrary.org/b/id/6889547-L.jpg",
    genre: "German Literature, Existential & Absurdist Fiction",
    language: "ger, eng",
    languageLabel: "🇩🇪 German (Deutsch) / English",
    format: "Paperback",
    description: "Gregor Samsa wakes up one morning to find himself transformed into a monstrous insect in Kafka’s haunting masterpiece on isolation and identity.",
    openLibraryKey: "/works/OL15176533W"
  },
  {
    title: "The Alchemist (O Alquimista)",
    author: "Paulo Coelho",
    year: "1988",
    pages: 208,
    publisher: "HarperOne",
    isbn: "9780062315007",
    cover: "https://covers.openlibrary.org/b/id/11556106-L.jpg",
    genre: "Philosophical Fiction & Spiritual Destiny",
    language: "por, eng, spa",
    languageLabel: "🇵🇹 Portuguese / 80+ Languages",
    format: "Paperback",
    description: "Santiago, an Andalusian shepherd boy, journeys to the Egyptian pyramids in search of treasure, discovering that his real treasure is fulfilling his Personal Legend.",
    openLibraryKey: "/works/OL24793569W"
  },

  // --- 3. MODERN BESTSELLERS & FICTION ---
  {
    title: "Too Good To Be True",
    author: "Prajakta Koli",
    year: "2024",
    pages: 320,
    publisher: "HarperCollins India",
    isbn: "9789365693393",
    cover: "https://covers.openlibrary.org/b/id/15214149-L.jpg",
    genre: "Contemporary Romance, Indian Fiction",
    language: "eng, hin",
    languageLabel: "🇮🇳 Indian Contemporary / English",
    format: "Paperback",
    description: "A funny, charming, and heartwarming debut contemporary romance novel by Prajakta Koli (MostlySane) about modern relationships, heartbreak, and discovering unexpected love.",
    openLibraryKey: "/works/OL45206747W"
  },
  {
    title: "Warmth",
    author: "Rithvik Singh",
    year: "2023",
    pages: 184,
    publisher: "Rupa Publications",
    isbn: "9789357022835",
    cover: "https://covers.openlibrary.org/b/id/14605943-L.jpg",
    genre: "Poetry & Self-Love",
    language: "eng",
    languageLabel: "English",
    format: "Paperback",
    description: "A soothing collection of poetry and prose for fragile hearts, healing through heartbreak and learning to love gently.",
    openLibraryKey: "custom_warmth"
  },
  {
    title: "I Don't Love You Anymore",
    author: "Rithvik Singh",
    year: "2022",
    pages: 208,
    publisher: "Rupa Publications",
    isbn: "9789357023344",
    cover: "",
    genre: "Poetry & Personal Transformation",
    language: "eng",
    languageLabel: "English",
    format: "Paperback",
    description: "Moving on from the person you thought you would spend forever with. Words on closure, moving forward and rebuilding self-worth.",
    openLibraryKey: "custom_idontloveyou"
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    year: "2019",
    pages: 336,
    publisher: "Celadon Books",
    isbn: "9781250301697",
    cover: "https://covers.openlibrary.org/b/id/10294695-L.jpg",
    genre: "Psychological Thriller",
    language: "eng",
    languageLabel: "English",
    format: "Hardcover",
    description: "Alicia Berenson's life is seemingly perfect. Then one evening she shoots her husband five times in the face, and never speaks another word.",
    openLibraryKey: "/works/OL19985390W"
  },
  {
    title: "The Housemaid",
    author: "Freida McFadden",
    year: "2022",
    pages: 336,
    publisher: "Grand Central Publishing",
    isbn: "9781538742570",
    cover: "https://covers.openlibrary.org/b/id/12843813-L.jpg",
    genre: "Psychological Thriller",
    language: "eng",
    languageLabel: "English",
    format: "Paperback",
    description: "Every day I clean the Winchesters' beautiful house. I pick up their daughter from school. I cook delicious meals for the whole family before heading up to my tiny room on the top floor...",
    openLibraryKey: "/works/OL27170138W"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    year: "2018",
    pages: 320,
    publisher: "Avery",
    isbn: "9780735211292",
    cover: "https://covers.openlibrary.org/b/id/12646698-L.jpg",
    genre: "Self-Help & Productivity",
    language: "eng, spa, fre",
    languageLabel: "🌐 Global Bestseller",
    format: "Hardcover",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving every day with the compound effect of tiny habits.",
    openLibraryKey: "/works/OL17930368W"
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    year: "2020",
    pages: 256,
    publisher: "Harriman House",
    isbn: "9780857197689",
    cover: "https://covers.openlibrary.org/b/id/10499427-L.jpg",
    genre: "Personal Finance & Psychology",
    language: "eng",
    languageLabel: "English",
    format: "Hardcover",
    description: "Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people.",
    openLibraryKey: "/works/OL20875221W"
  },
  {
    title: "The Immortals of Meluha",
    author: "Amish Tripathi",
    year: "2010",
    pages: 412,
    publisher: "Westland",
    isbn: "9789380658742",
    cover: "https://covers.openlibrary.org/b/id/6938927-L.jpg",
    genre: "Mythological Fiction & Indian Epics",
    language: "eng, hin, mar",
    languageLabel: "🇮🇳 Indian / English / Hindi",
    format: "Paperback",
    description: "1900 BC. In what modern Indians call the Indus Valley Civilisation. The legend of a Tibetan immigrant who rises to become the Neelkanth, the savior of Meluha.",
    openLibraryKey: "/works/OL15843477W"
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    year: "2020",
    pages: 304,
    publisher: "Viking",
    isbn: "9780593297049",
    cover: "https://covers.openlibrary.org/b/id/10313069-L.jpg",
    genre: "Fiction, Philosophy & Parallel Realities",
    language: "eng",
    languageLabel: "English",
    format: "Hardcover",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    openLibraryKey: "/works/OL20849202W"
  }
];

/**
 * Clean up conversational and natural language search prefixes
 */
function cleanQueryString(raw) {
  if (!raw) return "";
  let q = raw.trim();
  q = q.replace(/^(?:can you\s+)?(?:search(?:\s+for)?|find(?:\s+me)?|lookup|look up|get|show me|give me|books about|book about|books on|book on|books of|book of|books by|book by|books|book|novels by|novel by|written by)\s+/i, "");
  return q.trim();
}

/**
 * Strips Sanskrit & Latin diacritics into plain ASCII for accurate searching
 */
export function stripDiacritics(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ṛṝ]/gi, "r")
    .replace(/[ḷḹ]/gi, "l")
    .replace(/[śṣ]/gi, "s")
    .replace(/[ṭ]/gi, "t")
    .replace(/[ḍ]/gi, "d")
    .replace(/[ṇñṅ]/gi, "n")
    .replace(/[ṁ]/gi, "m")
    .replace(/[ḥ]/gi, "h");
}

/**
 * Normalizes transliteration and common spelling variants for Indian & World names/texts
 */
function normalizeSpellingVariants(str) {
  if (!str) return "";
  return str
    .replace(/\bgeeta\b/gi, "gita")
    .replace(/\bbhagwad\b/gi, "bhagavad")
    .replace(/\bbhagwat\b/gi, "bhagavat")
    .replace(/\bupnishad\b/gi, "upanishad")
    .replace(/\bupanishads\b/gi, "upanishad")
    .replace(/\bpatanjalee\b/gi, "patanjali")
    .replace(/\bpatanjali's\b/gi, "patanjali")
    .replace(/\byoganand\b/gi, "yogananda")
    .replace(/\bvivekanand\b/gi, "vivekananda")
    .replace(/\bramakrishna\b/gi, "ramakrishna")
    .replace(/\bramkrishna\b/gi, "ramakrishna")
    .replace(/\bramana\s+maharishi\b/gi, "ramana maharshi")
    .replace(/\bvedabase\b/gi, "vedabase")
    .replace(/\bprabhupad\b/gi, "prabhupada")
    .replace(/\bkrishna\b/gi, "krsna")
    .replace(/\blilamrita\b/gi, "lilamrta")
    .replace(/\bchaitanya\b/gi, "caitanya")
    .replace(/\bcharitamrita\b/gi, "caritamrta")
    .replace(/\bcharitamrit\b/gi, "caritamrta")
    .replace(/\bisopanishad\b/gi, "isopanisad")
    .replace(/\bupadeshamrita\b/gi, "upadesamrta")
    .replace(/\bbhaktivinod\b/gi, "bhaktivinoda")
    .replace(/\bnarottam\b/gi, "narottama")
    .replace(/\bvrindavan\s+das\b/gi, "vrindavana dasa")
    .replace(/\bsanatan\b/gi, "sanatana")
    .replace(/\bkohli\b/gi, "koli")
    .replace(/\bchhetri\b/gi, "chetri")
    .replace(/\bdostoyevsky\b/gi, "dostoevsky")
    .replace(/\btolstoi\b/gi, "tolstoy")
    .replace(/\bnietzche\b/gi, "nietzzsche");
}

/**
 * Detects if query belongs to Spirituality, Philosophy, or Sacred traditions
 */
const SPIRITUAL_KEYWORDS = [
  "spirituality", "spiritual", "meditation", "mindfulness", "vedanta", "zen",
  "buddhism", "buddha", "yoga", "gita", "upanishad", "sufism", "taoism", "tao",
  "stoicism", "advaita", "mysticism", "dharma", "karma", "chakra", "soul", "enlightenment",
  "sadhguru", "osho", "yogananda", "vivekananda", "ramana", "tolle", "rumi", "patanjali",
  "bhagavad", "dhammapada", "bible", "quran", "torah", "confucius", "laozi", "lao tzu",
  "marcus aurelius", "krishnamurti", "nisargadatta", "awaken", "inner peace",
  "vedabase", "prabhupada", "bhaktivedanta", "iskcon", "caitanya", "caritamrta",
  "bhagavatam", "bhakti", "krsna", "krishna"
];

function isSpiritualQuery(q) {
  const lower = q.toLowerCase();
  return SPIRITUAL_KEYWORDS.some((kw) => lower.includes(kw));
}

/**
 * Split natural language into potential title and author if connectors exist
 */
function extractTitleAndAuthor(q) {
  const match = q.match(/^(.*?)\s+(?:by|of|from|written by)\s+(.*)$/i);
  if (match && match[1].trim() && match[2].trim()) {
    return {
      title: match[1].trim(),
      author: match[2].trim()
    };
  }
  return null;
}

/**
 * Match against curated instant catalog (including all Vedabase canonical works)
 */
export function searchCuratedCatalog(cleanQuery, languageFilter = "all") {
  const pool = [...VEDABASE_COLLECTION, ...POPULAR_AND_TRENDING_BOOKS];
  const seen = new Set();
  const uniquePool = [];
  for (const b of pool) {
    const k = `${b.title}|${b.author}`.toLowerCase();
    if (!seen.has(k)) {
      seen.add(k);
      uniquePool.push(b);
    }
  }

  if (!cleanQuery) return POPULAR_AND_TRENDING_BOOKS;

  const lower = cleanQuery.toLowerCase().trim();
  if (lower === "vedabase" || lower.includes("vedabase")) {
    return VEDABASE_COLLECTION;
  }

  const normalizedSearch = normalizeSpellingVariants(cleanQuery).toLowerCase();
  const searchWords = normalizedSearch
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !["book", "books", "about", "novel", "from", "with", "that"].includes(w));

  if (searchWords.length === 0) return [];

  return uniquePool.filter((b) => {
    // Language filter check
    if (languageFilter !== "all") {
      const bLangs = (b.language || "").toLowerCase();
      if (!bLangs.includes(languageFilter.toLowerCase())) {
        return false;
      }
    }

    const rawText = `${b.title} ${b.author} ${b.genre} ${b.languageLabel || ""}`;
    const plainText = stripDiacritics(rawText).toLowerCase();
    const normText = normalizeSpellingVariants(plainText);
    const bookSearchText = `${rawText.toLowerCase()} ${plainText} ${normText}`;
    
    // Either every token matches or the entire topic keyword matches
    const allMatch = searchWords.every((word) => bookSearchText.includes(word));
    if (allMatch) return true;

    // Single-word broad match (e.g. "spirituality" or "hindi" or "gita" or "prabhupada")
    if (searchWords.length === 1 && bookSearchText.includes(searchWords[0])) {
      return true;
    }

    return false;
  });
}

/**
 * Universal Global Book Search API
 * 
 * Supports:
 * - Free text, title, author, genre / subject, and ISBN searches
 * - Instant complete Vedabase Archive (all canonical books, cantos, authors)
 * - Filtering by languages worldwide (Hindi, Sanskrit, Spanish, French, Japanese, etc.)
 * - Automatic dual-indexing for spiritual & philosophical topics
 * - Full Unicode / Non-Latin scripts (Devanagari, Kanji, Cyrillic, Arabic, etc.)
 * - Rich edition and cover discovery
 */
export async function searchBooksApi(rawQuery, searchType = "all", languageFilter = "all") {
  const cleanedQuery = cleanQueryString(rawQuery);

  // If query is empty, return curated library matching the language filter
  if (!cleanedQuery) {
    return searchCuratedCatalog("", languageFilter).map((book, idx) => ({
      id: `curated_init_${idx}`,
      ...book,
      spineColor: BOOK_SPINE_PALETTES[idx % BOOK_SPINE_PALETTES.length].bg,
      editionsList: []
    }));
  }

  // Instant Vedabase Collection Return
  if (
    cleanedQuery.toLowerCase() === "vedabase" ||
    cleanedQuery.toLowerCase().includes("vedabase") ||
    searchType === "vedabase"
  ) {
    return VEDABASE_COLLECTION.map((book, idx) => ({
      id: `vedabase_${idx}`,
      ...book,
      spineColor: BOOK_SPINE_PALETTES[idx % BOOK_SPINE_PALETTES.length].bg,
      editionsList: []
    }));
  }

  const splitParts = extractTitleAndAuthor(cleanedQuery);
  const normalizedQuery = normalizeSpellingVariants(cleanedQuery);
  const isSpiritual = isSpiritualQuery(cleanedQuery);

  // 1. Instant Curated Matches First
  const curatedMatches = searchCuratedCatalog(cleanedQuery, languageFilter);

  // 2. Build multi-strategy queries for Open Library
  const searchAttempts = [];
  const fields = "key,title,subtitle,author_name,first_publish_year,cover_i,isbn,publisher,number_of_pages_median,number_of_pages,subject,format,cover_edition_key,publish_year,edition_count,language";

  const langParam = languageFilter && languageFilter !== "all" ? `&language=${encodeURIComponent(languageFilter)}` : "";

  if (searchType === "title") {
    searchAttempts.push(`title=${encodeURIComponent(cleanedQuery)}${langParam}`);
    if (normalizedQuery !== cleanedQuery) {
      searchAttempts.push(`title=${encodeURIComponent(normalizedQuery)}${langParam}`);
    }
  } else if (searchType === "author") {
    searchAttempts.push(`author=${encodeURIComponent(cleanedQuery)}${langParam}`);
    if (normalizedQuery !== cleanedQuery) {
      searchAttempts.push(`author=${encodeURIComponent(normalizedQuery)}${langParam}`);
    }
  } else if (searchType === "genre") {
    searchAttempts.push(`subject=${encodeURIComponent(cleanedQuery)}${langParam}`);
    searchAttempts.push(`q=${encodeURIComponent(cleanedQuery)}${langParam}`);
  } else {
    // General 'all' search:
    searchAttempts.push(`q=${encodeURIComponent(cleanedQuery)}${langParam}`);

    // If query has spiritual or philosophical keywords, query subject as well
    if (isSpiritual) {
      searchAttempts.push(`subject=${encodeURIComponent(cleanedQuery)}${langParam}`);
    }

    if (splitParts) {
      const normAuthor = normalizeSpellingVariants(splitParts.author);
      searchAttempts.push(
        `title=${encodeURIComponent(splitParts.title)}&author=${encodeURIComponent(normAuthor)}${langParam}`
      );
      searchAttempts.push(
        `q=${encodeURIComponent(`${splitParts.title} ${normAuthor}`)}${langParam}`
      );
    }

    if (normalizedQuery !== cleanedQuery) {
      searchAttempts.push(`q=${encodeURIComponent(normalizedQuery)}${langParam}`);
    }
  }

  // Deduplicate query attempts
  const uniqueAttempts = Array.from(new Set(searchAttempts)).slice(0, 4);

  const seenKeys = new Set();
  const aggregatedBooks = [];

  // Add curated matches first
  curatedMatches.forEach((book, idx) => {
    const key = `${book.title}|${book.author}`.toLowerCase();
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      aggregatedBooks.push({
        id: `curated_${idx}_${Date.now()}`,
        ...book,
        spineColor: BOOK_SPINE_PALETTES[idx % BOOK_SPINE_PALETTES.length].bg,
        editionsList: []
      });
    }
  });

  // Query Open Library across candidate attempts
  for (const params of uniqueAttempts) {
    try {
      const url = `https://openlibrary.org/search.json?limit=18&fields=${fields}&${params}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) continue;

      const data = await res.json();
      const docs = data.docs || [];

      docs.forEach((doc) => {
        const title = doc.title || "Untitled Work";
        const author = Array.isArray(doc.author_name)
          ? doc.author_name.slice(0, 2).join(", ")
          : doc.author_name || "Unknown Author";

        const dedupeKey = `${title}|${author}`.toLowerCase();
        if (seenKeys.has(dedupeKey)) return;
        seenKeys.add(dedupeKey);

        const year = doc.first_publish_year ? String(doc.first_publish_year) : "";
        const rawPages = doc.number_of_pages_median
          ? Number(doc.number_of_pages_median)
          : doc.number_of_pages
          ? Number(doc.number_of_pages)
          : null;
        const pages = getOriginalBookPages(title, author, rawPages);

        const publisher = Array.isArray(doc.publisher)
          ? doc.publisher[0]
          : doc.publisher || "Library Edition";

        const isbn = Array.isArray(doc.isbn) ? doc.isbn[0] : doc.isbn || "";

        // Cover resolution: cover_i -> cover_edition_key -> isbn
        let cover = "";
        if (doc.cover_i) {
          cover = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
        } else if (doc.cover_edition_key) {
          cover = `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-L.jpg`;
        } else if (isbn) {
          cover = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
        }

        // Genre / Subjects resolution
        const genres = Array.isArray(doc.subject)
          ? doc.subject.slice(0, 3).join(", ")
          : isSpiritual
          ? "Spirituality & Philosophy"
          : "Literature";

        // Language resolution
        let languageLabel = "";
        if (Array.isArray(doc.language) && doc.language.length > 0) {
          languageLabel = formatBookLanguage(doc.language);
        }

        const formats = Array.isArray(doc.format)
          ? doc.format.slice(0, 3)
          : ["Hardcover", "Paperback"];

        const format = formats.includes("Hardcover") ? "Hardcover" : "Paperback";
        const spineColor = BOOK_SPINE_PALETTES[aggregatedBooks.length % BOOK_SPINE_PALETTES.length].bg;

        // Extract available editions
        const editionsList = [];
        if (Array.isArray(doc.publish_year) && doc.publish_year.length > 1) {
          doc.publish_year.slice(0, 4).forEach((pubYr, eIdx) => {
            editionsList.push({
              year: String(pubYr),
              publisher: doc.publisher?.[eIdx] || publisher,
              format: eIdx % 2 === 0 ? "Hardcover" : "Paperback",
              pages: Math.round(pages * (1 + ((eIdx % 3) - 1) * 0.08))
            });
          });
        }

        aggregatedBooks.push({
          id: `book_${Math.random().toString(36).substring(2, 9)}`,
          title,
          author,
          year,
          pages,
          publisher,
          isbn,
          cover,
          genre: genres,
          languageLabel,
          format,
          description: doc.subtitle || "",
          spineColor,
          openLibraryKey: doc.key || "",
          editionsList
        });
      });

      // Stop once we have sufficient rich results
      if (aggregatedBooks.length >= 16) break;
    } catch (err) {
      console.warn("Open Library attempt failed:", err);
    }
  }

  return aggregatedBooks;
}
