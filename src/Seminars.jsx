import React, { useState, useEffect } from "react";
import "./App.css";

const Seminars = () => {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        const response = await fetch("http://localhost:3001/seminars");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSeminars(data);
        setLoading(false);
      } catch (err) {
        setError("Ошибка загрузки данных: " + err.message);
        setLoading(false);
      }
    };

    fetchSeminars();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="seminar-container">
      {seminars.map((seminar) => (
        <div key={seminar.id} className="seminar-card">
          <img src={seminar.photo} alt={seminar.title} />
          <div className="seminar-info">
            <h2>{seminar.title}</h2>
            <p>{seminar.description}</p>
            <div className="seminar-time">
              <span>{seminar.date}</span>
              <span>{seminar.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Seminars;
