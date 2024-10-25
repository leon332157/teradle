# Application Features

## Quiz Creation and Customization

Users can create custom quizzes by adding multiple types of questions, such as multiple choice, true/false. Each question can include multimedia elements like images, videos, or audio to enhance the learning experience. Hosts can set time limits for each question to control the pacing of the quiz.
Page elements:
  - quiz name <input> 1pt
  - questions <list> 2pts
    - indiviual question <li><p id = "number"></p><p id = "name"></p><button id = "delete-question"></li>
  - add question pop up, multiview <button> 4pts
    - question type <input type = "radio" >1. true/false 2. multi onchange: edit the html for number of answers
    - time limit <input> max should be 60, min should be 10
    - answers<list>
      - correct answer is always the first item in the list
      - single answer, has color <li onclick = "checkAnswer(true) or false for correct answer"> <div id = 'answer'>

**Assigned to**: Sid, Ethan

## Running and starting quiz
- fetch a list of all quizzes, JS parse and add to html list 2pts
  - each quiz item <li> name, created by who and <button> create pin 1pts
  - create pin will make call to server to create a session for this quiz 2pts
  - Once created, add html elements to display details such as, fetching based on the pin, which is unique session id 3pts
    - name of quiz 
    - pin(session id) for demo generate random number, eventually calling server
    - num ppl joined
    - start button, redirect to questions path
  
**Assigned to**: Eric, Phoebe


## In game page

Players can join live game sessions using a game PIN provided by the host. The quiz is presented in real-time, with questions being pushed to all participants at the same time. Players submit answers through their devices, and real-time feedback is provided for each question.
- Question num <p>, time left<p>, timer will be pure js, fetch question information from API /quiz/<sid>/<qid> 2pts
- Add list of answers on instructors page,for student button only, based on shape and color 3pts
  - when answer selected, trigger JS code to store the answer
  - after timer expires, show correct answer, answer distribution; show correctness on student's page 3pts 
**Assigned to**: Leon

## Leaderboard and Scoring

Players are scored based on both speed and accuracy, with faster correct answers earning higher points. After each question, a live leaderboard is displayed to all participants, showing their rank and progress compared to others. 3pts
- Fetch leaderboard from backend name, score
  - sort descending based on score, display bar on screen 2pts
  - for instructors version, next question button
**Assigned to**: Selena

## History and Review of Previous Quizzes

Players can access their quiz history to review past performance. This includes a breakdown of the answers they provided, which questions they got right or wrong, and their overall scores. This feature helps users reflect on their progress and learning over time.

**Assigned to**: None for now

## Chat Functionality

Participants can engage with the host and other players through a real-time chat interface during the quiz. This enhances interaction, allowing users to discuss questions, clarify answers, and build engagement.

**Assigned to**: None for now

## Multiplayer Mode: Core feature

In multiplayer mode, participants can compete against each other in real-time. The game dynamically adjusts the difficulty level based on the number of players and their performance. This ensures a fun and competitive environment.

**Assigned to**: Leon

## Game PIN System

To join a game, players simply enter a unique game PIN provided by the host. This makes it easy for players to participate in quizzes without needing to create accounts, making the platform more accessible for quick, casual play.
- Input for pin, input for name both <input> 3pts
- Join button <button> make API request to join the sesssion
  - alert error if code wrong, any other stuff
  - alert success, swap page to "You have joined <quizname>"
**Assigned to**: Yunhee

