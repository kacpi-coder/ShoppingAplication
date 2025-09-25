import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newToDoList = [...toDoList, newTask];
    setToDoList(newToDoList);
    setNewTask("");
  };

  const deleteTask = (taskName) => {
    const newToDoList = toDoList.filter((task) => task !== taskName);
    setToDoList(newToDoList);
  };

  // Oblicz kąty dla wskazówek
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6; // 360/60
  const minuteDeg = minutes * 6 + seconds * 0.1; // dodatkowo przesuwka sekund
  const hourDeg = (hours % 12) * 30 + minutes * 0.5; // 360/12

  return (
    <>
      <div id="menuFather">
        <div id="menu">
          <ul>
            <li><a href="main.jsx">Strona Główna</a></li>
            <li><a href="informations.jsx">Informacje</a></li>
            <li><a href="moreAboutUs.jsx">Więcej o nas</a></li>
            <li><a href="App.jsx">Zlecenia</a></li>
            <li><a href="contact.jsx" >Kontakt</a></li>
          </ul>
        </div>
      </div>

      <div id="mainFather">
        <div id="add">
          <h2>Stwórz swoją własną listę zadań</h2>
          <textarea
            rows={7}
            cols={40}
            value={newTask}
            placeholder="🔥 Wpisz coś epickiego..."
            className="gradient-textarea"
            onChange={handleChange}
          />
          <br />
          <button onClick={addTask} className="add-btn">Dodaj Task</button>
        </div>
       
        <main>
          <h1>Strona Główna</h1>

          {/* CLOCK */}
          <div className="clock-wrap">
            <div className="analog">
              {/* wskazówki */}
                <div
  className="hand hour"
  style={{ transform: `translate(-50%, -100%) rotate(${hourDeg}deg)` }}
></div>
<div
  className="hand minute"
  style={{ transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)` }}
></div>
<div
  className="hand second"
  style={{ transform: `translate(-50%, -100%) rotate(${secondDeg}deg)` }}
></div>
    
              <div className="center-dot"></div>

              {/* ticki godzinowe */}
              <div className="ticks">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="tick"
                    style={{ transform: `rotate(${i * 30}deg) translate(-50%, 0)` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* cyfrowy */}
            <div className="digital">
              <div className="time">
                {time.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </div>
              <div className="date">
                {time.toLocaleDateString("pl-PL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>
          </div>
        </main>

        <div id="left">
          <h2>Twoje Zaplanowane Zadania</h2>
          {toDoList.map((task, index) => {
            return (
              <div key={index} className="task-box">
                <h3>{task}</h3>
                <button onClick={() => deleteTask(task)}>x</button>
              </div>
            )
          })}
        </div>
      </div>

      <footer>alskdfj</footer>
    </>
  )
}

export default App
