// TMDB API configuration
const API_KEY = 'fc70d3012c4f8313d3da7babb9903731'; // Replace with your actual key
const BASE_URL = 'https://api.themoviedb.org/3';

// Function to fetch trending movies from TMDB (weekly)
export async function fetchTrendingMovies() {
  try {
    // Send GET request to TMDB trending endpoint
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();

    // Return array of trending movie results
    return data.results;
  } catch (error) {
    // Log error and return empty array as fallback
    console.error('Error fetching trending movies:', error);
    return [];
  }
}
