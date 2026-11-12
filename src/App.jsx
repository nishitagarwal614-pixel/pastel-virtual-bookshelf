import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Plus,
  Search,
  Sparkles,
  Palette,
  User,
  CheckCircle,
  Bookmark,
  Layers,
  Heart,
  X,
  Compass,
  ChevronDown
} from "lucide-react";

import { ALL_THEMES, REGULAR_THEMES, FESTIVE_THEMES, AVATAR_OPTIONS, LITERARY_QUOTES } from "./constants";
import {
  loadUsers,
  getCurrentUser,
  saveCurrentUser,
  setActiveUserId,
  deleteUserProfile
} from "./storage";

import Onboarding from "./components/Onboarding";
import WoodenBookshelf from "./components/WoodenBookshelf";
import CompletedBookStack from "./components/CompletedBookStack";
import BookDetails from "./components/BookDetails";
import AddBookModal from "./components/AddBookModal";
import ThemeModal from "./components/ThemeModal";
import ReadingJournal from "./components/ReadingJournal";
import ReadingStats from "./components/ReadingStats";
import { SCREENSHOT_REFERENCE_BOOKS } from "./data/screenshotBooks";
import ProfileModal from "./components/ProfileModal";
import SeasonalBanner from "./components/SeasonalBanner";

export default function App() {
  // Active User & All Users state
  const [allUsers, setAllUsers] = useState(loadUsers);
  const [currentUser, setCurrentUser] = useState(getCurrentUser);
  const [isOnboarding, setIsOnboarding] = useState(!getCurrentUser());

  // Navigation tab
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'bookshelf' | 'stack' | 'journal' | 'stats'

  // Modals state
  const [selectedBook, setSelectedBook] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Quick in-library search
  const [libraryQuery, setLibraryQuery] = useState("");

  // Sync current user to persistent storage whenever modified
  useEffect(() => {
    if (currentUser) {
      saveCurrentUser(currentUser);
      setAllUsers(loadUsers());
    }
  }, [currentUser]);

  // Apply CSS theme variables to root document
  const activeThemeId = currentUser?.theme || "sage-cream";
  const currentThemeObj = useMemo(() => {
    return ALL_THEMES.find((t) => t.id === activeThemeId) || REGULAR_THEMES[0];
  }, [activeThemeId]);

  useEffect(() => {
    const root = document.documentElement;
    const colors = currentThemeObj.colors;

    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-primary-hover", colors.primaryHover);
    root.style.setProperty("--color-accent", colors.accent);
    root.style.setProperty("--color-bg-main", colors.bgMain);
    root.style.setProperty("--color-bg-card", colors.bgCard);
    root.style.setProperty("--color-bg-muted", colors.bgMuted);
    root.style.setProperty("--color-border", colors.border);
    root.style.setProperty("--color-text-head", colors.textHead);
    root.style.setProperty("--color-text-body", colors.textBody);
    root.style.setProperty("--color-text-muted", colors.textMuted);
    root.style.setProperty("--shelf-wood-light", colors.woodLight);
    root.style.setProperty("--shelf-wood-dark", colors.woodDark);
    root.style.setProperty("--shelf-plank-bg", colors.shelfPlank);
    root.style.setProperty("--shelf-trim-color", colors.shelfTrim);

    document.body.style.backgroundColor = colors.bgMain;
    document.body.style.color = colors.textBody;
  }, [currentThemeObj]);

  // Handlers for Onboarding & Profile Management
  const handleOnboardingComplete = (newUser) => {
    setCurrentUser(newUser);
    setAllUsers(loadUsers());
    setIsOnboarding(false);
  };

  const handleSelectUser = (userId) => {
    setActiveUserId(userId);
    const users = loadUsers();
    setCurrentUser(users[userId] || null);
  };

  const handleAddNewProfile = () => {
    setIsOnboarding(true);
  };

  const handleUpdateCurrentProfile = (updatedProfile) => {
    setCurrentUser(updatedProfile);
  };

  const handleDeleteProfile = (userId) => {
    const nextUser = deleteUserProfile(userId);
    setAllUsers(loadUsers());
    if (nextUser) {
      setCurrentUser(nextUser);
    } else {
      setCurrentUser(null);
      setIsOnboarding(true);
    }
  };

  // Theme Handlers
  const handleSelectTheme = (themeId) => {
    if (!currentUser) return;
    setCurrentUser((prev) => ({
      ...prev,
      theme: themeId
    }));
  };

  const handleToggleFestiveAnimation = () => {
    if (!currentUser) return;
    setCurrentUser((prev) => ({
      ...prev,
      festiveAnimationEnabled: !prev.festiveAnimationEnabled
    }));
  };

  // Book Handlers
  const handleSaveBook = (book) => {
    if (!currentUser) return;
    const existingList = currentUser.books || [];
    const isEdit = existingList.some((b) => b.id === book.id);

    let updatedBooks;
    if (isEdit) {
      updatedBooks = existingList.map((b) => (b.id === book.id ? book : b));
    } else {
      // New book
      updatedBooks = [book, ...existingList];
    }

    setCurrentUser((prev) => ({
      ...prev,
      books: updatedBooks
    }));

    if (selectedBook && selectedBook.id === book.id) {
      setSelectedBook(book);
    }
  };

  const handleUpdateBookStatus = (bookId, newStatus) => {
    if (!currentUser) return;
    setCurrentUser((prev) => {
      const updated = prev.books.map((b) => {
        if (b.id === bookId) {
          const isCompletedNow = newStatus === "read";
          return {
            ...b,
            status: newStatus,
            completed: isCompletedNow
              ? b.completed || new Date().toISOString().slice(0, 10)
              : b.completed
          };
        }
        return b;
      });
      return { ...prev, books: updated };
    });

    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook((prev) =>
        prev
          ? {
              ...prev,
              status: newStatus,
              completed:
                newStatus === "read"
                  ? prev.completed || new Date().toISOString().slice(0, 10)
                  : prev.completed
            }
          : null
      );
    }
  };

  const handleMarkAsRead = (book) => {
    handleUpdateBookStatus(book.id, "read");
  };

  const handleUpdateBookRating = (bookId, rating) => {
    if (!currentUser) return;
    setCurrentUser((prev) => ({
      ...prev,
      books: prev.books.map((b) => (b.id === bookId ? { ...b, rating } : b))
    }));
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook((prev) => (prev ? { ...prev, rating } : null));
    }
  };

  const handleUpdateBookNotes = (bookId, notes) => {
    if (!currentUser) return;
    setCurrentUser((prev) => ({
      ...prev,
      books: prev.books.map((b) => (b.id === bookId ? { ...b, notes } : b))
    }));
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook((prev) => (prev ? { ...prev, notes } : null));
    }
  };

  const handleDeleteBook = (bookId) => {
    if (!currentUser) return;
    setCurrentUser((prev) => ({
      ...prev,
      books: prev.books.filter((b) => b.id !== bookId)
    }));
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook(null);
    }
  };

  const handleLoadReferenceBooks = () => {
    if (!currentUser) return;
    setCurrentUser((prev) => {
      const updated = {
        ...prev,
        books: SCREENSHOT_REFERENCE_BOOKS
      };
      saveCurrentUser(updated);
      return updated;
    });
  };

  // Journal Handlers
  const handleAddJournalEntry = (newEntry) => {
    if (!currentUser) return;
    setCurrentUser((prev) => ({
      ...prev,
      journalEntries: [newEntry, ...(prev.journalEntries || [])]
    }));
  };

  const handleDeleteJournalEntry = (entryId) => {
    if (!currentUser) return;
    setCurrentUser((prev) => ({
      ...prev,
      journalEntries: (prev.journalEntries || []).filter((e) => e.id !== entryId)
    }));
  };

  // Reading Goal Handler
  const handleUpdateReadingGoal = (newGoal) => {
    if (!currentUser) return;
    setCurrentUser((prev) => ({
      ...prev,
      readingGoal: newGoal
    }));
  };

  // Filtered books for search queries
  const userBooks = currentUser?.books || [];
  const filteredBooks = useMemo(() => {
    if (!libraryQuery.trim()) return userBooks;
    const q = libraryQuery.toLowerCase();
    return userBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q)
    );
  }, [userBooks, libraryQuery]);

  // Current user's avatar icon/image
  const avatarObj = AVATAR_OPTIONS.find((a) => a.id === currentUser?.avatar);

  // If first-time user / onboarding active, show Onboarding view
  if (isOnboarding || !currentUser) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className={`app-canvas theme-${activeThemeId}`}>
      {/* Seasonal Ambient Suggestions & Floating Festive Effects */}
      <SeasonalBanner
        currentThemeId={activeThemeId}
        onApplyTheme={handleSelectTheme}
      />

      {/* Floating Ambient Festive Sprinkles (if enabled and festive theme active) */}
      {currentUser.festiveAnimationEnabled && activeThemeId.startsWith("festive-") && (
        <div className="festive-ambient-curtain" aria-hidden="true">
          {activeThemeId === "festive-christmas" && (
            <div className="falling-snow">
              <span className="snowflake s1">❄</span>
              <span className="snowflake s2">❅</span>
              <span className="snowflake s3">❄</span>
              <span className="snowflake s4">❅</span>
              <span className="snowflake s5">❄</span>
            </div>
          )}
          {activeThemeId === "festive-diwali" && (
            <div className="golden-sparkles">
              <span className="sparkle-gem g1">✦</span>
              <span className="sparkle-gem g2">✧</span>
              <span className="sparkle-gem g3">✦</span>
              <span className="sparkle-gem g4">✧</span>
            </div>
          )}
          {activeThemeId === "festive-newyear" && (
            <div className="golden-sparkles">
              <span className="sparkle-gem g1">⭐</span>
              <span className="sparkle-gem g2">✨</span>
              <span className="sparkle-gem g3">✦</span>
            </div>
          )}
        </div>
      )}

      {/* Aesthetic Top Navigation Bar */}
      <header className="main-navbar">
        <div className="nav-inner-container">
          {/* Brand Logo & Name */}
          <div className="brand-group">
            <span className="nav-brand-icon">
              <BookOpen size={20} />
            </span>
            <div className="brand-titles">
              <span className="brand-primary">
                Between <em>the Pages</em>
              </span>
              <span className="brand-subtitle">Virtual Library &amp; Journal</span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="desktop-nav-tabs">
            <button
              type="button"
              className={`nav-tab-item ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              Overview
            </button>
            <button
              type="button"
              className={`nav-tab-item ${activeTab === "bookshelf" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("bookshelf");
                document.getElementById("virtual-bookshelf")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              3D Bookshelf
            </button>
            <button
              type="button"
              className={`nav-tab-item ${activeTab === "stack" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("stack");
                document.getElementById("read-books-stack")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Read Stack
            </button>
            <button
              type="button"
              className={`nav-tab-item ${activeTab === "journal" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("journal");
                document.getElementById("reading-journal")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Reading Journal
            </button>
            <button
              type="button"
              className={`nav-tab-item ${activeTab === "stats" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("stats");
                document.getElementById("reading-stats")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Statistics
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="nav-actions-group">
            {/* Quick in-library Search input */}
            <div className="nav-search-bar">
              <Search size={14} className="search-icon-subtle" />
              <input
                type="text"
                placeholder="Search my library..."
                value={libraryQuery}
                onChange={(e) => setLibraryQuery(e.target.value)}
              />
              {libraryQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setLibraryQuery("")}
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Theme Customizer Trigger */}
            <button
              type="button"
              className="theme-trigger-btn"
              onClick={() => setShowThemeModal(true)}
              title={`Theme: ${currentThemeObj.name}`}
            >
              <Palette size={16} />
              <span className="theme-name-label">{currentThemeObj.name}</span>
            </button>

            {/* Add Book Button */}
            <button
              type="button"
              className="add-book-header-btn"
              onClick={() => {
                setEditingBook(null);
                setShowAddModal(true);
              }}
            >
              <Plus size={16} />
              <span>Add Book</span>
            </button>

            {/* User Profile Badge */}
            <button
              type="button"
              className="user-profile-badge"
              onClick={() => setShowProfileModal(true)}
              title={`Signed in as ${currentUser.name}`}
            >
              <div className="badge-avatar">
                {currentUser.avatar?.startsWith("http") ? (
                  <img src={currentUser.avatar} alt={currentUser.name} />
                ) : (
                  <span>{avatarObj?.icon || "📖"}</span>
                )}
              </div>
              <span className="badge-name">{currentUser.name}</span>
              <ChevronDown size={13} className="badge-chevron" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content-flow">
        {/* Personal Greeting & Hero Banner */}
        <section className="reader-hero-greeting">
          <div className="hero-text-side">
            <div className="hero-eyebrow">
              <Sparkles size={14} /> WELCOME BACK TO YOUR READING ROOM
            </div>
            <h1>
              Hello, <em>{currentUser.name}</em>!
            </h1>
            <p className="hero-quote">
              &ldquo;{LITERARY_QUOTES[0].quote}&rdquo;
            </p>
            <div className="hero-quick-actions">
              <button
                type="button"
                className="hero-action-primary"
                onClick={() => {
                  setEditingBook(null);
                  setShowAddModal(true);
                }}
              >
                <Plus size={16} /> Add a New Story
              </button>
              <button
                type="button"
                className="hero-action-secondary"
                onClick={() => {
                  document.getElementById("reading-journal")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Heart size={15} /> Write in Journal
              </button>
            </div>
          </div>

          <div className="hero-visual-side">
            <div className="journal-desk-mockup">
              <div className="desk-postcard">
                <span className="postcard-stamp">✦ 1892</span>
                <p>&ldquo;Between the pages of a book is a lovely place to be.&rdquo;</p>
                <span className="postcard-footer">Slow mornings &amp; good stories</span>
              </div>
              <div className="desk-botanical-leaf">🌿</div>
              <div className="desk-polaroid">
                <div className="polaroid-photo">
                  <div className="mini-books-doodle">📚</div>
                </div>
                <small>{userBooks.length} Stories Collected</small>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: Three-Shelf Wooden Bookshelf – To Be Read */}
        {(activeTab === "all" || activeTab === "bookshelf") && (
          <WoodenBookshelf
            books={filteredBooks}
            activeTheme={activeThemeId}
            festiveAnimationEnabled={currentUser.festiveAnimationEnabled}
            onSelectBook={(book) => setSelectedBook(book)}
            onOpenAdd={() => {
              setEditingBook(null);
              setShowAddModal(true);
            }}
            onMarkAsRead={handleMarkAsRead}
            onLoadReferenceBooks={handleLoadReferenceBooks}
          />
        )}

        {/* SECTION 2: Completed Books – Realistic 3D Stack */}
        {(activeTab === "all" || activeTab === "stack") && (
          <CompletedBookStack
            books={filteredBooks}
            onSelectBook={(book) => setSelectedBook(book)}
            onOpenAdd={() => {
              setEditingBook(null);
              setShowAddModal(true);
            }}
          />
        )}

        {/* SECTION C: Reading Journal */}
        {(activeTab === "all" || activeTab === "journal") && (
          <ReadingJournal
            books={userBooks}
            journalEntries={currentUser.journalEntries || []}
            onAddEntry={handleAddJournalEntry}
            onDeleteEntry={handleDeleteJournalEntry}
          />
        )}

        {/* SECTION D: Reading Insights & Statistics */}
        {(activeTab === "all" || activeTab === "stats") && (
          <ReadingStats
            books={userBooks}
            readingGoal={currentUser.readingGoal || 20}
            onUpdateGoal={handleUpdateReadingGoal}
            onSelectBook={(book) => setSelectedBook(book)}
          />
        )}
      </main>

      {/* Aesthetic Footer */}
      <footer className="sanctuary-footer">
        <div className="footer-content">
          <p>
            Between the Pages — Handcrafted for quiet afternoons, soft tea, and one more chapter.
          </p>
          <div className="footer-links">
            <button type="button" onClick={() => setShowThemeModal(true)}>
              Theme Customisation
            </button>
            <span>•</span>
            <button type="button" onClick={() => setShowProfileModal(true)}>
              Switch Reader Profile
            </button>
            <span>•</span>
            <button type="button" onClick={() => setIsOnboarding(true)}>
              Restart Onboarding
            </button>
          </div>
          <small className="footer-watermark">
            ✦ Designed with Pinterest warmth, 3D perspective &amp; literary love ✦
          </small>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Realistic 3D Hardcover Book Detail Modal */}
      <AnimatePresence>
        {selectedBook && (
          <BookDetails
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            onUpdateStatus={handleUpdateBookStatus}
            onUpdateRating={handleUpdateBookRating}
            onUpdateNotes={handleUpdateBookNotes}
            onEdit={(b) => {
              setSelectedBook(null);
              setEditingBook(b);
              setShowAddModal(true);
            }}
            onDelete={handleDeleteBook}
          />
        )}
      </AnimatePresence>

      {/* 2. Add / Edit Book Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddBookModal
            existingBooks={userBooks}
            initialBook={editingBook}
            onClose={() => {
              setShowAddModal(false);
              setEditingBook(null);
            }}
            onSaveBook={handleSaveBook}
          />
        )}
      </AnimatePresence>

      {/* 3. Theme Customization Modal */}
      <AnimatePresence>
        {showThemeModal && (
          <ThemeModal
            currentThemeId={activeThemeId}
            onSelectTheme={handleSelectTheme}
            festiveAnimationEnabled={currentUser.festiveAnimationEnabled}
            onToggleFestiveAnimation={handleToggleFestiveAnimation}
            onClose={() => setShowThemeModal(false)}
          />
        )}
      </AnimatePresence>

      {/* 4. Profile Management Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <ProfileModal
            currentUser={currentUser}
            allUsers={allUsers}
            onSelectUser={handleSelectUser}
            onAddNewProfile={handleAddNewProfile}
            onUpdateCurrentProfile={handleUpdateCurrentProfile}
            onDeleteProfile={handleDeleteProfile}
            onClose={() => setShowProfileModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
