import { join } from 'path';
import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export type Session = {
  id: number; // unique id of the session
  quizId: number; // the id of the quiz that is being played
  currentQuestion: number;
}

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: join(__dirname, '..', '..', '..', 'session.db')
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
    autoIncrement: true
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

  async doesSessionExist(id: number): Promise<boolean> {
    const sessionFound = await SessionModel.count({
      where: { id: id }
    }) !== 0;

    // return sessionFound;
    return true;
  }

  async createSession(quizId: number): Promise<boolean> {
    const newSessionSql = SessionModel.build({
      quizId: quizId,
      currentQuestion: 0
    });
    try {
      await newSessionSql.save();
      return true;
    }
    catch (e) {
      console.error("[Session Database] Error saving session to database", e);
      return false;
    }
  }

  async getQuizId(id: number): Promise<number> {
    const quizId: number = await SessionModel.findOne({
      attributes: ['quizId'],
      where: {
        id: id
      }
    }).then((session: SessionModel | null) => session?.quizId ?? -1)
      .catch((reason: any) => {
        console.log(reason);
        return -1;
      });

    return quizId;
  }
  /*
  * Get the current question for the session
  * @param id the id of the session
  * @returns the question object
  */
  async getCurrentQuestionNumber(id: number): Promise<number> {
    const currentQuestion: number = await SessionModel.findOne({
      attributes: ['currentQuestion'],
      where: {
        id: id
      }
    }).then(
      (session: SessionModel | null) => session?.currentQuestion ?? -1
    ).catch(
      (reason: any) => {
        console.log(reason);
        return -1;
      }
    );

    return currentQuestion;
  }

  async incrementCurrentQuestion(id: number): Promise<boolean> {
    return SessionModel.update({
      currentQuestion: sequelize.literal(`currentQuestion + 1`)
    }, {
      where: {
        id: id,
      }
    }).then(() => true).catch(() => false);
  }

  /*
  * deletes a quiz by its id
  * @param id the id of the quiz
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