import "./styles.scss";
import React, { useState } from "react";
import airportsData from "./airports.json";
import SkyLogo from "./app.png";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);

    const filteredResults = airportsData.filter((airport) =>
      airport.city.toLowerCase().includes(inputValue.toLowerCase())
    );

    setTimeout(() => {
      setResults(filteredResults);
      setIsLoading(false);
    }, 1000);
  };

  const renderTickets = () => {
    try {
      if (results.length === 0) {
        throw new Error("No results found.");
      }

      const randomTicketIndex = Math.floor(
        Math.random() * results[0].tickets.length
      );
      const randomTicket = results[0].tickets[randomTicketIndex];

      return (
        <div className="options">
          <img src={SkyLogo} id="logo" alt="Skyscanner logo" />
          <a href={randomTicket} className="link">
            Mystery Destination
          </a>
        </div>
      );
    } catch (error) {
      return <p>{error.message}</p>;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="nav">
          <div className="left">
            <a href="/">
              <h1 className="logo">Roamio</h1>
            </a>
          </div>
          <div className="center">
            <ul>
              <a href="/">
                <li>Home</li>
              </a>
              <a href="/">
                <li>Story</li>
              </a>
              <a href="/">
                <li>Contact</li>
              </a>
            </ul>
          </div>
          <div className="right">
            <button>
              <a href="/">Q&A</a>
            </button>
          </div>
        </div>
        <div className="main-title">
          <h1>Don't Know Where To Go?</h1>
        </div>

        <form className="input" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter your departure city.."
            required
          />
          <button className="submit" type="submit">
            Find
          </button>
        </form>

        {isLoading && <p>Loading...</p>}

        {results.length > 0 ? (
          <div>
            <ul className="result-section">
              {results.map((result) => (
                <ul key={result.id}>
                  <li key={result.id}>
                    {result.name} - {result.city}
                  </li>
                  <div>{renderTickets()}</div>
                </ul>
              ))}
            </ul>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default App;
