import React, { useState } from "react";
import "./App.css";
import SelectionQuery from "./Components/Selection";
import AggregationGroupByQuery from "./Components/AggregationGroupBy";
import DivisionQuery from "./Components/Division";
import UpdateQuery from "./Components/Update";
import JoinQuery from "./Components/Join";
import ScheduleSelection from "./Components/ScheduleSelection";
import InsertActivity from "./Components/InsertActivity";
import DeleteQuery from "./Components/Delete";
import BranchFinder from "./Components/BranchFinder";
import NestedAg from "./Components/NestedAggregation";

function App() {
  const [activeComponent, setActiveComponent] = useState("Caretaker");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Caretaker":
        return (
          <>
            <SelectionQuery />
            {<DivisionQuery />}
            {<AggregationGroupByQuery />}
            {<NestedAg />}
          </>
        );

      case "Parent":
        return (
          <>
            <ScheduleSelection />
          </>
        );

      case "Management":
        return (
          <>
            <InsertActivity />
            {<DeleteQuery />}
            {<BranchFinder />}
            {<JoinQuery />}
            {<UpdateQuery />}
          </>
        );

      default:
        return null;
    }
  };

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="App">
      <nav>
        <button onClick={() => handleComponentChange("Caretaker")} class="btn btn-primary btn-lg" style={{ backgroundColor: 'coral', marginTop: '10px' }}>Caretaker View</button>
        <button onClick={() => handleComponentChange("Parent")} class="btn btn-primary btn-lg" style={{ backgroundColor: 'coral', marginTop: '10px' }}>Parent View</button>
        <button onClick={() => handleComponentChange("Management")} class="btn btn-primary btn-lg" style={{ backgroundColor: 'coral', marginTop: '10px' }}>Management View</button>
      </nav>

      {renderComponent()}
    </div>
  );
}

export default App;
