import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        BOOKWORM
      </a>
      <div>
        <ul className="navbar-nav">
          <li className="nav-item right">
            <Link
              to="/saved"
              className={
                window.location.pathname === "/saved" || window.location.pathname === "/"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Saved Books
            </Link>
          </li>
        </ul>
      </div>    
    </nav>
  );
}

export default Nav;
