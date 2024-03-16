import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
export default function Navbar() {
  const [cookies, setCookie,removeCookie] = useCookies(['name']); 
  const logout = () => {
    window.confirm("You want to logout?");
    document.cookie.split(';').forEach(c => document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/');
    window.location.reload();
  }
  const [user, setUser] = useState('');

  useEffect(() => {
    const storedName = cookies.name;
    if (storedName) {
      setUser(storedName);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-transparent border-bottom shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand  bg-danger" to="/">EventBrite</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <form className="d-flex srch" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        </form>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {(!user == "") ?
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/se/a">Events</Link>
            </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/he">Host event</Link>
              </li> 

          </ul>
        :
        ""}
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {(!(user == "")) ?
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link  " aria-current="page" to="/se/m">My events</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  hover-shadow link-dark" aria-current="page" to="/">@{user}</Link>
              </li>
              <li className="nav-item">
              <button type="button" className="btn btn-danger m-1 btn-sm hover-shadow" onClick={logout}>Logout</button>
              </li>
              </ul>
              :
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <Link className="btn btn-primary btn-sm mx-1" to="/login" role="button">Login</Link>
                <Link className="btn btn-secondary btn-sm" to="/signup" role="button">Signup</Link>
              </div>
        }
          </div>
          </div>
    </nav>

  )
}
