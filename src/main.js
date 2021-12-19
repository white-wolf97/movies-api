const express = require('express');
const config = require('./config');
const Database = require('./database/database.js')
const fs = require('fs');
const app = express();
const {movieRouter, authRouter, userRouter} = require('./routes/apiv1.js');
 
try{ 
    Database.init();
}   
catch(err){  
    console.log('Error initializing database');
    console.log(err);
    console.log(err.stack);
}
 
app.use(express.json());//To be able to parse the req body parameters. 
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.listen(config.port, () => {
    console.log('listening on port ' + config.port);
})

