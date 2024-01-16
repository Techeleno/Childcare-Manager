import React, { useState, useEffect } from "react";
//given a familyid, output its id and branch id. then replace its bid
//set a flag that it hasnt been updated

const UpdateQuery = () => {
  const [data, setData] = useState("");
  const [findFamily, findFamilyid] = useState("");
  const [newBranchID, setBranchID] = useState("");  
  const [showSucceeded ,setShowSucceeded] = useState(null);
  const [showFail ,setShowFail] = useState(null);

  useEffect(() => {
    fetch('https://y9ivhil2lh.execute-api.us-west-2.amazonaws.com/prod/?table=family_search') 
      .then(response => response.json())
      .then(json => setData(json))
      // .then(log => console.log)
      .catch(error => console.error(error));
  }, [findFamily]);

  const fetchedData = Array.isArray(data)
  ? data.filter((info) => info.family_id.includes(findFamily.toUpperCase()))
  : [];

  const displayData = fetchedData.map((info) => (
    <tr key={info.family_id}>
      <td>{info.family_id}</td>
      <td>{info.branch_id}</td>
    </tr>
  ));

  const updateBranch = () => {
    fetch('https://y9ivhil2lh.execute-api.us-west-2.amazonaws.com/prod/', {
      method: "POST",
      body: JSON.stringify({
        table: 'updateBranch',
        fid: findFamily,
        bid: newBranchID,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if (json.status === 'failed') {
          setShowFail(true);
          setTimeout(()=>{
            setShowFail(false);
          }, 5000);
      } else if (json.status === 'succeeded') {
        setShowSucceeded(true);
        setTimeout(()=>{
          setShowSucceeded(false);
        }, 5000)}})
    
    .catch(error => {
      console.error(error);
      setShowFail(true);
      setTimeout(()=>{
        setShowFail(false);
      }, 5000)});;
  }

  return (

    <div className="mt-5 px-3 py-4">
      <h3 style={{ color: 'firebrick' }}>Update Branch ID</h3>
        { 
        showSucceeded && <div className="alert alert-success position-fixed fixed-top" role="alert">Successful</div>
        }
        {
        showFail && <div className="alert alert-danger position-fixed fixed-top" role="alert">Error</div>
        }
      <div className="mt-5">
        <div style={{textAlign: 'center'}}>
          
        <div style={{ marginBottom: '10px' }}>
        <label htmlFor="search">Search Family ID: </label>
        <br></br>
        <input
          type="text"
          id="search"
          value={findFamily}
          onChange={(e) => findFamilyid(e.target.value)}
        />
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="search">Set Branch ID: </label>
        <br></br>
        <input
          type="text"
          id="set"
          value={newBranchID}
          onChange={(e) => setBranchID(e.target.value)}
        />
      </div>           

        {fetchedData.length === 0 && (
          <p style={{ color: 'red', marginTop: '10px' }}>
            No matching results found.
          </p>
        )}
        {fetchedData.length > 0 && (
          <table className="centre">
            <thead>
              <tr>
                <th>family_id</th>
                <th>branch_id</th>
              </tr>
            </thead>
            <tbody>{displayData}</tbody>
          </table>
        )}
        </div>
        <button
          className="btn btn-primary btn-lg mx-3 px-5 py-3 mt-2"
          onClick={updateBranch}
        >
          Update Branch
        </button>

      </div>
    </div>
  );
};

export default UpdateQuery;