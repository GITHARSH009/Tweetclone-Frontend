import { useState, useEffect } from 'react';
import "../Page.css";
import "./Movies.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('popular');
  const [error, setError] = useState(null);

  const fetchMovies = async (category, query = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://tweetmaster.onrender.com/movies?category=${category}&query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setMovies(data.results || []);
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
      console.error('Movies fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentCategory);
  }, [currentCategory]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchMovies('search', searchQuery.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCardClick = (movieId) => {
    // You can implement movie details page navigation here
    console.log('Movie clicked:', movieId);
  };

  const getMovieCategories = () => [
    { key: 'popular', label: 'Popular' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'now_playing', label: 'Now Playing' },
    { key: 'top_rated', label: 'Top Rated' }
  ];

  const getRatingStars = (rating) => {
    const stars = Math.round(rating / 2); // Convert 10-point to 5-point scale
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  return (
    <div className='page'>
      <div className='page-content'>
        <h2 className='pageTitle'>Movies & Entertainment</h2>
        
        {/* Search Section */}
        <div className="movies-search-section">
          <div className="movies-search-container">
            <div className="search-input-container">
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for movies..."
                className="movies-search-input"
              />
              <button 
                onClick={handleSearch}
                id="searchbtn" 
                className="movies-search-btn"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
          
          {/* Movie Categories */}
          <div className="movies-categories">
            <span className="categories-label">Categories:</span>
            {getMovieCategories().map((category) => (
              <button
                key={category.key}
                onClick={() => setCurrentCategory(category.key)}
                className={`category-btn ${currentCategory === category.key ? 'active' : ''}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Current Category Display */}
        <div className="current-search">
          <span>Showing: <strong>{searchQuery.trim() ? `Search results for "${searchQuery}"` : getMovieCategories().find(cat => cat.key === currentCategory)?.label}</strong></span>
        </div>

        {/* Error Display */}
        {error && (
          <div className="movies-error">
            <p>{error}</p>
            <button onClick={() => fetchMovies(currentCategory)} className="retry-btn">
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="movies-loading">
            <div className="loading-spinner"></div>
            <p>Loading movies...</p>
          </div>
        )}

        {/* Movies Cards Container */}
        {!loading && !error && (
          <div className="movies-container">
            <div id="card-container" className="cards-container">
              {movies.length > 0 ? (
                movies.map((movie, index) => (
                  <div 
                    key={movie.id || index} 
                    className="movie-card"
                    onClick={() => handleCardClick(movie.id)}
                  >
                    <div className="movie-card-image">
                      <img 
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder-movie.jpg'} 
                        alt={movie.title}
                        onError={(e) => {
                          e.target.src = '/placeholder-movie.jpg';
                        }}
                      />
                      <div className="movie-rating">
                        <span className="rating-score">{movie.vote_average?.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="movie-card-content">
                      <h3 className="movie-title">{movie.title}</h3>
                      <p className="movie-overview">
                        {movie.overview?.length > 120 
                          ? `${movie.overview.substring(0, 120)}...` 
                          : movie.overview
                        }
                      </p>
                      <div className="movie-stars">
                        {getRatingStars(movie.vote_average)}
                      </div>
                      <div className="movie-meta">
                        <span className="movie-release-date">
                          {movie.release_date ? formatDate(movie.release_date) : 'TBA'}
                        </span>
                        <span className="movie-popularity">
                          {movie.popularity ? `${Math.round(movie.popularity)} views` : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>No movies found{searchQuery.trim() ? ` for "${searchQuery}"` : ''}</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setCurrentCategory('popular');
                    }} 
                    className="back-to-default-btn"
                  >
                    Back to Popular Movies
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;