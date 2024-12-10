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
    questions: Question[]; // list of questions loaded from quiz database
    currentQuestion: number; // index of the current question
}

/*
    * This class is responsible for managing the game state.
    * It keeps track of the active sessions and their state.
*/
export class GameController {
    #activeSessions = new Map<number, Game>(); // map of active sessions id -> game

    /**
    * Create a new session for the given quiz id 
    * @param {number} Quizid - the id of the quiz to create a session for
    * @returns Game - the created game object or Error if the quiz is not found
    */
    async createSession(Quizid: number): Promise<Game | Error> {
        const quizDatabase = getQuizDatabase();
        const quizObj = await quizDatabase.getQuiz(Quizid);
        if (!quizObj) {
            return Error("Quiz not found");
        }
        const game: Game = {
            sessionId: Math.floor(Math.random() * 10000),
            participants: [],
            questions: quizObj.questions,
            currentQuestion: 0,
        }
        this.#activeSessions.set(game.sessionId, game);
        return game;
    }

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
     * Get the current question for the session
     * @param {number} sessionId - the id of the session
     * @returns Question - the current question or undefined if not found
     */
    getCurrentQuestion(sessionId: number): Question | undefined {
        const game = this.#activeSessions.get(sessionId);
        if (game) {
            return game.questions[game.currentQuestion];
        }
        return undefined;
    }

    /**
     * Advance to the next question in the session
     * @param {number} sessionId - the id of the session
     * @returns Question - the next question or undefined if not found
     */
    nextQuestion(sessionId: number): Question | undefined {
        const game = this.#activeSessions.get(sessionId);
        if (game) {
            game.currentQuestion++;
            return game.questions[game.currentQuestion];
        }
        return undefined;
    }

    /**
     * Update the score for a participant in the session
     * @param {number} sessionId - the id of the session
     * @param {number} participantId - the id of the participant
     * @param {number} score - the new score
     * @returns boolean - true if the score was updated, false otherwise
     */
    updateScore(sessionId: number, participantId: number, score: number): boolean {
        const game = this.#activeSessions.get(sessionId);
        if (game) {
            const participant = game.participants.find(p => p.id === participantId);
            if (participant) {
                participant.score = score;
                return true;
            }
        }
        return false;
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