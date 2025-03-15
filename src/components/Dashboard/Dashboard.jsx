import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api"; // Import the centralized axios instance

function Dashboard() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [savings, setSavings] = useState(null);
  const [detailedExpenses, setDetailedExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Predefined expense categories
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

  // Fetch user details, savings and detailed expenses
  useEffect(() => {
    if (!userId || userId === "undefined") {
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      try {
        // Fetch user details
        const userResponse = await api.get(`/users/${userId}`);
        setUserDetails(userResponse.data);

        // Fetch savings details
        try {
          const savingsResponse = await api.get(`/savings/${userId}`);
          setSavings(savingsResponse.data);
        } catch (err) {
          if (err.response && err.response.status === 404) {
            setSavings(null);
          } else {
            setError("Error fetching savings details.");
          }
        }

        // Fetch detailed expenses
        try {
          const expensesResponse = await api.get(`/expenses/${userId}`);
          setDetailedExpenses(expensesResponse.data);
        } catch (err) {
          console.error("Error fetching detailed expenses:", err);
          setError("Error fetching expense details.");
        }
      } catch (err) {
        setError("Error fetching user details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate, userId]);

  // Group expenses by category with default values for missing categories
  const groupedExpenses = expenseCategories.reduce((acc, category) => {
    acc[category] = {
      total: 0,
      description: "-",
      date: "-",
    };
    return acc;
  }, {});

  detailedExpenses.forEach((expense) => {
    const cat = expense.category;
    if (groupedExpenses[cat] !== undefined) {
      // Add the expense amount
      groupedExpenses[cat].total += Number(expense.amount);
      // Choose the latest expense for description and date
      const currentDate =
        groupedExpenses[cat].date === "-" ? 0 : new Date(groupedExpenses[cat].date).getTime();
      const expenseDate = expense.date ? new Date(expense.date).getTime() : 0;
      if (expenseDate > currentDate) {
        groupedExpenses[cat].description = expense.description || "-";
        groupedExpenses[cat].date = expense.date ? new Date(expense.date).toLocaleDateString() : "-";
      }
    }
  });

  if (loading) {
    return <div className="container text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container-fluid vh-100 bg-light p-4 text-center mt-5">
      <h1 className="text-primary fw-bold mb-5">Expense Tracker Dashboard</h1>
      {userDetails && <h2>Welcome, {userDetails.name}</h2>}
      
      {savings ? (
        <>
          <div className="mt-4">
            <h4>Total Balance: ₹ {savings.remainingBalance || 0}</h4>
          </div>
          <div className="mt-4">
            <h3>Expense Summary by Category</h3>
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Expense (₹)</th>
                  <th>Description</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {expenseCategories.map((category) => (
                  <tr key={category}>
                    <td>{category.replace(/_/g, " ")}</td>
                    <td>{groupedExpenses[category].total || 0}</td>
                    <td>{groupedExpenses[category].description}</td>
                    <td>{groupedExpenses[category].date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="mt-4">
          <h4>You do not have a savings account yet.</h4>
          <button className="btn btn-primary" onClick={() => navigate("/savings")}>
            Create Savings Account
          </button>
        </div>
      )}
      
      <div className="mt-4 d-flex justify-content-center gap-4">
        <button className="btn btn-warning px-4 py-2" onClick={() => navigate("/expense")}>
          Add Expense
        </button>
        <button className="btn btn-secondary px-4 py-2" onClick={() => navigate("/balance")}>
          Balance
        </button>
        <button className="btn btn-secondary px-4 py-2" onClick={() => navigate("/report")}>
          Report
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
