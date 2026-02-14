import { useState } from "react";

function PriorityCard({ priority, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(priority.title);
  const [editDate, setEditDate] = useState(priority.targetDate);
  const [editOwner, setEditOwner] = useState(priority.owner);

  const handleSave = () => {
    onUpdate(priority.id, {
      title: editTitle,
      targetDate: editDate,
      owner: editOwner,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(priority.title);
    setEditDate(priority.targetDate);
    setEditOwner(priority.owner);
    setIsEditing(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={`priority-card ${priority.completed ? "completed" : ""}`}>
      <div className="priority-status">
        <button
          className={`status-toggle ${priority.completed ? "done" : ""}`}
          onClick={() => onToggle(priority.id)}
          title={priority.completed ? "Mark incomplete" : "Mark complete"}
        >
          {priority.completed ? "✓" : ""}
        </button>
      </div>

      <div className="priority-details">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="edit-input edit-title"
              placeholder="Priority title"
            />
            <div className="edit-row">
              <label>
                Date
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="edit-input"
                />
              </label>
              <label>
                Owner
                <input
                  type="text"
                  value={editOwner}
                  onChange={(e) => setEditOwner(e.target.value)}
                  className="edit-input"
                  placeholder="Owner name"
                />
              </label>
            </div>
            <div className="edit-actions">
              <button className="btn btn-save" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="priority-title">{priority.title}</h3>
            <div className="priority-meta">
              <span className="priority-date">
                Target: {formatDate(priority.targetDate)}
              </span>
              <span className="priority-owner">Owner: {priority.owner}</span>
            </div>
          </>
        )}
      </div>

      <div className="priority-actions">
        {!isEditing && (
          <button
            className="btn btn-edit"
            onClick={() => setIsEditing(true)}
            title="Edit"
          >
            Edit
          </button>
        )}
        <button
          className="btn btn-delete"
          onClick={() => onDelete(priority.id)}
          title="Delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default PriorityCard;
