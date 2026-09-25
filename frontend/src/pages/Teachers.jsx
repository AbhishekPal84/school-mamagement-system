import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Teachers() {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState(() => {
    const savedTeachers = localStorage.getItem("teachers");

    return savedTeachers
      ? JSON.parse(savedTeachers)
      : [
          {
            id: 1,
            name: "Rahul Sharma",
            subject: "Mathematics",
            email: "rahul@gmail.com",
            phone: "9876543210",
          },
        ];
  });

  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
  });

  const [editId, setEditId] = useState(null);

  const saveTeachers = (data) => {
    setTeachers(data);
    localStorage.setItem("teachers", JSON.stringify(data));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.subject || !form.email || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      const updatedTeachers = teachers.map((teacher) =>
        teacher.id === editId
          ? { ...teacher, ...form }
          : teacher
      );

      saveTeachers(updatedTeachers);
      setEditId(null);
    } else {
      const newTeacher = {
        id: Date.now(),
        ...form,
      };

      saveTeachers([...teachers, newTeacher]);
    }

    setForm({
      name: "",
      subject: "",
      email: "",
      phone: "",
    });
  };

  const handleEdit = (teacher) => {
    setForm({
      name: teacher.name,
      subject: teacher.subject,
      email: teacher.email,
      phone: teacher.phone,
    });

    setEditId(teacher.id);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmDelete) return;

    const updatedTeachers = teachers.filter(
      (teacher) => teacher.id !== id
    );

    saveTeachers(updatedTeachers);
  };

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
          Teacher Management
        </h1>

        <span className="badge bg-primary fs-6">
          Total Teachers: {teachers.length}
        </span>
      </div>

      {/* Add/Edit Teacher Form */}
      <div className="card shadow mb-4">

        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">
            {editId ? "Edit Teacher" : "Add New Teacher"}
          </h4>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              {/* Teacher Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Teacher Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter teacher name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              {/* Subject */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  placeholder="Enter subject"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              {/* Phone */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="text-center">

              <button
                type="submit"
                className="btn btn-success me-2"
              >
                {editId ? "✓ Update Teacher" : "+ Add Teacher"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditId(null);

                    setForm({
                      name: "",
                      subject: "",
                      email: "",
                      phone: "",
                    });
                  }}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>
      </div>

      {/* Teacher List */}
      <div className="card shadow">

        <div className="card-body">

          <h3 className="text-center mb-4">
            Teacher List
          </h3>

          <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

              <thead className="table-primary">

                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {teachers.length === 0 ? (

                  <tr>
                    <td
                      colSpan="6"
                      className="text-center"
                    >
                      No teachers found
                    </td>
                  </tr>

                ) : (

                  teachers.map((teacher, index) => (

                    <tr key={teacher.id}>

                      <td>{index + 1}</td>

                      <td>
                        <strong>{teacher.name}</strong>
                      </td>

                      <td>
                        <span className="badge bg-info">
                          {teacher.subject}
                        </span>
                      </td>

                      <td>{teacher.email}</td>

                      <td>{teacher.phone}</td>

                      <td>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(teacher)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(teacher.id)}
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

export default Teachers;