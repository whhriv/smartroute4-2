// import React, { useState } from 'react';
// import {
//   MDBTabs,
//   MDBTabsItem,
//   MDBTabsLink,
//   MDBTabsContent,
//   MDBTabsPane
// } from 'mdb-react-ui-kit';
// import { useNavigate } from 'react-router-dom';
// import './navbar.css'

// export default function NavBar() {
//   const [activeTab, setActiveTab] = useState('VIEW');
//   const navigate = useNavigate();

//   const handleTabClick = (tabName) => {
//     setActiveTab(tabName);
//     if (tabName === 'VIEW') {
//       navigate('/MapSpaceOld');
//     } else if (tabName === 'LIST') {
//       navigate('/DirectionsList');
//     }
//   };

//   return (
//     <>
//       <MDBTabs pills className='mb-3 ' style={{ textAlign: 'center', color: '#A1C65B' }}>
//         <MDBTabsItem className='navtabs' >
//           <MDBTabsLink
//             onClick={() => handleTabClick('VIEW')}
//             active={activeTab === 'VIEW'}
            
//           >
//             VIEW
//           </MDBTabsLink>
//         </MDBTabsItem>
//         <MDBTabsItem>
//           <MDBTabsLink
//             onClick={() => handleTabClick('LIST')}
//             active={activeTab === 'LIST'}
//           >
//             LIST
//           </MDBTabsLink>
//         </MDBTabsItem>
//       </MDBTabs>

//       <MDBTabsContent>
//         <MDBTabsPane open={activeTab === 'VIEW'}>
//           {/* Content for VIEW tab */}
//         </MDBTabsPane>
//         <MDBTabsPane open={activeTab === 'LIST'}>
//           {/* Content for LIST tab */}
//         </MDBTabsPane>
//       </MDBTabsContent>
//     </>
//   );
// }



import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from 'react-bootstrap';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

import './navbar.css'
function NavBar() {
  return (


<Navbar expand="sm" className="bg-body-tertiary mx-auto flex-column flex-sm-row" data-bs-theme="dark">
<Container>

   
    <Nav variant="pills" className="mx-auto flex-column flex-sm-row">

        <Nav.Item>
            <Nav.Link className="tabs ps-4 pe-4 me-2" href="/MapSpaceOld">  VIEW  </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="tabs ps-4 me-3 pe-4" href="/DirectionsList">  LIST  </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="tabsedit ms-5 pt-0 pb-0 mt-4 me-4" href="/EditRoute">edit</Nav.Link>
        </Nav.Item>
    </Nav>
        <Navbar.Brand className=" pink " href="/CreateRoute">
        
            <Image src="/smart_route_small_logo.png" alt="SmartRoute" style={{ height: '40px' }} />
        </Navbar.Brand>
 
</Container>
</Navbar>
);
}

export default NavBar;