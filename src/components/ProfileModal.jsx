import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, User, Plus, Check, Trash2, Sparkles, BookOpen } from "lucide-react";
import { AVATAR_OPTIONS } from "../constants";

export default function ProfileModal({
  currentUser,
  allUsers = {},
  onSelectUser,
  onAddNewProfile,
  onUpdateCurrentProfile,
  onDeleteProfile,
  onClose
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "cozy-reader");
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const finalAvatar = customAvatarUrl.trim() ? customAvatarUrl.trim() : avatar;
    onUpdateCurrentProfile({
      ...currentUser,
      name: name.trim(),
      avatar: finalAvatar
    });
    setIsEditing(false);
  };

  const usersList = Object.values(allUsers);

  return (
    <div className="modal-backdrop-aesthetic" onClick={onClose}>
      <motion.div
        className="profile-modal-card"
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="profile-modal-head">
          <div className="aesthetic-badge">
            <User size={13} /> READER ACCOUNTS
          </div>
          <h2>Reading Profiles</h2>
          <p className="modal-subtitle">
            Switch between household libraries or personalise your reading persona. Each reader has their own private shelves and journal.
          </p>
        </div>

        {/* Current Active Profile Card */}
        <div className="active-profile-card">
          <div className="profile-avatar-big">
            {currentUser?.avatar?.startsWith("http") ? (
              <img src={currentUser.avatar} alt={currentUser.name} className="avatar-img-round" />
            ) : (
              <span className="avatar-emoji">
                {AVATAR_OPTIONS.find((a) => a.id === currentUser?.avatar)?.icon || "📖"}
              </span>
            )}
          </div>
          <div className="profile-card-details">
            <span className="current-badge">Currently Signed In</span>
            <h3>{currentUser?.name}</h3>
            <p className="profile-stats-summary">
              {currentUser?.books?.length || 0} books on shelves •{" "}
              {currentUser?.journalEntries?.length || 0} journal entries
            </p>
          </div>
          <button
            type="button"
            className="edit-profile-trigger"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Close Edit" : "Edit Profile"}
          </button>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="profile-edit-box">
            <div className="field-group">
              <label>Reader Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label>Select Aesthetic Avatar</label>
              <div className="avatar-grid mini-grid">
                {AVATAR_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`avatar-choice ${avatar === opt.id && !customAvatarUrl ? "selected" : ""}`}
                    onClick={() => {
                      setAvatar(opt.id);
                      setCustomAvatarUrl("");
                    }}
                  >
                    <span className="avatar-icon" style={{ backgroundColor: opt.bg }}>
                      {opt.icon}
                    </span>
                    <span className="avatar-label">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="field-group">
              <label>Or Custom Avatar Image URL</label>
              <input
                type="url"
                value={customAvatarUrl}
                onChange={(e) => setCustomAvatarUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="edit-form-btns">
              <button
                type="button"
                className="cancel-btn-subtle"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button type="submit" className="save-profile-btn">
                <Check size={14} /> Update Profile
              </button>
            </div>
          </form>
        )}

        {/* Switch to Other Existing Profiles */}
        <div className="switch-profiles-section">
          <h4>Switch to Another Reader</h4>
          <div className="users-pill-list">
            {usersList.map((user) => {
              const isCurrent = user.id === currentUser?.id;
              const avatarMatch = AVATAR_OPTIONS.find((a) => a.id === user.avatar);

              return (
                <div
                  key={user.id}
                  className={`user-switch-row ${isCurrent ? "active-row" : ""}`}
                  onClick={() => {
                    if (!isCurrent) {
                      onSelectUser(user.id);
                      onClose();
                    }
                  }}
                >
                  <div className="switch-avatar">
                    {user.avatar?.startsWith("http") ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <span>{avatarMatch?.icon || "📖"}</span>
                    )}
                  </div>
                  <div className="switch-name">
                    <strong>{user.name}</strong>
                    <small>{user.books?.length || 0} books</small>
                  </div>
                  {isCurrent ? (
                    <span className="active-indicator">Active</span>
                  ) : (
                    <button type="button" className="switch-to-btn">
                      Switch
                    </button>
                  )}
                  {usersList.length > 1 && !isCurrent && (
                    <button
                      type="button"
                      className="delete-user-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete reader profile "${user.name}" and all their books?`)) {
                          onDeleteProfile(user.id);
                        }
                      }}
                      title="Delete profile"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="create-new-user-action"
            onClick={() => {
              onAddNewProfile();
              onClose();
            }}
          >
            <Plus size={16} /> Create Another Reader Profile
          </button>
        </div>
      </motion.div>
    </div>
  );
}
