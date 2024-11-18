# Application Features

## Quiz Creation and Customization
Users can create custom quizzes by adding multiple types of questions, such as multiple choice, true/false. Each question can include multimedia elements like images, videos, or audio to enhance the learning experience. Hosts can set time limits for each question to control the pacing of the quiz.
- Quiz name: `<input>` (1pt)
- Questions List: (2pts)
  - Individual question: `<li><p id="number"></p><p id="name"></p><button id="delete-question"></button></li>`
- Add Question Pop-Up (Multiview): `<button>` (4pts)
  - Question Type: `<input type="radio">` (true/false, multiple choice; onchange event edits HTML for number of answers)
  - Time Limit: `<input>` (max: 60 seconds, min: 10 seconds)
  - Answers:
    - Correct answer is always the first item in the list.
    - Single answer with color: `<li onclick="checkAnswer(true/false)"><div id="answer"></div></li>`

**Assigned to**: Sid, Ethan


## Running and Starting Quiz
Hosts can manage and start quizzes, create unique sessions, and display relevant quiz details in real-time.
- Fetch a List of All Quizzes: JS parses and adds to the HTML list (2pts)
  - Each quiz item: `<li>Name, created by <button>Create PIN</button></li>` (1pt)
- Create PIN: Makes a call to the server to create a session for the quiz (2pts)
- Display Session Details (once created, add HTML elements to display details based on the unique session PIN): (3pts)
  - Name of quiz
  - PIN (session ID); for demo: generate a random number; in production: call the server
  - Number of people joined
- Start button to redirect to the questions path (1pt)

**Assigned to**: Eric, Phoebe


## In-Game Page
Players join live game sessions using a game PIN. Questions are sent in real-time, and participants submit answers through their devices. Immediate feedback is provided for each question.
- Question num `<p>`, time left `<p>`, timer will be pure js, fetch question information from API /quiz/`<sid>`/`<qid>` (2pts)
- Answer List for Instructors (students see buttons only; displayed by shape and color) (3pts)
  - On Answer Selection: Trigger JS code to store the answer
  - After Timer Expires: Display the correct answer and answer distribution; show correctness on the student's page (3pts)

**Assigned to**: Leon


## Leaderboard and Scoring
Players are scored based on speed and accuracy, with faster correct answers earning more points. A live leaderboard is displayed after each question, showing participants' ranks and progress. (3pts)
- Fetch and Display Leaderboard:
  - Fetch data (name, score) from the backend
  - Sort in descending order by score and display on screen (2pts)
  - Instructor version includes a "Next" button

**Assigned to**: Selena


## Multiplayer Mode: Core feature
Multiplayer mode allows participants to compete in real-time, with the game dynamically adjusting the difficulty based on player count and performance to create a competitive environment.

**Assigned to**: Leon


## Game PIN System
Players join a game by entering a unique game PIN provided by the host, allowing easy participation without creating an account.
- Inputs:
  - Game PIN: `<input>`
  - Name: `<input>` (3pts)
- Join Button: `<button>` that makes an API request to join the session
  - Alert error if the code is incorrect or other issues occur
  - Alert success and switch the page to "You have joined `<quizname>`"

**Assigned to**: Yunhee
