import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginate from "./Paginate";


//hago los componentes con hooks (funciones)

export default function Home() {
    //declaro la const dispatch, utilizo la const para ir despachando mis acciones
    const dispatch = useDispatch(); 
    // con useSelector traeme a la const todo lo q esta en el estado de recipes
    const allRecipes = useSelector((state) => state.recipes);

    
    
    //       PAGINADO: 
    //    me creo estados locales
    //
    //1.MI PAGINA ACTUAL QUE COMIENZA EN UNO.
    //guardo un estado local con la pagina actual y un estado que me setee la pagina actual
    const [currentPage, setCurrentPage] = useState(1);

    //2. MIS RECETAS X PAGINA Q VAN A SER 9. 
    //guardo un estado local con cuantas recetas tengo por pagina y va a setear los personajes por pagina
    const [recipesPerPage, setRecipesPerPage] = useState(9);

    //EL INDICE DE LA ULTIMA RECETA
    //la pagina actual en donde estoy por la cantidad de recetas por pagina, comienza en 9
    const indexOfLastRecipe = currentPage * recipesPerPage;

    //EL INDICE DE LA PRIMERA RECETA
    //es el indice del la ultima receta menos las recetas por pagina, esto es 0
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

    //HAGO UNA CONSTANTE QUE GUARDE TODAS LAS RECETAS QUE VOY A TENER EN CADA PAGINA.
    //hago la const que voy a usar
    //con el metodo slice, le paso por parametro el indice del primero y del ultimo y me va a devolver un arreglo
    //con todos los que estan en el medio, me va arenderizar del 0 al 8, osea 9 recetas.
    const currentRecipes = allRecipes.slice(
        indexOfFirstRecipe,
        indexOfLastRecipe
    );
    
    //HAGO UNA CONSTANTE, le paso el numero de pagina y seteo la pagina en ese numero de pagina
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

    
    //traigo del estado las recipes cuando el componente se monta
    //despacho la axion del componente invocado
    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);
   
    //Hago una funcion que la uso para un boton que me trae todas las recetas
    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    //Hago una funcion que la uso para un boton que me ordena las recipes por abc
    /*function handleSelectByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrderName("Order" + e.target.value);
      }*/

    //Hago una funcion que la uso para un boton que me selecciona las recetas por tipo de dieta
    /*function handleSelectTypeOfDiet(e) {
        e.preventDefault();
        dispatch(filterByDiet(e.target.value));
    }*/

    //Hago una funcion que la uso para un boton que me ordena las recipes por score
    /*function handleSelectByScore(e) {
        e.preventDefault();
        dispatch(orderByScoreLikes(e.target.value));
        setCurrentPage(1);
        setOrderLike("Order" + e.target.value);
}*/

    //RENDERIZO:
    return(
        <div>
            <h1 className="tittle">FoodBook</h1>
            <Link to="/recipe" ></Link>
                <button className="btnCreate">Create your recipe</button>
            <div className="showAll">
                <button
                    onClick={(e) => {
                    handleClick(e);
                    }}>
                Show all recipes
            </button>
            </div>
            <div className="select">
                <span className="span">Order by Name</span>
                <select>
                    <option value="default">All</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                <span className="span">by Score</span>
                <select>
                    <option value="All">All</option>
                    <option value="Asc">Highest Score</option>
                    <option value="Desc">Lowest Score</option>
                </select>
                <span className="span">Filter by Type of diet</span>
                <select >
                    <option value="default">All Diets</option>                      
                </select>
                <Paginate 
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginate={paginate}
                    />
                    {currentRecipes?.map(c=>{
                        return (
                            <div>
                                <Link to={"/home/" + c.id} className="linkCard">
                                    <Card 
                                        title={c.title}
                                        image={c.image}
                                        diets={c.createdDb}
                                        vegetarian={c.vegetarian}
                                        score={c.aggregateLikes}
                                    >
                                    </Card>
                                </Link>
                            </div>
                        );
                    })
                }
            </div>

        </div>
    )
}