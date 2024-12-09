import { join } from 'path';
import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export type Question = {
    id: number;
    type: "multiple" | "single"; // multiple: multiple choice, single: single choice
    question: string; // the question text
    options: string[]; // list of options
    answer: number; // index of the correct answer
    timeLimit: number; // time limit in seconds
}

export type Quiz = {
    id: number; // unique id of the quiz
    name: string; // name of the quiz 
    questions: Question[]; // list of questions
}

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: join(__dirname, '..', '..', '..', 'quiz.db')
});

class QuizModel extends Model<InferAttributes<QuizModel>, InferCreationAttributes<QuizModel>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare questions: Question[];
}

QuizModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    questions: {
        type: DataTypes.JSON, // store as JSON string
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'quiz'
});

export class QuizDatabase {

    constructor() {
        this.init().catch(e => console.error("[Quiz Database] Error initializing database", e));
    }

    async init() {
        await sequelize.authenticate();
        await sequelize.sync();
    }

    async createQuiz(quiz: Quiz): Promise<boolean> {
        const newQuizSql = QuizModel.build({
            name: quiz.name,
            questions: quiz.questions
        });
        try {
            await newQuizSql.save();
            return true;
        }
        catch (e) {
            console.error("[Quiz Database] Error saving quiz to database", e);
            return false;
        }
    }
    
    /*
    * Get a quiz by its id
    * @param id the id of the quiz
    * @returns the quiz with the given id, null if not found
    */
    async getQuiz(id: number): Promise<Quiz> {
        const res = await QuizModel.findByPk(id);
        return res as Quiz;
    }

    /*
    * updates a quiz by its id
    * @param id the id of the quiz
    * @param quiz the quiz object
    * @return true if successful, false otherwise
    */

    updateQuiz(id: number, quiz: Quiz): Promise<boolean> {
        return QuizModel.update({
            name: quiz.name,
            questions: quiz.questions
        }, {
            where: {
                id: id
            }
        }).then(() => true).catch(() => false);
    }

    /*
    * deletes a quiz by its id
    * @param id the id of the quiz
    * @return true if successful, false otherwise
    */

    deleteQuiz(id: number) {
        return QuizModel.destroy({
            where: {
                id: id
            }
        })
    }
}