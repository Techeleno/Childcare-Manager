import React, { useState, useEffect } from "react";

function AggregationGroupByQuery() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch('https://y9ivhil2lh.execute-api.us-west-2.amazonaws.com/prod/?table=aggr_group_by')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  const displayData = data && data.map((info) => (
    <tr key={info.age}>
      <td>{info.age}</td>
      <td>{info.age_count}</td>
    </tr>
  ));

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h3 style={{ color: 'firebrick' }}>Number of Children For Each Age</h3>
      {data ? (
        <table style={{ margin: 'auto' }}>
          <thead>
            <tr>
              <th>age</th>
              <th>age_count</th>
            </tr>
          </thead>
          <tbody>{displayData}</tbody>
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default AggregationGroupByQuery;