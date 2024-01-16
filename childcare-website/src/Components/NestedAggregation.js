import React, { useState, useEffect } from "react";

const NestedAg = () => {
  // const [data, setData] = useState("");
  const [avgAgeCalc, setAvgAge] = useState(null);

  useEffect(() => {
    fetch('https://y9ivhil2lh.execute-api.us-west-2.amazonaws.com/prod/?table=nest-ag')
    .then(response => response.json())
    .then(result => {
      if (result && result.length > 0) {
          setAvgAge(result);
      } else {
          setAvgAge(null);
      }
    })
    // .then(log => console.log)
    .catch(error => {console.error(error); setAvgAge(null)});
  }, []);

  const displayData = avgAgeCalc && avgAgeCalc.map((row) => (
    <tr key={row.family_id}>
      <td>{row.family_id}</td>
      <td>{row.avg_child_age}</td>
    </tr>
  ));

  return (
    <div className="mt-5 px-3 py-4">
      <h3 style={{ color: 'firebrick' }}>Avg Child Age</h3>
      <div className="mt-5">
        <div style={{textAlign: 'center'}}>

          {avgAgeCalc != null && avgAgeCalc.length>0&&(
            <table class="centre">
              <thead>
                <tr>
                  <th>Family ID</th>
                  <th>Average Child Age</th>
                </tr>
              </thead>
              <tbody>{displayData}</tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default NestedAg;