import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="container text-center" style={{ marginTop: "100px" }}>
      <h1>Welcome to Expense Tracker</h1>
      <p>Track your expenses efficiently.</p>
      <Link to="/login" className="btn btn-primary">Login</Link>
    </div>
  );
}

export default Welcome;
