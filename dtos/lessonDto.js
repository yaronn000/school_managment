module.exports = class GroupDto {
    id;
    date;
    time;
    group;

    constructor(model) {
        this.id = model.id;
        this.date = model.date;
        this.time = model.time;
        this.group = model.Group.name
    }
}