import {ObjectId} from "mongodb";
import {exerciseSet, section} from "../../config/db";
import {Section} from "./Section";
export class ExerciseSet {
    public _id: ObjectId;
    public name: string;
    public level: string;
    public description: string;
    public image: string;
    public imgBase64?: string;
    public sectionId: ObjectId;
    constructor(obj: ExerciseSet) {
        this._id = new ObjectId(obj._id);
        this.name = obj.name;
        this.level = obj.level;
        this.description = obj.description;
        this.image = obj.imgBase64 as string;
        this.sectionId = new ObjectId(obj.sectionId);
        // this._validate();
    }
    _validate(){
        //Must be a proper validation
    }
    // static _checkRecord(record){
    //     if(!(record instanceof ExerciseSet)) {
    //         throw new Error('Record must exist and must be an instance of class ExerciseSet')
    //     }
    // }
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
    static async findById(id: string){
        const item = await exerciseSet.findOne<ExerciseSet>({_id: new ObjectId(String(id))});
        return item === null ? null : new ExerciseSet(item);
    }
    // static async findAll(){
    //     const result = await exerciseSet.find();
    //     const resultArray = await result.toArray();
    //     return resultArray.map(obj => new ExerciseSet(obj));
    // }
    static async findBySection(chosenSection: string) {
        const sectionId = (await section.findOne({name: chosenSection}))?._id;
        return (await exerciseSet.find<ExerciseSet>({sectionId}).toArray()).map(obj => new ExerciseSet(obj));
    }
    static async findAllWithCursor() {
        return /*await*/ exerciseSet.find();
    }
    async  update(){}
}