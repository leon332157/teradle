Feature Description: The "Add Question" feature allows users to add a new question to the quiz. This feature includes a popup where users enter the question text, select the question type (True/False or Multiple Choice), set a time limit, and define answer options. The system validates inputs before enabling the "Save Question" button. Once saved, the question is added to the question list, and all inputs are cleared.  
Collaborator: Sid Mishra.

```mermaid
sequenceDiagram
    participant U as User
    participant JS as JavaScript
    participant UI as User Interface
    participant DB as IndexedDB

    U->>UI: Click "Add Question"
    UI->>JS: Trigger "add-question" event
    JS->>UI: Show question popup and overlay

    U->>UI: Enter question text, select question type, set time limit
    UI->>JS: Input validation (on each input)
    JS->>UI: Show/hide error messages and enable/disable "Save Question" button

    U->>UI: Click "Save Question"
    UI->>JS: Trigger "saveQuestion" function
    JS->>JS: Validate question text, time limit, question type
    alt Valid question text and time limit
        JS->>JS: Validate answers based on question type
        alt Valid answers
            JS->>DB: Save question data (question text, type, time limit, answers)
            DB-->>JS: Confirmation of save
            JS->>UI: Add question to question list
            JS->>UI: Renumber questions
            JS->>UI: Clear form and close popup
        else Invalid answers
            JS->>UI: Show answer error messages
        end
    else Invalid question text or time limit
        JS->>UI: Show error messages
    end