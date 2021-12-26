const fs = require('fs');
const path = require('path');
const DatabaseError = require('../exceptions/databaseError.js');

module.exports = class Database {
    static init(){  
        const usersDBPath = path.join(__dirname, 'users.txt');
        const favoritesDBPath = path.join(__dirname, 'favorites.txt');
        const blacklistDBPath = path.join(__dirname, 'tokenBlacklist.txt');

        if(!fs.existsSync(usersDBPath)) {
            fs.writeFile(usersDBPath, '', (err) => {
                if (err) 
                    throw new DatabaseError(err.message);
            })
        }
        
        if(!fs.existsSync(favoritesDBPath)) {
            fs.writeFile(favoritesDBPath, '', (err) => {
                if(err)
                    throw new DatabaseError(err.message);
            });
        }

        if(!fs.existsSync(blacklistDBPath)) {
            fs.writeFile(blacklistDBPath, '', (err) => {
                if(err)    
                    throw new DatabaseError(err.message);
            });
        }
    }  
}