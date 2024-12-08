import { Question, Quiz, } from './quiz';
import { getQuizDatabase } from '.';

export type Participant = {
    id: number;
    name: string;
    score: number;
}

export type Game = {
    sessionId: number; // the unique session id
    participants: Participant[]; // list of participants
    numParticipants: number; //number of participants
}

/*
    * This class is responsible for managing the quiz session.
*/
export class GameController {
    #activeSessions = new Map<number, Game>(); // map of active sessions id -> game

    /**
     * Get game object for the given session id
     * @param {number} sessionId - the id of the session
     * @returns Game - the game object or undefined if not found
    */

    getSession(sessionId: number): Game | undefined {
        return this.#activeSessions.get(sessionId);
    }

    /**
     * Add a participant to the session
     * @param {number} sessionId - the id of the session
     * @param {Participant} participant - the participant to add
     * @returns boolean - true if the participant was added, false otherwise
     */
    addParticipant(sessionId: number, participant: Participant): boolean {
        const game = this.#activeSessions.get(sessionId);
        if (game) {
            game.participants.push(participant);
            return true;
        }
        return false;
    }

    /**
     * Update the number of participants joined in the session
     * @param {number} sessionId - the id of the session
     * @returns boolean - true if the number of participants was updated, false otherwise
     */
    updateParticipantsCount(sessionId: number): boolean {
        const game = this.#activeSessions.get(sessionId);
        if (game) {
            game.numParticipants = game.participants.length;
            return true;
        }
        return false; // Session not found
    }

    /**
     * End the session and remove it from the active sessions
     * @param {number} sessionId - the id of the session
     * @returns boolean - true if the session was ended, false otherwise
     */
    endSession(sessionId: number): boolean {
        return this.#activeSessions.delete(sessionId);
    }

    /**
     * Get the list of active sessions
     * @returns Game[] - the list of active sessions
     */
    getActiveSessions(): Game[] {
        return Array.from(this.#activeSessions.values());
    }
}