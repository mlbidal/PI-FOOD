const { DataTypes } = require("sequelize");
//Creo el archivo, para hacer otro models.js. Copio y pedo lo que tenia en Recipe.js al principio
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("diet", {
      //le paso solo name porque el id me lo va a generar por default y me sirve el tipo
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};