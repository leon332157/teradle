## Feature Sequence Diagram

**Feature Description:**
This feature is a "Game PIN System" that players join a game by entering a unique game PIN provided by the host, allowing easy participation without creating an account.


**Team Collaboration:**
This feature was implemented individually by Yunhee. No collaboration was involved.

```mermaid
sequenceDiagram
    participant U as User
    participant UI as User Interface
    participant API as Server API
    participant Alert as Alert Box

    U->>UI: Enters Game PIN and name
    U->>UI: Clicks Join button
    UI->>API: Sends API request to validate Game PIN
    API-->>UI: Responds with validation result
    alt Validation Success
        UI->>Alert: Show success message
        Alert-->>U: "You have joined <quizname>"
    else Validation Fail
        UI->>Alert: Show error message
        Alert-->>U: "Error: Incorrect PIN or other issues"
    end
