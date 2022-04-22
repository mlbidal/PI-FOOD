//
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//2. hago npm i axios, instalo axios y lo requiero
require("dotenv").config();
const axios = require('axios')
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db"); //me traigo los modelos de db
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// 1. primera funcion controladora, es la que me trae toda la info de la api
const getApiInfo = async () => {
    const apiInfo = await axios.get( // llama al endpoint de la api y me trae toda la info q necesito, uso await para
                                      // avisarle que no se cuanto va a tardar lo q me va a guartar en la const. Es asincrona
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    return apiInfo.data.results;
};

// 3. sefunda funcion, es la que me trae toda la info de la data base
const getDbInfo = async () => { //hago una funcion asincrona
    return await Recipe.findAll({ //con findeAll traigo la info de mi db, lo hago desde el models Recipe
    include: { // hago un include de lo que debe tener
        //inluir el modelo Diet, que me traiga todas las recetas y que me incluya las dietas
        model: Diet, //tiene que influir el models Diet, sino nunca me va a traer la receta con las dietas
        // y del modelo Diet traer el atributo Name
        attributes: ["name"], // que me traiga el name, porque el id ya me lo va a traer
        through: { //sobre la tabla atributos, siempre hay q hacer el throuhg
        attributes: [],
    },
    },
    });
};

// 4. hago la tercera funcion, que me trae TODO. Funciona igual q las demas
const getAllRecipes = async () => {
    const apiInfo = await getApiInfo(); //ejecuta la funcion para treer la info de la api
    const dbInfo = await getDbInfo(); //ejecuta la funcion de la db 
    const totalInfo = dbInfo.concat(apiInfo); // conctateno la primer constante con la segunda. 
    return totalInfo; // me devuelve un arreglo con toda la info
};

// 5. hago la ruta del GET
// la ruta que tengo que Obtener un listado de las recetas que contengan la palabra ingresada como query parameter,
// quiere decir con respecto a lo que se ponga en la url, esa ruta en el front la voy a usar para buscar por nombre
router.get("/recipes", async (req, res) => { // '/rrecipes unifica y sobre la misma ruta pregunta /recipes?name=...
    const { name } = req.query; // el req.query pregunta si hay un query con la propiedad name 
    // uso esto para unificar las rutas y no tener que hacer la /recipes?name=... lo q le pase
    const recipesTotal = await getAllRecipes(); // me traigo la info de arriba
    console.log(recipesTotal)
    if (name) { // si hay un nombre que me pasan por query hago esto
    let recipeTitle = await recipesTotal.filter((r) => // de toda la info q tengo en la const filter, agarra ese nombre,
        r.title.toLowerCase().includes(name.toLowerCase()) // si fija si incluye lo que le paso por query, osea name
        // r.tittle es cada elemento de recipe
        // uso toLowercase xq me va a venir con mayurscula desde la api pero el cliente despues puede no ingresarlo asi
        // paso todos los nombres q me llegan a minuscula
    );
        recipeTitle.length // hay algo? y un condicional si si y sino
        ? res.status(200).json(recipeTitle)
        : res.status(404).send("This recipe doesn't exist"); 
    } else {
    res.status(200).json(recipesTotal); //si no hay un query
    }
});

router.get("/types", async (req, res) => {
    const recipesApi = await axios.get( // esta ruta entra a la api y me traigo toda la info de la api
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const types = await recipesApi.data.results.map((t) => t.diets); // mapea la info de la api y me devuelve un array lleno de dietas
    const diets = types.flat();
    console.log(diets)
    const typeDiets = [...new Set(diets), "vegetarian"];
    typeDiets.forEach((d) => { //entra a mi models diets y por cada uno 
        Diet.findOrCreate({ // una vez que la mapea hace el finder dentro del models
        //el finder se fija si esta, si no esta no lo crea y si esta no lo repite, si uso solo create los repito
            where: { name: d },
    });
    });
    const allDiets = await Diet.findAll(); //y me guarda todas las dietas en el modelo si no estan
    res.json(allDiets); //devuelvo todas las dietas json en lugar de send??
});

router.post("/recipe", async (req, res) => { //mi post, hago el post con toddo lo que me va a llegar por body
    let {
        
        title,
        summary,
        aggregateLikes,
        healthScore,
        analyzedInstructions,
        image,
        diets,
    } = req.body; // 1. me traigo del body lo que necesito
    if (!title || !summary) {
    return res.json("You must enter a title and a summary to create a recipe");
    }
    let recipeCreated = await Recipe.create({ // 2. creo la receta con todo eso
        title,
        summary,
        aggregateLikes,
        healthScore,
        analyzedInstructions,
        image,
    });
    //let dietDb = await Diet.findAll({ where: { name: diets } }); // 3. la dieta la tengo que buscar en el models de dieta,
                                                      //dentro del models busca todas las dietas que coincidan con la dieta del body
    recipeCreated.addDiets(diets); // a las recetas le agrego las dietas que coincidieron
    res.send("Recipe created successfully");
});


router.get("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    const recipesTotal = await getAllRecipes(); //me traigo la funcion q me trae todas las recetas
    if (id) { //si hay un id, entconces
    let recipeId = await recipesTotal.filter((r) => r.id == id); //dentro de todas las recetas, filtro la q tenga el id q le estoy pasando
    recipeId.length?
        res.status(200).json(recipeId):
        res.status(404).send("Recipe not found");
    }
});

module.exports = router;
/*
[ ] GET /recipes?name="...":
Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
Si no existe ninguna receta mostrar un mensaje adecuado
[ ] GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados
[ ] GET /types:
Obtener todos los tipos de dieta posibles
En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
[ ] POST /recipe:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos*/
