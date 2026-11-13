/**
 * screenshotBooks.js
 * 
 * The exact book collection visible in the user's reference bookshelf screenshot:
 * - Shelf 1: The Poppy War, The Thursday Murder Club, The Way of Kings
 * - Shelf 2: Sweet Heat, Words of Radiance, War and Peace
 * - Shelf 3: Things I Have Withheld, Zone One, White Noise, Wolf Hall
 * - Shelf 4: Their Eyes Were Watching God, Judgment at Tokyo
 */

export const SCREENSHOT_REFERENCE_BOOKS = [
  // Shelf 1 (Top)
  {
    id: "ref_poppy_war",
    title: "The Poppy War",
    author: "R. F. Kuang",
    genre: "Fantasy / Historical",
    year: "2018",
    pages: 544,
    cover: "https://covers.openlibrary.org/b/id/8463552-L.jpg",
    status: "currently",
    spineColor: "#9e1f1f",
    notes: "A brilliant military fantasy inspired by 20th-century Chinese history.",
    shelfPosition: 1
  },
  {
    id: "ref_thursday_murder",
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    genre: "Cozy Mystery",
    year: "2020",
    pages: 400,
    cover: "https://covers.openlibrary.org/b/id/10201431-L.jpg",
    status: "want",
    spineColor: "#eee2cb",
    notes: "Charming retirement village mystery.",
    shelfPosition: 1
  },
  {
    id: "ref_way_of_kings",
    title: "The Way of Kings",
    author: "Brandon Sanderson",
    genre: "Epic Fantasy",
    year: "2010",
    pages: 1007,
    cover: "https://covers.openlibrary.org/b/id/14658316-L.jpg",
    status: "want",
    spineColor: "#25455f",
    notes: "The Stormlight Archive Book 1.",
    shelfPosition: 1
  },

  // Shelf 2 (Middle)
  {
    id: "ref_sweet_heat",
    title: "Sweet Heat",
    author: "Bolu Babalola",
    genre: "Romance / Fiction",
    year: "2022",
    pages: 288,
    cover: "https://covers.openlibrary.org/b/id/12801037-L.jpg",
    status: "currently",
    spineColor: "#d97d91",
    notes: "Rich vibrant romance and wit.",
    shelfPosition: 2
  },
  {
    id: "ref_words_radiance",
    title: "Words of Radiance",
    author: "Brandon Sanderson",
    genre: "Epic Fantasy",
    year: "2014",
    pages: 1087,
    cover: "https://covers.openlibrary.org/b/id/14658334-L.jpg",
    status: "want",
    spineColor: "#162c45",
    notes: "The Stormlight Archive Book 2.",
    shelfPosition: 2
  },
  {
    id: "ref_war_and_peace",
    title: "War and Peace",
    author: "Leo Tolstoy",
    genre: "Classic Literature",
    year: "1869",
    pages: 1225,
    cover: "https://covers.openlibrary.org/b/id/12621906-L.jpg",
    status: "read",
    completed: "2026-10-15",
    spineColor: "#7eaecf",
    notes: "Masterpiece of epic literature and historical tapestry.",
    shelfPosition: 2
  },

  // Shelf 3
  {
    id: "ref_things_withheld",
    title: "Things I Have Withheld",
    author: "Kei Miller",
    genre: "Essays / Memoir",
    year: "2021",
    pages: 240,
    cover: "https://covers.openlibrary.org/b/id/11150870-L.jpg",
    status: "want",
    spineColor: "#dca032",
    notes: "Intimate and illuminating personal essays.",
    shelfPosition: 3
  },
  {
    id: "ref_zone_one",
    title: "Zone One",
    author: "Colson Whitehead",
    genre: "Literary Fiction / Dystopian",
    year: "2011",
    pages: 336,
    cover: "https://covers.openlibrary.org/b/id/6935551-L.jpg",
    status: "want",
    spineColor: "#851c27",
    notes: "A post-apocalyptic portrait of Manhattan.",
    shelfPosition: 3
  },
  {
    id: "ref_white_noise",
    title: "White Noise",
    author: "Don DeLillo",
    genre: "Postmodern Fiction",
    year: "1985",
    pages: 326,
    cover: "https://covers.openlibrary.org/b/id/94015-L.jpg",
    status: "read",
    completed: "2026-09-20",
    spineColor: "#1f4233",
    notes: "National Book Award winner.",
    shelfPosition: 3
  },
  {
    id: "ref_wolf_hall",
    title: "Wolf Hall",
    author: "Hilary Mantel",
    genre: "Historical Fiction",
    year: "2009",
    pages: 653,
    cover: "https://covers.openlibrary.org/b/id/8345848-L.jpg",
    status: "read",
    completed: "2026-08-11",
    spineColor: "#a82225",
    notes: "Booker Prize winner charting the rise of Thomas Cromwell.",
    shelfPosition: 3
  },

  // Shelf 4 (Bottom)
  {
    id: "ref_eyes_watching_god",
    title: "Their Eyes Were Watching God",
    author: "Zora Neale Hurston",
    genre: "Classic / Harlem Renaissance",
    year: "1937",
    pages: 219,
    cover: "https://covers.openlibrary.org/b/id/12752055-L.jpg",
    status: "read",
    completed: "2026-07-04",
    spineColor: "#d99f2b",
    notes: "One of the most important works of 20th-century literature.",
    shelfPosition: 4
  },
  {
    id: "ref_judgment_tokyo",
    title: "Judgment at Tokyo",
    author: "Gary J. Bass",
    genre: "History",
    year: "2023",
    pages: 896,
    cover: "https://covers.openlibrary.org/b/id/14655972-L.jpg",
    status: "want",
    spineColor: "#9e1f1f",
    notes: "Comprehensive history of the Tokyo trial after WWII.",
    shelfPosition: 4
  }
];
