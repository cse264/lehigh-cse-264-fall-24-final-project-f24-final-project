import React from 'react';
import './MovieList.css';
import { getImageUrl } from '../api/tmdb';

// Import MUI Icons
import StarIcon from '@mui/icons-material/Star'; // For ratings
import FavoriteIcon from '@mui/icons-material/Favorite'; // For popularity
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'; // For vote count
import InfoIcon from '@mui/icons-material/Info'; // For overview/details

function MovieList({ title, movies }) {
    return (
        <div className="movie-list">
            <h2>{title}</h2>
            <div className="movie-items">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-item">
                        <img 
                            src={getImageUrl(movie.poster_path)} 
                            alt={movie.title} 
                        />
                        {/* Hover details */}
                        <div className="movie-hover-details">
                            <h3>{movie.title}</h3>
                            <p>
                                {movie.overview}
                            </p>
                            <p>
                                <FavoriteIcon style={{ color: '#e50914' }} /> Popularity: {movie.popularity}
                            </p>
                            <p>
                                <PeopleAltIcon /> Votes: {movie.vote_count}
                            </p>
                            <p>
                                <StarIcon style={{ color: '#FFD700' }} /> Ratings: {movie.vote_average}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;
