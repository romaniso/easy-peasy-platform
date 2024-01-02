import {Level} from "../types/level";

export interface IReading {
    level: Level;
    markDown: string;
    setId: string;
    topic: string;
    _id: string;
    image: string;
    audioUrl: string;
}