"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
class UserSchema {
    constructor(id, name, lastname, email, dateBirthday, description, phone) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.date_birthday = dateBirthday;
        this.phone = phone;
        this.description = description;
    }
}
exports.UserSchema = UserSchema;
