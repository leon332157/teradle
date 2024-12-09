import { join } from 'path';
import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export type Player = {
  sessionId: number; // unique id of the quiz
  name: string;
  score: number;
}

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: join(__dirname, '..', '..', '..', 'player.db')
});

class PlayerModel extends Model<InferAttributes<PlayerModel>, InferCreationAttributes<PlayerModel>> {
  declare sessionId: number;
  declare name: string;
  declare score: CreationOptional<number>;
}

PlayerModel.init({
  sessionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'player'
});

export class PlayerDatabase {

  constructor() {
    this.init().catch(e => console.error("[Player Database] Error initializing database", e));
  }

  async init() {
    await sequelize.authenticate();
    await sequelize.sync();
  }

  async addPlayer(sessionId: number, name: string): Promise<boolean> {
    const newPlayerSql = PlayerModel.build({
      sessionId: sessionId,
      name: name
    });
    try {
      await newPlayerSql.save();
      return true;
    }
    catch (e) {
      console.error("[Player Database] Error saving player to database", e);
      return false;
    }
  }

  async getTopNPlayers(sessionId: number, n: number): Promise<{ playerName: string, score: number }[]> {
    const playersAndScores = PlayerModel.findAll({
      attributes: ['name', 'score'],
      limit: n,
      order: [['score', 'DESC']],
      where: { sessionId: sessionId }
    }).then(
      (players: PlayerModel[]): { playerName: string, score: number }[] => players.map((player: PlayerModel) => {
        return { playerName: player.name, score: player.score };
      })
    ).catch(
      (reason: any) => {
        console.error(reason);
        return [];
      }
    );

    const leaderboard = [
      { playerName: "Kevin", score: 1000 },
      { playerName: "Selena", score: 1 },
      { playerName: "Xiaocong", score: 100000 },
      { playerName: "Phoebe", score: 0 },
      { playerName: "Shuby", score: -1 },
      { playerName: "Jerry", score: -1000 }
    ];

    return leaderboard;
  }

  async getPlayerScore(sessionId: number, name: string): Promise<number> {
    const playerScore = PlayerModel.findOne({
      attributes: ['score'],
      where: {
        sessionId: sessionId,
        name: name
      }
    }).then(
      (player: Player | null) => player?.score ?? -1
    ).catch(
      (reason: any) => {
        console.log(reason);
        return -1;
      }
    );

    return playerScore;
  }

  /*
  * increase a players score by some amount
  * @param sessionId : the id of the quiz
  * @param name : the name of the player
  * @param scoreDelta : the amount the score should change
  * @return true if successful, false otherwise
  */

  async increasePlayerScore(sessionId: number, name: string, scoreDelta: number): Promise<boolean> {
    return PlayerModel.update({
      score: sequelize.literal(`score + ${scoreDelta}`)
    }, {
      where: {
        sessionId: sessionId,
        name: name
      }
    }).then(() => true).catch(() => false);
  }

  /*
  * deletes all players in the session
  * @param session id : the id of the session
  * @return true if any players deleted, false otherwise
  */

  async deleteSession(sessionId: number) {
    return await PlayerModel.destroy({
      where: {
        sessionId: sessionId
      }
    }) != 0;
  }
}