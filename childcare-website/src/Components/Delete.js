import React, { useState, useEffect } from "react";

const FormRow = ({ insertData, textFields, setTextFields }) => {

  const handleClicked = () => {
    insertData()
  }

  const handleChangeID = (event) => {
    setTextFields({
      ...textFields,
      ['child_id']: event.target.value,
    })
  }

  return (
    <div class="container" style={{ marginBottom: '24px' }}>
      <div class="row align-items-start">
        <div class="col">
          <div class="form-group mx-sm-3">
            <input type="text" class="form-control-lg" placeholder="Child ID" style={{ float: 'left', marginRight: '8px' }} value={textFields['child_id']} onChange={handleChangeID} />
          </div>
          <button onClick={handleClicked} class="btn btn-primary btn-lg" style={{ float: 'left', marginRight: '8px' }}>Delete</button>
        </div>
      </div>
    </div>
  );
};

function DeleteQuery() {

  const [textFields, setTextFields] = useState({
    'child_id': '',
  });

  const clearTextFields = () => {
    setTextFields({
      'child_id': '',
    })
  }

  const [showSucceeded, setShowSucceeded] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
  }, []);


  const insertData = () => {
    fetch('https://y9ivhil2lh.execute-api.us-west-2.amazonaws.com/prod/', {
      method: "POST",
      body: JSON.stringify({
        table: 'delete',
        child_id: textFields['child_id'],
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.status === 'succeeded') {
          setShowSucceeded(true);
          clearTextFields();
          setTimeout(() => {
            setShowSucceeded(false);
          }, 5000);
        } else {
          console.log('Invalid status:', json.status);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 5000);
        }
      })
      .catch(error => console.error(error));
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <h1 style={{ marginBottom: '20px', color: 'black' }}>Delete Child</h1>
      <FormRow insertData={insertData} textFields={textFields} setTextFields={setTextFields} />
      {
        showSucceeded && <div className="alert alert-success position-fixed fixed-top" role="alert"> Successfully deleted child! </div>
      }
      {
        showError && <div className="alert alert-danger position-fixed fixed-top" role="alert"> Error: The entered ID does not exist or your input is invalid </div>
      }
    </div>
  );
}

export default DeleteQuery;