

import React, { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const EditRoute = () => {
  const startLoc = sessionStorage.getItem('startPoint'); // Get start location from sessionStorage
  const waypoints = JSON.parse(sessionStorage.getItem('waypoints')); // Get waypoints from sessionStorage and parse JSON
  const [startInput, setStartInput] = useState(startLoc); // Initialize startInput with startLoc
  const [fields, setFields] = useState(waypoints.map((waypoint) => ({ value: waypoint }))); // Initialize fields with waypoints
  const navigate = useNavigate();

  const handleChangeStart = (e) => {
    setStartInput(e.target.value);
  };

  const handleChangeStop = (index, e) => {
    const updatedFields = [...fields];
    updatedFields[index].value = e.target.value;
    setFields(updatedFields);
  };

  const addField = () => {
    setFields([...fields, { value: "" }]);
  };

  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here

    navigate('/MapSpaceOld');
  };

  return (
    <div className="main" style={{ borderRadius: '10%' }}>
      <h3 className="topText">Edit locations</h3>
      <FloatingLabel className="ms-3 me-5 pe-2 pt-3 mb-5 flex-grow-1" controlId="start" label="Starting Point">
        <Form.Control
          style={{ border: '1px solid black' }}
          className="w-100 startinput"
          type="text"
          placeholder="Starting Point"
          value={startInput} 
          onChange={handleChangeStart}
        ></Form.Control>
      </FloatingLabel>
      {fields.map((field, index) => (
        <div key={index} className="ms-3 my-2 d-flex align-items-center">
          <FloatingLabel controlId={`stop${index}`} label="Edit Stop" className="flex-grow-1">
            <Form.Control
              style={{ border: '1px solid black' }}
              className="w-100 inputctrl"
              type="text"
              placeholder="Edit Stop"
              value={field.value}
              onChange={(e) => handleChangeStop(index, e)}
            />
          </FloatingLabel>
          <Button className="ms-2" variant="outline-danger" size="lg" onClick={() => removeField(index)}>-</Button>
        </div>
      ))}
      <div className="mt-3 mb-1 me-5 d-flex justify-content-end">
        <Button variant="primary" className="btnsize" onClick={addField}>+</Button>
      </div>
      <div className="mb-5 pb-5 d-flex justify-content-center">
        <Button className="my-4" variant="success" onClick={handleFormSubmit}>Save Changes</Button>
      </div>
    </div>
  );
};

export default EditRoute;




// import React, { useState } from "react";
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { useNavigate } from 'react-router-dom';

// let startLoc = sessionStorage.getItem('startPoint')
// let waypoints = sessionStorage.getItem('waypoints')

// const EditRoute = ({ start, stops = [] }) => {
//   const [startInput, setStartInput] = useState(startLoc); // Initialize startInput with startLoc
//   const [fields, setFields] = useState(stops.map((stop) => ({ value: stop })));
//   const navigate = useNavigate();

//   const handleChangeStart = (e) => {
//     setStartInput(e.target.value);
//   };

//   const handleChangeStop = (index, e) => {
//     const updatedFields = [...fields];
//     updatedFields[index].value = e.target.value;
//     setFields(updatedFields);
//   };

//   const addField = () => {
//     setFields([...fields, { value: "" }]);
//   };

//   const removeField = (index) => {
//     const updatedFields = [...fields];
//     updatedFields.splice(index, 1);
//     setFields(updatedFields);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here

//     navigate('/MapSpaceOld');
//   };

//   return (
//     <div className="main" style={{ borderRadius: '10%' }}>
//       <h5 className="topText">Edit locations</h5>
//       <FloatingLabel className="ms-3 me-5 pe-2 pt-3 mb-5 flex-grow-1" controlId="start" label="Starting Point">
//         <Form.Control
//           style={{ border: '1px solid black' }}
//           className="w-100 startinput"
//           type="text"
//           placeholder="Starting Point"
//           value={startInput} // Set value to startInput
//           onChange={handleChangeStart}
//         ></Form.Control>
//       </FloatingLabel>
//       {fields.map((field, index) => (
//         <div key={index} className="ms-3 my-2 d-flex align-items-center">
//           <FloatingLabel controlId={`stop${index}`} label="Edit Stop" className="flex-grow-1">
//             <Form.Control
//               style={{ border: '1px solid black' }}
//               className="w-100 inputctrl"
//               type="text"
//               placeholder="Edit Stop"
//               value={field.value}
//               onChange={(e) => handleChangeStop(index, e)}
//             />
//           </FloatingLabel>
//           <Button className="ms-2" variant="outline-danger" size="lg" onClick={() => removeField(index)}>Remove</Button>
//         </div>
//       ))}
//       <div className="mt-3 mb-1 me-5 d-flex justify-content-end">
//         <Button variant="primary" className="btnsize" onClick={addField}>+</Button>
//       </div>
//       <div className="mb-5 pb-5 d-flex justify-content-center">
//         <Button className="my-4" variant="success" onClick={handleFormSubmit}>Save Changes</Button>
//       </div>
//     </div>
//   );
// };

// export default EditRoute;
