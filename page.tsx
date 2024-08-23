"use client";

import React, { useState } from 'react';
// import './styles.css'; // Import the CSS file for styling

const MedicationReminder: React.FC = () => {
    const [reminders, setReminders] = useState<{ time: string; days: number }[]>([]);
    const [activeUtterance, setActiveUtterance] = useState<SpeechSynthesisUtterance | null>(null);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const addReminder = (reminder: { time: string; days: number }) => {
        setReminders([...reminders, reminder]);
        scheduleReminder(reminder);
    };

    const removeReminder = (index: number) => {
        setReminders(reminders.filter((_, i) => i !== index));
    };

    const scheduleReminder = (reminder: { time: string; days: number }) => {
        const [hours, minutes] = reminder.time.split(':').map(Number);
        const now = new Date();
        const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

        if (reminderTime < now) {
            reminderTime.setDate(reminderTime.getDate() + 1);
        }

        const timeDifference = reminderTime.getTime() - now.getTime();

        setTimeout(() => {
            startContinuousAlert('It\'s time to take your medication.', reminder.days);
        }, timeDifference);
    };

    const startContinuousAlert = (text: string, days: number) => {
        if ('speechSynthesis' in window) {
            const interval = setInterval(() => {
                const utterance = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(utterance);
                setActiveUtterance(utterance);
            }, 3000);

            setIntervalId(interval);

            setTimeout(() => {
                stopAlert();
            }, days * 24 * 60 * 60 * 1000);
        } else {
            alert('Sorry, your browser does not support text-to-speech.');
        }
    };

    const stopAlert = async () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }

        if (activeUtterance) {
            window.speechSynthesis.cancel();
            setActiveUtterance(null);
        }

        // Send SMS alert
        try {
            const response = await fetch('/api/alert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber }),
            });

            if (response.ok) {
                alert('SMS alert sent successfully!');
            } else {
                alert('Failed to send SMS alert.');
            }
        } catch (error) {
            console.error('Failed to send SMS:', error);
            alert('Error sending SMS alert.');
        }
    };

    return (
        <div className="container">
            <h1>Medication Reminder</h1>
            <div className="form">
                <input type="time" id="reminder-time" className="input" placeholder="Set Time" />
                <input type="number" id="reminder-days" className="input" placeholder="Number of Days" />
                <input
                    type="text"
                    className="input"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button
                    className="button"
                    id="set-reminder"
                    onClick={() => {
                        const reminderTime = (document.getElementById('reminder-time') as HTMLInputElement).value;
                        const reminderDays = parseInt((document.getElementById('reminder-days') as HTMLInputElement).value, 10);

                        if (reminderTime && reminderDays > 0) {
                            addReminder({ time: reminderTime, days: reminderDays });
                            document.getElementById('status')!.innerText = 'Reminder set successfully.';
                        } else {
                            document.getElementById('status')!.innerText = 'Please select a valid time and number of days.';
                        }
                    }}
                >
                    Set Reminder
                </button>
            </div>
            <ul id="reminders" className="reminders-list">
                {reminders.map((reminder, index) => (
                    <li key={index} className="reminder-item">
                        Reminder set for {reminder.time} (For {reminder.days} days)
                        <span className="remove-reminder" onClick={() => removeReminder(index)}>x</span>
                    </li>
                ))}
            </ul>
            <button className="button stop-button" id="stop-reminder" onClick={stopAlert}>
                Stop Reminder
            </button>
            <div id="status" className="status"></div>
        </div>
    );
};

export default MedicationReminder;
