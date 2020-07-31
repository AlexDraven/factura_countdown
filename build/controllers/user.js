"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserById = exports.deleteUser = exports.getUserById = exports.create = exports.users = void 0;
const user_model_1 = require("../models/user.model");
// const bcrypt = require('bcryptjs');
const dbConnection = require('../models/connection');
// return all user
exports.users = (req, res) => {
    dbConnection.query('SELECT * FROM users', function (err, results, fields) {
        if (err)
            throw err;
        if (results) {
            return res.json(results);
        }
    });
    dbConnection.destroy();
};
// create user
exports.create = (req, res) => {
    let user = new user_model_1.UserSchema(req.body.name, req.body.lastname, req.body.username, req.body.email, req.body.password, req.body.age, req.body.birthday);
    dbConnection.query('INSERT INTO users SET ?', user, function (err, results, fields) {
        if (err)
            throw err;
        // Good walk!
        if (results) {
            return res.json({ message: 'User created.' });
        }
    });
    dbConnection.end(function (err) {
        console.log('Error', err);
    });
};
// get user by id
exports.getUserById = (req, res) => {
    let id = req.params.id;
    dbConnection.query('SELECT * FROM users WHERE id = ' + id, function (err, results, fields) {
        if (err)
            throw err;
        if (results) {
            return res.json(results).status(200);
        }
        else {
            return res.json({
                error: true,
                message: 'Not found user with this id',
            });
        }
    });
    dbConnection.end(function (err) {
        console.log('Error', err);
    });
};
// delete user
exports.deleteUser = (req, res) => {
    let id = req.params.id;
    const VerifyExistsUser = dbConnection.query('SELECT * FROM users WHERE id = ' + id);
    // verifico si el usuario existe
    if (VerifyExistsUser) {
        dbConnection.query('DELETE FROM users WHERE id = ' + id, function (err, results, fields) {
            if (err)
                throw err;
            if (results) {
                return res.json({ message: 'User deleted.' });
            }
        });
    }
    else {
        return res.json({ message: 'Not user deleted with this id found in DB. Because not user created' });
    }
    dbConnection.end(function (err) {
        console.log('Error', err);
    });
};
// edit user
exports.editUserById = (req, res) => {
    let id = req.params.id;
    let user = new user_model_1.UserSchema(req.body.name, req.body.lastname, req.body.username, req.body.email, req.body.password, req.body.age, req.body.birthday);
    const UserVerify = dbConnection.query('SELECT * FROM users WHERE id =' + user.id);
    // verifico si existe
    if (UserVerify) {
        // si no existe creo cliente
        dbConnection.query('UPDATE users SET ? WHERE id = ?', [user, id], function (err, results, fields) {
            if (err)
                throw err;
            // Good walk!
            if (results) {
                return res.json({ message: 'User update correctly.' });
            }
        });
    }
    else {
        return res.json({ message: 'User already created.' });
    }
    dbConnection.end(function (err) {
        console.log('Error', err);
    });
};
// login
// export let loginWithPasswordAndUsername = (req: Request, res: Response) => {
//   let username = req.body.username;
//   let pass = req.body.password;
//   dbConnection.query(`SELECT * FROM clients WHERE username=${username}`, function (
//     err: any,
//     results: any,
//     fields: any
//   ) {
//     if (err) throw err;
//     if (results) {
//       bcrypt.compare(pass, results[0].password, function (err: any, result: any) {
//         // res === false
//         if (result) {
//           return res.json({ message: 'Logged.' });
//         } else {
//           return res.json({ message: 'Password incorrect. ' });
//         }
//       });
//     } else {
//       return res.json({ message: 'Not found user with this id.' });
//     }
//   });
// };
