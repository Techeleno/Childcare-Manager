import React, { useState, useEffect } from "react";

const Counter = () => {
  const [count, setcount] = useState(0);
  const [data, setData] = useState(null);

  const add = () => setcount((prev) => prev + 1);
  const subtract = () => setcount((prev) => prev - 1);

  useEffect(() => {
    fetch('https://y9ivhil2lh.execute-api.us-west-2.amazonaws.com/prod/?table=child')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="mt-5 px-3 py-4">
      <div>
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
      </div>
      <h1 className="h1 display-1">Counter Component</h1>
      <h2 className="h1 display-1 mt-5 mb-3">{count}</h2>
      <div className="mt-5">
        <button
          className="btn btn-primary btn-lg mx-3 px-5 py-3 mt-2"
          onClick={add}
        >
          Add
        </button>
        <button
          className="btn btn-dark btn-lg mx-3 px-5 py-3 mt-2"
          onClick={subtract}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Counter;