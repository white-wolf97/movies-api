const mongoose = require('mongoose');
const config = require('../config');

const dbConnection = async () => {
	try {
		await mongoose.connect(config.dbCnn);

		console.log('Conexión con Mongo Atlas exitosa');
	} catch (err) {
		console.log(err);
		throw new Error('Error al inicializar base de datos');
	}
};

module.exports = { dbConnection };