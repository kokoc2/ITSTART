import React, { useState } from "react";

const EditModal = ({ seminar, onClose, onSave }) => {
  const [editedData, setEditedData] = useState({ ...seminar });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:3001/seminars/${seminar.id}`,
        {
          method: "PUT", // Используем PUT для обновления
          headers: {
            "Content-Type": "application/json", // Указываем тип содержимого
          },
          body: JSON.stringify(editedData), // Преобразуем данные в JSON
        }
      );

      if (!response.ok) {
        throw new Error(
          `Ошибка сервера: ${response.status} ${response.statusText}`
        );
      }

      const updatedSeminar = await response.json(); // Получаем обновленные данные с сервера
      onSave(updatedSeminar); // Передаем обновленные данные в родительский компонент
      onClose(); // Закрываем модальное окно
    } catch (err) {
      setError(`Ошибка сохранения изменений: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Редактирование семинара</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название:</label>
            <input
              type="text"
              name="title"
              value={editedData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Описание:</label>
            <textarea
              name="description"
              value={editedData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Дата:</label>
              <input
                type="text"
                name="date"
                value={editedData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Время:</label>
              <input
                type="text"
                name="time"
                value={editedData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>URL фото:</label>
            <input
              type="url"
              name="photo"
              value={editedData.photo}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={loading}
            >
              Отмена
            </button>
            <button type="submit" className="save-button" disabled={loading}>
              {loading ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
