 // fetchMovies.js
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './firebase'; // your Firebase config

const API_KEY = 'fc70d3012c4f8313d3da7babb9903731';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchAndSaveTrendingMovie(userId) {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();
    const trendingMovie = data.results[0]; // Grab the first trending movie

    if (!trendingMovie) return;

    const movieData = {
      id: trendingMovie.id.toString(),
      title: trendingMovie.title,
      poster_path: trendingMovie.poster_path
    };

    const watchlistRef = doc(db, 'Watchlists', userId);

    await updateDoc(watchlistRef, {
      movies: arrayUnion(movieData)
    });

    console.log(`Added "${movieData.title}" to watchlist`);
  } catch (error) {
    console.error('Error saving trending movie:', error);
  }
}
