module.exports = class UserDto {
    email;
    surname;
    name;
    patronymic;
    

    constructor(model) {
        this.email = model.email;
        this.surname = model.surname;
        this.name = model.name;
        this.patronymic = model.patronymic;
    }
}