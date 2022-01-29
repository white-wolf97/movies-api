const fs = require('fs');
const path = require('path');
const DatabaseError = require('../exceptions/databaseError.js');


module.exports = class TokenBlacklist{
    static getBlacklist(){
        try{
            const blacklistBeforeParsing = fs.readFileSync(path.join(__dirname, '..', 'database', 'tokenBlacklist.txt'), 'utf8');
            if(blacklistBeforeParsing)
                return JSON.parse(blacklistBeforeParsing);
            else
                return [];
        }
        catch(err){
            throw new DatabaseError('Problem accessing the database!');
        }
    }

    static saveToDB(blacklist){
        try{
            fs.writeFileSync(path.join(__dirname, '..', 'database', 'tokenBlacklist.txt'), JSON.stringify(blacklist), 'utf8');
        }
        catch(err){
            throw new DatabaseError('Problem accessing the database!');
        }
    }

    static isInBlacklist(token){
        try{
            const blacklist = TokenBlacklist.getBlacklist();
            return blacklist.includes(token);
        }
        catch(err){
            throw new DatabaseError('Problem accessing the database!');
        }
    }
}