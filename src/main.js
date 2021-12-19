const express = require('express');
const config = require('./config');
const Database = require('./database/database.js')
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const app = express();
const {movieRouter, authRouter, userRouter} = require('./routes/apiv1.js');

//Swagger Configuration  
const swaggerOptions = {  
    swaggerDefinition: {  
        openapi: '3.0.0',
        info: {  
            title:'Node challenge API',  
            version:'1.0.0',
            description: 'This is the API for the challenge of CodigoDelSur!',
            contact: { 
                name: 'Adolfo Castelo',
                email: 'adolfocastelo99@gmail.com'
            }
        }  
    },
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        },
        responses: {
            UnauthorizedError: {
                description: 'Access token is missing or invalid'
            }
        }
      }, 
      security: [
        {
          bearerAuth: [],
        },
      ], 
    apis:['./src/routes/apiv1.js'],  
}  
const swaggerDocs = swaggerJSDoc(swaggerOptions);  

try{ 
    Database.init();
}   
catch(err){  
    console.log('Error initializing database');
    console.log(err);
    console.log(err.stack);
    return;
}

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs)); 
app.use(express.json());//To be able to parse the req body parameters. 
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.listen(config.port, () => {
    console.log('listening on port ' + config.port);
})

