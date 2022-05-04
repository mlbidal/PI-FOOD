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
      type: DataTypes.UUID, 
                            
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, 
      primaryKey: true,  
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

    createdDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
};
