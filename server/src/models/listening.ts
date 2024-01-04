import {ObjectId} from "mongodb";
import {exerciseSet, listening} from "../../config/db";
import {ExerciseSet} from "./exerciseSet";
export class Listening {
    public _id: ObjectId;
    public topic: string;
    public level: string;
    public description: string;
    public setId: ObjectId;
    public image: string;
    public audioUrl: string;
    constructor(obj: Listening) {
        this._id = new ObjectId(obj._id);
        this.topic = obj.topic;
        this.level = obj.level;
        this.setId = new ObjectId(obj.setId);
        this.image = obj.image;
        this.description = obj.description;
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
        const item = await listening.findOne<Listening>({_id: new ObjectId(String(id))});
        return item === null ? null : new Listening(item);
    }
    // static async findAll(){
    //     const result = await reading.find();
    //     const resultArray = await result.toArray();
    //     return resultArray.map(obj => new Reading(obj));
    // }
    static async findBySet(chosenSet: string){
        console.log(chosenSet);
        const {_id: setId} = (await exerciseSet.findOne<ExerciseSet>({name: chosenSet}) as ExerciseSet);
        const found = await listening.findOne<Listening>({setId});
        return found ? new Listening(found) : null;
    }
    static async findAllWithCursor() {
        return /*await*/ listening.find();
    }
    async  update(){}
}