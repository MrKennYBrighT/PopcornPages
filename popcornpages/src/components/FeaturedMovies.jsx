import React, { useEffect } from 'react';
import usePopStore from '../store/popStore';

const FeaturedMovies = () => {
  const { movies, setMovies } = usePopStore();

  useEffect(() => {
    const fetchTrending = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=fc70d3012c4f8313d3da7babb9903731`
      );
      const data = await res.json();
      setMovies(data.results.slice(0, 6));
    };

    fetchTrending();
  }, [setMovies]);

  return (
    <section className="px-8 py-12 bg-[#1C1C3C] text-white">
      <h2 className="text-3xl font-bold text-[#FF6B6B] mb-8">Trending This Week</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-[#2C2C5C] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-yellow-400">{movie.title}</h3>
              <p className="text-sm text-gray-300 mt-2 line-clamp-3">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMovies;
