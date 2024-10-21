# UI Diagrams

## Question Screen

The **Question Screen** is the main screen where users answer questions during a quiz round. The layout provides a clear view of the current question, possible answers, the user's score, and the current round number.

![question_screen](https://github.com/user-attachments/assets/f5ab304c-baa8-4ed6-a3de-8ecf1c1394bc)

On this screen, users can interact with the following elements:

1. **Time Bar**: A green bar at the top of the screen represents the remaining time to answer the current question.
2. **Question Prompt**: Displays the quiz question, e.g., "Where can you find the Statue of Liberty?"
3. **Answer Buttons**: Four buttons, color-coded in red, green, blue, and orange, represent the multiple-choice answer options. Players can click one to submit their answer.
4. **Score Display**: Shows the player's current score on the top left.
5. **Round Indicator**: Displays the current question number and total number of questions, e.g., "Round 10/12."

This screen is central to the gameplay, where users will spend most of their time during a quiz.

**Use Case**:  
A user sees the question, "Where can you find the Statue of Liberty?" and selects one of the four possible answers. The green time bar at the top indicates how much time they have left to make their choice.

---

## Correct Answer Feedback Screen

The **Correct Answer Feedback Screen** provides positive reinforcement when the user answers a question correctly.

![correct_answer](https://github.com/user-attachments/assets/8eec3a5d-5cb2-45a0-8ff8-6e407be962f0)

This screen includes:

1. **Green Background**: The background color changes to green to signify the correct answer.
2. **Feedback Message**: A congratulatory message like "Congratulations! You got the correct answer."
3. **Score and Round Information**: The player's score and round information remain visible to keep them updated on their progress.

**Use Case**:  
After selecting the correct answer, the player sees a green background and a message confirming their success. The score and round information are updated to reflect their progress.

---

## Incorrect Answer Feedback Screen

The **Incorrect Answer Feedback Screen** appears when the user selects the wrong answer, providing immediate feedback.

![incorrect_answer](https://github.com/user-attachments/assets/af5a8f51-065f-4a19-97e1-5607ab689848)

Key elements of this screen include:

1. **Red Background**: The screen changes to a red background to indicate an incorrect answer.
2. **Feedback Message**: A message such as "Oops! The correct answer was [C]" informs the player of their mistake.
3. **Score and Round Information**: The player’s score and round information remain visible, unaffected by the incorrect answer.

**Use Case**:  
After submitting an incorrect answer, the player sees a red background and a message revealing the correct answer, allowing them to learn from their mistake before moving on to the next question.

---

## End Game Screen

The **End Game Screen** summarizes the player's performance at the end of the quiz.

![end_game](https://github.com/user-attachments/assets/9b2baacd-391f-4b6f-b1e8-2eab263392ab)

The screen includes:

1. **Final Score**: Displays the total score achieved by the player at the center of the screen.
2. **Ranking**: Shows the player's ranking compared to others who participated in the same quiz.
3. **Correct Answers**: Displays how many questions were answered correctly out of the total number of questions (e.g., "Correct 9/12").
4. **Replay and Exit Buttons**: Options to either replay the quiz or exit to the main menu.

**Use Case**:  
After completing the quiz, the player can see their final score, ranking, and the number of correct answers. They can then choose to replay or exit the game.
