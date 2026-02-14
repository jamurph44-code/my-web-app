import { useState } from "react";

function AddPriorityForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [owner, setOwner] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !targetDate || !owner.trim()) return;
    onAdd({ title: title.trim(), targetDate, owner: owner.trim() });
    setTitle("");
    setTargetDate("");
    setOwner("");
  };

  return (
    <form className="add-priority-form" onSubmit={handleSubmit}>
      <h3>Add New Priority</h3>
      <div className="form-fields">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Priority title"
          className="form-input"
          required
        />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="Owner name"
          className="form-input"
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-save">
          Add Priority
        </button>
        <button type="button" className="btn btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddPriorityForm;
