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
  ChevronDown,
  Moon,
  Sun
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
import { USER_AUTHENTIC_COLLECTION, SCREENSHOT_REFERENCE_BOOKS } from "./data/screenshotBooks";
import ProfileModal from "./components/ProfileModal";
import SeasonalBanner from "./components/SeasonalBanner";
import FestivalParticleCanvas from "./components/festivals/FestivalParticleCanvas";
import FestivalSelector from "./components/festivals/FestivalSelector";
import FestivalHub from "./components/festivals/FestivalHub";
import { getFestivalThemeById } from "./data/festivalData";
import { getOriginalBookPages } from "./data/verifiedBookPages";

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
  const [themeModalTab, setThemeModalTab] = useState("regular"); // 'regular' (Daily) | 'festive' (Seasonal)
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

  // Auto-restore user's authentic book collection & migrate verified pages
  useEffect(() => {
    if (!currentUser) return;
    const currentBooks = currentUser.books || [];
    const hasUnwantedRef = currentBooks.some(
      (b) => (b.id && b.id.startsWith("ref_")) || b.title === "The Poppy War" || b.title === "The Thursday Murder Club"
    );

    if (currentBooks.length === 0 || hasUnwantedRef) {
      // Restore user's authentic collection
      setCurrentUser((prev) => {
        const updated = {
          ...prev,
          books: USER_AUTHENTIC_COLLECTION
        };
        saveCurrentUser(updated);
        return updated;
      });
      return;
    }

    let hasChanges = false;
    const DUMMY_MOCK_COMPLETED_DATES = new Set([
      "2026-10-18",
      "2026-10-22",
      "2026-10-25",
      "2026-10-28",
      "2026-11-01",
      "2026-11-04",
      "2026-11-07",
      "2026-11-09",
      "2026-11-12"
    ]);

    const migrated = currentBooks.map((b) => {
      let updatedBook = { ...b };
      const origPages = getOriginalBookPages(b.title, b.author, b.pages);
      if (b.pages === 280 || !b.pages || b.pages !== origPages) {
        hasChanges = true;
        updatedBook.pages = origPages;
      }
      // Remove randomly placed placeholder mock completion dates so user is prompted to enter their real date
      if (b.completed && DUMMY_MOCK_COMPLETED_DATES.has(b.completed)) {
        hasChanges = true;
        updatedBook.completed = "";
      }
      return updatedBook;
    });

    if (hasChanges) {
      setCurrentUser((prev) => ({
        ...prev,
        books: migrated
      }));
    }
  }, []);

  // Apply CSS theme variables to root document
  const activeThemeId = currentUser?.theme || "sage-cream";
  const isFestiveActive = activeThemeId.startsWith("festive-");

  // Track everyday daily theme separately
  const dailyThemeId = currentUser?.dailyTheme || (isFestiveActive ? "sage-cream" : activeThemeId);
  const dailyThemeObj = useMemo(() => {
    return REGULAR_THEMES.find((t) => t.id === dailyThemeId) || REGULAR_THEMES[0];
  }, [dailyThemeId]);

  const currentThemeObj = useMemo(() => {
    return ALL_THEMES.find((t) => t.id === activeThemeId) || REGULAR_THEMES[0];
  }, [activeThemeId]);

  const currentFestival = useMemo(() => {
    return getFestivalThemeById(activeThemeId);
  }, [activeThemeId]);

  const isDarkTheme = useMemo(() => {
    return Boolean(
      currentThemeObj?.isDark ||
      activeThemeId === "midnight-dark" ||
      activeThemeId === "velvet-noir"
    );
  }, [currentThemeObj, activeThemeId]);

  useEffect(() => {
    const root = document.documentElement;
    const colors = currentThemeObj.colors;

    if (isDarkTheme) {
      root.classList.add("dark-mode");
      document.body.classList.add("dark-mode");
    } else {
      root.classList.remove("dark-mode");
      document.body.classList.remove("dark-mode");
    }

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

    if (currentFestival?.colors?.glowColor) {
      root.style.setProperty("--festival-glow", currentFestival.colors.glowColor);
    }
    if (currentFestival?.colors?.haloGrad) {
      root.style.setProperty("--festival-halo", currentFestival.colors.haloGrad);
    }

    document.body.style.backgroundColor = colors.bgMain;
    document.body.style.color = colors.textBody;
  }, [currentThemeObj, currentFestival, isDarkTheme]);

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

  // Theme Handlers: Separate Daily Themes vs Festive Themes & Dark Mode
  const handleSelectTheme = (themeId) => {
    if (!currentUser) return;
    const isFestive = themeId.startsWith("festive-");
    const chosenTheme = ALL_THEMES.find((t) => t.id === themeId);
    const isDark = Boolean(chosenTheme?.isDark || themeId === "midnight-dark" || themeId === "velvet-noir");

    setCurrentUser((prev) => ({
      ...prev,
      theme: themeId,
      dailyTheme: !isFestive ? themeId : prev.dailyTheme || "sage-cream",
      lastLightTheme: !isDark && !isFestive ? themeId : prev.lastLightTheme || "sage-cream",
      lastDarkTheme: isDark && !isFestive ? themeId : prev.lastDarkTheme || "midnight-dark"
    }));
  };

  const handleToggleDarkMode = () => {
    if (!currentUser) return;
    if (isDarkTheme) {
      const targetLight = currentUser.lastLightTheme || "sage-cream";
      handleSelectTheme(targetLight);
    } else {
      const targetDark = currentUser.lastDarkTheme || "midnight-dark";
      handleSelectTheme(targetDark);
    }
  };

  const handleReturnToDailyTheme = () => {
    if (!currentUser) return;
    const targetDaily = currentUser.dailyTheme || "sage-cream";
    handleSelectTheme(targetDaily);
  };

  const handleOpenDailyThemesModal = () => {
    setThemeModalTab("regular");
    setShowThemeModal(true);
  };

  const handleOpenFestivalsModal = () => {
    setThemeModalTab("festive");
    setShowThemeModal(true);
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

  const handleAddQuickBook = (bookData) => {
    const pages = getOriginalBookPages(bookData.title, bookData.author, bookData.pages);
    const newBook = {
      id: `book_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      title: bookData.title || "Untitled Book",
      author: bookData.author || "Unknown Author",
      genre: bookData.genre || "Fiction",
      pages,
      coverColor: bookData.coverColor || "#6a7b67",
      coverImage: bookData.coverImage || "",
      status: bookData.status || "want",
      rating: bookData.rating || 5,
      notes: bookData.notes || "",
      currentPage: bookData.currentPage || (bookData.status === "currently" ? 1 : null),
      created: new Date().toISOString()
    };
    handleSaveBook(newBook);
  };

  const handleUpdateBookStatus = (bookId, newStatus, optionalCompletedDate) => {
    if (!currentUser) return;
    setCurrentUser((prev) => {
      const updated = prev.books.map((b) => {
        if (b.id === bookId) {
          const isCompletedNow = newStatus === "read";
          return {
            ...b,
            status: newStatus,
            completed: isCompletedNow
              ? (optionalCompletedDate !== undefined ? optionalCompletedDate : (b.completed || ""))
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
                  ? (optionalCompletedDate !== undefined ? optionalCompletedDate : (prev.completed || ""))
                  : prev.completed
            }
          : null
      );
    }
  };

  const handleUpdateBookCompletedDate = (bookId, completedDate) => {
    if (!currentUser) return;
    setCurrentUser((prev) => ({
      ...prev,
      books: prev.books.map((b) => (b.id === bookId ? { ...b, completed: completedDate } : b))
    }));
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook((prev) => (prev ? { ...prev, completed: completedDate } : null));
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

  const handleUpdateBookBookmark = (bookId, currentPage) => {
    if (!currentUser) return;
    const pageNum = Math.max(1, Number(currentPage) || 1);
    setCurrentUser((prev) => ({
      ...prev,
      books: prev.books.map((b) => (b.id === bookId ? { ...b, currentPage: pageNum } : b))
    }));
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook((prev) => (prev ? { ...prev, currentPage: pageNum } : null));
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
        onOpenFestivals={handleOpenFestivalsModal}
      />

      {/* 60 FPS Hardware-Accelerated Festival Particle System (ONLY active in Festive Themes) */}
      {isFestiveActive && currentFestival && currentUser.festiveAnimationEnabled && (
        <FestivalParticleCanvas
          themeId={activeThemeId}
          particleType={currentFestival.particleType}
          enabled={currentUser.festiveAnimationEnabled}
        />
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
              className={`nav-tab-item nav-tab-overview-icon ${activeTab === "all" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("all");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              title="Overview"
              aria-label="Overview"
            >
              <BookOpen size={16} />
            </button>
            <button
              type="button"
              className={`nav-tab-item ${activeTab === "bookshelf" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("bookshelf");
                document.getElementById("virtual-bookshelf")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Bookshelf
            </button>
            <button
              type="button"
              className={`nav-tab-item ${activeTab === "journal" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("journal");
                document.getElementById("reading-journal")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Journal
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
                placeholder="Search..."
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

            {/* Seasonal Festival Option: ONLY shown when a festival is around the corner OR active */}
            <FestivalSelector
              currentThemeId={activeThemeId}
              onSelectTheme={handleSelectTheme}
              onReturnToDailyTheme={handleReturnToDailyTheme}
              animationEnabled={currentUser.festiveAnimationEnabled}
              onToggleAnimation={handleToggleFestiveAnimation}
              onOpenFullModal={handleOpenFestivalsModal}
            />

            {/* Dedicated Daily Themes Customizer Button */}
            <button
              type="button"
              className="theme-trigger-btn daily-theme-btn"
              onClick={handleOpenDailyThemesModal}
              title={`Theme: ${dailyThemeObj.name}. Tap to customize everyday palette.`}
            >
              <Palette size={15} />
              <span className="theme-name-label">
                {dailyThemeObj.name}
              </span>
            </button>

            {/* Quick 1-Click Dark Mode Toggle */}
            <button
              type="button"
              className={`quick-dark-toggle-btn ${isDarkTheme ? "active-dark" : ""}`}
              onClick={handleToggleDarkMode}
              title={isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Mode (Midnight Library)"}
              aria-label={isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {isDarkTheme ? <Sun size={14} /> : <Moon size={14} />}
              <span className="dark-toggle-label">{isDarkTheme ? "Light" : "Dark"}</span>
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
                <Plus size={16} /> Add a New Book
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

        {/* Interactive Festival Hub: Greeting, Countdown, Reading Challenge, Gift Unwrap & Badges (Only rendered during Festive Mode) */}
        {isFestiveActive && (
          <FestivalHub
            activeThemeId={activeThemeId}
            userBooks={userBooks}
            onAddBookToLibrary={handleAddQuickBook}
            onSelectBook={(book) => setSelectedBook(book)}
          />
        )}

        {/* MAIN VIRTUAL BOOKSHELF & RIGHT-SIDE COMPLETED READ STACK */}
        {(activeTab === "all" || activeTab === "bookshelf" || activeTab === "stack") && (
          <div className="bookshelf-with-sidebar-container">
            {/* Left Main Area: Virtual Bookshelf */}
            <div className="bookshelf-primary-area" id="virtual-bookshelf">
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
              />
            </div>

            {/* Right Side: Realistic Stack of Completed Books (Matching Images 1 & 3) */}
            <aside className="bookshelf-right-stack-sidebar" id="read-books-stack">
              <CompletedBookStack
                books={filteredBooks}
                onSelectBook={(book) => setSelectedBook(book)}
                onOpenAdd={() => {
                  setEditingBook(null);
                  setShowAddModal(true);
                }}
              />
            </aside>
          </div>
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
            onUpdateBookmark={handleUpdateBookBookmark}
            onUpdateCompletedDate={handleUpdateBookCompletedDate}
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
            initialTab={themeModalTab}
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
