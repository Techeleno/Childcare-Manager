import React, { useState, useEffect } from "react";


const FormRow = ({ insertData, textFields, setTextFields }) => {

  const handleClicked = () => {
    insertData()
  }

  const handleChangeName = (event) => {
    setTextFields({
      ...textFields,
      ['activity_name']: event.target.value,
    })
  }

  const handleChangeType = (event) => {
    setTextFields({
      ...textFields,
      ['activity_type']: event.target.value,
    })
  }

  const handleChangeID = (event) => {
    setTextFields({
      ...textFields,
      ['employee_id']: event.target.value,
    })
  }


  return (
    <div class="container" style={{ marginBottom: '24px' }}>
      <div class="row align-items-start">
        <div class="col">
          <div class="form-group mx-sm-3">
            <input type="text" class="form-control-lg" placeholder="Activity Name" style={{ float: 'left', marginRight: '8px' }} value={textFields['activity_name']} onChange={handleChangeName} />
          </div>
          <div class="form-group mx-sm-3">
            <input type="text" class="form-control-lg" placeholder="Activity Type" style={{ float: 'left', marginRight: '8px' }} value={textFields['activity_type']} onChange={handleChangeType} />
          </div>
          <div class="form-group mx-sm-3">
            <input type="text" class="form-control-lg" placeholder="Employee ID" style={{ float: 'left', marginRight: '8px' }} value={textFields['employee_id']} onChange={handleChangeID} />
          </div>
          <button onClick={handleClicked} class="btn btn-primary btn-lg" style={{ float: 'left', marginRight: '8px' }}>Add</button>
        </div>
      </div>
    </div>
  );
};


function InsertActivity() {

  const [textFields, setTextFields] = useState({
    'activity_name': '',
    'activity_type': '',
    'employee_id': '',
  });

  const clearTextFields = () => {
    setTextFields({
      'activity_name': '',
      'activity_type': '',
      'employee_id': '',
    })
  }
  

  const [isLoading, setIsLoading] = useState(false);
  const [showSucceeded, setShowSucceeded] = useState(false);
  const [showDuplicate, setShowDuplicate] = useState(false);
  const [showNotExist, setShowNotExist] = useState(false);

  const params = `&activity_name=${textFields['activity_name']}&activity_type=${textFields['activity_type']}&employee_id=${textFields['employee_id']}`

  useEffect(() => {
  }, []);

  const insertData = () => {
    setIsLoading(true);
    fetch('https://y9ivhil2lh.execute-api.us-west-2.amazonaws.com/prod/', {
      method: "POST",
      body: JSON.stringify({
        table: 'activity',
        activity_name: textFields['activity_name'],
        activity_type: textFields['activity_type'],
        employee_id: textFields['employee_id']
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        setIsLoading(false)
        if (json.status === 'failed') {
          if(json.exception.includes("Duplicate entry")) {
            setShowDuplicate(true);
            setTimeout(()=>{
              setShowDuplicate(false);
            }, 5000);
          } else if(json.exception.includes("foreign key")) {
            setShowNotExist(true);
            setTimeout(()=>{
              setShowNotExist(false);
            }, 5000);
          }
        } else if (json.status === 'succeeded') {
          setShowSucceeded(true);
          clearTextFields();
          setTimeout(()=>{
            setShowSucceeded(false);
          }, 5000);
        } else {
          console.log('Invalid status:', json.status);
        }
      })
      .catch(error => console.error(error));
  }


  return (
    <div style={{ marginBottom: '20px' }}>
      <h1 style={{ marginBottom: '20px', color: 'black' }}>Add Activity</h1>
      <FormRow insertData={insertData} textFields={textFields} setTextFields={setTextFields} />
      {
        showSucceeded && <div className="alert alert-success position-fixed fixed-top" role="alert"> Successfully added activity! </div>
      }
      {
        showDuplicate && <div className="alert alert-danger position-fixed fixed-top" role="alert"> Error: Activity already exists </div>
      }
      {
        showNotExist && <div className="alert alert-danger position-fixed fixed-top" role="alert"> Error: Employee ID not found </div>
      }
    </div>
  );

}

export default InsertActivity;