const fs = require('fs');
const path = require('path');
const DatabaseError = require('../exceptions/databaseError.js');

module.exports = class Movie{
    static getDB(){
        try{
            const favoritesBeforeParsing = fs.readFileSync(path.join(__dirname, '..', 'database', 'favorites.txt'), 'utf8')
            if(favoritesBeforeParsing)
                return JSON.parse(favoritesBeforeParsing);
            else
                return [];
        }
        catch(err){
            throw new DatabaseError('Problem accessing the database!');
        }
    }

    static saveToDB(favorites){
        try{
            fs.writeFileSync(path.join(__dirname, '..', 'database', 'favorites.txt'), JSON.stringify(favorites), 'utf8');
        }
        catch(err){
            throw new DatabaseError('Problem accessing the database!');
        }
    }

    static add(email, movie){
        try{
            const favorites = Movie.getDB();
            const favoriteIndex = favorites.findIndex(f => f.id === movie.id);

            if(favoriteIndex !== -1){
                if(favorites[favoriteIndex].emails.hasOwnProperty(email)){
                    return false;
                } 
                favorites[favoriteIndex].emails[email] = Date.now();
            }
            else{
                favorites.push({
                    ...movie, 
                    emails : {
                        [email]: Date.now()
                    }
                })
            }
            Movie.saveToDB(favorites);
            return true;
        }
        catch(err){
            throw new DatabaseError('Problem accessing the database!');
        }
    }
}