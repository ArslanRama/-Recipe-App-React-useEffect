import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';
import axios from "axios"

const App = () => {
 

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('vegetarian');

  // useEffect(() => {
  //   getRecipes();
  // },[query]);

  // const getRecipes = async () => {
  //   const response = await fetch(`https://api.edamam.com/search?q=$%7Bquery%7D&app_id=50626bff&app_key=b27deb4199489bc7fd61542bcde9c59b`);
  //   const data = await response.json();
  //   setRecipes(data.hits);
  //   console.log(data.hits);
  // }
  useEffect(() => {

    /*   fetch(`https://api.edamam.com/search?q=${query}&app_id=50626bff&app_key=b27deb4199489bc7fd61542bcde9c59b`)
      .then (res => res.json()) // we are parsing JSon body here! 
      .then ( res => {
        setRecipes(res.hits)
        console.log(res.hits);
      }) // Change the state with fetched data
      .catch(err=> console.log(err)); */
  
      // =======================================================
  
      axios
          .get(`https://api.edamam.com/search?q=${query}&app_id=50626bff&app_key=b27deb4199489bc7fd61542bcde9c59b`)
          .then ( res => {
            setRecipes(res.data.hits)
            console.log(res.data.hits);
          }) // Change the state with fetched data
          .catch(err=> console.log(err));
    
      //getRecipes()
    }, [query])

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar" value={search} onChange={updateSearch} />
        <button type="submit" className="search-button">Search</button>
      </form>
      <h1 className="text-center">Recipe APP</h1>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
