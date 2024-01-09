import {ObjectId} from "mongodb";
import {exerciseSet, reading} from "../../config/db";
import {ExerciseSet} from "./ExerciseSet";
export class Reading {
    public _id: ObjectId;
    public topic: string;
    public level: string;
    public setId: ObjectId;
    public image: string;
    public markDown: string;
    public audioUrl: string;
    constructor(obj: Reading) {
        this._id = new ObjectId(obj._id);
        this.topic = obj.topic;
        this.level = obj.level;
        this.setId = new ObjectId(obj.setId);
        this.image = obj.image;
        this.markDown = obj.markDown;
        this.audioUrl = obj.audioUrl;
        // this._validate();
    }
    _validate(){
        //Must be a proper validation
    }
    // static _checkRecord(record){
    //     if(!(record instanceof Reading)) {
    //         throw new Error('Record must exist and must be an instance of class Reading')
    //     }
    // }
    async  insert(){
    }
    async delete(){
    }
    static async findById(id: string){
        const item = await reading.findOne<Reading>({_id: new ObjectId(String(id))});
        return item === null ? null : new Reading(item);
    }
    // static async findAll(){
    //     const result = await reading.find();
    //     const resultArray = await result.toArray();
    //     return resultArray.map(obj => new Reading(obj));
    // }
    static async findBySet(chosenSet: string){
        console.log(chosenSet);
        const {_id: setId} = (await exerciseSet.findOne<ExerciseSet>({name: chosenSet}) as ExerciseSet);
        const found = await reading.findOne<Reading>({setId});
        return found ? new Reading(found) : null;
    }
    static async findAllWithCursor() {
        return /*await*/ reading.find();
    }
    async  update(){}
}