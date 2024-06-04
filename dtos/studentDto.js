module.exports = class UserDto {
    id;
    name;
    surname;
    patronymic;
    manager;
    group;

    constructor(model) {
        this.id = model.id;
        this.surname = model.surname;
        this.name = model.name;
        this.patronymic = model.patronymic;
        this.manager = model.Account.surname + " " + model.Account.name + " " + model.Account.patronymic;
        this.group = model.Group.name;
    }
}