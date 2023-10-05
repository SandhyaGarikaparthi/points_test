import { useCallback, useMemo, useState } from "react";
import "./App.css";
import { fetchDataResults } from "./http";
import mockData from "./data.json";

function App() {
  const [data, setData] = useState("");
  const [points, setPoints] = useState(new Map());
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback((e) => {
    setData(e.target.value);
  }, []);

  const handleCalculatePoints = useCallback(async () => {
    try {
      setLoading(true);
      const finalData = await fetchDataResults(data);
      setPoints(finalData);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, [data, setLoading]);

  const result = useMemo(() => {
    return [...points].map(([month, { entries, points }]) => (
      <div>
        <div>Month Name: {month}</div>
        <div>Entries: {entries.join(",")}</div>
        <div>Points: {points}</div>
      </div>
    ));
  }, [points]);

  return (
    <div className="App">
      <h1>Add Monthly Details Here</h1>
      <div className="Container">
        <div>
          <div className="Content">
            <textarea
              className="TextArea"
              rows={6}
              placeholder="enter expense here"
              onChange={handleInputChange}
              value={data}
            />
            <button className="Button" onClick={handleCalculatePoints}>
              Calculate Points
            </button>
          </div>
          {loading && <div>Loading....</div>}
          {points.size ? result : ""}
        </div>
        <div className="Sidebar">
          <h1>HINT</h1>
          {JSON.stringify(mockData)}
        </div>
      </div>
    </div>
  );
}

export default App;
