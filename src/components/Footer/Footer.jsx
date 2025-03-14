import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center p-3 mt-auto">
      <div className="container">
        <p>
          Expense Tracker System &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
