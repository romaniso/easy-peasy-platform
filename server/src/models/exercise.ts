import {ObjectId} from "mongodb";
import {exerciseSet, exercise} from "../../config/db";
import {Section} from "./section";
import {ExerciseTypeName} from "../enums/exercise";

interface DbExerciseObject {
    _id: ObjectId;
    title: string;
    instruction: string;
    type: ExerciseTypeName;
    setId: ObjectId;
    data: {} | [];
}
export class Exercise {
    private readonly _id: ObjectId;
    private title: string;
    private instruction: string;
    private type: ExerciseTypeName;
    private data: {} | [];
    private setId: ObjectId;
    constructor(obj: DbExerciseObject) {
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
    static async findById(id: ObjectId): Promise<Exercise | null>{
        const item = await exercise.findOne({_id: new ObjectId(String(id))});
        return item === null ? null : new Exercise(item);
    }
    static async findAll(){
        const result = await exercise.find();
        const resultArray = await result.toArray();
        return resultArray.map(obj => new Exercise(obj));
    }
    static async findBySet(chosenSet: string){
        const {_id: setId, sectionId} = (await exerciseSet.findOne({name: chosenSet}));
        // @fixme: refactor me please, it looks too robust
        return {section: (await Section.findById(sectionId)).name, exercises: (await (await exercise.find({setId})).toArray()).map(obj => new Exercise(obj))};
    }
    static async findAllWithCursor() {
        return /*await*/ exercise.find();
    }
    async  update(){}
}