module.exports = class UserDto {
    id;
    email;
    roleId;

    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.roleId = model.roleId;
    }
}