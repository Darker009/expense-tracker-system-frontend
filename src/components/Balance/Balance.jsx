import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Balance() {
  const navigate = useNavigate();
  const [savings, setSavings] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [loadingExpenses, setLoadingExpenses] = useState(true);

  // Filters for expenses
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const userId = localStorage.getItem("userId");

  // Fetch savings details (balance)
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/savings/${userId}`);
        setSavings(response.data);
      } catch (err) {
        console.error("Error fetching balance:", err);
        setError("Error fetching balance");
      } finally {
        setLoadingBalance(false);
      }
    };
    if (userId) fetchBalance();
  }, [userId]);

  // Fetch expense list
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/expenses/${userId}`);
        setExpenses(response.data);
      } catch (err) {
        console.error("Error fetching expenses:", err);
        setError("Error fetching expenses");
      } finally {
        setLoadingExpenses(false);
      }
    };
    if (userId) fetchExpenses();
  }, [userId]);

  // Delete an expense by ID
  const handleDeleteExpense = async (expenseId) => {
    try {
      await axios.delete(`http://localhost:8080/api/expenses/${expenseId}`);
      // Refresh expenses list
      const response = await axios.get(`http://localhost:8080/api/expenses/${userId}`);
      setExpenses(response.data);
    } catch (err) {
      console.error("Error deleting expense:", err);
      setError("Failed to delete expense");
    }
  };

  // Filter expenses by category and/or date range
  const handleFilterExpenses = async () => {
    try {
      let url = `http://localhost:8080/api/expenses/${userId}`;
      // If category filter is provided, use the category endpoint
      if (categoryFilter) {
        url = `http://localhost:8080/api/expenses/${userId}/category/${categoryFilter}`;
      }
      // If both start and end dates are provided, use the date range endpoint
      if (startDate && endDate) {
        url = `http://localhost:8080/api/expenses/${userId}/date?startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await axios.get(url);
      setExpenses(response.data);
    } catch (err) {
      console.error("Error filtering expenses:", err);
      setError("Error filtering expenses");
    }
  };

  // Reset filters and refetch all expenses
  const handleResetFilters = async () => {
    setCategoryFilter("");
    setStartDate("");
    setEndDate("");
    try {
      const response = await axios.get(`http://localhost:8080/api/expenses/${userId}`);
      setExpenses(response.data);
    } catch (err) {
      console.error("Error resetting filters:", err);
      setError("Error resetting filters");
    }
  };

  if (!userId || userId === "undefined") {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Balance & Expense Management</h2>
      
      {error && <p className="text-danger text-center">{error}</p>}
      
      {loadingBalance ? (
        <p>Loading balance...</p>
      ) : savings ? (
        <div className="text-center mb-4">
          {/* Display remaining balance as total balance */}
          <h4>Total Balance: ₹ {savings.remainingBalance || 0}</h4>
        </div>
      ) : (
        <p className="text-center">No savings account found.</p>
      )}

      {/* Expense Filtering Controls */}
      <div className="mb-4">
        <h5 className="text-center">Filter Expenses</h5>
        <div className="d-flex justify-content-center gap-3">
          <select
            className="form-select w-auto"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="RECHARGE">Recharge</option>
            <option value="EMI">EMI</option>
            <option value="ELECTRICITY_BILL">Electricity Bill</option>
            <option value="FITNESS">Fitness</option>
            <option value="CLOTHING">Clothing</option>
            <option value="MEDICAL">Medical</option>
            <option value="FOOD">Food</option>
            <option value="DONATION">Donation</option>
          </select>
          <input
            type="date"
            className="form-control w-auto"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="form-control w-auto"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button className="btn btn-info" onClick={handleFilterExpenses}>
            Filter
          </button>
          <button className="btn btn-secondary" onClick={handleResetFilters}>
            Reset
          </button>
        </div>
      </div>

      {/* Expense List */}
      {loadingExpenses ? (
        <p>Loading expenses...</p>
      ) : expenses.length === 0 ? (
        <p className="text-center">No expenses found.</p>
      ) : (
        <div>
          <h4 className="text-center">Your Expenses</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount (₹)</th>
                <th>Description</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.category.replace(/_/g, " ")}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.description || "-"}</td>
                  <td>{expense.date ? new Date(expense.date).toLocaleDateString() : "-"}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteExpense(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Balance;
