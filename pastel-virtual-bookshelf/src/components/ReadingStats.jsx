import React from "react";
import { Star, Library, BookOpen, Bookmark, CheckCircle, Target, Award, Layers } from "lucide-react";
import { getOriginalBookPages } from "../data/verifiedBookPages";

export default function ReadingStats({
  books = [],
  readingGoal = 20,
  onUpdateGoal,
  onSelectBook
}) {
  const readBooks = books.filter((b) => b.status === "read");
  const currentBooks = books.filter((b) => b.status === "currently");
  const wantBooks = books.filter((b) => b.status === "want");

  const progressPercent = Math.min(
    100,
    Math.round((readBooks.length / Math.max(1, readingGoal)) * 100)
  );

  const totalPagesRead = readBooks.reduce(
    (sum, b) => sum + getOriginalBookPages(b.title, b.author, b.pages),
    0
  );

  // Calculate genre distribution
  const genreCounts = readBooks.concat(currentBooks).reduce((acc, b) => {
    const g = b.genre?.split(",")[0]?.trim() || "Fiction";
    acc[g] = (acc[g] || 0) + 1;
    return acc;
  }, {});

  const sortedGenres = Object.entries(genreCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  // Recently added books (last 4 added)
  const recentlyAdded = [...books].reverse().slice(0, 4);

  return (
    <section className="reading-stats-section" id="reading-stats">
      {/* 4 Overview Metric Cards */}
      <div className="stats-overview-grid">
        <div className="aesthetic-stat-card card-total">
          <div className="stat-icon-wrap icon-sage">
            <Library size={20} />
          </div>
          <div className="stat-text">
            <span className="stat-number">{books.length}</span>
            <span className="stat-title">Books in Library</span>
          </div>
        </div>

        <div className="aesthetic-stat-card card-read">
          <div className="stat-icon-wrap icon-rose">
            <CheckCircle size={20} />
          </div>
          <div className="stat-text">
            <span className="stat-number">{readBooks.length}</span>
            <span className="stat-title">Finished &amp; Stacked</span>
          </div>
        </div>

        <div className="aesthetic-stat-card card-reading">
          <div className="stat-icon-wrap icon-blue">
            <BookOpen size={20} />
          </div>
          <div className="stat-text">
            <span className="stat-number">{currentBooks.length}</span>
            <span className="stat-title">Currently Reading</span>
          </div>
        </div>

        <div className="aesthetic-stat-card card-wish">
          <div className="stat-icon-wrap icon-parchment">
            <Bookmark size={20} />
          </div>
          <div className="stat-text">
            <span className="stat-number">{wantBooks.length}</span>
            <span className="stat-title">Wishlist Waiting</span>
          </div>
        </div>
      </div>

      {/* Dual Panel: Reading Goal Tracker & Reading Mix */}
      <div className="stats-detail-grid">
        {/* Goal Card */}
        <div className="stat-panel goal-panel">
          <div className="panel-header">
            <span className="panel-badge">
              <Target size={14} /> ANNUAL CHALLENGE
            </span>
            <h3>Reading Goal Tracker</h3>
          </div>

          <div className="goal-progress-display">
            <div className="goal-numbers">
              <span className="current-read">{readBooks.length}</span>
              <span className="goal-divider">of</span>
              <span className="target-goal">{readingGoal} books</span>
            </div>
            <div className="progress-percent-badge">{progressPercent}% Achieved</div>
          </div>

          <div className="aesthetic-progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="goal-controls-row">
            <label className="goal-input-label">
              <span>Adjust Goal:</span>
              <input
                type="number"
                min="1"
                max="500"
                value={readingGoal}
                onChange={(e) => onUpdateGoal(Math.max(1, Number(e.target.value) || 1))}
                className="goal-number-input"
              />
              <small>books</small>
            </label>
            <div className="pages-tally">
              <Layers size={13} /> {totalPagesRead.toLocaleString()} pages explored
            </div>
          </div>
        </div>

        {/* Favorite Reading Mix */}
        <div className="stat-panel genre-panel">
          <div className="panel-header">
            <span className="panel-badge">
              <Award size={14} /> READING MIX
            </span>
            <h3>Genres in Your World</h3>
          </div>

          <div className="genre-progress-list">
            {sortedGenres.length === 0 ? (
              <p className="empty-subtle-text">Add books with genres to view your reading breakdown.</p>
            ) : (
              sortedGenres.map(([gName, count]) => {
                const pct = Math.round((count / Math.max(1, books.length)) * 100);
                return (
                  <div key={gName} className="genre-bar-item">
                    <div className="genre-meta-row">
                      <span className="genre-name">{gName}</span>
                      <span className="genre-count">
                        {count} {count > 1 ? "books" : "book"} ({pct}%)
                      </span>
                    </div>
                    <div className="genre-track">
                      <div className="genre-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Recently Added Books Subtle Ribbon */}
      {recentlyAdded.length > 0 && (
        <div className="recent-books-ribbon">
          <div className="recent-head">
            <span className="recent-dot">✦</span>
            <h4>Recently Placed on Your Shelves</h4>
          </div>
          <div className="recent-books-cards">
            {recentlyAdded.map((b) => (
              <button
                key={b.id}
                type="button"
                className="recent-mini-card"
                onClick={() => onSelectBook(b)}
              >
                {b.cover ? (
                  <img src={b.cover} alt={b.title} className="recent-thumb" />
                ) : (
                  <div
                    className="recent-thumb-fallback"
                    style={{ backgroundColor: b.spineColor }}
                  >
                    <span>{b.title[0]}</span>
                  </div>
                )}
                <div className="recent-info">
                  <strong>{b.title}</strong>
                  <small>{b.author}</small>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
