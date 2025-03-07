import React from "react";

function Dashboard() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-8">
        <div className="card shadow-lg p-4 text-center">
          <h2 className="mb-4">Dashboard</h2>
          <p>Welcome to your Expense Tracker Dashboard.</p>

          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card text-white bg-primary mb-3 shadow">
                <div className="card-body">
                  <h5 className="card-title">Total Savings</h5>
                  <p className="card-text">₹ 50,000</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card text-white bg-danger mb-3 shadow">
                <div className="card-body">
                  <h5 className="card-title">Total Expenses</h5>
                  <p className="card-text">₹ 20,000</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <button className="btn btn-success me-2">Add Income</button>
            <button className="btn btn-warning">Add Expense</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
