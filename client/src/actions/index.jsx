import axios from "axios";

export const GET_RECIPES = 'GET_RECIPES'

export function getRecipes() { //funcion asincrona donde conecto ell front con el back
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3003/recipes");
          //axios.get lo puedo reemplazar por un fetch. con axios me devuelve la respuesta en un data, y con fetch en .then(promesas)
         //conecto la ruta del back con el front
        return dispatch({
            type: GET_RECIPES,
            payload: json.data,
        });
    };
}