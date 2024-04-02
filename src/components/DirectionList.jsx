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
    <div className="" >
      {routes.map((route, routeIndex) => (
        <div className="directionlist ps-3" key={routeIndex} >
          <h3 className='pt-3' style={{ textAlign: 'center', color: '#F708a5'}} >Directions</h3><br></br>
          {route.legs.map((leg, legIndex) => (
            <div className="ps-4" key={legIndex}>
              {/* <h4>Leg {legIndex + 1}</h4> */}

              
              {(legIndex==0)?<h4 className="ps-2">{start} to {waypoint[0]}</h4>:<h4 className="ps-2">{waypoint[legIndex-1]} to {(waypoint[legIndex]!=undefined)?waypoint[legIndex]:start}</h4>}

              <ol className="ps-5" >
                {leg.steps.map((step, stepIndex) => (
                  <li className="ps-2" key={stepIndex} dangerouslySetInnerHTML={{ __html: step.instructions }} />
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
