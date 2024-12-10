import { join } from 'path';
import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export type Player = {
  sessionId: number; // the id of the session
  name: string; // the name of the player
  score: number; // the score of the player
}

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: join(__dirname, '..', '..', '..', 'database', 'player.db')
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

  /**
  * Add a player to the database
  * @param sessionId : the id of the session
  * @param name : the name of the player
  * @return true if successful, false otherwise
  * 
  */
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

  /**
  * Get the top N players for a session sorted by highest score
  * @param sessionId : the id of the session
  * @param n : the number of players to get
  * @return an array of objects with the player name and score
  */
  async getTopNPlayers(sessionId: number, n: number): Promise<{ playerName: string, score: number }[]> {
    const playersAndScores = await PlayerModel.findAll({
      attributes: ['name', 'score'],
      limit: n,
      order: [['score', 'DESC']],
      where: { sessionId: sessionId }
    })

    return playersAndScores.reduce((acc: { playerName: string, score: number }[], player: PlayerModel) => {
      acc.push({ playerName: player.name, score: player.score });
      return acc;
    }
      , []);
  }

  /**
  * Get all players for a session
  * @param sessionId : the id of the session
  * @return an array of player names
  */
  async getPlayersForSession(sessionId: any): Promise<Player[]> {
    try {
      const players = await PlayerModel.findAll({
        attributes: ['name'],
        where: { sessionId },
      });
      return players.reduce((acc: Player[], player: PlayerModel) => {
        acc.push(player as Player);
        return acc;
      }, []);
    } catch (e) {
      console.error(e)
    };
    return []
  }

  /**
  * Get a players score
  * @param sessionId : the id of the session
  * @param name : the name of the player
  * @return the score of the player, -1 if not found
  */
  async getPlayerScore(sessionId: number, name: string): Promise<number> {
    const playerScore = await PlayerModel.findOne({
      attributes: ['score'],
      where: {
        sessionId: sessionId,
        name: name
      }

    })
    if (!playerScore) {
      return -1;
    }
    return playerScore.score;
  }

  /**
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

  /**
  * set a players score to some amount
  * @param sessionId : the id of the quiz
  * @param name : the name of the player
  * @param score : the amount the score should be set to
  * @return true if successful, false otherwise
  */
  async adjustPlayerScore(sessionId: number, name: string, score: number): Promise<boolean> {
    return PlayerModel.update({
      score: score
    }, {
      where: {
        sessionId: sessionId,
        name: name
      }
    }).then(() => true).catch(() => false);
  }

  /**
  * deletes all players in the session
  * @param session id : the id of the session
  * @return true if any players deleted, false otherwise
  */
  async deletePlayers(sessionId: number) {
    return await PlayerModel.destroy({
      where: {
        sessionId: sessionId
      }
    }) != 0;
  }
}
