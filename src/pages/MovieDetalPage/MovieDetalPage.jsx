
import s from "../MovieDetalPage/MovieDetalPage.module.css";
import PropTypes from 'prop-types';
import { useState, useEffect, lazy, Suspense } from "react";
import {
    Route,
    useParams,
    useRouteMatch,
    useHistory,
    useLocation,
    Redirect,
    // Route,
    // useParams,
    // useRouteMatch,
    // useNavigate,
    // useLocation,
    // Navigate,
} from "react-router";
import { NavLink } from "react-router-dom";
import { getMovieDetails } from "../../servises/api";

const Cast = lazy(() => import("../../components/Cast" /*webpackChunkName: 'cast'*/));
const Reviews = lazy(() => import("../../components/Reviews" /*webpackChunkName: 'reviews'*/));

const MovieDetalPage = ({ setError }) => {
    const { movieId } = useParams();
    const { url } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const [movie, setMovie] = useState({});


    useEffect(() => {
        setMovie([]);
        getMovieDetails(movieId)
            .then((data) => setMovie(data))
            .catch((err) => setError(err));

    }, [movieId, setError]);


    const handleGoBack = () => {
        history.push(location.state.from);
    };

    return  (
        <>

            <div className={s.wrapper}>
                <img
                    className={s.movieImg}
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : `../img/notfjpg.jpg`
                    }
                    alt={movie.poster_path}

                />
                <div className={s.movieDescr}>
                    <div className={s.movieDescrAbout}>
                        <h1 className={s.title}>{movie.original_title}</h1>
                        <p className={s.score}>User Score: {movie.vote_average * 10}%</p>
                        <h2 className={s.overviewTitle}>Overview</h2>
                        <p className={s.overview}>{movie.overview}</p>
                        <h2 className={s.genreTitle}>Genres</h2>
                        <p className={s.genre}>
                            {movie.genres &&
                                movie.genres.map((genre) => (
                                    <span key={genre.id}>/ {genre.name} /</span>
                                ))}
                        </p>
                    </div>
                    <ul className={s.additionalList}>

                        Additional information:
                        <li className={s.additionalItem}>
                            <NavLink
                                to={{
                                    pathname: `${url}/casts`,
                                    state: { ...location.state },
                                }}
                            >
                                Cast
                            </NavLink>
                        </li>
                        <li className={s.additionalItem}>
                            <NavLink
                                to={{
                                    pathname: `${url}/reviews`,
                                    state: { ...location.state },
                                }}
                            >
                                Reviews
                            </NavLink>
                        </li>
                    </ul>
                    <button type="button" className={s.goBackBtn} onClick={handleGoBack}>
                        Go Back
                    </button>
                </div>

            </div>

            <Suspense fallback={<h2>Loading...</h2>}>

                <Route path="/movies/:movieId/casts">
                    <Cast setError={setError} />
                </Route>

                <Route path="/movies/:movieId/reviews">
                    <Reviews setError={setError} />
                </Route>
                <Redirect to={{
                    pathname: url,
                    state: {from: location.state?.from || '/' }
                }} />

            </Suspense>
        </>
    );
};

MovieDetalPage.propTypse = {
    setError: PropTypes.func.isRequired
}

export default MovieDetalPage;