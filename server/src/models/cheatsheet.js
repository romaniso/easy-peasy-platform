const {ObjectId} = require("mongodb");
const {exerciseSet, cheatsheet} = require("../../config/db");
class Cheatsheet {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.topic = obj.topic;
        this.level = obj.level;
        this.setId = new ObjectId(obj.setId);
        this.markDown = obj.markDown;
        // this._validate();
    }
    _validate(){
        //Must be a proper validation
    }
    static _checkRecord(record){
        if(!(record instanceof Exercise)) {
            throw new Error('Record must exist and must be an instance of class Cheatsheet')
        }
    }
    async  insert(){
    }
    async delete(){
    }
    static async findById(id){
        const item = await cheatsheet.findOne({_id: new ObjectId(String(id))});
        return item === null ? null : new Cheatsheet(item);
    }
    static async findAll(){
        const result = await cheatsheet.find();
        const resultArray = await result.toArray();
        return resultArray.map(obj => new Cheatsheet(obj));
    }
    static async findBySet(chosenSet){
        console.log(chosenSet);
        const {_id: setId} = (await exerciseSet.findOne({name: chosenSet}));
        const found = await cheatsheet.findOne({setId});
        return found ? new Cheatsheet(found) : null;
    }
    static async findAllWithCursor() {
        return /*await*/ cheatsheet.find();
    }
    async  update(){}
}

module.exports = {
    Cheatsheet,
};