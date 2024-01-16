import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faX } from '@fortawesome/free-solid-svg-icons'

const Checkbox = ({ labelText, checkedColumns, setCheckedColumns }) => {

  const handleClicked = () => {
    setCheckedColumns({
      ...checkedColumns,
      [labelText]: !checkedColumns[labelText],
    })
  }

  return (
    <div style={{float: 'left', marginRight: '8px'}}>
      <input onClick={handleClicked} checked={checkedColumns[labelText]} type="checkbox" className="btn-check" id={`btn-check-${labelText}`} autoComplete="off" />
      <label className="btn btn-outline-dark" htmlFor={`btn-check-${labelText}`}>{labelText}</label>
    </div>
  );
};

const CheckboxRow = ({ checkedColumns, setCheckedColumns, getData }) => {
  const checkboxLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Start Time', 'End Time'];

  


  const handleClicked = () => {
    getData()
  }

  return (
    <div class="container" style={{marginBottom: '24px'}}>
      <div class="row align-items-start">
        <div class="col">
          {checkboxLabels.map((label, index) => (
            <Checkbox key={index} labelText={label} checkedColumns={checkedColumns} setCheckedColumns={setCheckedColumns} />
          ))}
          <button onClick={handleClicked}className="btn btn-primary" style={{float: 'left'}}>Apply</button>
        </div>
      </div>
    </div>  
  );
};



const Table = ({ checkedColumns, setCheckedColumns, data}) => {
  const jsonToColName = {
    'monday': 'Monday',
    'tuesday': 'Tuesday',
    'wednesday': 'Wednesday',
    'thursday': 'Thursday',
    'friday':  'Friday',
    'saturday': 'Saturday',
    'sunday': 'Sunday',
    'start_ime': 'Start Time',
    'end_time': 'End Time',
  };

  const doesColExist = (col) => {
    if (!data || data.length === 0) {
      return false;
    }
    return col in data[0];
  }

  const FormatVal = (input) => {
    if(input) {
      return <FontAwesomeIcon icon={faX}/>;
    } else {
      return <></>;
    }
  }

  return (
    <div className="container mt-4">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Schedule ID</th>
            {doesColExist("start_time") && <th>Start Time</th>}
            {doesColExist("end_time") && <th>End Time</th>}
            {doesColExist("monday") && <th>Monday</th>}
            {doesColExist("tuesday") && <th>Tuesday</th>}
            {doesColExist("wednesday") && <th>Wednesday</th>}
            {doesColExist("thursday") && <th>Thursday</th>}
            {doesColExist("friday") && <th>Friday</th>}
            {doesColExist("saturday") && <th>Saturday</th>}
            {doesColExist("sunday") && <th>Sunday</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((schedule, index) => (
            <tr key={index}>
              <td>{schedule.schedule_id}</td>
              {doesColExist("start_time") && <td>{schedule.start_time}</td>}
              {doesColExist("end_time") && <td>{schedule.end_time}</td>}
              {doesColExist("monday") && <td>{FormatVal(schedule.monday)}</td>}
              {doesColExist("tuesday") && <td>{FormatVal(schedule.tuesday)}</td>}
              {doesColExist("wednesday") && <td>{FormatVal(schedule.wednesday)}</td>}
              {doesColExist("thursday") && <td>{FormatVal(schedule.thursday)}</td>}
              {doesColExist("friday") && <td>{FormatVal(schedule.friday)}</td>}
              {doesColExist("saturday") && <td>{FormatVal(schedule.saturday)}</td>}
              {doesColExist("sunday") && <td>{FormatVal(schedule.sunday)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}



function ScheduleSelection() {
  const [checkedColumns, setCheckedColumns] = useState({
    'Monday': false,
    'Tuesday': false,
    'Wednesday': false,
    'Thursday': false,
    'Friday': false,
    'Saturday': false,
    'Sunday': false,
    'Start Time': false,
    'End Time': false,
  });


  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const params = `&monday=${checkedColumns['Monday']}&tuesday=${checkedColumns['Tuesday']}&wednesday=${checkedColumns['Wednesday']}&thursday=${checkedColumns['Thursday']}&friday=${checkedColumns['Friday']}&saturday=${checkedColumns['Saturday']}&sunday=${checkedColumns['Sunday']}&start_time=${checkedColumns['Start Time']}&end_time=${checkedColumns['End Time']}`

  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    setIsLoading(true);
    fetch('https://y9ivhil2lh.execute-api.us-west-2.amazonaws.com/prod/?table=schedule'+params)
      .then(response => response.json())
      .then(json => {
        setData(json)
        setIsLoading(false)
      })
      .catch(error => console.error(error));
  }


  return (
    <div style={{ marginBottom: '20px' }}>
      <h1 style={{ marginBottom: '20px',color: 'black'}}>Schedule Finder</h1>

      <CheckboxRow checkedColumns={checkedColumns} setCheckedColumns={setCheckedColumns} getData={getData}/>
      {
        isLoading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <Table checkedColumns={checkedColumns} setCheckedColumns={setCheckedColumns} data={data}/>
        )
      }
    </div>
  );
  
}

export default ScheduleSelection;