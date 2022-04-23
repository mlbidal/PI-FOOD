//HAGO LA LOGICA DEL PAGINADO: este componente va a ser el que renderiza los numeros en si
import React from "react";

export default function Paginate({ recipesPerPage, allRecipes, paginate }) {
    //comienzo con un arreglo vacio de pagenumber, no tengo paginas todavia.
    const pageNumbers = []; 
    //voy a redondear con el match.ceil todas las recetas sobre las recetas que quiero por pagina
    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    //las agrego al arreglo
        pageNumbers.push(i);
    }

    //si el arreglo pageNumber no esta vacio, mapealo y devolve cada uno de los numeros que te devuelva el paginado
    return (
        <nav className="btnPag">
                {pageNumbers &&
                pageNumbers.map((number) => (
                    <button key={number} onClick={() => paginate(number)}>
                        {number}
                    </button>
            ))}
        </nav>
    );
}