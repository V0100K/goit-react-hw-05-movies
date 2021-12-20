import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from '../HomePage/HomePage.module.css';
import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../servises/api'

const HomePage = ({setError}) => {
    const [trendingMovies, setTrendingMovies] = useState(null)
    const location = useLocation();

    useEffect(() => {
        getTrendingMovies().then(setTrendingMovies).catch((err) => setError(err));
    }, [setError])

    return (
        <>
            <h1 className={s.title}>Trending today</h1>
            <ul className={s.trendList}>
                {trendingMovies && trendingMovies.results.map(movie =>
                    <li className={s.trendListItem} key={movie.id}>
                        <Link to={{
                            pathname:`movies/${movie.id}`,
                            state: {from:location}
                        }}>
                            <img className={s.img} src={movie.backdrop_path &&`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.original_title} />
                            <p className={s.name}>{movie.original_title}</p>
                        </Link>
                    </li>)}
            </ul>
        </>
    )
}

HomePage.propTypse = {
    setError: PropTypes.func.isRequired
}

export default HomePage;