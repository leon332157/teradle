# Application Data 

##  Overview

### 1. User Profile

- **Description**: Stores essential information about users, for both students and instructors.
- **Attributes**:
  - `user_id` (string): A unique identifier for each user.
  - `name` (string): The user's full name.
  - `email` (string): The user's email address.
  - `password` (string): A hashed version of the user's password.
  - `role` (string): Specifies whether the user is a student or an instructor. 
  - `created_at` (timestamp): The date and time when the account was 
    created.
  - `updated_at` (timestamp): The last time the user's profile was updated.
- **Data Source**: User-input data when registering or updating their profile.

### 2. Quiz

- **Description**: Represents quizzes created by instructors.
- **Attributes**:
  - `quiz_id` (string): A unique identifier for the quiz.
  - `title` (string): The title of the quiz.
  - `description` (string): A brief description of the quiz.
  - `instructor_id` (string): The `user_id` of the instructor who created the quiz.
  - `created_at` (timestamp): The creation date and time of the quiz.
  - `updated_at` (timestamp): The last modification date and time of the quiz.
- **Data Source**: Instructor input through the quiz creation interface.

### 3. Question

- **Description**: Contains the questions for each quiz.
- **Attributes**:
  - `question_id` (string): A unique identifier for each question.
  - `quiz_id` (string): The identifier of the quiz to which the questions belongs.
  - `text` (string): The actual text of the question.
  - `created_at` (timestamp): The date and time the question was created.
  - `updated_at` (timestamp): The date the time the question was last updated.
- **Data Source**: Instructor input during the quiz creation or updating process.

### 4. Answer

- **Description**: Stores possible answers to each question, marking the correct one.
- **Attributes**:
  - `answer_id` (string): A unique identifier for each answer.
  - `question_id` (string): The identifier of the question this answer relates to.
  - `text` (string): The text of the answer.
  - `is_correct` (boolean): Indicates whether this answer is the correct choice.
  - `created_at` (timestamp): The date and time when the answer was created.
  - `updated_at` (timestamp): The date and time when the answer was last updated.
- **Data Source**: Instructor input through the quiz and question creation interface.

### 5. Quiz Session

- **Description**: Records instances where students take a quiz, tracking their answers and scores.
- **Attributes**:
  - `session_id` (string): The unique identifier for each session.
  - `quiz_id` (string): The identifier of the quiz being taken.
  - `student_id` (string): The `user_id` of the student taking the quiz.
  - `score` (int): The total score the student achieved in the quiz.
  - `start_time` (timestamp): The start time of the quiz session.
  - `end_time` (timestamp): The end time of the quiz session.
- **Data Source**: System-generated as students participate in quizzes.

### 6. Real-Time Interactions

- **Description**: Records the interactions during a live quiz session, such as time taken to answer each question, which can be used for analytics and improving the interactive aspect of quizzes.
- **Attributes**:
  - `interaction_id` (string): The unique identifier for each interaction.
  - `session_id` (string): The identifier of the session where the interaction occurred.
  - `question_id` (string): The identifier of the question being answered.
  - `student_id` (string): The `user_id` of the student involved in the interaction.
  - `answer_id` (string): The identifier of the answer selected by the student.
  - `response_time` (int): Time in seconds taken by the student to respond.
- **Data Source**: System-generated as students answer questions in real-time.

## Data Relationships

- **User to Quiz**: One-to-many relationship (instructors can create multiple quizzes).
- **Quiz to Question**: One-to-many relationship (each quiz contains multiple questions).
- **Question to Answer**: One-to-many relationship (each question can have multiple answers).
- **User to Quiz Session**: One-to-many relationship (students can participate in multiple quiz sessions).
- **Quiz Session to Real-Time Interaction**: One-to-many relationship (a session can have multiple interactions, as each student's response to each question is recorded).
- **User to Real-Time Interaction**: Many-to-one relationship (multiple interactions can be associated with a single student during various quiz sessions).

## Data Sources

- **User-Input Data**: Captured directly from users when registering, updating profiles, creating quizzes, entering questions and answers, and during quiz participation.
- **System-Generated Data**: Includes records from quiz sessions, scores, and detailed logs of real-time interactions during quizzes. This data is automatically captured as users interact with quizzes, providing real-time feedback.