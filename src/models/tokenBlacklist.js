const fs = require('fs');
const path = require('path');

module.exports = class TokenBlacklist{
    static getBlacklist(){
        return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'database', 'tokenBlacklist.txt'), 'utf8'));
    }

    static saveToDB(blacklist){
        fs.writeFileSync(path.join(__dirname, '..', 'database', 'tokenBlacklist.txt'), JSON.stringify(blacklist), 'utf8');
    }

    static isInBlacklist(token){
        const blacklist = TokenBlacklist.getBlacklist();
        return blacklist.hasOwnProperty(token);
    }
}