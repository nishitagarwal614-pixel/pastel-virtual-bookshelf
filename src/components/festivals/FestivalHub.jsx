import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Gift,
  Clock,
  Trophy,
  BookOpen,
  CheckCircle,
  Plus,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Bookmark,
  Share2
} from "lucide-react";
import { getFestivalThemeById } from "../../data/festivalData";

/**
 * FestivalHub.jsx
 * 
 * Interactive Festive Experience Hub:
 * - Festival Greeting & Dynamic Countdown Timer
 * - Festival Reading Challenge with Live Progress
 * - 3D Surprise Gift Unwrap Animation & Mystery Book Reveal
 * - Curated Festival Book Recommendations (1-Click Add to Shelf)
 * - Special Achievement Badges Showcase
 */

export default function FestivalHub({
  activeThemeId = "sage-cream",
  userBooks = [],
  onAddBookToLibrary,
  onSelectBook
}) {
  const festival = getFestivalThemeById(activeThemeId);
  const [isExpanded, setIsExpanded] = useState(true);

  // Surprise Gift Box State
  const [giftOpened, setGiftOpened] = useState(false);
  const [isUnwrapping, setIsUnwrapping] = useState(false);
  const [giftClaimed, setGiftClaimed] = useState(false);

  // Claimed challenge badges in local storage or state
  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    try {
      const saved = localStorage.getItem("between_pages_unlocked_badges");
      return saved ? JSON.parse(saved) : ["badge_normal"];
    } catch {
      return ["badge_normal"];
    }
  });

  // Countdown calculation
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      let targetYear = now.getFullYear();
      let target = new Date(targetYear, festival.targetMonth, festival.targetDay, 0, 0, 0);

      // If date has passed this calendar year, count down to next year
      if (now.getTime() > target.getTime()) {
        target = new Date(targetYear + 1, festival.targetMonth, festival.targetDay, 0, 0, 0);
      }

      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [festival]);

  // Challenge progress based on user's read books
  const readBooksCount = userBooks.filter((b) => b.status === "read").length;
  const challengeTarget = festival.challenge.targetCount;
  const challengeProgress = Math.min(100, Math.round((readBooksCount / challengeTarget) * 100));
  const isChallengeCompleted = readBooksCount >= challengeTarget;
  const isBadgeUnlocked = unlockedBadges.includes(festival?.achievementBadge?.id);

  const handleClaimBadge = () => {
    if (festival?.achievementBadge?.id && !unlockedBadges.includes(festival.achievementBadge.id)) {
      const updated = [...unlockedBadges, festival.achievementBadge.id];
      setUnlockedBadges(updated);
      try {
        localStorage.setItem("between_pages_unlocked_badges", JSON.stringify(updated));
      } catch {}
    }
  };

  const handleOpenGift = () => {
    if (giftOpened) return;
    setIsUnwrapping(true);
    setTimeout(() => {
      setIsUnwrapping(false);
      setGiftOpened(true);
    }, 700);
  };

  const handleAddGiftToShelf = () => {
    if (onAddBookToLibrary && festival.surpriseGift && !giftClaimed) {
      onAddBookToLibrary({
        title: festival.surpriseGift.title,
        author: festival.surpriseGift.author,
        genre: festival.surpriseGift.genre,
        pages: festival.surpriseGift.pages,
        coverColor: festival.surpriseGift.coverColor,
        coverImage: festival.surpriseGift.coverImage,
        status: "want",
        rating: 5,
        notes: `Festival Gift: ${festival.surpriseGift.festiveMessage}`
      });
      setGiftClaimed(true);
    }
  };

  return (
    <section className="festival-hub-section" id="festival-hub">
      <div className="festival-hub-card">
        {/* Hub Header & Collapsible Toggle */}
        <div className="hub-top-banner">
          <div className="hub-identity-group">
            <span className="hub-festival-icon">{festival.icon}</span>
            <div className="hub-identity-text">
              <div className="hub-badge-pill">
                <Sparkles size={12} /> {festival.badge}
              </div>
              <h2 className="hub-festival-title">{festival.greeting}</h2>
              <p className="hub-festival-quote">&ldquo;{festival.quote}&rdquo;</p>
            </div>
          </div>

          <div className="hub-header-actions">
            {/* Live Countdown Clock Widget */}
            <div className="hub-countdown-box" title={`Counting down to ${festival.name}`}>
              <div className="countdown-label">
                <Clock size={12} /> {festival.countdownLabel}
              </div>
              <div className="countdown-digits">
                <span className="digit-unit">
                  <strong>{timeLeft.days}</strong>
                  <small>d</small>
                </span>
                <span className="digit-colon">:</span>
                <span className="digit-unit">
                  <strong>{timeLeft.hours}</strong>
                  <small>h</small>
                </span>
                <span className="digit-colon">:</span>
                <span className="digit-unit">
                  <strong>{timeLeft.minutes}</strong>
                  <small>m</small>
                </span>
                <span className="digit-colon">:</span>
                <span className="digit-unit">
                  <strong>{timeLeft.seconds}</strong>
                  <small>s</small>
                </span>
              </div>
            </div>

            <button
              type="button"
              className="hub-collapse-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? "Collapse Festival Hub" : "Expand Festival Hub"}
            >
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        </div>

        {/* Expandable Interactive Grid */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="hub-body-grid"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              {/* Card 1: Festival Reading Challenge */}
              <div className="hub-feature-card hub-challenge-card">
                <div className="feature-card-header">
                  <div className="feature-icon-badge icon-trophy">
                    <Trophy size={16} />
                  </div>
                  <div>
                    <span className="feature-eyebrow">READING CHALLENGE</span>
                    <h3 className="feature-title">{festival.challenge.title}</h3>
                  </div>
                </div>

                <p className="challenge-desc-text">{festival.challenge.description}</p>

                <div className="challenge-progress-module">
                  <div className="progress-labels">
                    <span>Reading Progress</span>
                    <strong>
                      {Math.min(readBooksCount, challengeTarget)} / {challengeTarget} Books Read
                    </strong>
                  </div>
                  <div className="progress-track">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${challengeProgress}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="challenge-footer-action">
                  {isBadgeUnlocked ? (
                    <div className="badge-awarded-pill">
                      <CheckCircle size={14} color="#10b981" />
                      <span>{festival?.achievementBadge?.name || "Badge"} Unlocked!</span>
                    </div>
                  ) : isChallengeCompleted ? (
                    <button
                      type="button"
                      className="claim-badge-btn active-claim"
                      onClick={handleClaimBadge}
                    >
                      <Award size={15} /> Claim {festival.challenge.badgeName} Badge
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="claim-badge-btn"
                      onClick={handleClaimBadge}
                      title="Tap to preview and unlock badge"
                    >
                      <Award size={15} /> Unlock {festival.challenge.badgeName}
                    </button>
                  )}
                </div>
              </div>

              {/* Card 2: Surprise Book Gift Animation */}
              <div className="hub-feature-card hub-gift-card">
                <div className="feature-card-header">
                  <div className="feature-icon-badge icon-gift">
                    <Gift size={16} />
                  </div>
                  <div>
                    <span className="feature-eyebrow">FESTIVAL SURPRISE</span>
                    <h3 className="feature-title">Mystery Book Gift</h3>
                  </div>
                </div>

                {!giftOpened ? (
                  <div className="gift-wrapped-stage">
                    <motion.div
                      className={`gift-box-3d ${isUnwrapping ? "unwrapping" : ""}`}
                      whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleOpenGift}
                      role="button"
                      tabIndex={0}
                      title="Click to unwrap your festive gift!"
                    >
                      <div className="gift-box-lid">
                        <div className="gift-ribbon-bow">🎀</div>
                      </div>
                      <div className="gift-box-base">
                        <div className="gift-ribbon-vertical" />
                        <div className="gift-ribbon-horizontal" />
                      </div>
                    </motion.div>
                    <p className="gift-hint-text">
                      Tap the box to unwrap your special <strong>{festival.name}</strong> surprise!
                    </p>
                  </div>
                ) : (
                  <motion.div
                    className="gift-revealed-stage"
                    initial={{ opacity: 0, scale: 0.85, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                  >
                    <div className="revealed-book-preview">
                      <div
                        className="revealed-mini-cover"
                        style={{ backgroundColor: festival.surpriseGift.coverColor }}
                      >
                        <BookOpen size={24} color="#ffffff" />
                      </div>
                      <div className="revealed-details">
                        <span className="gift-congrats-tag">✨ Unwrapped Gift!</span>
                        <h4 className="gift-book-title">{festival.surpriseGift.title}</h4>
                        <span className="gift-book-author">by {festival.surpriseGift.author}</span>
                        <p className="gift-book-msg">&ldquo;{festival.surpriseGift.festiveMessage}&rdquo;</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`gift-add-shelf-btn ${giftClaimed ? "claimed" : ""}`}
                      onClick={handleAddGiftToShelf}
                      disabled={giftClaimed}
                    >
                      {giftClaimed ? (
                        <>
                          <CheckCircle size={14} /> Added to Your Wishlist!
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Add Gift to Bookshelf
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Card 3: Festival Book Recommendations */}
              <div className="hub-feature-card hub-recommendations-card">
                <div className="feature-card-header">
                  <div className="feature-icon-badge icon-stars">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <span className="feature-eyebrow">CURATED READING</span>
                    <h3 className="feature-title">{festival.name} Recommendations</h3>
                  </div>
                </div>

                <div className="recommendations-scroller">
                  {festival.recommendations.map((rec) => (
                    <div key={rec.id} className="rec-mini-item">
                      <div
                        className="rec-item-cover-spine"
                        style={{ backgroundColor: rec.coverColor }}
                      >
                        <span>{rec.title.slice(0, 1)}</span>
                      </div>
                      <div className="rec-item-info">
                        <h5 className="rec-item-title">{rec.title}</h5>
                        <span className="rec-item-author">{rec.author}</span>
                        <div className="rec-item-meta">
                          <span className="rec-rating">★ {rec.rating}</span>
                          <span className="rec-genre">{rec.genre}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="rec-quick-add-btn"
                        onClick={() =>
                          onAddBookToLibrary &&
                          onAddBookToLibrary({
                            title: rec.title,
                            author: rec.author,
                            genre: rec.genre,
                            pages: rec.pages,
                            coverColor: rec.coverColor,
                            status: "want",
                            rating: Math.round(rec.rating),
                            notes: rec.description
                          })
                        }
                        title={`Add "${rec.title}" to bookshelf`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 4: Special Achievement Badges */}
              <div className="hub-feature-card hub-badges-card">
                <div className="feature-card-header">
                  <div className="feature-icon-badge icon-award">
                    <Award size={16} />
                  </div>
                  <div>
                    <span className="feature-eyebrow">TROPHY CABINET</span>
                    <h3 className="feature-title">Festival Badges</h3>
                  </div>
                </div>

                <div className="hub-badges-grid">
                  <div className={`badge-showcase-item ${isBadgeUnlocked ? "unlocked" : "locked"}`}>
                    <div className="badge-icon-circle">{festival?.achievementBadge?.icon || "🏆"}</div>
                    <div className="badge-text-block">
                      <strong>{festival?.achievementBadge?.name || "Festival Badge"}</strong>
                      <small>{festival?.achievementBadge?.description || "Festival reading achievement."}</small>
                    </div>
                    {isBadgeUnlocked ? (
                      <span className="badge-status-pill unlocked">Active</span>
                    ) : (
                      <span className="badge-status-pill locked">Locked</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}