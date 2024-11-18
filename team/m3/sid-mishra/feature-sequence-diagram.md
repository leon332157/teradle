## Feature Sequence Diagram

**Feature Description:**
The "Add Question" feature allows users to contribute new questions to the quiz. Users interact with a popup window to provide the question text, choose a type (True/False or Multiple Choice), set a time limit, and specify answer options. The system ensures all required fields are correctly completed before enabling the "Save Question" option. Once the question is saved, it is appended to the list of questions, and the input fields are cleared for future use.

**Team Collaboration:**
This feature was implemented in coordination with Eungyu Shim.


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