import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import ReactionBox from '../components/ReactionBox';

const MovieDetail = () => {
  const { id } = useParams();
  const API_KEY = 'fc70d3012c4f8313d3da7babb9903731'; // ✅ Hardcoded API key
  const BASE_URL = 'https://api.themoviedb.org/3';

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState('');
  const [cast, setCast] = useState([]);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
      }
    };

    const fetchTrailer = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
        const data = await res.json();
        const trailer = data.results.find((vid) => vid.type === 'Trailer' && vid.site === 'YouTube');
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error('Error fetching trailer:', err);
      }
    };

    const fetchCast = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
        const data = await res.json();
        setCast(data.cast.slice(0, 10));
      } catch (err) {
        console.error('Error fetching cast:', err);
      }
    };

    const fetchRelated = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
        const data = await res.json();
        setRelated(data.results.slice(0, 4));
      } catch (err) {
        console.error('Error fetching related movies:', err);
      }
    };

    fetchMovieDetails();
    fetchTrailer();
    fetchCast();
    fetchRelated();
  }, [id]);

  if (!movie) {
    return (
      <PageWrapper>
        <p className="text-center text-gray-400 py-20">Loading movie details...</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* 🎬 Movie Title & Info */}
      <section className="text-white px-6 py-10 bg-[#1C1C3C]">
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">{movie.title}</h1>
        <div className="flex flex-wrap gap-4 text-gray-300 text-sm mb-4">
          <span>⭐ {movie.vote_average}</span>
          <span>⏱️ {movie.runtime} min</span>
          <span>📅 {movie.release_date}</span>
        </div>
        <div className="flex gap-2 flex-wrap mb-6">
          {movie.genres.map((genre) => (
            <span key={genre.id} className="px-3 py-1 bg-[#2C2C5C] text-yellow-400 rounded">
              {genre.name}
            </span>
          ))}
        </div>
      </section>

      {/* 📽️ Trailer & Watchlist */}
      <section className="px-6 py-10 bg-[#2C2C5C] text-white flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1">
          {trailerKey ? (
            <iframe
              title="Trailer"
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameBorder="0"
              allowFullScreen
              className="rounded shadow"
            ></iframe>
          ) : (
            <p className="text-gray-400 italic">Trailer not available</p>
          )}
        </div>
        <div>
          <button className="px-6 py-3 bg-yellow-400 text-[#1C1C3C] font-semibold rounded hover:bg-yellow-300 transition">
            Add to Watchlist
          </button>
        </div>
      </section>

      {/* 📝 Description */}
      <section className="px-6 py-10 bg-[#1C1C3C] text-white">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Synopsis</h2>
        <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
      </section>

      {/* 🧑‍🤝‍🧑 Cast Section */}
      <section className="px-6 py-10 bg-[#2C2C5C] text-white">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Cast</h2>
        <div className="flex gap-4 overflow-x-auto">
          {cast.map((actor) => (
            <div key={actor.id} className="min-w-[120px] text-center">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : 'https://via.placeholder.com/120x180?text=No+Image'
                }
                alt={actor.name}
                className="rounded mb-2"
              />
              <p className="text-sm text-gray-300">{actor.name}</p>
              <p className="text-xs text-gray-500 italic">{actor.character}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💬 Reaction Thread */}
      <section className="px-6 py-10 bg-[#1C1C3C] text-white">
        <ReactionBox />
      </section>

      {/* 🎞️ Related Movies */}
      <section className="px-6 py-10 bg-[#2C2C5C] text-white">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Related Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {related.map((movie) => (
            <div key={movie.id} className="bg-[#1C1C3C] p-4 rounded shadow">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={movie.title}
                className="rounded mb-2"
              />
              <p className="text-yellow-400 font-semibold">{movie.title}</p>
              <p className="text-sm text-gray-400">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default MovieDetail;
