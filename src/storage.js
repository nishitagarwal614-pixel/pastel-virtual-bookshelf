import { USER_AUTHENTIC_COLLECTION } from "./data/screenshotBooks";

const STORAGE_USERS_KEY = "between_pages_users_v2";
const STORAGE_ACTIVE_USER_ID_KEY = "between_pages_active_user_v2";

export function loadUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error("Failed to parse users from localStorage", err);
    return {};
  }
}

export function saveUsers(usersMap) {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(usersMap));
  } catch (err) {
    console.error("Failed to save users to localStorage", err);
  }
}

export function getActiveUserId() {
  try {
    return localStorage.getItem(STORAGE_ACTIVE_USER_ID_KEY) || null;
  } catch {
    return null;
  }
}

export function setActiveUserId(id) {
  try {
    if (id) {
      localStorage.setItem(STORAGE_ACTIVE_USER_ID_KEY, id);
    } else {
      localStorage.removeItem(STORAGE_ACTIVE_USER_ID_KEY);
    }
  } catch (err) {
    console.error("Failed to set active user id", err);
  }
}

export function getCurrentUser() {
  const activeId = getActiveUserId();
  if (!activeId) return null;
  const users = loadUsers();
  const user = users[activeId] || null;
  if (user) {
    const hasUnwantedRef =
      user.books &&
      user.books.some((b) => (b.id && b.id.startsWith("ref_")) || b.title === "The Poppy War");
    if (!user.books || user.books.length === 0 || hasUnwantedRef) {
      user.books = USER_AUTHENTIC_COLLECTION;
      saveCurrentUser(user);
    }
  }
  return user;
}

export function saveCurrentUser(updatedUser) {
  if (!updatedUser || !updatedUser.id) return;
  const users = loadUsers();
  users[updatedUser.id] = {
    ...updatedUser,
    updatedAt: new Date().toISOString()
  };
  saveUsers(users);
}

export function createNewUserProfile({ name, avatar, readingLevel = "reader" }) {
  const id = "user_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36);
  const newUser = {
    id,
    name: name.trim() || "Gentle Reader",
    avatar: avatar || "cozy-reader",
    readingLevel, // "reader" or "new"
    theme: "sage-cream", // Default theme as requested
    festiveAnimationEnabled: true,
    readingGoal: 15,
    books: USER_AUTHENTIC_COLLECTION,
    journalEntries: [],
    createdAt: new Date().toISOString()
  };

  const users = loadUsers();
  users[id] = newUser;
  saveUsers(users);
  setActiveUserId(id);
  return newUser;
}

export function deleteUserProfile(userId) {
  const users = loadUsers();
  delete users[userId];
  saveUsers(users);
  const remainingIds = Object.keys(users);
  if (remainingIds.length > 0) {
    setActiveUserId(remainingIds[0]);
    return users[remainingIds[0]];
  } else {
    setActiveUserId(null);
    return null;
  }
}
