import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Fees() {
  const navigate = useNavigate();

  const [fees, setFees] = useState(() => {
    const savedFees = localStorage.getItem("fees");

    return savedFees
      ? JSON.parse(savedFees)
      : [
          {
            id: 1,
            student: "Priya Singh",
            className: "10th",
            amount: 5000,
            status: "Paid",
          },
          {
            id: 2,
            student: "Abhishek Pal",
            className: "6th",
            amount: 4000,
            status: "Pending",
          },
        ];
  });

  const [form, setForm] = useState({
    student: "",
    className: "",
    amount: "",
    status: "Paid",
  });

  const [editId, setEditId] = useState(null);

  const saveFees = (data) => {
    setFees(data);
    localStorage.setItem("fees", JSON.stringify(data));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.student ||
      !form.className ||
      !form.amount ||
      !form.status
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      const updatedFees = fees.map((fee) =>
        fee.id === editId
          ? {
              ...fee,
              ...form,
              amount: Number(form.amount),
            }
          : fee
      );

      saveFees(updatedFees);
      setEditId(null);
    } else {
      const newFee = {
        id: Date.now(),
        student: form.student,
        className: form.className,
        amount: Number(form.amount),
        status: form.status,
      };

      saveFees([...fees, newFee]);
    }

    setForm({
      student: "",
      className: "",
      amount: "",
      status: "Paid",
    });
  };

  const handleEdit = (fee) => {
    setForm({
      student: fee.student,
      className: fee.className,
      amount: fee.amount,
      status: fee.status,
    });

    setEditId(fee.id);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this fee record?"
    );

    if (!confirmDelete) return;

    const updatedFees = fees.filter(
      (fee) => fee.id !== id
    );

    saveFees(updatedFees);
  };

  const handleCancel = () => {
    setEditId(null);

    setForm({
      student: "",
      className: "",
      amount: "",
      status: "Paid",
    });
  };

  const totalCollected = fees
    .filter((fee) => fee.status === "Paid")
    .reduce((total, fee) => total + Number(fee.amount), 0);

  const totalPending = fees
    .filter((fee) => fee.status === "Pending")
    .reduce((total, fee) => total + Number(fee.amount), 0);

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <button
          className="btn btn-dark"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>

        <h1 className="text-primary">
          Fee Management
        </h1>

        <span className="badge bg-primary fs-6">
          Total Records: {fees.length}
        </span>

      </div>

      {/* Summary */}
      <div className="row mb-4">

        <div className="col-md-6 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5 className="text-success">
                Total Collected
              </h5>

              <h3>
                ₹{totalCollected}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5 className="text-warning">
                Total Pending
              </h5>

              <h3>
                ₹{totalPending}
              </h3>
            </div>
          </div>
        </div>

      </div>

      {/* Add/Edit Fee */}
      <div className="card shadow mb-4">

        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">
            {editId ? "Edit Fee Record" : "Add Fee Record"}
          </h4>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              {/* Student */}
              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Student Name
                </label>

                <input
                  type="text"
                  name="student"
                  className="form-control"
                  placeholder="Enter student name"
                  value={form.student}
                  onChange={handleChange}
                />

              </div>

              {/* Class */}
              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Class
                </label>

                <input
                  type="text"
                  name="className"
                  className="form-control"
                  placeholder="Enter class"
                  value={form.className}
                  onChange={handleChange}
                />

              </div>

              {/* Amount */}
              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Fee Amount
                </label>

                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  placeholder="Enter amount"
                  min="0"
                  value={form.amount}
                  onChange={handleChange}
                />

              </div>

              {/* Status */}
              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Payment Status
                </label>

                <select
                  name="status"
                  className="form-select"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>

              </div>

            </div>

            <div className="text-center">

              <button
                type="submit"
                className="btn btn-success me-2"
              >
                {editId
                  ? "✓ Update Fee"
                  : "+ Add Fee"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>
      </div>

      {/* Fee Records */}
      <div className="card shadow">

        <div className="card-body">

          <h3 className="text-center mb-4">
            Fee Records
          </h3>

          <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

              <thead className="table-primary">

                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {fees.length === 0 ? (

                  <tr>
                    <td
                      colSpan="6"
                      className="text-center"
                    >
                      No fee records found
                    </td>
                  </tr>

                ) : (

                  fees.map((fee, index) => (

                    <tr key={fee.id}>

                      <td>{index + 1}</td>

                      <td>
                        <strong>
                          {fee.student}
                        </strong>
                      </td>

                      <td>
                        <span className="badge bg-info">
                          {fee.className}
                        </span>
                      </td>

                      <td>
                        ₹{fee.amount}
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            fee.status === "Paid"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {fee.status}
                        </span>

                      </td>

                      <td>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            handleEdit(fee)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(fee.id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Fees;