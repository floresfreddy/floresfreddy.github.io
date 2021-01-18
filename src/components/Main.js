import React, { Component } from "react";
import Search from "./Search";
import MovieList from "./MovieList.js"
import Nominations from "./Nominations.js"


class Main extends Component {
  
    state = {
        movies: [],
        favorites:[],
        search :''
    }

    saveToLocalStorage = (items) => {
        localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
    };

    addFavoriteMovie = (movie) => {
        if(this.state.favorites.length > 4) return
        const newFavoriteList = [...this.state.favorites, movie];
        this.setState({
            favorites: newFavoriteList
        })
        this.saveToLocalStorage(newFavoriteList);
    };

    removeFavoriteMovie = (movie) => {
        const newFavoriteList = this.state.favorites.filter(
            (favorite) => favorite.imdbID !== movie.imdbID
        );

        this.setState({
            favorites: newFavoriteList
        });
        this.saveToLocalStorage(newFavoriteList);
    };

    searchMovies = (search) => {
        
        if(search.length > 2){
            fetch(`http://www.omdbapi.com/?s=${search}&apikey=6ec34811`)
            .then(res => res.json()) 
            .then(movies => {
                if(movies.Response !== 'False')
                this.setState({
                movies: movies.Search,
                search: search
            })
        })
    }
    else if(search.length !== 0){
        fetch(`http://www.omdbapi.com/?t=${search}&apikey=6ec34811`)
        .then(res => res.json())
        .then(movie => {
            if(movie){
                this.setState({
                    movies: [movie],
                    search: search
                })
            }
            })
        }
        else {
            this.setState({
                movies: [],
                search: ""
            })
        }
    }
    
    componentDidMount(){
        console.log(JSON.parse(localStorage.getItem('react-movie-app-favorites')))
        let faves = JSON.parse(localStorage.getItem('react-movie-app-favorites'))
        this.setState({
            favorites: [...faves]
        }, () => console.log(this.state.favorites))
    }

    render() {
        return (
        <div className= 'main-container'>
            {this.state.favorites.length === 5? <h1 class = "ui green fluid button" >Your Nominations are full!</h1>: <p></p>}  
            <h1>The Shoppies</h1>
            <Search searching = {this.searchMovies} />
            <div className='flex-container'>
                <div className="column box" style={{order: 0, flexGrow:1}}>
                    <h2>Results for... {this.state.search}</h2>
                    <MovieList movies = {this.state.movies} favorites = {this.state.favorites} handleFavorites = {this.addFavoriteMovie}/>
                </div>
                <div className="column box" style={{order: 1, flexGrow:1}}>
                    <h2>Nominations ({this.state.favorites.length}/5)</h2>
                    <Nominations movies = {this.state.favorites} handleFavorites = {this.removeFavoriteMovie}/>     
                </div>
            </div>
        </div>
        );
    }
}

export default Main;