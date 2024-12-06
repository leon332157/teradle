import { Question } from './quiz';

export type Participant = {
    id:number;
    name:string;
    score:number;
}

export type Game = {
    sessionId:number; // the unique session id
    participants:Participant[]; // list of participants
    questions:Question[]; // list of questions loaded from quiz database
    currentQuestion:number; // index of the current question
}

export class GameDatabase {

}