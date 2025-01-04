import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import "./Main.css";
async function fetchData() {
  try {
    const response = await fetch("http://192.168.1.249:5173/data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

function Main() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const result = await fetchData();
        setData(result);
      } catch (err) {
        setError("Failed to fetch data: " + err.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="two-row-grid">
        {data.map((x) => (
          <>
            <a href={"/?id=" + x.index}>
              <button>{x.name}</button>
            </a>
          </>
        ))}
      </div>
    </>
  );
}

export default Main;
