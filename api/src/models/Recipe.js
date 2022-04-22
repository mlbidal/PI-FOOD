const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  /*
[ ] Receta con las siguientes propiedades:
ID: *
Nombre *
Resumen del plato *
Puntuación
Nivel de "comida saludable"
Paso a paso
  CREO LA TABLA RECIPE y miro los tipos de dato que voy a recibir en https://api.spoonacular.com/recipes/complexSearch?apiKey=95334c489e1f4dcdbc4d95446df4d673*/
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID, //especifico el ID para que no sea incremental por default,
                            //UUID genera un numero random para que no se pise de mi api a la otra
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, // no se permite que este vacio
      primaryKey: true,  //va a ser la clave primaria el ID
    },
 
    title: { //resumen del plato
      type: DataTypes.STRING,
      allowNull: false, // porque es requerido
    },
    summary: { //resumen del plato
      type: DataTypes.STRING,
      allowNull: false,
    },
    aggregateLikes: { //puntuación
      type: DataTypes.INTEGER,
    },
    healthScore: { //nivel de "comida saludable"
      type: DataTypes.INTEGER,
    },
    analyzedInstructions: { //paso a paso
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    // le paso la ultima propiedad, para poder acceder a las recetas que creo en esta propiedad,
    //todas las q yo cree se van a hacer con esta propiedad
    createdDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
};
