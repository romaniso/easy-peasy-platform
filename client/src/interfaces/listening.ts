import {Level} from "../types/level";

export interface IListening {
    _id: string;
    topic: string;
    level: Level;
    description: string;
    setId: string;
    image: string;
    audioUrl: string;
}