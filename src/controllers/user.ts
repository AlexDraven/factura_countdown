import { Request, Response, NextFunction, json } from 'express';
import { UserSchema } from '../models/user.model';
import { resolveSoa } from 'dns';
import Validator from 'validator';
// const bcrypt = require('bcryptjs');
const dbConnection = require('../models/connection');

// return all user
export let users = (req: Request, res: Response) => {
  if (req.method === 'GET') {
    try {
      dbConnection.query('SELECT * FROM users', function (err: any, results: UserSchema[], fields: any) {
        if (err) throw err;

        if (results) {
          return res.json(results);
        }
      });
      dbConnection.end(function (err: Error) {
        console.log('Error', err);
      });
    } catch (error) {
      res.json({ error: true, message: error }).status(500);
    }
  } else {
    res.json({ error: true, message: 'Method not avaible for this endpoint' }).status(400);
  }
};
// create user
export let userCreate = (err: any, req: Request, res: Response) => {
  console.log(err);
  if (err) throw err;
  if (req.method === 'POST') {
    try {
      console.log(req.body);
      if (req.body) {
        let user = new UserSchema();
        if (!Validator.isEmail(req.body.email)) {
          res.json({ error: true, message: "Email isn't valid", data: req.body });
        }
        //   ValidateDataIsString()
        user.name = req.body.name;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.date_birthday = new Date(req.body.dateBirthday);
        user.description = req.body.description;
        user.phone = req.body.phone;
        let query = `INSERT INTO users (name,lastname,email,date_birthday,description,phone)`;
        dbConnection.query(query, user, function (err: any, results: any, fields: any) {
          if (err) throw err;
          // Good walk!
          if (results) {
            return res.json({ message: 'User created.' });
          }
        });
      } else {
        res.json({ error: true, message: 'ERROR: Not sended data' });
      }
    } catch (error) {
      res.json({ error: true, message: error }).status(500);
    }
  } else {
    res.json({ error: true, message: 'Method not avaible for this endpoint' }).status(400);
  }
};
// get user by id
export let getUserById = (req: Request, res: Response) => {
  let id = req.params.id;
  dbConnection.query('SELECT * FROM users WHERE  id = ' + id, function (err: any, results: any, fields: any) {
    if (err) throw err;

    if (results) {
      return res.json(results).status(200);
    } else {
      return res.json({
        error: true,
        message: 'Not found user with this id',
      });
    }
  });

  //   dbConnection.end(function (err: Error) {
  //     console.log('Error', err);
  //   });
};

// delete user
export let deleteUser = (req: Request, res: Response) => {
  let id = req.params.id;

  const VerifyExistsUser = dbConnection.query('SELECT * FROM users WHERE id = ' + id);
  // verifico si el usuario existe
  if (VerifyExistsUser) {
    dbConnection.query('DELETE FROM users WHERE id = ' + id, function (err: any, results: any, fields: any) {
      if (err) throw err;

      if (results) {
        return res.json({ message: 'User deleted.' });
      }
    });
  } else {
    return res.json({ message: 'Not user deleted with this id found in DB. Because not user created' });
  }
  //   dbConnection.end(function (err: Error) {
  //     console.log('Error', err);
  //   });
};
// edit user
export let editUserById = (req: Request, res: Response) => {
  let id = req.params.id;
  let user = new UserSchema();
  user.name = req.body.name;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.date_birthday = new Date(req.body.dateBirthday);
  user.description = req.body.description;
  user.phone = req.body.phone;
  console.log(user);
  const UserVerify = dbConnection.query('SELECT * FROM users WHERE id =' + user.id);
  // verifico si existe
  if (UserVerify) {
    // si no existe creo cliente
    dbConnection.query('UPDATE users SET ? WHERE id = ?', [user, id], function (err: any, results: any, fields: any) {
      if (err) throw err;
      // Good walk!
      if (results) {
        return res.json({ message: 'User update correctly.' });
      }
    });
  } else {
    return res.json({ message: 'User already created.' });
  }
  //   dbConnection.end(function (err: Error) {
  //     console.log('Error', err);
  //   });
};
// get next birthday
export let getNextBirthday = (req: Request, res: Response) => {
  let date_birthday = req.body.date_birthday;
  dbConnection.query(
    'SELECT * FROM users WHERE date_birthday < ' + date_birthday + 'ORDER BY date_birthday DESC',
    function (err: any, results: UserSchema[], fields: any) {
      if (err) throw err;

      if (results) {
        return res.json(results);
      }
    }
  );
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
// const ValidateData = (data: any[]) => {
//     data.forEach((r)=>{})
// }
