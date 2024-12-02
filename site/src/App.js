import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import MovieList from './components/MovieList';
import Footer from './components/Footer';
import { fetchMovies } from './api/tmdb.js';
import './App.css';

function App() {
    const [heroMovies, setHeroMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => {
        // Fetch hero movies 
        fetchMovies("/movie/top_rated").then((data) => setHeroMovies(data.slice(0, 5)));

        // Fetch popular movies
        fetchMovies("/movie/popular").then((data) => setPopularMovies(data));

        // Fetch now playing movies
        fetchMovies("/movie/now_playing").then((data) => setNowPlayingMovies(data));

        // Fetch upcoming movies
        fetchMovies("/movie/upcoming").then((data) => setUpcomingMovies(data));

    
    }, []);

    return (
        <div className="App">
            <Navbar/>
            <HeroSlider movies={heroMovies} />
            <MovieList title="Popular Movies" movies={popularMovies} />
            <MovieList title="Now Playing" movies={nowPlayingMovies} />
            <MovieList title="Upcoming Movies" movies={upcomingMovies} />
            {/* <Footer /> */}
        </div>
    );
}

export default App;
