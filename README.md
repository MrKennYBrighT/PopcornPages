# 🍿 PopcornPages

**PopcornPages is a sleek, modern movie discovery and watchlist web app built with React, Zustand, Firebase, and the TMDB API. Users can browse trending and popular movies, search titles, view detailed movie info, and curate a personalized watchlist — all wrapped in a stylish UI with toast notifications and emoji reactions.

---

## 🚀 Features
🔥 Trending & Popular Movies — Browse weekly trending and popular titles from TMDB

🔍 Live Search — Search movies with instant suggestions and recent history

🎬 Movie Detail Pages — View trailers, cast, synopsis, and related movies

📑 Watchlist Management — Add/remove movies to a persistent Firebase-backed watchlist

💬 Reaction Threads — Post reactions and emoji responses to movies

🔐 Authentication — Signup, login, and password reset via Firebase Auth

🧠 Global State Management — Powered by Zustand for lightweight and scalable state

📦 Responsive Design — Optimized for mobile and desktop with Tailwind CSS

🛠️ Coming Soon Routes — Placeholder pages for account settings, password changes, and more

---

🧱 Tech Stack
Layer	Tools & Libraries
Frontend	React, React Router, Tailwind CSS
State Management	Zustand
Backend Services	Firebase Auth, Firestore
APIs	TMDB (The Movie Database)
Notifications	react-hot-toast
Icons	react-icons

📁 Project Structure
Code
popcornpages/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── LoginForm.jsx
│   │   ├── ReactionBox.jsx
│   │   └── ...other UI components
│   ├── views/
│   │   ├── Watchlist.jsx
│   │   ├── Trending.jsx
│   │   ├── MovieDetail.jsx
│   │   └── ...other pages
│   ├── store/
│   │   ├── useAuthStore.js
│   │   ├── watchlistStore.js
│   │   └── ...other stores
│   ├── utils/
│   │   └── fetchMovies.js
│   ├── App.jsx
│   ├── firebase.js
│   └── main.jsx
├── index.html
├── package.json
└── README.md


🧪 Usage
Home Page: View featured movies and reactions

Search: Use the search bar to find movies

Movie Detail: Click a movie to view its full details

Watchlist: Add/remove movies to your personal list

Auth: Sign up or log in to access protected routes

Dashboard: Personalized user dashboard

Coming Soon: Placeholder routes for future features

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

🌐 Live Demo
https://popcorn-pages.vercel.app/
