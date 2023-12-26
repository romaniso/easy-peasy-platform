import {ObjectId} from "mongodb";
import {section} from "../../config/db";
export class Section {
    public _id: ObjectId;
    public name: string;
    constructor(obj: Section) {
        this._id = new ObjectId(obj._id);
        this.name = obj.name;
        // this.image = obj.image;
        // this._validate();
    }
    _validate(){
    }
    // static _checkRecord(record){
    //     if(!(record instanceof Section)) {
    //         throw new Error('Record must exist and must be an instance of class Section')
    //     }
    // }
    async  insert(){
    }
    async delete(){
    }
    static async findById(id: string | ObjectId){
        const item = await section.findOne<Section>({_id: new ObjectId(String(id))});
        return item === null ? null : new Section(item);
    }
    // static async findAll(){
    //     const result = await section.find();
    //     const resultArray = await result.toArray();
    //     return resultArray.map(obj => new Section(obj));
    // }
    static async findAllWithCursor() {
        // return /*await*/ exercise.find();
    }
    async  update(){}
}