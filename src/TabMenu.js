import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import './TabMenu.css';


function TabMenu() {
  const location = useLocation();

  return (
    <Nav variant="tabs" activeKey={location.pathname}>
      <Nav.Item>
        <Nav.Link as={Link} to="/home" eventKey="/home">
          Stok Barang Bahan Baku
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/about" eventKey="/about">
          About
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default TabMenu;
