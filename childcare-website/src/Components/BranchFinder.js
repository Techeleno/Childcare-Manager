import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faX } from '@fortawesome/free-solid-svg-icons'

const SearchBoxes = ({ capacity, setCapacity, getData }) => {
  const handleChangeCapacity = (event) => {
    setCapacity(event.target.value)
  }

  const handleClicked = () => {
    getData()
  }

  return (
    <div class="container" style={{ marginBottom: '24px' }}>
      <div class="row align-items-start">
        <div class="col">
          <div class="form-group mx-sm-3">
            <input type="number" class="form-control-lg" placeholder="Min Capacity" style={{ float: 'left', marginRight: '8px' }} value={capacity} onChange={handleChangeCapacity} />
          </div>
          <button onClick={handleClicked} class="btn btn-primary btn-lg" style={{ float: 'left', marginRight: '8px' }}>Search</button>
        </div>
      </div>
    </div>
  );
};


const Table = ({ data }) => {

  return (
    <div className="container mt-4">
      {data && data.length > 0 ? (

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Branch ID</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((branch, index) => (
              <tr key={index}>
                <td>{branch.branch_id}</td>
                <td>{branch.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No branches found</p>
      )}
    </div>
  );

}



function BranchFinder() {
  const [capacity, setCapacity] = useState(
    null
  );

  const clearTextFields = () => {
    setCapacity(null)
  }

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {

  }, []);

  const getData = () => {
    if (capacity) {
      setIsLoading(true);
      fetch('https://y9ivhil2lh.execute-api.us-west-2.amazonaws.com/prod/?table=capacity&capacity=' + capacity)
        .then(response => response.json())
        .then(json => {
          setData(json)
          setIsLoading(false)
        })
        .catch(error => console.error(error));
    }
  }


  return (
    <div style={{ marginBottom: '20px' }}>
      <h1 style={{ marginBottom: '20px', color: 'black' }}>Find Branch With Minimum Capcity</h1>
      <SearchBoxes capacity={capacity} setCapacity={setCapacity} getData={getData} />
      {
        isLoading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <Table data={data} />
        )
      }
    </div>
  );

}

export default BranchFinder;