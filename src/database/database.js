const fs = require('fs');
const path = require('path');
const DatabaseError = require('../exceptions/databaseError.js');

module.exports = class Database{

    static init(){  
        if(!fs.existsSync(path.join(__dirname, '..', 'database', 'users.txt')))
            fs.writeFile(path.join(__dirname, '..', 'database', 'users.txt'),'', (err) => {
                if(err)
                    throw new DatabaseError(err.message);
            });
        
        if(!fs.existsSync(path.join(__dirname, '..', 'database', 'favorites.txt')))
            fs.writeFile(path.join(__dirname, '..', 'database', 'favorites.txt'),'', (err) => {
                if(err)
                    throw new DatabaseError(err.message);
            });
 
        if(!fs.existsSync(path.join(__dirname, '..', 'database', 'tokenBlacklist.txt')))
            fs.writeFile(path.join(__dirname, '..', 'database', 'tokenBlacklist.txt'),'', (err) => {
                if(err)    
                    throw new DatabaseError(err.message);
            });
    }  
}