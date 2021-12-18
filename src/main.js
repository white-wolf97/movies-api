const express = require('express');
const config = require('./config');
const app = express();
const {movieRouter, authRouter, userRouter} = require('./routes/apiv1.js');

app.use(express.json());//To be able to parse the req body parameters. 
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);


app.listen(config.port, () => {
    console.log('listening on port ' + config.port);
})

