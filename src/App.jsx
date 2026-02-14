import { useState } from "react";
import PriorityCard from "./components/PriorityCard";
import AddPriorityForm from "./components/AddPriorityForm";
import SummaryPanels from "./components/SummaryPanels";
import mockPriorities from "./data/mockPriorities";
import "./App.css";

function App() {
  const [priorities, setPriorities] = useState(mockPriorities);
  const [showAddForm, setShowAddForm] = useState(false);
  const [nextId, setNextId] = useState(4);

  const handleToggle = (id) => {
    setPriorities((prev) =>
      prev.map((p) => (p.id === id ? { ...p, completed: !p.completed } : p))
    );
  };

  const handleUpdate = (id, updates) => {
    setPriorities((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const handleDelete = (id) => {
    setPriorities((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAdd = ({ title, targetDate, owner }) => {
    setPriorities((prev) => [
      ...prev,
      { id: nextId, title, completed: false, targetDate, owner },
    ]);
    setNextId((n) => n + 1);
    setShowAddForm(false);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Project Priorities</h1>
        <SummaryPanels priorities={priorities} />
      </header>

      <main className="priority-list">
        {[...priorities].sort((a, b) => a.completed - b.completed).map((priority) => (
          <PriorityCard
            key={priority.id}
            priority={priority}
            onToggle={handleToggle}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}

        {priorities.length === 0 && (
          <p className="empty-state">
            No priorities yet. Add one to get started.
          </p>
        )}
      </main>

      <footer className="dashboard-footer">
        {showAddForm ? (
          <AddPriorityForm
            onAdd={handleAdd}
            onCancel={() => setShowAddForm(false)}
          />
        ) : (
          <button
            className="btn btn-add"
            onClick={() => setShowAddForm(true)}
          >
            + Add Priority
          </button>
        )}
      </footer>
    </div>
  );
}

export default App;
