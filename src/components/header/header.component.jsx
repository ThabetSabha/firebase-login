import React from "react";
import "./header.styles.scss";
//Router
import { Link } from "react-router-dom";

const Header = ({ signOut, user }) => {
  return (
    <>
      {user ? (
        <div className="header">
          <Link to="/" onClick={signOut}>
            SIGN OUT
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default Header;
