# medication-reminder

Medication Reminder Web Application

Overview
I have designed this to help senior citizens and their family members manage medication reminders effectively. The application provides a simple and intuitive user interface where family members can set multiple medication alerts, specify the number of days for each alert, and ensure that the alerts persist until manually stopped. Additionally, users can remove reminders at any time.

Features

Multiple Reminders: Users can set multiple medication reminders with specific times and durations (number of days).
Voice Alerts: Each reminder triggers a voice alert that repeats until the "Stop Alert" button is pressed.
Custom Duration: Users can specify the number of days for which the reminder should be active.
Remove Reminders: Users can remove any active reminder at any time, providing flexibility in managing medication schedules.
User-Friendly Interface: The interface is simple and accessible, making it easy for family members to manage reminders for their senior loved ones.
User Interface
The user interface consists of the following key components:

Time Input: Users can set the time for the medication alert.
Days Input: Users can specify the number of days the alert should be active.
Set Reminder Button: This button adds the reminder to the list and schedules the voice alert.
Stop Alert Button: This button stops the ongoing voice alert and hides itself when no alerts are active.
Active Reminders List: Displays all active reminders, with an option to remove each reminder.
How It Works
Setting a Reminder:

Select the time for the medication alert.
Enter the number of days the alert should be active.
Click "Set Reminder" to add the reminder to the list.
Voice Alert:

When the reminder time is reached, a voice alert will play repeatedly.
The alert will continue until the "Stop Alert" button is pressed.
Stopping the Alert:

Click the "Stop Alert" button to stop the voice alert immediately.
Removing a Reminder:

Each reminder in the list has a "Remove" option that allows users to delete the reminder before its scheduled end.
Technical Details
HTML/CSS: The application’s user interface is built using standard HTML and CSS for layout and styling.
JavaScript: The core functionality, including time-based reminders and voice alerts, is implemented in JavaScript.
Web Speech API: The voice alert feature leverages the Web Speech API to provide real-time voice notifications.
Usage
Open the application in a web browser.
Set the desired medication reminders.
The application will handle alerting the user at the specified times.
Manage the alerts by stopping or removing them as needed.
Conclusion
This medication reminder web application is tailored to help families ensure that their senior loved ones adhere to their medication schedules. The combination of voice alerts and customizable reminders makes it an effective tool for daily health management.
