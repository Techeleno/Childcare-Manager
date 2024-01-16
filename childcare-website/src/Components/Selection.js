import React, { useState, useEffect } from "react";

function SelectionQuery() {
  const [data, setData] = useState("");
  const [isVegetarianFilter, setIsVegetarianFilter] = useState(false);
  const [isNotVegetarianFilter, setIsNotVegetarianFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeToPrepare, setTimeToPrepare] = useState("");

  useEffect(() => {
    fetch('https://y9ivhil2lh.execute-api.us-west-2.amazonaws.com/prod/?table=lunch_option')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  const toggleVegetarianFilter = () => {
    setIsVegetarianFilter((prevFilter) => !prevFilter);
  };

  const toggleNotVegetarianFilter = () => {
    setIsNotVegetarianFilter((prevFilter) => !prevFilter);
  };

  const filteredData = data
  ? data.filter(
      (info) =>
        (!isVegetarianFilter || (isVegetarianFilter && info.is_vegetarian === 1)) &&
        (!isNotVegetarianFilter || (isNotVegetarianFilter && info.is_vegetarian === 0)) &&
        info.meal_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (timeToPrepare ? info.time_to_prepare.includes(timeToPrepare) : true)
    )
  : [];

  const displayData = filteredData.map((info) => (
    <tr key={info.meal_name}>
      <td>{info.meal_name}</td>
      <td>{info.time_to_prepare}</td>
      <td>{info.is_vegetarian === 0 ? 'no' : 'yes'}</td>
    </tr>
  ));

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h3 style={{ color: 'firebrick' }}>Selection on Meal Options</h3>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="search">Search Meal Name: </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="time">Search Time to Prepare: </label>
        <input
          type="text"
          id="time"
          value={timeToPrepare}
          onChange={(e) => setTimeToPrepare(e.target.value)}
        />
      </div>

      <button onClick={toggleVegetarianFilter}>
        Toggle Vegetarian Filter: {isVegetarianFilter ? 'On' : 'Off'}
      </button>

      <button onClick={toggleNotVegetarianFilter}>
        Toggle Not Vegetarian Filter: {isNotVegetarianFilter ? 'On' : 'Off'}
      </button>

      {filteredData.length === 0 && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          No matching results found.
        </p>
      )}

      {filteredData.length > 0 && (
        <table style={{ margin: 'auto' }}>
          <thead>
            <tr>
              <th>meal_name</th>
              <th>time_to_prepare</th>
              <th>is_vegetarian</th>
            </tr>
          </thead>
          <tbody>{displayData}</tbody>
        </table>
      )}
    </div>
  );
}

export default SelectionQuery;
