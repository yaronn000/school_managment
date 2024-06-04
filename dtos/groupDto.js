module.exports = class GroupDto {
    id;
    name;
    subject;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.subject = model.subject;
    }
}