type Question = {
    id: number;
    type:"multiple" | "single"; // multiple: multiple choice, single: single choice
    question: string; 
    options: string[]; // list of options
    answer: number; // index of the correct answer
}

type QuizList = {
    id: number;
    name: string;
    description: string;
    questions: Question[];
}