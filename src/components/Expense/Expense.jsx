import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api"; // Import the centralized API instance

function Expense() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    category: "RECHARGE", // default category
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const expenseCategories = [
    "RECHARGE",
    "EMI",
    "ELECTRICITY_BILL",
    "FITNESS",
    "CLOTHING",
    "MEDICAL",
    "FOOD",
    "DONATION",
  ];

  const userId = localStorage.getItem("userId");

  // Fetch expenses on component mount and after any update
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    if (!userId) {
      setError("User not logged in.");
      return;
    }
    try {
      setLoading(true);
      const res = await api.get(`/expenses/${userId}`);
      setExpenses(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError("Error fetching expenses.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!userId) {
      setError("User not logged in.");
      return;
    }
    try {
      await api.post(`/expenses/${userId}`, formData);
      // Refresh the list after adding expense
      fetchExpenses();
      // Clear form fields
      setFormData({ amount: "", category: "RECHARGE", description: "" });
    } catch (err) {
      console.error("Error adding expense:", err);
      setError("Failed to add expense. Please try again.");
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      await api.delete(`/expenses/${expenseId}`);
      fetchExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
      setError("Failed to delete expense. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Expense Page</h2>
      <p>This is the page where you can add, view, and delete expenses.</p>
      <button className="btn btn-primary mb-3" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

      {error && <p className="text-danger">{error}</p>}

      {/* Expense Form */}
      <div className="card p-3 mb-4">
        <h4>Add Expense</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              className="form-control"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {expenseCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Add Expense
          </button>
        </form>
      </div>

      {/* Expense List */}
      <div>
        <h4>Your Expenses</h4>
        {loading ? (
          <p>Loading expenses...</p>
        ) : expenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
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
                      onClick={() => handleDelete(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Expense;
