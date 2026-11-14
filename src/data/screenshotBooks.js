/**
 * screenshotBooks.js
 * 
 * The user's authentic personal book collection as seen in their shelf screenshots:
 * - Shelf 1: 21 Days of Fear, I Don't Love You Anymore, A Good Girl's Guide to Murder, Crime and Punishment
 * - Shelf 2: A Heart for Christmas, Warmth, The Silent Patient, Fyodor Dostoyevsky (Penguin Classics)
 * - Shelf 3 & 4 / Read Stack: The Subtle Art of Not Giving a F*ck, Too Good To Be True, The Housemaid,
 *   Good Girl, Bad Blood, As Good As Dead, The Psychology of Money, Atomic Habits
 */

export const USER_AUTHENTIC_COLLECTION = [
  // --- SHELF 1 ---
  {
    id: "user_book_21_days_fear",
    title: "21 Days of Fear",
    author: "Hervé Commère",
    genre: "Psychological Thriller",
    year: "2014",
    pages: 320,
    cover: "https://covers.openlibrary.org/b/id/15250696-L.jpg",
    status: "want",
    shelfPosition: 1,
    spineColor: "#8b1e1e",
    notes: "A tense psychological thriller revolving around letters, countdowns, and mystery."
  },
  {
    id: "user_book_dont_love_you",
    title: "I Don't Love You Anymore",
    author: "Rithvik Singh",
    genre: "Poetry & Self-Love",
    year: "2022",
    pages: 220,
    cover: "https://covers.openlibrary.org/b/id/15116470-L.jpg",
    status: "read",
    completed: "",
    rating: 5,
    shelfPosition: 1,
    spineColor: "#ea580c",
    notes: "Moving on and living your best life. Tender reflections on letting go and healing."
  },
  {
    id: "user_book_good_girls_guide",
    title: "A Good Girl's Guide to Murder",
    author: "Holly Jackson",
    genre: "YA Mystery & Crime",
    year: "2019",
    pages: 448,
    cover: "https://covers.openlibrary.org/b/id/13156188-L.jpg",
    status: "read",
    completed: "",
    rating: 5,
    shelfPosition: 1,
    spineColor: "#047857",
    notes: "The investigation into Sal Singh and Andie Bell that started it all."
  },
  {
    id: "user_book_crime_punishment",
    title: "Преступление и наказание",
    author: "Ф.М. Достоевский",
    genre: "Russian Classic Literature",
    year: "1866",
    pages: 671,
    cover: "https://covers.openlibrary.org/b/id/9411873-L.jpg",
    status: "want",
    shelfPosition: 1,
    spineColor: "#2b2b2b",
    notes: "Classic masterpiece exploring guilt, conscience, and redemption in Saint Petersburg."
  },

  // --- SHELF 2 ---
  {
    id: "user_book_heart_christmas",
    title: "A Heart for Christmas",
    author: "Sophie Jomain",
    genre: "Holiday Romance / Advent Fiction",
    year: "2023",
    pages: 304,
    cover: "https://covers.openlibrary.org/b/isbn/9781665990394-L.jpg",
    status: "want",
    shelfPosition: 2,
    spineColor: "#1e293b",
    notes: "24 chapters to open before Christmas in the snowy Alpine foothills."
  },
  {
    id: "user_book_warmth",
    title: "Warmth",
    author: "Rithvik Singh",
    genre: "Poetry & Healing",
    year: "2023",
    pages: 208,
    cover: "https://covers.openlibrary.org/b/id/14638564-L.jpg",
    status: "read",
    completed: "",
    rating: 5,
    shelfPosition: 2,
    spineColor: "#1d4ed8",
    notes: "A gentle reminder that kindness and soft days will find you again."
  },
  {
    id: "user_book_silent_patient",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Psychological Thriller",
    year: "2019",
    pages: 336,
    cover: "https://covers.openlibrary.org/b/id/9407338-L.jpg",
    status: "read",
    completed: "",
    rating: 5,
    shelfPosition: 2,
    spineColor: "#e11d48",
    notes: "Alicia Berenson's silence hides the deepest secret of all."
  },
  {
    id: "user_book_dostoyevsky_penguin",
    title: "Notes from Underground",
    author: "Fyodor Dostoyevsky",
    genre: "Philosophy & Classic Literature",
    year: "1864",
    pages: 400,
    cover: "https://covers.openlibrary.org/b/id/10249475-L.jpg",
    status: "want",
    shelfPosition: 2,
    spineColor: "#111827",
    notes: "Foundational existential novella exploring freedom, consciousness, and society."
  },

  // --- SHELF 3 & COMPLETED READ STACK ---
  {
    id: "user_book_subtle_art",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    genre: "Self-Help & Mindset",
    year: "2016",
    pages: 224,
    cover: "https://covers.openlibrary.org/b/id/8231990-L.jpg",
    status: "read",
    completed: "",
    rating: 5,
    shelfPosition: 3,
    spineColor: "#047857",
    notes: "A counterintuitive approach to living a good life."
  },
  {
    id: "user_book_too_good",
    title: "Too Good To Be True",
    author: "Prajakta Koli",
    genre: "Contemporary Romance",
    year: "2024",
    pages: 240,
    cover: "https://covers.openlibrary.org/b/id/15214149-L.jpg",
    status: "read",
    completed: "",
    rating: 5,
    shelfPosition: 3,
    spineColor: "#e11d48",
    notes: "A tender, heartfelt romance exploring love, dreams, and second chances."
  },
  {
    id: "user_book_housemaid",
    title: "The Housemaid",
    author: "Freida McFadden",
    genre: "Psychological Thriller",
    year: "2022",
    pages: 336,
    cover: "https://covers.openlibrary.org/b/id/15105883-L.jpg",
    status: "read",
    completed: "",
    rating: 5,
    shelfPosition: 3,
    spineColor: "#d97706",
    notes: "A thrilling, addictive masterpiece. Millie's journey with the Winchesters is unforgettable."
  },

  // --- SHELF 4 & COMPLETED READ STACK ---
  {
    id: "user_book_good_girl_bad_blood",
    title: "Good Girl, Bad Blood",
    author: "Holly Jackson",
    genre: "YA Mystery & Crime",
    year: "2020",
    pages: 432,
    cover: "https://covers.openlibrary.org/b/id/11466695-L.jpg",
    status: "read",
    completed: "",
    rating: 5,
    shelfPosition: 4,
    spineColor: "#0891b2",
    notes: "Pip Fitz-Amobi is back with a podcast and a missing person case."
  },
  {
    id: "user_book_as_good_as_dead",
    title: "As Good As Dead",
    author: "Holly Jackson",
    genre: "YA Mystery & Thriller",
    year: "2021",
    pages: 464,
    cover: "https://covers.openlibrary.org/b/id/10716589-L.jpg",
    status: "read",
    completed: "",
    rating: 5,
    shelfPosition: 4,
    spineColor: "#86198f",
    notes: "The heart-stopping finale of A Good Girl's Guide to Murder series."
  },
  {
    id: "user_book_psychology_money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Personal Finance & Mindset",
    year: "2020",
    pages: 256,
    cover: "https://covers.openlibrary.org/b/id/10499427-L.jpg",
    status: "want",
    shelfPosition: 4,
    spineColor: "#0f766e",
    notes: "Timeless lessons on wealth, greed, and happiness."
  },
  {
    id: "user_book_atomic_habits",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help & Productivity",
    year: "2018",
    pages: 320,
    cover: "https://covers.openlibrary.org/b/id/12843862-L.jpg",
    status: "want",
    shelfPosition: 4,
    spineColor: "#b45309",
    notes: "An easy & proven way to build good habits and break bad ones."
  }
];

// Alias for backwards compatibility across existing components
export const SCREENSHOT_REFERENCE_BOOKS = USER_AUTHENTIC_COLLECTION;
