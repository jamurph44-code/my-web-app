function SummaryPanels({ priorities }) {
  const total = priorities.length;
  const completedCount = priorities.filter((p) => p.completed).length;
  const percentComplete = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const needsAttention = priorities.filter(
    (p) => !p.targetDate || !p.owner.trim()
  ).length;

  const incompleteDates = priorities
    .filter((p) => !p.completed && p.targetDate)
    .map((p) => p.targetDate)
    .sort();
  const nextDueDate = incompleteDates[0] || null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="summary-panels">
      <div className="summary-panel">
        <span className="panel-label">% Complete</span>
        <span className="panel-value panel-value-blue">{percentComplete}%</span>
      </div>
      <div className="summary-panel">
        <span className="panel-label">Needs Attention</span>
        <span
          className={`panel-value ${needsAttention > 0 ? "panel-value-amber" : "panel-value-green"}`}
        >
          {needsAttention}
        </span>
      </div>
      <div className="summary-panel">
        <span className="panel-label">Next Target Date</span>
        <span className="panel-value panel-value-blue">
          {nextDueDate ? formatDate(nextDueDate) : "None"}
        </span>
      </div>
    </div>
  );
}

export default SummaryPanels;
