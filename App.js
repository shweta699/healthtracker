import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
const HealthTrackerApp = () => {
  const [exerciseLog, setExerciseLog] = useState([]);
  const [exerciseType, setExerciseType] = useState('');
  const [exerciseDuration, setExerciseDuration] = useState('');
  const [exerciseIntensity, setExerciseIntensity] = useState('');
  const [exerciseCalories, setExerciseCalories] = useState('');
  

  const [medicationSchedule, setMedicationSchedule] = useState('');
  const [vitalSigns, setVitalSigns] = useState({ heartRate: 0, bloodPressure: '', temperature: '' });
  const [healthTips, setHealthTips] = useState([]);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [mood, setMood] = useState('');
  const [stressLevel, setStressLevel] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [healthJournalEntry, setHealthJournalEntry] = useState('');
  const [waterIntake, setWaterIntake] = useState(0);
  const [sleepData, setSleepData] = useState([]);
  
  const [quote, setQuote] = useState('');
  const [randomQuote, setRandomQuote] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [respirationRate, setRespirationRate] = useState('');
  const [bodyTemperature, setBodyTemperature] = useState('');
  const [oxygenSaturation, setOxygenSaturation] = useState('');

// State for quotes
const moodQuotes = [
  "Happiness is not something ready made. It comes from your own actions. - Dalai Lama",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "The only time you fail is when you fall down and stay down. - Stephen Richards"
];

const stressQuotes = [
  "In times of stress, the best thing we can do for each other is to listen with our ears and our hearts. - Fred Rogers",
  "The greatest weapon against stress is our ability to choose one thought over another. - William James",
  "Don't stress the could haves. If it should have, it would have. - Unknown"
];
// Function to display a random quote
const displayRandomQuote = () => {
  const randomMoodQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
  const randomStressQuote = stressQuotes[Math.floor(Math.random() * stressQuotes.length)];
  setQuote(Math.random() < 0.5 ? randomMoodQuote : randomStressQuote);
};

useEffect(() => {
  // Display a random quote when the component mounts
  displayRandomQuote();
}, []);
// Function to set a reminder for medication schedule
useEffect(() => {
  const currentHour = new Date().getHours(); // Get current hour

  // Example medication schedule: take medication at 8 AM and 8 PM
  if (currentHour === 8 || currentHour === 20) {
    toast.info('Reminder: Take your medication!');
  }
}, []);
  // Function to handle adding exercise to log
  const handleAddExercise = () => {
    if (exerciseType && exerciseDuration && exerciseIntensity) {
      const newExercise = {
        type: exerciseType,
        duration: exerciseDuration,
        intensity: exerciseIntensity,
        calories: exerciseCalories || calculateCaloriesBurned(exerciseDuration, exerciseIntensity)
      };
      setExerciseLog([...exerciseLog, newExercise]);
      toast.success(`Exercise "${exerciseType}" added to log!`);
      clearExerciseFields();
    } else {
      toast.error('Please fill in all exercise details!');
    }
  };
  
  // Function to calculate estimated calories burned
  const calculateCaloriesBurned = (duration, intensity) => {
    // Sample calculation logic (replace with actual calculation)
    const caloriesPerMinute = intensity === 'low' ? 5 : intensity === 'moderate' ? 7 : 10;
    return caloriesPerMinute * parseInt(duration);
  };

  // Function to clear exercise input fields
  const clearExerciseFields = () => {
    setExerciseType('');
    setExerciseDuration('');
    setExerciseIntensity('');
    setExerciseCalories('');
  };
  const handleMedicationSchedule = (event) => {
    const newMedicationSchedule = event.target.value;
    setMedicationSchedule(newMedicationSchedule);
  };

  const handleVitalSignsChange = (event) => {
    const { name, value } = event.target;
    setVitalSigns({ ...vitalSigns, [name]: value });
  };
// Function to handle submitting vital signs data
const handleSubmit = () => {
  // Here, you would typically send the vital signs data to a backend server for processing or storage
  // For simplicity, we'll just display a toast notification with the submitted data
  toast.success(`Submitted Vital Signs: 
    Blood Pressure: ${bloodPressure}
    Heart Rate: ${heartRate}
    Respiration Rate: ${respirationRate}
    Body Temperature: ${bodyTemperature}
    Oxygen Saturation: ${oxygenSaturation}`);
  // Clear the input fields after submission
  clearInputFields();
};
// Function to clear input fields
const clearInputFields = () => {
  setBloodPressure('');
  setHeartRate('');
  setRespirationRate('');
  setBodyTemperature('');
  setOxygenSaturation('');
};
  const handleAddHealthTip = () => {
    // Add logic to fetch health tips from an external API or local database
    const newTip = "Remember to drink plenty of water and stay hydrated!";
    setHealthTips([...healthTips, newTip]);
  };
  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100; // Convert height from centimeters to meters
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBMI(bmiValue);
    } else {
      setBMI(null);
    }
  };
  const getBMIStatus = () => {
    if (bmi === null) return '';
    else if (bmi < 18.5) return 'Underweight';
    else if (bmi >= 18.5 && bmi < 25) return 'Normal Weight';
    else if (bmi >= 25 && bmi < 30) return 'Overweight';
    else return 'Obese';
  };
  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  const handleStressLevelChange = (event) => {
    setStressLevel(event.target.value);
  };

  const generateSuggestions = () => {
    // Here you can implement logic to generate personalized suggestions based on mood and stress level
    const newSuggestions = [];
    if (mood === 'Happy' && stressLevel === 'Low') {
      newSuggestions.push("Take a relaxing walk in nature.");
      newSuggestions.push("Practice gratitude journaling before bed.");
    } else if (mood === 'Anxious' && stressLevel === 'High') {
      newSuggestions.push("Try deep breathing exercises to calm your nerves.");
      newSuggestions.push("Listen to soothing music to alleviate stress.");
    } else {
      newSuggestions.push("Connect with a friend or family member for support.");
      newSuggestions.push("Engage in a hobby or activity that brings you joy.");
    }
    setSuggestions(newSuggestions);
  };
  const handleSetReminder = () => {
    if (medicationSchedule) {
      // You can use any library for date/time manipulation, e.g., moment.js
      // For simplicity, let's assume the medication schedule is in hours from now
      const hoursFromNow = parseInt(medicationSchedule, 10);
      const reminderTime = new Date(Date.now() + hoursFromNow * 60 * 60 * 1000);
      // Display notification
      setTimeout(() => {
        toast.success(`Take your medication now!`, { position: "top-center", autoClose: 5000 });
      }, reminderTime - Date.now());
    } else {
      toast.error(`Please enter a valid medication schedule!`, { position: "top-center", autoClose: 5000 });
    }
  };
  const handleAddSymptom = (event) => {
    const symptom = event.target.value;
    if (symptom.trim() !== '') {
      setSymptoms([...symptoms, { name: symptom, severity: '', timestamp: new Date().toLocaleString() }]);
      event.target.value = '';
    }
  };

  const handleSymptomSeverityChange = (index, event) => {
    const newSeverity = event.target.value;
    setSymptoms(symptoms.map((symptom, i) => (i === index ? { ...symptom, severity: newSeverity } : symptom)));
  };

  const handleHealthJournalChange = (event) => {
    setHealthJournalEntry(event.target.value);
  };

  const handleAddHealthJournalEntry = () => {
    if (healthJournalEntry.trim() !== '') {
      // You can add more information like date and time if needed
      const entry = { text: healthJournalEntry, timestamp: new Date().toLocaleString() };
      // You can store these entries in an array or use a database for persistent storage
      toast.info(`Health journal entry added!`, { position: "top-center", autoClose: 5000 });
      setHealthJournalEntry('');
    }
  };

  const handleWaterIntakeChange = (event) => {
    const intake = parseInt(event.target.value);
    if (!isNaN(intake)) {
      setWaterIntake(intake);
    }
  };

  const handleAddSleepData = () => {
    // You can add more fields like wake-up time, sleep quality, etc., as needed
    const sleepEntry = { startTime: new Date().toLocaleString(), endTime: '', quality: '' };
    setSleepData([...sleepData, sleepEntry]);
  };
  const handleEndTimeChange = (index, event) => {
    const newEndTime = event.target.value;
    setSleepData(
      sleepData.map((entry, i) =>
        i === index ? { ...entry, endTime: newEndTime } : entry
      )
    );
  };
  
  const handleQualityChange = (index, event) => {
    const newQuality = event.target.value;
    setSleepData(
      sleepData.map((entry, i) =>
        i === index ? { ...entry, quality: newQuality } : entry
      )
    );
  };
  return (
    <div>
      <h1>Healthcare Tracker</h1>
      <div>
        <h2>Exercise Log</h2>
        <div>
          <label>Exercise Type:</label>
          <input type="text" value={exerciseType} onChange={(e) => setExerciseType(e.target.value)} />
        </div>
        <div>
          <label>Duration (minutes):</label>
          <input type="number" value={exerciseDuration} onChange={(e) => setExerciseDuration(e.target.value)} />
        </div>
        <div>
          <label>Intensity:</label>
          <select value={exerciseIntensity} onChange={(e) => setExerciseIntensity(e.target.value)}>
            <option value="">Select intensity</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Calories Burned:</label>
          <input type="number" value={exerciseCalories} onChange={(e) => setExerciseCalories(e.target.value)} />
        </div>
        <button onClick={handleAddExercise}>Add Exercise</button>
      </div>
        <div>
        <h2>Exercise Trends</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Duration</th>
              <th>Intensity</th>
              <th>Calories Burned</th>
            </tr>
          </thead>
          <tbody>
            {exerciseLog.map((exercise, index) => (
              <tr key={index}>
                <td>{exercise.type}</td>
                <td>{exercise.duration}</td>
                <td>{exercise.intensity}</td>
                <td>{exercise.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
       
      <div>
        <h2>Medication Schedule</h2>
        <input type="text" onChange={handleMedicationSchedule} value={medicationSchedule} placeholder="Enter medication schedule (hours from now)" />
        <button onClick={handleSetReminder}>Set Reminder</button>
      </div>
      <div>
        <h2>Quotes</h2>
        <p>{quote}</p>
      </div>
     
      <div>
        <h2>Vital Signs</h2>
        <label>Heart Rate: </label>
        <input type="number" name="heartRate" value={vitalSigns.heartRate} onChange={handleVitalSignsChange} />
        <br />
        <label>Blood Pressure: </label>
        <input type="text" name="bloodPressure" value={vitalSigns.bloodPressure} onChange={handleVitalSignsChange} />
        <br />
        <label>Temperature: </label>
        <input type="text" name="temperature" value={vitalSigns.temperature} onChange={handleVitalSignsChange} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <h2>Calculate BMI</h2>
        <label>Height (in cm): </label>
        <input type="number" value={height} onChange={handleHeightChange} />
        <br />
        <label>Weight (in kg): </label>
        <input type="number" value={weight} onChange={handleWeightChange} />
        <br />
        <button onClick={calculateBMI}>Calculate BMI</button>
        {bmi && <p>Your BMI: {bmi}</p>}
        {bmi && <p>BMI Status: {getBMIStatus()}</p>}
      </div>
    
  
      <div>
        <h2>Health Tips & Reminders</h2>
        <button onClick={handleAddHealthTip}>Add Health Tip</button>
        <ul>
          {healthTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Mood & Stress Level</h2>
        <label>Mood: </label>
        <select value={mood} onChange={handleMoodChange}>
          <option value="">Select</option>
          <option value="Happy">Happy</option>
          <option value="Anxious">Anxious</option>
          <option value="Neutral">Neutral</option>
        </select>
        <br />
        <label>Stress Level: </label>
        <select value={stressLevel} onChange={handleStressLevelChange}>
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="High">High</option>
          <option value="Moderate">Moderate</option>
        </select>
        <br />
        <button onClick={generateSuggestions}>Generate Suggestions</button>
        <h3>Suggestions</h3>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Symptom Tracker</h2>
        <input type="text" placeholder="Enter symptom" onChange={handleAddSymptom} />
        <ul>
          {symptoms.map((symptom, index) => (
            <li key={index}>
              {symptom.name} - Severity:
              <select value={symptom.severity} onChange={(event) => handleSymptomSeverityChange(index, event)}>
                <option value="">Select severity</option>
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
              </select>
              <span className="timestamp">({symptom.timestamp})</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Health Journal</h2>
        <textarea rows="4" cols="50" value={healthJournalEntry} onChange={handleHealthJournalChange} placeholder="Write your health journal entry here"></textarea>
        <br />
        <button onClick={handleAddHealthJournalEntry}>Add Entry</button>
      </div>
      <div>
        <h2>Water Intake Tracker</h2>
        <label>Enter amount of water consumed (ml): </label>
        <input type="number" value={waterIntake} onChange={handleWaterIntakeChange} />
        <p>Total water intake for the day: {waterIntake} ml</p>
      </div>

      <div>
        <h2>Sleep Tracker</h2>
        <button onClick={handleAddSleepData}>Add Sleep Data</button>
        <ul>
          {sleepData.map((entry, index) => (
            <li key={index}>
              <strong>Start Time:</strong> {entry.startTime}<br />
              <label>
              End Time:
              <input
                type="text"
                value={entry.endTime}
                onChange={(event) => handleEndTimeChange(index, event)}
              />
            </label><br />
            <label>
              Quality:
              <input
                type="text"
                value={entry.quality}
                onChange={(event) => handleQualityChange(index, event)}
              />
            </label>
          </li>
        ))}
        </ul>
      </div>
      <div className="conclusion">
        <h2>Conclusion</h2>
        <p>The Healthcare Tracker application provides users with a comprehensive platform to monitor and manage various aspects of their health. By incorporating features such as exercise logging, diet planning, medication scheduling, vital signs tracking, symptom monitoring, health journaling, water intake tracking, and sleep analysis, the app empowers users to make informed decisions about their well-being.</p>
        <p>Additionally, by following these suggestions, users can maximize the effectiveness of the app:</p>
        <ol>
          <li>Consistency is Key: Regularly log your activities and measurements to ensure accurate tracking.</li>
          <li>Set Realistic Goals: Establish achievable health goals based on your individual needs.</li>
          <li>Listen to Your Body: Pay attention to your body's signals and adjust your routines accordingly.</li>
          <li>Seek Professional Guidance: Consult with healthcare professionals for personalized advice.</li>
          <li>Stay Engaged and Motivated: Use the app's features to stay engaged and motivated on your health journey.</li>
        </ol>
        <p>With these tools and recommendations, users can take proactive steps towards improving their health and well-being.</p>
      </div>
    </div>
  );
};
  


export default HealthTrackerApp;

