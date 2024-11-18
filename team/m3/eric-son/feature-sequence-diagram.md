## Feature Description
The `Fetch a List of All Quizzes` and `Create PIN` features utilize HTML, CSS, and Javascript to display a page with a list of stored quizzes. The list includes: Quiz title, Author, and a button to create a randomly generated six digit PIN. Once the 'Create PIN' button is clicked on, it would redirect to another page, displaying a 'Start Quiz' button, the generated PIN (Session ID), and number of players joined. For initial testing, dummy quiz information and demo of people joining has been created. 

## Team Collaboration
For this milestone, I collaborated with Phoebe Lo to work on the 'Running and Starting Quiz' feature.
I was able to develop the sub-features "Fetch list of all quizzes" and "Create PIN".

```mermaid
sequenceDiagram

    participant User
    participant Frontend
    participant JavaScript
    participant Server

    JavaScript ->> Server: Fetch session details (quiz name, Author)
    Server -->> JavaScript: Return session details (quiz name, Author)
    JavaScript ->> Frontend: Display Quiz name, author and Create PIN button
    User ->> Frontend: Clicks on 'Create PIN' button
    Frontend ->> Server: Makes a call to the server to create a session for the quiz
    Server ->> Frontend: Generates random PIN for session ID
    Server ->> Frontend: Redirects to page displaying Start button, PIN (Session ID), and number of people joined
    
    
    
