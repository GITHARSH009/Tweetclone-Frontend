import React, { useState, useEffect } from 'react';
import "../Page.css";
import "./News.css";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentQuery, setCurrentQuery] = useState('India');
  const [error, setError] = useState(null);

  // Replace with your actual News API key
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY || 'ef368ade7b534bb8b8da8102e369cbf9';
  const BASE_URL = 'https://newsapi.org/v2/everything?q=';

  const fetchNews = async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${BASE_URL}${query}&apiKey=${API_KEY}&pageSize=20&sortBy=publishedAt`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Filter articles with images and valid content
      const filteredArticles = data.articles.filter(
        article => article.urlToImage && article.title && article.description
      );
      
      setArticles(filteredArticles);
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error('News fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(currentQuery);
  }, [currentQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCurrentQuery(searchQuery.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      timeZone: "Asia/Jakarta",
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCardClick = (url) => {
    window.open(url, '_blank');
  };

  const getPopularCategories = () => [
    'Technology', 'Sports', 'Business', 'Entertainment', 
    'Health', 'Science', 'Politics', 'World'
  ];

  return (
    <div className='page'>
      <div className='page-content'>
        <h2 className='pageTitle'>Latest News & Updates</h2>
        
        {/* Search Section */}
        <div className="news-search-section">
          <div className="news-search-container">
            <div className="search-input-container">
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for news..."
                className="news-search-input"
              />
              <button 
                onClick={handleSearch}
                id="searchbtn" 
                className="news-search-btn"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
          
          {/* Popular Categories */}
          <div className="news-categories">
            <span className="categories-label">Popular:</span>
            {getPopularCategories().map((category) => (
              <button
                key={category}
                onClick={() => setCurrentQuery(category)}
                className={`category-btn ${currentQuery === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Current Search Display */}
        <div className="current-search">
          <span>Showing results for: <strong>{currentQuery}</strong></span>
        </div>

        {/* Error Display */}
        {error && (
          <div className="news-error">
            <p>{error}</p>
            <button onClick={() => fetchNews(currentQuery)} className="retry-btn">
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="news-loading">
            <div className="loading-spinner"></div>
            <p>Loading latest news...</p>
          </div>
        )}

        {/* News Cards Container */}
        {!loading && !error && (
          <div className="news-container">
            <div id="card-container" className="cards-container">
              {articles.length > 0 ? (
                articles.map((article, index) => (
                  <div 
                    key={index} 
                    className="news-card"
                    onClick={() => handleCardClick(article.url)}
                  >
                    <div className="news-card-image">
                      <img 
                        src={article.urlToImage} 
                        alt={article.title}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="news-card-content">
                      <h3 className="news-title">{article.title}</h3>
                      <p className="news-description">
                        {article.description?.length > 120 
                          ? `${article.description.substring(0, 120)}...` 
                          : article.description
                        }
                      </p>
                      <div className="news-meta">
                        <span className="news-source">
                          {article.source.name}
                        </span>
                        <span className="news-date">
                          {formatDate(article.publishedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>No news articles found for "{currentQuery}"</p>
                  <button 
                    onClick={() => setCurrentQuery('India')} 
                    className="back-to-default-btn"
                  >
                    Back to Default News
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

export default News;