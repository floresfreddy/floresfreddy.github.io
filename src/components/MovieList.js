import React from "react";

const MovieList = (props) => {
  
  const Button = (movie) => { 
    return !props.favorites.some((m)=> m.imdbID === movie.imdbID)
  }
  
  return (
    <div>
        {props.movies.map(movie => {
          return <ul>
            <li>{movie.Title} ({movie.Year})
            {Button(movie)
            ?<button class = "ui mini active compact button" style = {{marginLeft: '1em'}} onClick={() => props.handleFavorites(movie)}> Nominate </button>
            :<button class = "ui mini disabled compact button" style = {{marginLeft: '1em'}} disabled={"true"} onClick={() => props.handleFavorites(movie)}> Nominate </button>}</li>
          </ul>
        })}
    </div>
  );
};

export default MovieList;