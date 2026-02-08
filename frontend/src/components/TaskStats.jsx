export default function TaskStats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div
      style={{
        display: "flex",
        gap: 15,
        marginBottom: 15,
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: 150,
          border: "1px solid #ccc",
          padding: 15,
          borderRadius: 8,
        }}
      >
        <h4 style={{ margin: 0 }}>Total</h4>
        <p style={{ fontSize: 22, fontWeight: "bold", margin: 0 }}>{total}</p>
      </div>

      <div
        style={{
          flex: 1,
          minWidth: 150,
          border: "1px solid #ccc",
          padding: 15,
          borderRadius: 8,
        }}
      >
        <h4 style={{ margin: 0 }}>Completed ✅</h4>
        <p style={{ fontSize: 22, fontWeight: "bold", margin: 0 }}>
          {completed}
        </p>
      </div>

      <div
        style={{
          flex: 1,
          minWidth: 150,
          border: "1px solid #ccc",
          padding: 15,
          borderRadius: 8,
        }}
      >
        <h4 style={{ margin: 0 }}>Pending ⏳</h4>
        <p style={{ fontSize: 22, fontWeight: "bold", margin: 0 }}>{pending}</p>
      </div>
    </div>
  );
}
