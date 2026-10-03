import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";

function Dashboard() {
const [totalIntake, setTotalIntake] = useState(0);
const [addingWater, setAddingWater] = useState(null);
const [aiInsight, setAiInsight] = useState(null);
const [history, setHistory] = useState([]);
  useEffect(() => {
  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/history/user_123"
      );

      const history = response.data.history;
      setHistory(history);

      const today = new Date().toISOString().split("T")[0];

      const todayTotal = history
        .filter((record) => record[1] === today)
        .reduce((total, record) => total + record[0], 0);

      setTotalIntake(todayTotal);
    } catch (error) {
      console.error("Error fetching water history:", error);
    }
  };

  fetchHistory();
}, []);

  const dailyGoal = 2000;
const progress = Math.min((totalIntake / dailyGoal) * 100, 100);
const remaining = Math.max(dailyGoal - totalIntake, 0);
  const addWater = async (amount) => {
    setAddingWater(amount);
  try {
   const aiResponse = await axios.post(
    "http://127.0.0.1:8000/log-intake",
    {
       user_id: "user_123",
       intake_ml: amount,
       }
      );
      setAiInsight(aiResponse.data.analysis);
    const response = await axios.get(
      "http://127.0.0.1:8000/history/user_123"
    );

    const history = response.data.history;

    const today = new Date().toISOString().split("T")[0];

    const todayTotal = history
      .filter((record) => record[1] === today)
      .reduce((total, record) => total + record[0], 0);

    setTotalIntake(todayTotal);
    setAddingWater(null);

  } catch (error) {
    console.error("Error logging water intake:", error);
    alert("Could not connect to the backend.");
  }
};
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">💧</span>
          <span>HydraTrack</span>
        </div>

        <div className="nav-links">
          <a href="#dashboard">Dashboard</a>
          <a href="#history">History</a>
          <a href="#insights">AI Insights</a>
        </div>

        <div className="profile">
          <div className="avatar">A</div>
          <span>Aayusha</span>
        </div>
      </nav>

      <main className="main-content" id="dashboard">
        <section className="welcome">
          <div>
            <p className="eyebrow">SMART HYDRATION ASSISTANT</p>
            <h1>Stay hydrated.<br />Feel your best.</h1>
            <p className="subtitle">
              Track your daily water intake and get personalized guidance
              from your AI hydration assistant.
            </p>
          </div>

          <div className="date-card">
            <span>Today</span>
            <strong>
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                 year: "numeric",
                 })}
                 </strong>
          </div>
        </section>

        <section className="stats-grid">
          <div className="card progress-card">
            <div className="card-header">
              <div>
                <p className="card-label">TODAY'S HYDRATION</p>
              <h2>{totalIntake.toLocaleString()} <span>ml</span></h2>
              </div>
              <div className="water-icon">💧</div>
            </div>

            <div className="progress-bar">
              <div
               className="progress-fill"
               style={{ width: `${progress}%` }}
               ></div>
            </div>

            <div className="progress-info">
              <span>{Math.round(progress)}% of daily goal</span>
              <span>2,000 ml</span>
            </div>
          </div>

          <div className="card stat-card">
            <p className="card-label">CURRENT STREAK</p>
            <div className="stat-value">7 <span>days</span></div>
            <p className="stat-description">Keep it going! 🔥</p>
          </div>

          <div className="card stat-card">
            <p className="card-label">REMAINING</p>
           <div className="stat-value">{remaining.toLocaleString()} <span>ml</span></div>
            <p className="stat-description">You're almost there!</p>
          </div>
        </section>

        <section className="content-grid">
          <div className="card add-water-card">
            <div className="section-title">
              <div>
                <p className="card-label">QUICK ACTION</p>
                <h2>Add Water</h2>
              </div>
              <span className="plus-icon">+</span>
            </div>

            <p className="section-description">
              How much water did you drink?
            </p>

            <div className="water-buttons">
             <button onClick={() => addWater(250)} disabled={addingWater !== null}>
              {addingWater === 250 ? "✓ Added 250 ml" : "+ 250 ml"}
              </button>
              <button onClick={() => addWater(500)} disabled={addingWater !== null}>
                {addingWater === 500 ? "✓ Added 500 ml" : "+ 500 ml"}
                </button>
                <button onClick={() => addWater(750)} disabled={addingWater !== null}>
                  {addingWater === 750 ? "✓ Added 750 ml" : "+ 750 ml"}
                  </button>
            </div>

            <button className="custom-button">
              + Add Custom Amount
            </button>
          </div>

          <div className="card ai-card" id="insights">
            <div className="ai-header">
              <div className="ai-icon">✦</div>
              <div>
                <p className="card-label">AI HYDRATION COACH</p>
                <h2>Today's Insight</h2>
              </div>
            </div>

            <div className="ai-message">
              <p>
                 {aiInsight
                 ? aiInsight.summary
                 : "Log your water intake to receive personalized AI hydration guidance."}
                 </p>
                 </div>

            <div className="recommendation">
              <span>💡</span>
              <div>
                 <strong>{aiInsight ? aiInsight.next_action : "Next action"}</strong>
                 <p>
                  {aiInsight
                    ? aiInsight.recommendation
                     : "Start logging your water intake."}
                     </p>
                     </div>
                     </div>
                     </div>
        </section>

        <section className="card history-card" id="history">
          <div className="section-title">
            <div>
              <p className="card-label">YOUR PROGRESS</p>
              <h2>Weekly Overview</h2>
            </div>

            <button className="view-button">View History →</button>
          </div>

          <div className="chart">
            <div className="chart-column">
              <div className="bar" style={{ height: "65%" }}></div>
              <span>Mon</span>
            </div>

            <div className="chart-column">
              <div className="bar" style={{ height: "80%" }}></div>
              <span>Tue</span>
            </div>

            <div className="chart-column">
              <div className="bar" style={{ height: "55%" }}></div>
              <span>Wed</span>
            </div>

            <div className="chart-column">
              <div className="bar active" style={{ height: "90%" }}></div>
              <span>Thu</span>
            </div>

            <div className="chart-column">
              <div className="bar" style={{ height: "72%" }}></div>
              <span>Fri</span>
            </div>

            <div className="chart-column">
              <div className="bar" style={{ height: "85%" }}></div>
              <span>Sat</span>
            </div>

            <div className="chart-column">
              <div className="bar" style={{ height: "75%" }}></div>
              <span>Sun</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading HydraTrack...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;