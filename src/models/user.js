const fs = require('fs');
const path = require('path');
const hash = require('../utils/hash.js');

module.exports = class User {
    static getDB(){
        return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'database', 'users.txt'), 'utf8'));
    }

    static saveToDB(users){
        fs.writeFileSync(path.join(__dirname, '..', 'database', 'users.txt'), JSON.stringify(users), 'utf8');
    }

    static exists(email){
        const users = User.getDB();
        return users.hasOwnProperty(email);
    }

    static add(email, firstName, lastName, password){
        
        const users = User.getDB();
        users[email] = {firstName : firstName, lastName : lastName, password : hash(password)};
        User.saveToDB(users);
    }
}