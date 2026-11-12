# Between the Pages — Pastel Virtual Bookshelf

A responsive React + Vite reading tracker with a pastel 3D-inspired bookshelf.

## Run locally
1. Install Node.js (18+ recommended).
2. Extract this ZIP and open the project folder in a terminal.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL printed by Vite.

## Features
- Add, edit, delete, search, and sort books.
- Separate Want to Read, Currently Reading, and Already Read views.
- Click a book to see its details, notes, rating, and reading dates.
- Completed books appear in a layered virtual stack.
- Book cover URL support and automatic book lookup through the Open Library Search API.
- Reading goal and collection statistics.
- Saves the library in browser localStorage.

## Notes
- Your book collection is stored in the browser where you use the site. It is not synced between devices.
- Open Library lookup requires an internet connection. You can always add books manually or paste a cover image URL.
- Starter books are included as sample data. You can remove them and add your own.
