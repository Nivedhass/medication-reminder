const remindersList = document.getElementById('reminders');
const stopButton = document.getElementById('stop-reminder');

let activeUtterance = null;
let intervalId = null; 

document.getElementById('set-reminder').addEventListener('click', function() {
    const reminderTime = document.getElementById('reminder-time').value;
    const reminderDays = parseInt(document.getElementById('reminder-days').value, 10);

    if (reminderTime && reminderDays > 0) {
        const reminder = {
            time: reminderTime,
            days: reminderDays
        };

        addReminder(reminder);
        scheduleReminder(reminder);
    } else {
        document.getElementById('status').innerText = 'Please select a valid time and number of days.';
    }
});

stopButton.addEventListener('click', function() {
    stopAlert();
});

function addReminder(reminder) {
    const li = document.createElement('li');
    li.className = 'reminder-item';
    li.innerHTML = `
        Reminder set for ${reminder.time} (For ${reminder.days} days)
        <span class="remove-reminder" onclick="removeReminder(this)">x</span>
    `;
    remindersList.appendChild(li);
}

function removeReminder(element) {
    const li = element.parentElement;
    remindersList.removeChild(li);
}

function scheduleReminder(reminder) {
    const [hours, minutes] = reminder.time.split(':').map(Number);
    const now = new Date();
    const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    if (reminderTime < now) {
        // If the time is already passed today, set it for tomorrow
        reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const timeDifference = reminderTime.getTime() - now.getTime();

    setTimeout(function() {
        startContinuousAlert('It\'s time to take your medication.', reminder.days);
    }, timeDifference);
}

function startContinuousAlert(text, days) {
    if ('speechSynthesis' in window) {
        intervalId = setInterval(function() {
            activeUtterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(activeUtterance);
        }, 3000); // Repeat every 3 seconds (adjust as needed)

        stopButton.style.display = 'block'; // Show the stop button when an alert is active

        // Remove the reminder after the specified number of days
        setTimeout(() => {
            stopAlert();
        }, days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
    } else {
        alert('Sorry, your browser does not support text-to-speech.');
    }
}

function stopAlert() {
    if (intervalId) {
        clearInterval(intervalId); // Stop the alert loop
        intervalId = null;
    }

    if (activeUtterance) {
        window.speechSynthesis.cancel(); // Stop the current speech
        activeUtterance = null;
    }

    stopButton.style.display = 'none'; // Hides the stop button after stopping the alert
}
