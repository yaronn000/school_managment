module.exports = class UserDto {
    id;
    email;
    surname;
    name;
    patronymic;
    

    constructor(model) {
        this.id = model.id
        this.email = model.email;
        this.surname = model.surname;
        this.name = model.name;
        this.patronymic = model.patronymic;
    }
}