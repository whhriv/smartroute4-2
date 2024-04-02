import React from 'react';
import Container from 'react-bootstrap/Container'
import { usePDF } from 'react-to-pdf';
import Footer from './Footer';
import { Button } from 'react-bootstrap'
import '../main.css'

function DirectionsList() {
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

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
          <Container style={{ height: '80%'}}>

      {routes.map((route, routeIndex) => (
        <div ref={targetRef} className="directionlist ps-3" key={routeIndex} >

          <Button className="pdfbutton" onClick={() => toPDF()}>Download PDF</Button>

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
      </Container>
      <Footer /> 
    </div>
   
  );
}
;

export default DirectionsList;
