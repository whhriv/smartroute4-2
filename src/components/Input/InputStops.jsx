



import React, { useState, createContext, useContext } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import {getRouteTime, getFullRouteTime, getFullRouteTimeMinutes} from "../../scripts/compareRoutes"
// import GetDirectionMapOver from "../geolocation/GetDirectionsMapOver";
import { wait } from "../../scripts/utils";
// const ResponsesContext = createContext(null)
// import { initAutocomplete,initAutocompleteAllFields } from "../../scripts/autocomplete";s

import Autocomplete from "react-google-autocomplete";


const InputStops = () => {
  const [fields, setFields] = useState([{ label: "Stop", type: "text" }]);
  const [start, setStart] = useState("");
  const [loading, setLoading] = useState(false)
  
  // const ResponsesContext = createContext(null)
  // const [responses, setResponses] = useState(null)

  //                   const [showButton, setShowButton] = useState(false);
  //                   const [currentIndex, setCurrentIndex] = useState(null);
  //                             const handleMouseEnter = (index) => {
  //                               setCurrentIndex(index);
  //                               setShowButton(true);
  //                             };

  //                             const handleMouseLeave = () => {
  //                               setShowButton(false);
  //                             };

  sessionStorage.setItem('startPoint', start)

  const navigate = useNavigate()
  const addField = () => {
    setFields([...fields, { label: "Stop", type: "text" }]);
  };

  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].value = value;
    console.log('UPDATING STOPS', updatedFields)
    setFields(updatedFields);
  };
// Saves Start and Stop  Variables




const handleFormSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  let startingLocation = start;
  const stops = fields.map((field) => field.value);

  const directionsService = new google.maps.DirectionsService();
  
  // Need to permute times
  // feed permute routes into google maps instead of stretches?
  
  const permutations = permute(stops)
  let fastestTime = Infinity
  let fastestRoute = []

  // The fastest route function works, but had to be wrapped in a promise
new Promise((resolve, reject)=>{
    permutations.forEach(async (perm,index, array) => {

      console.log("Perumutation: "+perm);
      // const totalTime = await calculateRouteTime(startingLocation, perm, startingLocation,directionsService)
      const totalTime = await getFullRouteTime(startingLocation, perm, startingLocation,directionsService )
      sessionStorage.setItem("FooterTime", await getFullRouteTimeMinutes(startingLocation, perm, startingLocation,directionsService));

      console.log("total time: "+totalTime)
        if (totalTime < fastestTime) {
          fastestTime = totalTime
          fastestRoute = perm
          console.log("Fastest Route is "+fastestRoute)
        }

        if(index=array.length-1){
          resolve();
        }
    }
    
    )
  }).then(
    async ()=>{
      console.log('fastest overall route is...', fastestRoute)
      sessionStorage.setItem("waypoints",JSON.stringify(fastestRoute));
      setTimeout(() => { navigate('/MapSpaceOld'); }, 500)

    }

  )


};


  return (
    
    <div style={{borderRadius: '10%'}}>
      <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbUVVfWx2Ghaty0_o6toUor2W2UZLH1ro&libraries=places"></script>
      <h5 className="topText" style={{fontSize:"1.5em"}}>Mix and match stops -
        <br></br>
       We'll map the smartest route.
      </h5>
    <FloatingLabel className="ms-3 me-5 pe-2 pt-3 mb-5 flex-grow-1" controlId="start" >
      <Form.Control
        hidden="true"
        name="formInput"
        className="w-100"
        type="text"
        placeholder="Starting Point"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <Autocomplete
       style={{borderRadius:".5em", outlineColor:"black",fontSize:"1.5em",padding:".5em",width:"90%",backgroundColor:"#FFFFFF"}}
        placeholder="Starting Point"
        className="autocomplete"
        apiKey={"AIzaSyDbUVVfWx2Ghaty0_o6toUor2W2UZLH1ro"}
        onPlaceSelected={(place) => {
          document.getElementById("start").value=place.formatted_address;
          setStart(place.formatted_address)
        }}
        options={{
          types: ["geocode"],
        }}
      />
    </FloatingLabel>
    {/* {initAutocomplete("start")} */}
    {fields.map((field, index) => (
      <div key={index} className="ms-3 my-2 d-flex align-items-center ">
        <FloatingLabel controlId={`stop${index}`} className="flex-grow-1">
          <Form.Control
            hidden="false"
            className="w-100 inputctrl"
            type="text"
            placeholder="Add Stop"
            value={field.value || ""}
            // onChange={(e) => handleChange(index, e)}
          />
        <Autocomplete
          style={{outlineColor:"black",borderRadius:".5em",fontSize:"1.5em",padding:".5em",width:"90%",borderColor:"black", backgroundColor:"#FFFFFF"}}
          placeholder="Add Stop"
          className="autocomplete"
          apiKey={"AIzaSyDbUVVfWx2Ghaty0_o6toUor2W2UZLH1ro"}
        onPlaceSelected={(place) => {
          console.log(place)
          document.getElementById(`stop${index}`).value=place.formatted_address;
          handleChange(index, place.formatted_address)
        }}
        options={{
          types: ["geocode"],
        }}
      />
        </FloatingLabel>
        <Button className="ms-2" variant="outline-danger" style={{backgroundColor:"#F708a5",color:"white"}} size="lg" onClick={() => removeField(index)}>
          -
        </Button>
      </div>
    ))
    }
    {/* {initAutocompleteAllFields(fields)} */}
    <div className="mt-3 mb-1 me-5 d-flex justify-content-end">
      <Button variant="primary" className="btnsize"  onClick={addField}>+
      </Button>
    </div>
    <div className="mb-5 pb-5 d-flex justify-content-center">
      <Button className="my-4" variant="success" style={{borderRadius:".5em",fontSize:"1.5em"}} onClick={handleFormSubmit}>Generate Smart Route</Button>
    </div>
  </div>
);
};

export default InputStops;


//MOVE TO OWN JSX ELEMENT
//needs to record time - but should if input aligns. 
                function permute(arr) {
                  const result = [];

                  function permuteHelper(arr, start) {
                      if (start === arr.length - 1) {
                          result.push([...arr]);
                          return;
                      }

                      for (let i = start; i < arr.length; i++) {
                          [arr[start], arr[i]] = [arr[i], arr[start]]; // Swap elements
                          permuteHelper(arr, start + 1);
                          [arr[start], arr[i]] = [arr[i], arr[start]]; // Restore original array
                      }
                  }

                  permuteHelper(arr, 0);
                  console.log('permutations', result)
                  return result;
                }

                // Function to calculate the total time for a route
                async function calculateRouteTime(origin, stops, destination, directionsService) {
                  let totalTime = 0;
                
                  for (let i = 0; i < stops.length; i++) {
                    totalTime += await getRouteTime(origin, stops[i],directionsService);
                    origin = stops[i];
                  }
                
                  totalTime += await getRouteTime(origin, destination,directionsService);
                  return totalTime;
                }
                