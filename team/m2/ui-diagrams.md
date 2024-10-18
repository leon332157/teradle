# UI Diagrams

## Main Dashboard Screen

The **Main Dashboard** is the first screen users will see after logging into the application. The layout is designed to provide a quick overview of the user’s financial health, with a clean and simple interface that makes it easy to understand at a glance. The dashboard will display the total amount spent for the current month, a breakdown of expenses by category (such as groceries, utilities, and entertainment), and the user’s progress toward any active savings goals.

![Main Dashboard Placeholder](https://via.placeholder.com/400x300.png?text=Main+Dashboard+UI)

On this screen, users can interact with three main elements:

1. **Spending Overview**: A pie chart that visually represents the user's spending across different categories. Hovering over each slice of the pie will display the exact amount spent in that category, giving users a detailed breakdown without overwhelming them with numbers.
2. **Savings Goals Progress Bar**: Below the pie chart, there will be a progress bar showing the user’s progress toward their savings goal. This element provides a quick visual indicator of how close the user is to achieving their goal.
3. **Expense Log Button**: A prominent button labeled “Log Expense” will be located at the top right of the dashboard. Clicking this button will take users to the **Expense Logging Screen**, where they can add new expenses.

This screen is designed to be the central hub of the user’s experience, providing them with a high-level view of their financial status while also offering easy access to more detailed information. 

**Use Case**: 

A user who wants to quickly check their spending for the month would log into the application and immediately see their total spending for the month and the breakdown by category. If they notice that their spending in the "Dining Out" category is higher than expected, they can decide to cut back on that category in the upcoming weeks.

## Expense Logging Screen

The **Expense Logging Screen** is designed to be simple and intuitive, allowing users to quickly input their financial transactions. The screen will consist of a form where users can enter details such as the amount spent, the category (which can be selected from a dropdown menu), the date of the transaction, and an optional note to provide more context for the expense. 

![Expense Logging Placeholder](https://via.placeholder.com/400x300.png?text=Expense+Logging+UI)

The layout of this screen is kept minimal to avoid overwhelming the user. The form will be centered on the screen, with clearly labeled fields and a prominent "Save Expense" button at the bottom. After entering an expense, users can either choose to log another expense or return to the **Main Dashboard**.

The form also includes input validation to ensure that all required fields are completed before submission. If any required fields are missing, the user will receive an error message prompting them to correct the issue.

**Use Case**: 

A user who just paid for groceries would navigate to this screen, select “Groceries” from the category dropdown, enter the amount spent, and optionally add a note such as “Weekly shopping.” After saving the expense, the user is taken back to the **Main Dashboard** where the total for the month is updated to reflect the newly logged transaction.

## Savings Goals Screen

![Savings Goals Placeholder](https://via.placeholder.com/400x300.png?text=Savings+Goals+UI)

The **Savings Goals Screen** allows users to create and track savings goals, providing an interface where they can enter the goal amount, set a target date for achieving the goal, and monitor their progress over time. The layout includes a simple form for adding new goals, as well as a list of current goals with a progress bar for each.

Each goal in the list will display the goal name, the total amount to be saved, the amount already saved, and a progress bar showing how close the user is to reaching their goal. Users can click on any goal to view more detailed information or edit the goal if necessary.

This screen is designed to motivate users to stay on track with their financial goals by giving them a clear visual representation of their progress.

**Use Case**: 

A user planning for a vacation can navigate to the **Savings Goals Screen**, create a new goal with a target savings amount of $1,500, and set a target date for six months from now. As the user logs more savings, the progress bar will update, helping the user stay motivated as they see their progress toward the vacation goal.
