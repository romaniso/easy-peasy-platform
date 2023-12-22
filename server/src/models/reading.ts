const {ObjectId} = require("mongodb");
const {exerciseSet, reading} = require("../../config/db");
class Reading {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.topic = obj.topic;
        this.level = obj.level;
        this.setId = new ObjectId(obj.setId);
        this.image = obj.image;
        this.markDown = obj.markDown;
        // this._validate();
    }
    _validate(){
        //Must be a proper validation
    }
    static _checkRecord(record){
        if(!(record instanceof Reading)) {
            throw new Error('Record must exist and must be an instance of class Reading')
        }
    }
    async  insert(){
    }
    async delete(){
    }
    static async findById(id){
        const item = await reading.findOne({_id: new ObjectId(String(id))});
        return item === null ? null : new Reading(item);
    }
    static async findAll(){
        const result = await reading.find();
        const resultArray = await result.toArray();
        return resultArray.map(obj => new Reading(obj));
    }
    static async findBySet(chosenSet){
        console.log(chosenSet);
        const {_id: setId} = (await exerciseSet.findOne({name: chosenSet}));
        const found = await reading.findOne({setId});
        return found ? new Reading(found) : null;
    }
    static async findAllWithCursor() {
        return /*await*/ reading.find();
    }
    async  update(){}
}

module.exports = {
    Reading,
};