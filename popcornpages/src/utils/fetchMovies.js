const API_KEY = 'fc70d3012c4f8313d3da7babb9903731'; // Replace with your actual key
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTrendingMovies() {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
}
