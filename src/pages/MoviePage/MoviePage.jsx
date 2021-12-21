import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link, useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { getMovieByQuery } from "../../servises/api";
import s from "../MoviePage/MoviePage.module.css";
import Error from "../../components/Error";

const MoviePage = ({ setError }) => {
    const [input, setInput] = useState("");
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [status, setStatus] = useState(null);

    const { url } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();


    useEffect(() => {
        if (query === "") return;

        setStatus(null);
        setMovies([]);
        setInput("");

        getMovieByQuery(query)
            .then((data) =>
                data.results.length === 0 ? setStatus("error") : setMovies(data.results)
            )
            .catch((err) => setError(err));
        
    }, [query, setError]);

    const handlerOnChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const handlerOnSubmit = (e) => {
        e.preventDefault();
        setQuery(input);
        history.push({ ...history.location, search: `query=${input}` });
    };

    const urlParams = new URLSearchParams(location.search);
    const myParam = urlParams.get('query');

    useEffect(() => {
        setStatus(null)
        if (!myParam && !query) return setMovies([])
        getMovieByQuery(myParam)
            .then((data) =>
                data.results.length === 0 ? setStatus("error") : setMovies(data.results)
            )
            .catch((err) => setError(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])



    return (
        <>
            <div className={s.formWrapper}>
                <form className={s.searchForm} onSubmit={handlerOnSubmit}>
                    <input
                        className={s.searchInput}
                        type="text"
                        name="input"
                        value={input}
                        title="Введите название фильма"
                        onChange={handlerOnChange}
                    />
                    <button className={s.searchBtn} type="submit">
                        Search
                    </button>
                </form>
            </div>
            {status === "error" && <Error />}
            <ul className={s.moviesList}>


                {movies.map((movie) => (
                    <li className={s.moviesListItem} key={movie.id}>
                        <Link
                            to={{
                                pathname: `${url}/${movie.id}`,
                                state: { from: location },
                            }}
                        >
                            <img
                                className={s.img}
                                src={
                                    movie.backdrop_path &&
                                    `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                                }
                                alt={movie.original_title}
                            />
                            <p className={s.name}>{movie.original_title}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

MoviePage.propTypse = {
    setError: PropTypes.func.isRequired
}

export default MoviePage;