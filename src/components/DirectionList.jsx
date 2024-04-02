import React from 'react';
import Footer from './Footer';
import '../main.css'

function DirectionsList() {
  const routesString = sessionStorage.getItem('directions');
  const routes = JSON.parse(routesString);

  const waypoint = JSON.parse(sessionStorage.getItem("waypoints"));
  const start = sessionStorage.getItem("startPoint");

  console.log(waypoint);
  console.log(start)

// if (!routes) {
//   return <div> no routes available</div>
// }

  return (
    <div >
      {routes.map((route, routeIndex) => (
        <div className="directionlist" key={routeIndex} >
          <h3>Directions</h3><br></br>
          {route.legs.map((leg, legIndex) => (
            <div key={legIndex}>
              {/* <h4>Leg {legIndex + 1}</h4> */}

              
              {(legIndex==0)?<h4>{start} to {waypoint[0]}</h4>:<h4>{waypoint[legIndex-1]} to {(waypoint[legIndex]!=undefined)?waypoint[legIndex]:start}</h4>}

              <ol>
                {leg.steps.map((step, stepIndex) => (
                  <li key={stepIndex} dangerouslySetInnerHTML={{ __html: step.instructions }} />
                ))}
              </ol>
            </div>
          ))}
        </div>
      ))}
      <Footer /> 
    </div>
  );
}
;

export default DirectionsList;
