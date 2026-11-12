import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, Plus, Trash2, ArrowRight, Check, Search, Heart, Compass } from "lucide-react";
import { AVATAR_OPTIONS, BOOK_SPINE_PALETTES } from "../constants";
import { searchBooksApi } from "../api";
import { createNewUserProfile } from "../storage";

export default function Onboarding({ onComplete }) {
  // Step state: 1: Profile creation, 2: Journey Choice, 3a: Reader lists, 3b: New reader welcome
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATAR_OPTIONS[0].id);
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");
  const [readingLevel, setReadingLevel] = useState("reader");

  // For Reader lists:
  const [readBooks, setReadBooks] = useState([]);
  const [wantBooks, setWantBooks] = useState([]);

  // Search state for Step 3a:
  const [activeListTarget, setActiveListTarget] = useState("read"); // 'read' or 'want'
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [manualTitle, setManualTitle] = useState("");
  const [manualAuthor, setManualAuthor] = useState("");

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setStep(2);
  };

  const handleJourneyChoice = (choice) => {
    setReadingLevel(choice);
    if (choice === "reader") {
      setStep(3); // Go to dual lists
    } else {
      setStep(4); // New reader inspiration message
    }
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results = await searchBooksApi(searchQuery);
      setSearchResults(results);
    } catch {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const addBookToList = (book) => {
    const list = activeListTarget === "read" ? readBooks : wantBooks;
    // Prevent duplicates in the current list
    if (list.some((b) => b.title.toLowerCase() === book.title.toLowerCase())) {
      return;
    }
    const fullBook = {
      ...book,
      id: "ob_" + Math.random().toString(36).substring(2, 9),
      status: activeListTarget === "read" ? "read" : "want",
      completed: activeListTarget === "read" ? new Date().toISOString().slice(0, 10) : "",
      rating: activeListTarget === "read" ? 5 : 0,
      spineColor: BOOK_SPINE_PALETTES[(readBooks.length + wantBooks.length) % BOOK_SPINE_PALETTES.length].bg
    };

    if (activeListTarget === "read") {
      setReadBooks((prev) => [fullBook, ...prev]);
    } else {
      setWantBooks((prev) => [...prev, fullBook]);
    }
  };

  const handleManualAdd = (e) => {
    e.preventDefault();
    if (!manualTitle.trim()) return;
    const newBook = {
      id: "ob_" + Math.random().toString(36).substring(2, 9),
      title: manualTitle.trim(),
      author: manualAuthor.trim() || "Unknown Author",
      genre: "Literature",
      year: new Date().getFullYear().toString(),
      pages: 250,
      cover: "",
      status: activeListTarget === "read" ? "read" : "want",
      completed: activeListTarget === "read" ? new Date().toISOString().slice(0, 10) : "",
      rating: activeListTarget === "read" ? 5 : 0,
      spineColor: BOOK_SPINE_PALETTES[(readBooks.length + wantBooks.length) % BOOK_SPINE_PALETTES.length].bg
    };
    if (activeListTarget === "read") {
      setReadBooks((prev) => [newBook, ...prev]);
    } else {
      setWantBooks((prev) => [...prev, newBook]);
    }
    setManualTitle("");
    setManualAuthor("");
  };

  const removeBookFromList = (listType, bookId) => {
    if (listType === "read") {
      setReadBooks((prev) => prev.filter((b) => b.id !== bookId));
    } else {
      setWantBooks((prev) => prev.filter((b) => b.id !== bookId));
    }
  };

  const finalizeOnboarding = () => {
    const selectedAvatar = customAvatarUrl.trim() ? customAvatarUrl.trim() : avatar;
    const user = createNewUserProfile({
      name: name.trim() || "Gentle Reader",
      avatar: selectedAvatar,
      readingLevel
    });

    if (readingLevel === "reader") {
      // Books I've already read go into read stack, want to read go to bookshelf
      user.books = [...readBooks, ...wantBooks];
    } else {
      user.books = []; // Clean slate for new reader
    }

    onComplete(user);
  };

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-ambient ambient-top-left" />
      <div className="onboarding-ambient ambient-bottom-right" />

      <div className="onboarding-container">
        {/* Brand Header */}
        <div className="onboarding-brand">
          <span className="brand-logo-icon">
            <BookOpen size={24} />
          </span>
          <span className="brand-title">
            Between <em>the Pages</em>
          </span>
          <div className="brand-tagline">✦ A Pinterest-Inspired Digital Reading Sanctuary ✦</div>
        </div>

        {/* STEP 1: Profile Creation */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="onboarding-card profile-card"
          >
            <div className="step-badge">
              <Sparkles size={14} /> STEP 1 OF 2
            </div>
            <h2>Welcome to Your Little Reading Corner</h2>
            <p className="step-subtitle">
              Let's create your personal reading journal space. Tell us your name and choose a cozy avatar.
            </p>

            <form onSubmit={handleProfileSubmit} className="onboarding-form">
              <div className="field-group">
                <label className="field-label" htmlFor="user-name">
                  What should we call you? *
                </label>
                <input
                  id="user-name"
                  type="text"
                  required
                  placeholder="e.g. Clara, Julian, or Book Lover"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="aesthetic-input"
                  autoFocus
                />
              </div>

              <div className="field-group">
                <label className="field-label">Choose your reading spirit avatar</label>
                <div className="avatar-grid">
                  {AVATAR_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`avatar-choice ${avatar === opt.id && !customAvatarUrl ? "selected" : ""}`}
                      onClick={() => {
                        setAvatar(opt.id);
                        setCustomAvatarUrl("");
                      }}
                      title={opt.name}
                    >
                      <span className="avatar-icon" style={{ backgroundColor: opt.bg }}>
                        {opt.icon}
                      </span>
                      <span className="avatar-label">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="field-group custom-avatar-group">
                <label className="field-label" htmlFor="custom-avatar">
                  Or provide a custom image URL <span className="optional-tag">OPTIONAL</span>
                </label>
                <input
                  id="custom-avatar"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  className="aesthetic-input-subtle"
                />
              </div>

              <button type="submit" className="onboarding-btn-primary" disabled={!name.trim()}>
                Create Your Profile <ArrowRight size={17} />
              </button>
            </form>
          </motion.div>
        )}

        {/* STEP 2: Choose Reading Journey */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="onboarding-card journey-card"
          >
            <div className="step-badge">
              <Sparkles size={14} /> STEP 2 OF 2
            </div>
            <h2>Where are you in your reading journey?</h2>
            <p className="step-subtitle">
              Choose the path that fits you right now. You can always adjust your library anytime.
            </p>

            <div className="journey-options-grid">
              {/* Option 1: I'm a Reader */}
              <button
                type="button"
                className="journey-choice-card"
                onClick={() => handleJourneyChoice("reader")}
              >
                <div className="choice-ornament">📚</div>
                <h3>I'm a Reader</h3>
                <p>
                  I already have books I've read and a growing wishlist. Help me organise them on my bookshelf and stack!
                </p>
                <div className="choice-action-pill">
                  Organise My Collection <ArrowRight size={14} />
                </div>
              </button>

              {/* Option 2: I'm New to Reading */}
              <button
                type="button"
                className="journey-choice-card new-reader-card"
                onClick={() => handleJourneyChoice("new")}
              >
                <div className="choice-ornament">🌱</div>
                <h3>I'm New to Reading</h3>
                <p>
                  I'm just beginning my journey and want a clean, peaceful space to discover and track my first stories.
                </p>
                <div className="choice-action-pill">
                  Start Fresh <ArrowRight size={14} />
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3 (For Existing Readers): Organize Reading Lists */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="onboarding-card reader-setup-card"
          >
            <div className="step-badge">
              <Sparkles size={14} /> ORGANISE YOUR LIBRARY
            </div>
            <h2>Curate Your Starting Chapters</h2>
            <p className="step-subtitle">
              Add stories you've already read to your <strong>Read Books Stack</strong>, and stories you want to read to your <strong>Virtual Bookshelf</strong>.
            </p>

            {/* Target Tab Switcher */}
            <div className="list-toggle-bar">
              <button
                type="button"
                className={`toggle-tab ${activeListTarget === "read" ? "active" : ""}`}
                onClick={() => setActiveListTarget("read")}
              >
                <span>📖 Books I've Already Read</span>
                <span className="count-pill">{readBooks.length}</span>
              </button>
              <button
                type="button"
                className={`toggle-tab ${activeListTarget === "want" ? "active" : ""}`}
                onClick={() => setActiveListTarget("want")}
              >
                <span>🔖 Books I Want to Read</span>
                <span className="count-pill">{wantBooks.length}</span>
              </button>
            </div>

            {/* Search and Quick Add */}
            <div className="book-finder-panel">
              <form onSubmit={handleSearch} className="search-bar-row">
                <div className="search-input-wrap">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder={`Search title or author to add to "${
                      activeListTarget === "read" ? "Already Read" : "Want to Read"
                    }"...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button type="submit" className="search-submit-btn" disabled={isSearching}>
                  {isSearching ? "Searching..." : "Search Books"}
                </button>
              </form>

              {/* Live Search Results */}
              {searchResults.length > 0 && (
                <div className="quick-results-shelf">
                  <div className="results-label">
                    <span>Found matching books (click to add):</span>
                    <button type="button" onClick={() => setSearchResults([])} className="dismiss-btn">
                      Dismiss
                    </button>
                  </div>
                  <div className="results-row-scroll">
                    {searchResults.map((b) => (
                      <div key={b.openLibraryKey || b.title} className="result-thumb-card">
                        <div className="thumb-cover">
                          {b.cover ? (
                            <img src={b.cover} alt={b.title} />
                          ) : (
                            <div className="thumb-fallback" style={{ backgroundColor: b.spineColor }}>
                              <span>{b.title[0]}</span>
                            </div>
                          )}
                        </div>
                        <div className="thumb-meta">
                          <span className="thumb-title" title={b.title}>{b.title}</span>
                          <span className="thumb-author">{b.author}</span>
                          <button
                            type="button"
                            className="add-thumb-btn"
                            onClick={() => addBookToList(b)}
                          >
                            <Plus size={13} /> Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Or manual quick add */}
              <form onSubmit={handleManualAdd} className="manual-quick-add">
                <span className="manual-hint">Or add title manually:</span>
                <input
                  type="text"
                  placeholder="Book title"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  className="quick-input"
                />
                <input
                  type="text"
                  placeholder="Author (optional)"
                  value={manualAuthor}
                  onChange={(e) => setManualAuthor(e.target.value)}
                  className="quick-input"
                />
                <button type="submit" className="quick-add-btn">
                  <Plus size={14} /> Add
                </button>
              </form>
            </div>

            {/* Current Lists Display */}
            <div className="onboarding-lists-preview">
              <div className="list-column">
                <div className="column-head">
                  <h4>
                    <span>📖 Books I've Already Read</span> ({readBooks.length})
                  </h4>
                  <small>Will be placed in your 3D Read Books Stack</small>
                </div>
                <div className="books-pill-stream">
                  {readBooks.length === 0 ? (
                    <div className="empty-pill-msg">No read books added yet. Search above or add manually!</div>
                  ) : (
                    readBooks.map((b) => (
                      <div key={b.id} className="book-item-pill">
                        {b.cover ? (
                          <img src={b.cover} alt="" className="pill-img" />
                        ) : (
                          <div className="pill-color" style={{ backgroundColor: b.spineColor }} />
                        )}
                        <div className="pill-text">
                          <strong>{b.title}</strong>
                          <small>{b.author}</small>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeBookFromList("read", b.id)}
                          className="pill-del-btn"
                          title="Remove"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="list-column">
                <div className="column-head">
                  <h4>
                    <span>🔖 Books I Want to Read</span> ({wantBooks.length})
                  </h4>
                  <small>Will be placed on your 3D Wooden Bookshelf</small>
                </div>
                <div className="books-pill-stream">
                  {wantBooks.length === 0 ? (
                    <div className="empty-pill-msg">No wishlist books added yet. Search above or add manually!</div>
                  ) : (
                    wantBooks.map((b) => (
                      <div key={b.id} className="book-item-pill">
                        {b.cover ? (
                          <img src={b.cover} alt="" className="pill-img" />
                        ) : (
                          <div className="pill-color" style={{ backgroundColor: b.spineColor }} />
                        )}
                        <div className="pill-text">
                          <strong>{b.title}</strong>
                          <small>{b.author}</small>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeBookFromList("want", b.id)}
                          className="pill-del-btn"
                          title="Remove"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="reader-finish-bar">
              <button type="button" onClick={() => setStep(2)} className="back-link">
                ← Back
              </button>
              <button
                type="button"
                className="onboarding-btn-primary"
                onClick={finalizeOnboarding}
              >
                Enter My Library <ArrowRight size={17} />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4 (For New Readers): Warm Welcome Message */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="onboarding-card new-reader-welcome-card"
          >
            <div className="botanical-header-art">🌸 ✧ 🌿</div>
            <div className="step-badge">
              <Sparkles size={14} /> WELCOME TO YOUR STORY
            </div>

            <blockquote className="new-reader-quote">
              “It's never too late to start something new. Every great reading journey begins with a single page. Welcome to yours!”
            </blockquote>

            <p className="new-reader-description">
              Your library begins as a tranquil open room with empty shelves waiting for the stories that will shape your days. Take your time, read what sparks your curiosity, and enjoy every gentle moment.
            </p>

            <div className="new-reader-actions">
              <button
                type="button"
                className="onboarding-btn-primary"
                onClick={finalizeOnboarding}
              >
                Let's Begin ✦
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
