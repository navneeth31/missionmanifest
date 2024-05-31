
// import React from "react";
import React, { useEffect, useState } from 'react';
import "./Header.css";
import {Navbar , Nav, Container ,Button } from "react-bootstrap";
import {NavLink, useNavigate} from 'react-router-dom';
import {FcTodoList} from 'react-icons/fc'
import { useSelector } from "react-redux";
import { clearLoginStatus } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';

function Header(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let navigate = useNavigate();
    // let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
    //   (state) => state.user
    // );
    let { isSuccess } = useSelector(
      (state) => state.user
    );
    //get dispathc function
    let dispath = useDispatch();
    let userName = localStorage.getItem('username');
    userName = userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : null;
    useEffect(() => {
      // Function to check if token exists in LocalStorage
      const checkToken = () => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
      };
      checkToken();
    }, []);

    //logout user
    const userLogout = () => {
      Swal.fire({
        title: 'Are you sure you want to logout?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          dispath(clearLoginStatus());
          navigate("/login");
          setIsLoggedIn(false);
        }
      });
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" className="text-white">
        <Container fluid>
          <Navbar.Brand href="/"><FcTodoList size={32}/><b>MY TODO'S </b></Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={NavLink}  to="/">HOME</Nav.Link>
              <Nav.Link as={NavLink}  to="aboutus">ABOUT US</Nav.Link>
              {isLoggedIn || isSuccess ? <Nav.Link as={NavLink}  to="todolist">Todo List</Nav.Link> : <Nav.Link as={NavLink} to="register">REGISTER</Nav.Link> }
              <Nav.Link as={NavLink}  to="contact">CONTACT US</Nav.Link>
            </Nav>
            
            {isLoggedIn || isSuccess ?  (
                <Button className='m-2' variant="outline-primary" onClick={userLogout}>{ userName } | Logout</Button>
              ): (
                <>
            <Button className='m-2' variant="outline-primary" onClick={() => navigate('/login')}>Login</Button>
              </>)}
          </Navbar.Collapse>
        </Container>
      </Navbar>
        </div>
    );
}

export default Header;