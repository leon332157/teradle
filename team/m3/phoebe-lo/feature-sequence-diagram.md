## Feature Sequence Diagram

**Feature Description:**
The `Display Quiz Session Details` feature dynamically adds HTML elements to show session details once a quiz session is created. This includes displaying the quiz name, the generated session PIN (Session ID), and the number of people joined, which starts at 0 and can be incremented as participants join. For initial testing, the participant count can be mocked as static data.

**Team Collaboration:**
This feature is part of the "Running and Starting Quiz" feature, which I collaborated with Eric Sun.
I individually developed the sub-features: "Display Quiz Session Details" and  "Start Button".

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant JavaScript
    participant Server

    User ->> Frontend: Views session details
    Frontend ->> JavaScript: Trigger event on session creation
    JavaScript ->> Server: Fetch session details (quiz name, PIN)
    Server -->> JavaScript: Return session details (quiz name, PIN)
    JavaScript ->> Frontend: Display session details (quiz name, PIN)
    Frontend -->> User: Show session details on UI

    User ->> Frontend: Views number of participants (initially mocked as 0)
    Frontend -->> JavaScript: Mock participant count

    User ->> Frontend: Clicks "Start" button
    Frontend ->> JavaScript: Trigger redirect event with session PIN
    JavaScript ->> Frontend: Redirect to questions page (/questions?pin=12345)
    Frontend -->> User: Display questions page
