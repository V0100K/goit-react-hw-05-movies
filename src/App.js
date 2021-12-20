import { useState, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Navigation from "./components/Navigation";

const HomePage = lazy(() =>
    import("./pages/HomePage" /*webpackChunkName: 'home-page'*/)
);
const MoviesPage = lazy(() =>
    import("./pages/MoviePage" /*webpackChunkName: 'movies-page'*/)
);
const MovieDetailsPage = lazy(() =>
    import("./pages/MovieDetalPage" /*webpackChunkName: 'movie-details-page'*/)
);

function App() {
  const [error, setError] = useState(null);

  return (
      <div className="App">
        <Navigation />

        <Suspense fallback={<h2> Lodaing...</h2>}>
          <Switch>
            {error && <h2>{error.message}</h2>}
            <Route exact path="/">
              <HomePage setError={setError} />
            </Route>

            <Route exact path="/movies">
              <MoviesPage setError={setError} />
            </Route>

            <Route path="/movies/:movieId">
              <MovieDetailsPage setError={setError} />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </div>
  );
}

export default App;