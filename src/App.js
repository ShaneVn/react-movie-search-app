import React, { useState } from "react";
import Movies from "./components/Movies";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const SearchMovies = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    setQuery('')
  };

  const movieList = movies.filter(movie=> movie.poster_path).map(movie=> <Movies key= {movie.id} movie={movie}/>)

  return (
    <div className="container">
    <h1 className="title">React Movie Search</h1>
  
      <form className="form" onSubmit={(e) => SearchMovies(e)}>
        <label htmlFor="query" className="label">
          {" "}
          Movie Name
        </label>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="input"
          type="text"
          name="query"
          placeholder="i.e. Jurassic Park"
        ></input>

        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div className="card-list">
      {movieList}
      </div>
      </div>
  );
}

export default App;

