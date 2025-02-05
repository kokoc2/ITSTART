import React, { useState, useEffect } from "react";
import "./App.css";
import EditModal from "./EditModal";

const Seminars = () => {
  const [seminars, setSeminars] = useState([]);
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Функция для получения семинаров
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

  useEffect(() => {
    fetchSeminars();
  }, []);

  // Функция для удаления семинара
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Вы уверены, что хотите удалить этот семинар?"
    );

    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/seminars/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Ошибка при удалении семинара");
        }

        // Обновляем список семинаров после удаления
        setSeminars((prevSeminars) =>
          prevSeminars.filter((seminar) => seminar.id !== id)
        );
      } catch (err) {
        setError("Ошибка при удалении: " + err.message);
      }
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div className="error-message">{error}</div>;
  /*   123 */
  const handleEdit = (seminar) => {
    setSelectedSeminar(seminar);
    setShowModal(true);
  };

  const handleSave = (updatedSeminar) => {
    setSeminars((prev) =>
      prev.map((sem) => (sem.id === updatedSeminar.id ? updatedSeminar : sem))
    );
  };
  return (
    <div className="seminar-container">
      {showModal && (
        <EditModal
          seminar={selectedSeminar}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

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
            <div className="button-container">
              <button
                className="edit-button"
                onClick={() => handleEdit(seminar)}
              >
                Редактировать
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(seminar.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Seminars;
