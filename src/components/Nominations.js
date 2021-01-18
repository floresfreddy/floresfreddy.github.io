import React from "react";

const Nominations = (props) => {
  
  return (
    <div>
        {props.movies.map(movie => {
            return <ul><li>{movie.Title} ({movie.Year})
                <button 
                    class = "ui mini active compact button" 
                    style = {{marginLeft: '1em'}} 
                    onClick={() => props.handleFavorites(movie)}> Remove 
                </button>
            </li></ul>
        })}
    </div>
  );
};

export default Nominations;