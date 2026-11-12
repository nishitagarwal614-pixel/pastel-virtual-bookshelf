import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, Plus, Trash2, Heart, Quote, Calendar, Bookmark } from "lucide-react";
import { LITERARY_QUOTES } from "../constants";

export default function ReadingJournal({
  books = [],
  journalEntries = [],
  onAddEntry,
  onDeleteEntry
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [quote, setQuote] = useState("");
  const [note, setNote] = useState("");
  const [mood, setMood] = useState("Cosy");

  const moods = [
    { label: "Cosy", icon: "☕" },
    { label: "Inspiring", icon: "✨" },
    { label: "Melancholic", icon: "🌧️" },
    { label: "Adventurous", icon: "🧭" },
    { label: "Heartwarming", icon: "🌸" },
    { label: "Deep Thought", icon: "🕯️" }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    if (!note.trim() && !quote.trim()) return;

    const newEntry = {
      id: "j_" + Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      bookTitle: bookTitle.trim() || "Reading Reflections",
      quote: quote.trim(),
      note: note.trim(),
      mood
    };

    onAddEntry(newEntry);
    setBookTitle("");
    setQuote("");
    setNote("");
    setShowAddForm(false);
  };

  return (
    <section className="reading-journal-section" id="reading-journal">
      <div className="journal-header-row">
        <div className="journal-title-area">
          <div className="aesthetic-badge">
            <Sparkles size={13} /> REFLECTIONS &amp; PASSAGES
          </div>
          <h2>My Digital Reading Journal</h2>
          <p className="journal-subtitle">
            A quiet sanctuary for memorable prose, fleeting thoughts, and handwritten margins.
          </p>
        </div>

        <button
          type="button"
          className="journal-add-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={16} /> {showAddForm ? "Close Journal Entry" : "New Journal Entry"}
        </button>
      </div>

      {/* Featured Literary Quotes Carousel/Ticker */}
      <div className="literary-quote-ribbon">
        <span className="quote-ornament">❝</span>
        <div className="quote-content">
          <p className="quote-body">{LITERARY_QUOTES[0].quote}</p>
          <span className="quote-author">— {LITERARY_QUOTES[0].author}</span>
        </div>
      </div>

      {/* Add Journal Entry Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            className="journal-compose-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="compose-washi-tape" />
            <form onSubmit={handleSave} className="journal-form">
              <div className="form-row-dual">
                <div className="journal-field">
                  <label>Story or Book Title</label>
                  {books.length > 0 ? (
                    <input
                      type="text"
                      list="user-books-datalist"
                      placeholder="Select a book or type any title..."
                      value={bookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Title of the story..."
                      value={bookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                    />
                  )}
                  {books.length > 0 && (
                    <datalist id="user-books-datalist">
                      {books.map((b) => (
                        <option key={b.id} value={b.title} />
                      ))}
                    </datalist>
                  )}
                </div>

                <div className="journal-field">
                  <label>Reading Mood</label>
                  <div className="mood-chips">
                    {moods.map((m) => (
                      <button
                        key={m.label}
                        type="button"
                        className={`mood-chip ${mood === m.label ? "active" : ""}`}
                        onClick={() => setMood(m.label)}
                      >
                        <span>{m.icon}</span> {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="journal-field">
                <label>Memorable Quote or Excerpt</label>
                <input
                  type="text"
                  placeholder="“A sentence that lingered in your thoughts...”"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                />
              </div>

              <div className="journal-field">
                <label>Personal Reflection / Notes *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Pour your thoughts onto this page... What feelings did this story evoke?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div className="journal-form-footer">
                <button
                  type="button"
                  className="cancel-journal-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-journal-btn">
                  Seal Entry into Journal ✦
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Journal Entries Grid / Spread */}
      <div className="journal-entries-grid">
        {journalEntries.length === 0 ? (
          <div className="empty-journal-box">
            <div className="quill-art">🪶</div>
            <h3>Your Journal Pages are Waiting</h3>
            <p>
              Capture favourite passages, annotate your thoughts, or write a love letter to a book you couldn't put down.
            </p>
            <button
              type="button"
              className="write-first-entry-btn"
              onClick={() => setShowAddForm(true)}
            >
              <Plus size={15} /> Write Your First Journal Reflection
            </button>
          </div>
        ) : (
          journalEntries.map((entry) => (
            <div key={entry.id} className="journal-entry-card">
              <div className="entry-washi-tape" />
              <div className="entry-meta-top">
                <span className="entry-date">
                  <Calendar size={13} /> {entry.date}
                </span>
                <span className="entry-mood-badge">{entry.mood}</span>
                <button
                  type="button"
                  className="del-entry-btn"
                  onClick={() => onDeleteEntry(entry.id)}
                  title="Remove entry"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <h4 className="entry-book-title">{entry.bookTitle}</h4>

              {entry.quote && (
                <blockquote className="entry-quote-block">
                  <Quote size={15} className="quote-icon-inline" />
                  <span>{entry.quote}</span>
                </blockquote>
              )}

              <p className="entry-body-text">{entry.note}</p>

              <div className="entry-card-stamp">
                <span>✦ Read with love ✦</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
