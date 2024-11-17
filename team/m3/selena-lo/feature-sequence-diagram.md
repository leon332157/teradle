## Feature Sequence Diagram

**Feature Description:**
The `Leaderboard and Scoring` feature dynamically updates the leaderboard based on players' scores. The feature fetches scores from the server, sorts them in descending order by score, and displays the results on the frontend. The instructor version includes a "Next" button to proceed to the next question.

```mermaid
sequenceDiagram
  participant User
  participant Frontend
  participant JavaScript
  participant Server

  User->>Frontend: Views leaderboard
  Frontend->>JavaScript: Trigger sorting event on page load (DOMContentLoaded)
  JavaScript->>Server: Fetch leaderboard data (name, score)
  Server-->>JavaScript: Return player data (name, score)
  JavaScript->>JavaScript: Sort players by score (descending)
  JavaScript->>Frontend: Update leaderboard UI with sorted scores
  Frontend-->>User: Display updated leaderboard
  User->>Frontend: Clicks "Next" button
  Frontend->>JavaScript: Trigger event for next question
  JavaScript->>Server: Request next question data
  Server-->>JavaScript: Return next question data
  JavaScript->>Frontend: Update frontend to show the next question
  Frontend-->>User: Display the next question