import React, { useState, useEffect } from "react";

function DivisionQuery() {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch('https://y9ivhil2lh.execute-api.us-west-2.amazonaws.com/prod/?table=division')
      .then(response => response.json())
      .then(json => {
        setData(json);
        setError(json.length === 0 ? 'No data found.' : ''); 
      })
      .catch(error => {
        console.error(error);
        setError('Error fetching data.'); // Set an error message if fetch fails
      });
  }, []);

  const displayData = data && data.map((info) => (
    <tr key={info.member_id}>
      <td>{info.member_id}</td>
    </tr>
  ));

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h3 style={{ color: 'firebrick' }}>Children that Does All Activities</h3>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        data ? (
          <table style={{ margin: 'auto' }}>
            <thead>
              <tr>
                <th>member_id</th>
              </tr>
            </thead>
            <tbody>{displayData}</tbody>
          </table>
        ) : (
          <p>Loading data...</p>
        )
      )}
    </div>
  );
}

export default DivisionQuery;
