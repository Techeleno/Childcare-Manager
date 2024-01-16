import React, { useState, useEffect } from "react";

const JoinQuery = () => {
  const [data, setData] = useState([]);
  const [findBranch, findBranchId] = useState("");

  useEffect(() => {
    fetch('https://y9ivhil2lh.execute-api.us-west-2.amazonaws.com/prod/?table=join') 
      .then(response => response.json())
      .then(json => setData(json))
      // .then(log => console.log)
      .catch(error => console.error(error));
  }, [findBranch]);

  const fetchedData = Array.isArray(data)
  ? data.filter((info) => info.branch_id.includes(findBranch.toUpperCase()))
  : [];

  const displayData = fetchedData.map((info) => (
    <tr key={info.employee_id}>
      <td>{info.employee_id}</td>
      <td>{info.branch_id}</td>
    </tr>
  ));

  return (
    <div className="mt-5 px-3 py-4">
      <h3 style={{ color: 'firebrick' }}>Find Employees at Branch</h3>
      <div className="mt-5">
        <div style={{textAlign: 'center'}}>
          
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="search">Search Branch ID: </label>
            <br></br>
            <input
              type="text"
              id="search"
              value={findBranch}
              onChange={(e) => findBranchId(e.target.value)}
            />
          </div>        

          {fetchedData.length === 0 && (
            <p style={{ color: 'red', marginTop: '10px' }}>
              No matching results found.
            </p>
          )}

          {fetchedData.length > 0 && (
            <table class="centre">
              <thead>
                <tr>
                  <th>employee_id</th>
                  <th>branch_id</th>
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

export default JoinQuery;