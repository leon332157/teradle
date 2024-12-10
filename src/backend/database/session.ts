import { join } from 'path';
import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export type Session = {
  id: number; // unique id of the session
  quizId: number; // the id of the quiz that is being played
  currentQuestion: number; // The index of the current question
}

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: join(__dirname, '..', '..', '..', 'database', 'session.db')
});

class SessionModel extends Model<InferAttributes<SessionModel>, InferCreationAttributes<SessionModel>> {
  declare id: CreationOptional<number>;
  declare quizId: number;
  declare currentQuestion: number;
}

SessionModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  quizId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  currentQuestion: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'session'
});

export class SessionDatabase {

  constructor() {
    this.init().catch(e => console.error("[Session Database] Error initializing database", e));
  }

  async init() {
    await sequelize.authenticate();
    await sequelize.sync();
  }

  /*
  * Check if a session exists by its id
  * @param id the id of the session
  * @returns true if the session exists, false otherwise
  */
  async doesSessionExist(id: number): Promise<boolean> {
    const sessionFound = await SessionModel.count({
      where: { id: id }
    }) !== 0;

    return sessionFound;
  }

  /**
  * Create a new session for the given quiz id
  * @param quizId the id of the quiz to create a session for
  * @returns true if successful, false otherwise
  */
  async createSession(quizId: number): Promise<number> {
    const sessionId = Math.floor(Math.random() * 1000000);
    const newSessionSql = SessionModel.build({
      id: sessionId,
      quizId: quizId,
      currentQuestion: -1 // -1 means the session has not started yet
    });
    try {
      await newSessionSql.save();
      return sessionId;
    }
    catch (e) {
      console.error("[Session Database] Error saving session to database", e);
      return -1;
    }
  }

  /**
   * Get the quiz id for the given session
   * @param sessionid the id of the session
   */
  async getQuizId(sessionid: number): Promise<number> {
    const quizId: number = await SessionModel.findOne({
      attributes: ['quizId'],
      where: {
        id: sessionid
      }
    }).then((session: SessionModel | null) => session?.quizId ?? -1)
      .catch((reason: any) => {
        console.log(reason);
        return -1;
      });

    return quizId;
  }

  /**
  * Get the current question for the session
  * @param {number} id the id of the session
  * @returns the question object
  */
  async getCurrentQuestionNumber(id: number): Promise<number> {
    const currentQuestion: number = await SessionModel.findOne({
      attributes: ['currentQuestion'],
      where: {
        id: id
      }
    }).then(
      (session) => {
        if (session === null) {
          console.error("[Session Database][Get Curr question num] Session not found");
          return -1;
        } else {
          return session.currentQuestion
        }
      }).catch(
        (reason: any) => {
          console.log(reason);
          return -1;
        }
      );

    return currentQuestion;
  }

  /**
  * increment the current question for the session
  * @param {number} id the id of the session
  * @returns true if successful, false otherwise
  */
  async incrementCurrentQuestion(id: number): Promise<boolean> {
    return SessionModel.update({
      currentQuestion: sequelize.literal(`currentQuestion + 1`)
    }, {
      where: {
        id: id,
      }
    }).then(() => true).catch(() => false);
  }

  /**
  * deletes a quiz by its id
  * @param {number} id the id of the quiz
  * @return true if successful, false otherwise
  */
  async deleteSession(id: number): Promise<boolean> {
    return await SessionModel.destroy({
      where: {
        id: id
      }
    }) !== 0
  }
}