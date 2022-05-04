//HAGO LA LOGICA DEL PAGINADO: este componente va a ser el que renderiza los numeros en si
import React from "react";
import "../styles/Paginate.css";

export default function Paginate({ recipesPerPage, allRecipes, paginate }) {
    //comienzo con un arreglo vacio de pagenumber, no tengo paginas todavia.
    const pageNumbers = []; 
    //page number es: 1, 2, 3 , 4, 5 , 6, 7, 8, 9, 10, 11, 12 cn todas las recipes
    
    //voy a redondear con el match.ceil todas las recetas sobre las recetas que quiero por pagina
    //las 12 paginas me salen del redondeo del for, osea divido todas las recetas por la cantidad de recetas por pagina
    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    //las agrego al arreglo
        pageNumbers.push(i);
    }

    //si el arreglo pageNumber no esta vacio, mapealo y devolve cada uno de los numeros que te devuelva el paginado
    return (
        <nav className="btn1">
                {pageNumbers &&
                pageNumbers.map((number) => (
                    <button className="btnPag"key={number} onClick={() => paginate(number)}>
                        {number}
                    </button>
            ))}
        </nav>
    );
}