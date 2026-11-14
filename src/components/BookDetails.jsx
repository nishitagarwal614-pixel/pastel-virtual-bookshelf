import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Star,
  Bookmark,
  Clock,
  CheckCircle,
  Pencil,
  Trash2,
  Sparkles,
  Layers,
  Calendar,
  BookOpen
} from "lucide-react";
import Book3DViewer from "./Book3DViewer";
import { getOriginalBookPages } from "../data/verifiedBookPages.js";

/**
 * BookDetails.jsx
 * 
 * Detailed book inspection view:
 * - Realistic 3D Hardcover Model Viewer with 360-degree interactive rotation
 * - Full verified original publication page count (replaces arbitrary 280)
 * - Currently Reading Bookmark Tracker:
 *   Prompts the reader: "You're currently reading this book! Where are you at? Add a bookmark on the page you are on."
 * - Reading status selector (Want / Currently / Read)
 * - 5-star interactive rating
 * - Journal review & reflection editor
 * - Clear distinction of Authentic Spine vs Edition-Crafted Spine
 */
export default function BookDetails({
  book,
  onClose,
  onUpdateStatus,
  onUpdateRating,
  onUpdateNotes,
  onUpdateBookmark,
  onEdit,
  onDelete
}) {
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'notes'
  const [userNotes, setUserNotes] = useState(book.notes || "");
  const [isSavedNotes, setIsSavedNotes] = useState(false);

  // Genuine verified page count for this specific book
  const originalPages = getOriginalBookPages(book.title, book.author, book.pages);

  // Bookmark tracking for currently reading books
  const [currentPage, setCurrentPage] = useState(
    book.currentPage ? Math.min(originalPages, Math.max(1, Number(book.currentPage))) : 1
  );
  const [isSavedBookmark, setIsSavedBookmark] = useState(false);

  const handleStepPage = (delta) => {
    setCurrentPage((prev) => Math.min(originalPages, Math.max(1, prev + delta)));
  };

  const handleSaveBookmark = () => {
    if (onUpdateBookmark) {
      onUpdateBookmark(book.id, currentPage);
    }
    setIsSavedBookmark(true);
    setTimeout(() => setIsSavedBookmark(false), 2200);
  };

  const handleNotesSave = (e) => {
    e.preventDefault();
    onUpdateNotes(book.id, userNotes);
    setIsSavedNotes(true);
    setTimeout(() => setIsSavedNotes(false), 2000);
  };

  const statusOptions = [
    { id: "want", label: "Want to Read", icon: <Bookmark size={14} /> },
    { id: "currently", label: "Currently Reading", icon: <Clock size={14} /> },
    { id: "read", label: "Completed (Read)", icon: <CheckCircle size={14} /> }
  ];

  const hasAuthenticSpine = Boolean(book.authenticSpineUrl);

  return (
    <div className="modal-backdrop-aesthetic" onClick={onClose}>
      <motion.div
        className="book-details-modal-box"
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button type="button" className="modal-close-btn" onClick={onClose} title="Close details">
          <X size={18} />
        </button>

        <div className="details-two-column-grid">
          {/* Left Column: 3D Hardcover Model Viewer */}
          <div className="details-viewer-column">
            <div className="viewer-title-badge">
              <span className="badge-tag">
                <Sparkles size={12} /> 3D HARDCOVER VOLUME
              </span>
              <span className={`spine-type-tag ${hasAuthenticSpine ? "authentic" : "crafted"}`}>
                {hasAuthenticSpine ? "Authentic Edition Spine" : "Crafted Edition Spine"}
              </span>
            </div>

            {/* Interactive 3D Hardcover Physical Book */}
            <Book3DViewer book={book} />
          </div>

          {/* Right Column: Bibliographic Details & Interactions */}
          <div className="details-info-column">
            {/* Genre & Edition Chips */}
            <div className="meta-chips-row">
              <span className="genre-chip">{book.genre || "Literature"}</span>
              {book.year && <span className="year-chip">Published {book.year}</span>}
              <span className="pages-chip">
                <Layers size={11} /> {originalPages} pages
              </span>
            </div>

            <h2 className="book-heading-title">{book.title}</h2>
            <h3 className="book-heading-author">by {book.author || "Unknown Author"}</h3>

            {/* Reading Status Selector */}
            <div className="status-control-box">
              <span className="control-label">Reading Status:</span>
              <div className="status-buttons-row">
                {statusOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`status-btn-pill ${book.status === opt.id ? "active" : ""}`}
                    onClick={() => onUpdateStatus(book.id, opt.id)}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bookmark & Progress Section for Currently Reading Books */}
            {book.status === "currently" && (
              <motion.div
                className="currently-reading-bookmark-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="bookmark-card-header">
                  <div className="bookmark-ribbon-icon-wrap">
                    <span className="bookmark-emoji-icon">🔖</span>
                  </div>
                  <div className="bookmark-header-text">
                    <h4 className="bookmark-prompt-title">You're currently reading this book!</h4>
                    <p className="bookmark-prompt-subtitle">
                      Where are you at? Add a bookmark on the page you are on.
                    </p>
                  </div>
                </div>

                <div className="bookmark-controls-grid">
                  <div className="bookmark-stepper-wrap">
                    <span className="bookmark-field-label">Current Page:</span>
                    <div className="bookmark-steppers-row">
                      <button
                        type="button"
                        className="page-step-btn"
                        onClick={() => handleStepPage(-10)}
                        title="Back 10 pages"
                      >
                        -10
                      </button>
                      <button
                        type="button"
                        className="page-step-btn"
                        onClick={() => handleStepPage(-1)}
                        title="Back 1 page"
                      >
                        -1
                      </button>
                      <div className="bookmark-input-affix-wrap">
                        <span className="input-page-prefix">p.</span>
                        <input
                          type="number"
                          min={1}
                          max={originalPages}
                          value={currentPage}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val)) {
                              setCurrentPage(Math.min(originalPages, Math.max(1, val)));
                            }
                          }}
                          className="bookmark-page-input"
                        />
                        <span className="input-page-total">/ {originalPages}</span>
                      </div>
                      <button
                        type="button"
                        className="page-step-btn"
                        onClick={() => handleStepPage(1)}
                        title="Forward 1 page"
                      >
                        +1
                      </button>
                      <button
                        type="button"
                        className="page-step-btn"
                        onClick={() => handleStepPage(10)}
                        title="Forward 10 pages"
                      >
                        +10
                      </button>
                    </div>
                  </div>

                  <div className="bookmark-action-col">
                    <button
                      type="button"
                      className={`save-bookmark-btn ${isSavedBookmark ? "saved" : ""}`}
                      onClick={handleSaveBookmark}
                    >
                      {isSavedBookmark ? "Bookmark Placed! ✓" : "Place Bookmark 🔖"}
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="bookmark-progress-container">
                  <div className="bookmark-bar-track">
                    <div
                      className="bookmark-bar-fill"
                      style={{
                        width: `${Math.min(100, Math.max(2, Math.round((currentPage / originalPages) * 100)))}%`
                      }}
                    />
                  </div>
                  <div className="bookmark-progress-labels">
                    <span className="progress-percent">
                      {Math.round((currentPage / originalPages) * 100)}% read
                    </span>
                    <span className="progress-remaining">
                      {Math.max(0, originalPages - currentPage)} pages remaining
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Star Rating Row */}
            <div className="star-rating-row">
              <span className="rating-label">Personal Rating:</span>
              <div className="interactive-stars-bar">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-pill-btn ${star <= (book.rating || 0) ? "active" : ""}`}
                    onClick={() => onUpdateRating(book.id, star === book.rating ? 0 : star)}
                    title={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    <Star
                      size={20}
                      fill={star <= (book.rating || 0) ? "#d4af37" : "none"}
                      color={star <= (book.rating || 0) ? "#d4af37" : "#d0c6b6"}
                    />
                  </button>
                ))}
              </div>
              <span className="rating-summary-text">
                {book.rating > 0 ? `${book.rating} of 5 stars` : "Unrated"}
              </span>
            </div>

            {/* Tab Navigation */}
            <div className="details-tab-nav">
              <button
                type="button"
                className={`tab-btn-pill ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Story Overview &amp; Facts
              </button>
              <button
                type="button"
                className={`tab-btn-pill ${activeTab === "notes" ? "active" : ""}`}
                onClick={() => setActiveTab("notes")}
              >
                Journal Reflections {book.notes ? "✦" : ""}
              </button>
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="tab-pane-box">
                {book.description ? (
                  <p className="synopsis-paragraph">{book.description}</p>
                ) : (
                  <div className="empty-synopsis-alert">
                    <p>No verified synopsis recorded for this edition.</p>
                    <small>You can edit this book to add your personal summary.</small>
                  </div>
                )}

                {/* Facts Grid */}
                <div className="edition-facts-grid">
                  {book.publisher && (
                    <div className="fact-cell">
                      <span className="fact-title">Publisher</span>
                      <span className="fact-data">{book.publisher}</span>
                    </div>
                  )}
                  {book.isbn && (
                    <div className="fact-cell">
                      <span className="fact-title">ISBN</span>
                      <span className="fact-data">{book.isbn}</span>
                    </div>
                  )}
                  {book.started && (
                    <div className="fact-cell">
                      <span className="fact-title">Date Started</span>
                      <span className="fact-data">{book.started}</span>
                    </div>
                  )}
                  {book.completed && (
                    <div className="fact-cell">
                      <span className="fact-title">Date Completed</span>
                      <span className="fact-data">{book.completed}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notes Tab */}
            {activeTab === "notes" && (
              <div className="tab-pane-box notes-tab">
                <form onSubmit={handleNotesSave} className="journal-entry-form">
                  <div className="washi-tape-accent" />
                  <textarea
                    rows={5}
                    placeholder="Reflect on your reading experience... What lines touched your soul? Which characters stayed with you?"
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    className="journal-reflection-area"
                  />
                  <div className="notes-submit-row">
                    {isSavedNotes && <span className="save-confirmation">Saved to journal! ✓</span>}
                    <button type="submit" className="save-reflection-btn">
                      Save Journal Entry
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Footer Action Buttons */}
            <div className="details-actions-bar">
              <button
                type="button"
                className="edit-action-btn"
                onClick={() => {
                  onEdit(book);
                  onClose();
                }}
              >
                <Pencil size={14} /> Edit Book Details
              </button>
              <button
                type="button"
                className="delete-action-btn"
                onClick={() => {
                  if (confirm(`Remove "${book.title}" from your library?`)) {
                    onDelete(book.id);
                    onClose();
                  }
                }}
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
