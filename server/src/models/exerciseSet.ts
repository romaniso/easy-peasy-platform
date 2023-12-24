import {ObjectId} from "mongodb";
import {exerciseSet, section} from "../../config/db";
export class ExerciseSet {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.name = obj.name;
        this.level = obj.level;
        this.description = obj.description;
        this.image = obj.imgBase64;
        this.sectionId = new ObjectId(obj.sectionId);
        // this._validate();
    }
    _validate(){
        //Must be a proper validation
    }
    static _checkRecord(record){
        if(!(record instanceof ExerciseSet)) {
            throw new Error('Record must exist and must be an instance of class ExerciseSet')
        }
    }
    async  insert(){
        const {insertedId} = await exerciseSet.insertOne({
            name: String(this.name),
            level: String(this.level),
            description: String(this.description),
            image: String(this.image),
            sectionId: new ObjectId(this.sectionId),

        });
        this._id = insertedId;

        return insertedId;
    }
    async delete(){
        await exerciseSet.deleteOne({
            _id: this._id,
        })
    }
    static async findById(id){
        const item = await exerciseSet.findOne({_id: new ObjectId(String(id))});
        return item === null ? null : new ExerciseSet(item);
    }
    static async findAll(){
        const result = await exerciseSet.find();
        const resultArray = await result.toArray();
        return resultArray.map(obj => new ExerciseSet(obj));
    }
    static async findBySection(chosenSection){
        const sectionId = (await section.findOne({name: chosenSection}))._id;
        return (await (await exerciseSet.find({sectionId})).toArray()).map(obj => new ExerciseSet(obj));
    }
    static async findAllWithCursor() {
        return /*await*/ exerciseSet.find();
    }
    async  update(){}
}