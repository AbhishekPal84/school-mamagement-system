import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Priya Singh",
            roll: "102",
            className: "10th",
            email: "priya@gmail.com",
            phone: "9876543211",
          },
          {
            id: 2,
            name: "ABHISHEK PAL",
            roll: "100",
            className: "6th",
            email: "abhishek@gmail.com",
            phone: "8619642352",
          },
        ];
  });

  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [className, setClassName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [editId, setEditId] = useState(null);

  const saveStudents = (data) => {
    setStudents(data);
    localStorage.setItem("students", JSON.stringify(data));
  };

  const handleSubmit = () => {
    if (!name || !roll || !className || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      const updated = students.map((student) =>
        student.id === editId
          ? {
              ...student,
              name,
              roll,
              className,
              email,
              phone,
            }
          : student
      );

      saveStudents(updated);
      setEditId(null);
    } else {
      const newStudent = {
        id: Date.now(),
        name,
        roll,
        className,
        email,
        phone,
      };

      saveStudents([...students, newStudent]);
    }

    clearForm();
  };

  const editStudent = (student) => {
    setEditId(student.id);
    setName(student.name);
    setRoll(student.roll);
    setClassName(student.className);
    setEmail(student.email);
    setPhone(student.phone);
  };

  const deleteStudent = (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    const updated = students.filter((student) => student.id !== id);
    saveStudents(updated);
  };

  const clearForm = () => {
    setName("");
    setRoll("");
    setClassName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>

        <h1 className="text-primary mb-0">
          Student Management
        </h1>

        <span className="badge bg-primary fs-6">
          Total Students: {students.length}
        </span>
      </div>

      {/* Add / Edit Student */}
      <div className="card shadow-sm mb-4">

        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">
            {editId ? "Edit Student" : "Add New Student"}
          </h4>
        </div>

        <div className="card-body">

          <div className="row g-3">

            <div className="col-md-6">
              <label className="form-label">Student Name</label>

              <input
                className="form-control"
                placeholder="Enter student name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Roll Number</label>

              <input
                className="form-control"
                placeholder="Enter roll number"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Class</label>

              <input
                className="form-control"
                placeholder="Enter class"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Email</label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Phone</label>

              <input
                className="form-control"
                placeholder="Enter phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="col-12 text-center">

              <button
                className="btn btn-success px-4 me-2"
                onClick={handleSubmit}
              >
                {editId ? "✓ Update Student" : "+ Add Student"}
              </button>

              {editId && (
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditId(null);
                    clearForm();
                  }}
                >
                  Cancel
                </button>
              )}

            </div>

          </div>

        </div>
      </div>

      {/* Student List */}
      <div className="card shadow-sm">

        <div className="card-body">

          <h3 className="text-center mb-4">
            Student List
          </h3>

          <div className="table-responsive">

            <table className="table table-bordered table-hover text-center align-middle">

              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Roll No.</th>
                  <th>Class</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {students.map((student, index) => (
                  <tr key={student.id}>

                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.roll}</td>

                    <td>
                      <span className="badge bg-info">
                        {student.className}
                      </span>
                    </td>

                    <td>{student.email}</td>
                    <td>{student.phone}</td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editStudent(student)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteStudent(student.id)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Students;