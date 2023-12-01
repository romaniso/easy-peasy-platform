const {ObjectId} = require("mongodb");
const {exerciseSet, exercise} = require("../../config/db");
class Exercise {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.title = obj.title;
        this.instruction = obj.instruction;
        this.type = obj.type;
        this.data = obj.data;
        this.setId = new ObjectId(obj.setId);
        // this._validate();
    }
    _validate(){
        //Must be a proper validation
    }
    static _checkRecord(record){
        if(!(record instanceof Exercise)) {
            throw new Error('Record must exist and must be an instance of class Exercise')
        }
    }
    async  insert(){
        // const {insertedId} = await exerciseSet.insertOne({
        //     name: String(this.name),
        //     level: String(this.level),
        //     description: String(this.description),
        //     image: String(this.image),
        //     sectionId: new ObjectId(this.sectionId),
        //
        // });
        // this._id = insertedId;

        // return insertedId;
    }
    async delete(){
        // await exerciseSet.deleteOne({
        //     _id: this._id,
        // })
    }
    static async findById(id){
        const item = await exercise.findOne({_id: new ObjectId(String(id))});
        return item === null ? null : new Exercise(item);
    }
    static async findAll(){
        const result = await exercise.find();
        const resultArray = await result.toArray();
        return resultArray.map(obj => new Exercise(obj));
    }
    static async findBySet(chosenSet){
        const setId = (await exerciseSet.findOne({name: chosenSet}))._id;
        return (await (await exercise.find({setId})).toArray()).map(obj => new Exercise(obj));
    }
    static async findAllWithCursor() {
        return /*await*/ exercise.find();
    }
    async  update(){}
}

module.exports = {
    Exercise,
};