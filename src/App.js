import { NavBar, Logo, Search, NumResults } from "./components/NavBar";
import { Main } from "./components/Main";
import { Loader } from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";
import { useEffect, useState } from "react";
import {
  WatchedSummary,
  WatchedMovieList,
  MovieList,
  Box,
} from "./components/ListBox";
import { MovieDetails } from "./components/MovieDetails";
import { useMovies } from "./components/useMovies";

export const KEY = "d009c423";

export default function App() {

  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    if (storedValue === null) return [];
    return JSON.parse(storedValue);
  });
  
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  const {movies, isLoading, error} =useMovies(query)

  function handleSelectMovie(id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }

  function handleCloseMovie() {
    setSelectedID(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem('watched', JSON.stringify([...watched, movie]))
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }



  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
