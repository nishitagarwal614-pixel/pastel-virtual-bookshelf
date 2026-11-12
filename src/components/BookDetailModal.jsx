import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Star, BookOpen, CheckCircle, Clock, Trash2, Pencil, Sparkles, RotateCw, Bookmark } from "lucide-react";

export default function BookDetailModal({
  book,
  onClose,
  onUpdateStatus,
  onUpdateRating,
  onUpdateNotes,
  onEdit,
  onDelete
}) {
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'notes'
  const [rotate3D, setRotate3D] = useState(false);
  const [userNotes, setUserNotes] = useState(book.notes || "");
  const [isSavedNotes, setIsSavedNotes] = useState(false);

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

  return (
    <div className="modal-backdrop-aesthetic" onClick={onClose}>
      <motion.div
        className="book-detail-modal"
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

        <div className="detail-grid-layout">
          {/* Left Column: 3D Hardcover Book Mockup Showcase */}
          <div className="detail-mockup-column">
            <div className="mockup-stage-header">
              <span className="mockup-label">
                <Sparkles size={13} /> 3D HARDCOVER VOLUME
              </span>
              <button
                type="button"
                className="rotate-toggle-btn"
                onClick={() => setRotate3D(!rotate3D)}
                title="Rotate 3D perspective"
              >
                <RotateCw size={13} /> {rotate3D ? "Reset Angle" : "Inspect 3D"}
              </button>
            </div>

            {/* Realistic 3D Physical Book */}
            <div className={`book-3d-scene ${rotate3D ? "is-rotated" : ""}`}>
              <div
                className="hardcover-3d-volume"
                style={{
                  "--cover-tint": book.spineColor || "#788e76"
                }}
              >
                {/* Front Cover Board */}
                <div className="hardcover-front">
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="front-cover-artwork"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}

                  {/* Fallback elegant typography cover if no image */}
                  <div
                    className="front-cover-typographic"
                    style={{ display: book.cover ? "none" : "flex" }}
                  >
                    <div className="cover-frame-border">
                      <span className="ornament-top">❦</span>
                      <h4 className="cover-title-text">{book.title}</h4>
                      <p className="cover-author-text">{book.author}</p>
                      <span className="ornament-bottom">✦</span>
                    </div>
                  </div>

                  {/* Hardcover Sheen, Embossed Crease & Texture */}
                  <div className="cover-hinge-indent" />
                  <div className="cover-gloss-sheen" />
                  <div className="cover-gold-trim" />
                </div>

                {/* 3D Spine */}
                <div className="hardcover-spine">
                  <div className="spine-rib rib-1" />
                  <div className="spine-vertical-text">
                    <span className="sp-title">{book.title}</span>
                    <span className="sp-author">{book.author}</span>
                  </div>
                  <div className="spine-rib rib-2" />
                </div>

                {/* 3D Page Block - Fore-edge */}
                <div className="hardcover-pages-edge">
                  <div className="paper-texture-lines" />
                </div>

                {/* 3D Page Block - Top Edge */}
                <div className="hardcover-pages-top">
                  <div className="paper-texture-lines" />
                </div>

                {/* 3D Page Block - Bottom Edge */}
                <div className="hardcover-pages-bottom" />

                {/* Drop shadow of the physical book */}
                <div className="hardcover-cast-shadow" />
              </div>
            </div>

            <div className="mockup-hint">
              <span>✦ Click &ldquo;Inspect 3D&rdquo; or hover to admire book depth & binding ✦</span>
            </div>
          </div>

          {/* Right Column: Book Information, Status, Rating & Journal Notes */}
          <div className="detail-info-column">
            {/* Header info */}
            <div className="detail-meta-header">
              <span className="genre-pill">{book.genre || "Literature"}</span>
              {book.year && <span className="year-pill">Published {book.year}</span>}
              {book.pages && <span className="pages-pill">{book.pages} pages</span>}
            </div>

            <h2 className="detail-book-title">{book.title}</h2>
            <h3 className="detail-book-author">by {book.author || "Unknown Author"}</h3>

            {/* Reading Status Selector */}
            <div className="status-selector-box">
              <span className="box-label">Reading Status:</span>
              <div className="status-button-group">
                {statusOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`status-btn ${book.status === opt.id ? "active" : ""}`}
                    onClick={() => onUpdateStatus(book.id, opt.id)}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Star Rating */}
            <div className="detail-rating-row">
              <span className="rating-label">Personal Rating:</span>
              <div className="stars-interactive">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-icon-btn ${star <= (book.rating || 0) ? "filled" : ""}`}
                    onClick={() => onUpdateRating(book.id, star === book.rating ? 0 : star)}
                    title={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    <Star
                      size={20}
                      fill={star <= (book.rating || 0) ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
              <span className="rating-text-hint">
                {book.rating > 0 ? `${book.rating} out of 5 stars` : "Not rated yet"}
              </span>
            </div>

            {/* Tabs for Synopsis vs Personal Notes */}
            <div className="detail-tabs-nav">
              <button
                type="button"
                className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Story Overview & Facts
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === "notes" ? "active" : ""}`}
                onClick={() => setActiveTab("notes")}
              >
                Reading Journal Notes {book.notes ? "✦" : ""}
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === "overview" && (
              <div className="tab-pane overview-pane">
                {book.description ? (
                  <p className="book-description-text">{book.description}</p>
                ) : (
                  <div className="empty-description-box">
                    <p>No verified synopsis recorded for this edition.</p>
                    <small>You can edit this book to add your personal summary or review.</small>
                  </div>
                )}

                {/* Metadata Grid */}
                <div className="metadata-spec-grid">
                  {book.publisher && (
                    <div className="spec-item">
                      <span className="spec-label">Publisher</span>
                      <span className="spec-val">{book.publisher}</span>
                    </div>
                  )}
                  {book.isbn && (
                    <div className="spec-item">
                      <span className="spec-label">ISBN</span>
                      <span className="spec-val">{book.isbn}</span>
                    </div>
                  )}
                  {book.started && (
                    <div className="spec-item">
                      <span className="spec-label">Date Started</span>
                      <span className="spec-val">{book.started}</span>
                    </div>
                  )}
                  {book.completed && (
                    <div className="spec-item">
                      <span className="spec-label">Date Completed</span>
                      <span className="spec-val">{book.completed}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Personal Reading Journal Notes */}
            {activeTab === "notes" && (
              <div className="tab-pane journal-notes-pane">
                <form onSubmit={handleNotesSave} className="journal-notes-form">
                  <div className="washi-tape-strip" />
                  <textarea
                    rows={5}
                    placeholder="Reflect on your reading experience... What lines touched your soul? Which characters stayed with you?"
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    className="journal-textarea"
                  />
                  <div className="notes-action-bar">
                    {isSavedNotes && <span className="saved-confirm">Saved to journal! ✓</span>}
                    <button type="submit" className="save-notes-btn">
                      Save Journal Entry
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Footer Action Buttons */}
            <div className="modal-actions-footer">
              <button
                type="button"
                className="edit-book-btn"
                onClick={() => {
                  onEdit(book);
                  onClose();
                }}
              >
                <Pencil size={14} /> Edit Book Details
              </button>
              <button
                type="button"
                className="delete-book-btn"
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
