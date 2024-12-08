import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

export type Question = {
    id: number;
    type: "multiple" | "single"; // multiple: multiple choice, single: single choice
    question: string;
    options: string[]; // list of options
    answer: number; // index of the correct answer
}

export type Quiz = {
    id: number;
    name: string;
    description: string;
    questions: Question[];
}

export class QuizDatabase {
    #quizList: Quiz[] = [];
    #jsonPath = join(__dirname, '..', '..', '..', 'quiz.json');

    constructor() {
        this.#quizList = this.load();
    }

    /*
    * Load the quiz list from the json
    * @returns the quiz list
    */
    load(): Quiz[] {
        try {
            console.debug("[Quiz Database] Loading from", this.#jsonPath);
            const data = readFileSync(this.#jsonPath, 'utf-8');
            return JSON.parse(data);
        } catch (e) {
            console.error("[Quiz Database] Loading failed", e);
            return [];
        }
    }
    /*
    * Flush the quiz list to the json
    * @returns true if successful, false otherwise
    */
    flush(): boolean {
        try {

            console.debug("[Quiz Database] Flushing to", this.#jsonPath);
            writeFileSync(this.#jsonPath, JSON.stringify(this.#quizList));
            return true;
        } catch (e) {
            console.error("[Quiz Database] Flushing failed", e);
            return false;
        }
    }

    /*
    * Get a quiz by its id
    * @param id the id of the quiz
    * @returns the quiz with the given id, null if not found
    */
    getQuiz(id: number): Quiz | null {
        if (this.#quizList.length === 0) {
            return null;
        }
        if (this.#quizList[id]) {
            return this.#quizList[id];
        }
        return null;
    }
}