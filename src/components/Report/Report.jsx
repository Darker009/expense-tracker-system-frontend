import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Report() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [month, setMonth] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handler to fetch the monthly report
  const handleGetReport = async (e) => {
    e.preventDefault();
    setError("");
    setReport(null);

    if (!month) {
      setError("Please select a month.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/reports/${userId}`, {
        params: { month },
      });
      setReport(response.data);
    } catch (err) {
      console.error("Error fetching report:", err);
      setError(
        err.response && err.response.data
          ? err.response.data
          : "Failed to fetch report. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Format the month string into a friendly format (e.g., "March 2025")
  const formatMonth = (monthStr) => {
    const date = new Date(monthStr);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Report</h2>
      <form onSubmit={handleGetReport} className="d-flex justify-content-center align-items-center gap-3 mb-4">
        <input
          type="month"
          className="form-control w-auto"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Get Report
        </button>
      </form>
      {loading && <p className="text-center">Loading report...</p>}
      {error && <p className="text-danger text-center">{error}</p>}
      {report && (
        <div className="card p-4">
          <h4 className="mb-3">Monthly Report for {formatMonth(report.month)}</h4>
          <div className="row mb-3">
            <div className="col-md-4">
              <strong>Total Income:</strong> ₹ {report.totalIncome}
            </div>
            <div className="col-md-4">
              <strong>Total Expense:</strong> ₹ {report.totalExpense}
            </div>
            <div className="col-md-4">
              <strong>Remaining Balance:</strong> ₹ {report.remainingBalance}
            </div>
          </div>
          <h5>Expense Breakdown:</h5>
          {report.expenseBreakdown ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(report.expenseBreakdown).map(([category, amount]) => (
                  <tr key={category}>
                    <td>{category.replace(/_/g, " ")}</td>
                    <td>{amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No expense breakdown available.</p>
          )}
        </div>
      )}
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Report;
