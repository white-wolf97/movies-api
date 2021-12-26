const fs = require('fs');
const path = require('path');
const hash = require('../utils/hash.js');
const DatabaseError = require('../exceptions/databaseError.js');

module.exports = class User {
    static getDB(){
        try{
            const usersBeforeParsing = fs.readFileSync(path.join(__dirname, '..', 'database', 'users.txt'), 'utf8')
            if(usersBeforeParsing)
                return JSON.parse(usersBeforeParsing);
            else
                return {};
        }
        catch(err){
            throw new DatabaseError('Problem accessing the database!');
        }
    }

    static saveToDB(users){
        try{
            fs.writeFileSync(path.join(__dirname, '..', 'database', 'users.txt'), JSON.stringify(users), 'utf8');
        }
        catch(err){
            throw new DatabaseError('Problem accessing the database!');
        }
    }

    static exists(email){
        try{
            const users = User.getDB();
            return users.hasOwnProperty(email);
        }
        catch(err){
            throw new DatabaseError('Problem accessing the database!');
        }
    }

    static add(email, firstName, lastName, password){
        try{
            const users = User.getDB();
            users[email] = {firstName : firstName, lastName : lastName, password : hash(password)};
            User.saveToDB(users);
        }
        catch(err){
            throw new DatabaseError('Problem accessing the database!');
        }
    }
}