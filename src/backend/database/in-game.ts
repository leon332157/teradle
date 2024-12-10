import { Question, Quiz, QuizDatabase, } from './quiz';
import { getPlayerDatabase, getQuizDatabase, getSessionDatabase } from '.';
import { SessionDatabase } from './session';
import { Player } from './player';


export type Game = {
  sessionId: number; // the unique session id
  participants: Player[]; // list of participants
  questions: Question[]; // list of questions loaded from quiz database
  currentQuestion: number; // index of the current question
  isStarted: boolean; //flag to indicate if the game has started
}

export type Answer = {
  questionIndex: number; // the index of the question
  index: number; // the index of the answer
  time: number; // the time taken to answer
  PlayerName: string; // the name of the player
}

/*
    * This class is responsible for managing the game state.
    * It keeps track of the active sessions and their state.
*/
export class GameController {
  /**
  * Create a new session for the given quiz id 
  * @param {number} quizId - the id of the quiz to create a session for
  * @returns Game - the created game object or Error if the quiz is not found
  */
  async createSession(quizId: number): Promise<number> {
    const quizDatabase = getQuizDatabase();
    const quizObj = await quizDatabase.getQuiz(quizId);
    if (!quizObj) {
      console.error('[Game Controller][Create Session] Quiz not found');
      return -1;
    }

    const sessionDatabase = getSessionDatabase();
    return await sessionDatabase.createSession(quizObj.id);
  }

  /**
   * Get game object for the given session id
   * @param {number} sessionId - the id of the session
   * @returns Game - the game object or undefined if not found
  */
  async getSession(sessionId: number): Promise<Game | undefined> {
    const sessionDatabase = getSessionDatabase();
    const userDatabase = getPlayerDatabase();
    const quizDatabase = getQuizDatabase();
    const quizID = await sessionDatabase.getQuizId(sessionId);
    if (quizID === -1) {
      return undefined;
    }
    const quizObj = await quizDatabase.getQuiz(quizID);
    const participants = await userDatabase.getPlayersForSession(sessionId);
    const game: Game = {
      sessionId: sessionId,
      participants: participants,
      questions: quizObj.questions,
      currentQuestion: await sessionDatabase.getCurrentQuestionNumber(sessionId),
      isStarted: false
    }
    if (game.currentQuestion !== -1) {
      game.isStarted = true;
    }
    return game;
  }

  /**
  * Starting the specified session by setting the current question to 0
  * @param {number} sessionId the id of the session
  * @returns true if successful, false otherwise
  */
  startSession(sessionId: number): Promise<boolean> {
    const sessionDatabase = getSessionDatabase();
    return sessionDatabase.incrementCurrentQuestion(sessionId);
  }

  /**
   * End the session and remove it from the active sessions
   * @param {number} sessionId - the id of the session
   * @returns boolean - true if the session was ended, false otherwise
   */
  async endSession(sessionId: number): Promise<boolean> {
    const sessionDatabase = getSessionDatabase();
    return await sessionDatabase.deleteSession(sessionId);
    // return this.#activeSessions.delete(sessionId);
  }

  /**
   * Add a participant to the session
   * @param {number} sessionId - the id of the session
   * @param {Participant} participant - the participant to add
   * @returns boolean - true if the participant was added, false otherwise
   */
  async addParticipant(sessionId: number, name: string): Promise<boolean> {
    const playerDatabase = getPlayerDatabase();
    return await playerDatabase.addPlayer(sessionId, name);
  }

  /**
   * Get the current question for the session
   * @param {number} sessionId - the id of the session
   * @returns Question - the current question or undefined if not found, answer is set to -1
   */
  async getCurrentQuestion(sessionId: number): Promise<Question | null> {
    const sessionDatabase: SessionDatabase = getSessionDatabase();
    const quizDatabase: QuizDatabase = getQuizDatabase();
    const questionNumber = await sessionDatabase.getCurrentQuestionNumber(sessionId);
    if (questionNumber === -1) {
      return null;
    }
    const quizID = await sessionDatabase.getQuizId(sessionId);
    const question = await quizDatabase.getQuestion(quizID, questionNumber);
    question.answer = -1;
    return question;
  }

  /**
   * Advance to the next question in the session
   * @param {number} sessionId - the id of the session
   * @returns Question - the next question or undefined if not found
   */
  async nextQuestion(sessionId: number): Promise<boolean> {
    const sessionDatabase: SessionDatabase = getSessionDatabase();
    return await sessionDatabase.incrementCurrentQuestion(sessionId);
  }

  /**
   * Record the answer for a participant in the session and update score
   * @param {number} sessionId - the id of the session
   * @param {number} participantId - the id of the participant
   * @param {string} answer - the answer to record
   * @returns boolean - true if the answer was recorded, false otherwise
   */
  async recordAnswer(sessionId: number, answer: Answer): Promise<{ isCorrect: boolean, correctIdx: number }> {
    const playerDatabase = getPlayerDatabase();
    const quizDatabase = getQuizDatabase();
    const sessionDatabase = getSessionDatabase();
    const quizID = await sessionDatabase.getQuizId(sessionId);
    const question = await quizDatabase.getQuestion(quizID, answer.questionIndex);
    const isCorrect = question.answer === answer.index;
    if (isCorrect) {
      await playerDatabase.increasePlayerScore(sessionId, answer.PlayerName, (question.timeLimit - answer.time) * 100);
    }
    return { isCorrect, correctIdx: question.answer };
  }
}