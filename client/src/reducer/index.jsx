import { GET_RECIPES } from '../actions/index';

//hago un estado inicial, es un objeto y pongo los estados que voy a necesitar: recetas,
const initialState = {
    recipes: [],
    
};

function rootReducer (state= initialState, action){
    switch(action.type) {
        case GET_RECIPES:
            return {
                ...state, //guardo el estado
                recipes: action.payload, //en mi estado recipes que en un principio es un arreglo vacio, 
                //agrega todo lo q te traiga la accion de recipes

                allRecipes: action.payload,
            };
            default:
                return state;
            
        }
}
export default rootReducer;