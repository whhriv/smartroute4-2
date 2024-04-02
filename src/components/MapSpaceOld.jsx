// import { AdvancedMarkerElement } from "@googlemaps/markerjs";


import { useState, useEffect } from 'react'
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps"
import 'react-router-dom'
import Footer from './Footer'
// import NavBar from "./navbar"
// import GoogleMapsLink from './Mapping/GoogleMapsLink'
import { stringArraytoWaypoint, replaceSpace } from '../scripts/waypointFromString'
// import ErrorBoundary from './ErrorBoundary'

export default function DirectionMapSpace( {routes} ) {

    // let apiKey = process.env.GOOGLE_MAPS_API_KEY1

    // AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'

    return (
      <div style={{height: '80vh', width: "100%"}}>
        <APIProvider apiKey='AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'
        >

          <Map >
             
            <Directions />
           
            </Map>

          
        </APIProvider> 
        <Footer /> 
      </div>
    )

}



function Directions( {start, stops }){
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes')
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([])
  const [routeIndex, setRouteIndex] = useState(0);
  const [steps, setSteps] = useState()

  const selected = routes[routeIndex]
  // const leg = selected?.legs[0];


  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    let testArray=JSON.parse(sessionStorage.getItem("waypoints"));

    console.log(testArray);
    testArray= stringArraytoWaypoint(testArray);

    console.log(testArray);

    // getRouteTime("82 Eucalyptus Rd, Berkeley, CA 94705","Fisherman's Wharf, San Francisco, CA",directionsService);

    directionsService.route({
      origin: sessionStorage.getItem("startPoint"),
      // origin: 'san diego, ca',
      waypoints: testArray,
      destination:sessionStorage.getItem("startPoint"),
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    })
    .then((res) => {
      directionsRenderer.setDirections(res);
      console.log('RESULTS:', res);
      const routes = res.routes
      sessionStorage.setItem('directions', JSON.stringify(routes))
    
    
      res.routes.forEach((route, routeIndex) => {
        sessionStorage.setItem(`route${routeIndex}`, JSON.stringify(route));
        // console.log(`Route ${routeIndex + 1}:`, route);
      
  
        route.legs.forEach((leg, legIndex) => {
            const legMaker = new google.maps.Marker({ //google.maps.marker.AdvancedMarkerElement
              position: leg.start_location,
              map: map,
              icon: {
                url: '/smart_route_small_logo.png', 
                scaledSize: new google.maps.Size(40, 40), 
                labelOrigin: new google.maps.Point(20, 0),
              },
              label: {
                text:(legIndex === 0) ? 'START' : `STOP ${legIndex+1}`.toString(),
                fontSize: '14px',
                fontWeight:'bold',
                color: '#F708a5',
                

              }
            })


          let stopIndex =0

          leg.steps.forEach((step, stepIndex) => {
            

                        // directionsRenderer.setOptions({
                        //   markerOptions: {
                        //     icon: {
                        //       // url: '/smart_route_small_logo.png', 
                        //       scaledSize: new google.maps.Size(40, 40), 
                              
                        //     },

                        //     // label: (legIndex).toString(), 
                        //     label: (stepIndex === 0) ? 'Start' : (stopIndex +1).toString(),
                            

                          
                        //   },
                        // });
                        // if (stepIndex !==0) {
                        //   stopIndex++
                        // }

                              });
                          
          // leg.steps.forEach((step, stepIndex) => {
          //   // console.log(`    Step ${stepIndex + 1}:`, step);

          // });
        });
      });
    
      setRoutes(res.routes);
    })
    .catch((error) => {
        console.log("error fetching directions:", error)
    })

    directionsRenderer.setOptions({
      markerOptions: {
        icon: {
          url: '/smart_route_small_logo.png', 
          scaledSize: new google.maps.Size(10, 10), 
          
        },
      },
    });
  }, [directionsService, directionsRenderer]);

 let stretches = sessionStorage.getItem("waypoints")
 console.log('STRETCHES from MapSpace',stretches)

}

