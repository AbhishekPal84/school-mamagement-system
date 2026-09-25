import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Classes() {
  const navigate = useNavigate();

  const [classes, setClasses] = useState(() => {
    const savedClasses = localStorage.getItem("classes");

    return savedClasses
      ? JSON.parse(savedClasses)
      : [
          {
            id: 1,
            className: "6th",
            section: "A",
            teacher: "Rahul Sharma",
            students: 35,
          },
          {
            id: 2,
            className: "10th",
            section: "A",
            teacher: "Priya Singh",
            students: 40,
          },
        ];
  });

  const [form, setForm] = useState({
    className: "",
    section: "",
    teacher: "",
    students: "",
  });

  const [editId, setEditId] = useState(null);

  const saveClasses = (data) => {
    setClasses(data);
    localStorage.setItem("classes", JSON.stringify(data));
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
      !form.className ||
      !form.section ||
      !form.teacher ||
      !form.students
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      const updatedClasses = classes.map((item) =>
        item.id === editId
          ? {
              ...item,
              ...form,
              students: Number(form.students),
            }
          : item
      );

      saveClasses(updatedClasses);
      setEditId(null);
    } else {
      const newClass = {
        id: Date.now(),
        className: form.className,
        section: form.section,
        teacher: form.teacher,
        students: Number(form.students),
      };

      saveClasses([...classes, newClass]);
    }

    setForm({
      className: "",
      section: "",
      teacher: "",
      students: "",
    });
  };

  const handleEdit = (item) => {
    setForm({
      className: item.className,
      section: item.section,
      teacher: item.teacher,
      students: item.students,
    });

    setEditId(item.id);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmDelete) return;

    const updatedClasses = classes.filter(
      (item) => item.id !== id
    );

    saveClasses(updatedClasses);
  };

  const handleCancel = () => {
    setEditId(null);

    setForm({
      className: "",
      section: "",
      teacher: "",
      students: "",
    });
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
          Class Management
        </h1>

        <span className="badge bg-primary fs-6">
          Total Classes: {classes.length}
        </span>

      </div>

      {/* Add / Edit Form */}
      <div className="card shadow mb-4">

        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">
            {editId ? "Edit Class" : "Add New Class"}
          </h4>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

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

              {/* Section */}
              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Section
                </label>

                <input
                  type="text"
                  name="section"
                  className="form-control"
                  placeholder="Enter section"
                  value={form.section}
                  onChange={handleChange}
                />

              </div>

              {/* Teacher */}
              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Class Teacher
                </label>

                <input
                  type="text"
                  name="teacher"
                  className="form-control"
                  placeholder="Enter teacher name"
                  value={form.teacher}
                  onChange={handleChange}
                />

              </div>

              {/* Students */}
              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Total Students
                </label>

                <input
                  type="number"
                  name="students"
                  className="form-control"
                  placeholder="Enter students"
                  min="0"
                  value={form.students}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="text-center">

              <button
                type="submit"
                className="btn btn-success me-2"
              >
                {editId
                  ? "✓ Update Class"
                  : "+ Add Class"}
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

      {/* Class List */}
      <div className="card shadow">

        <div className="card-body">

          <h3 className="text-center mb-4">
            Class List
          </h3>

          <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

              <thead className="table-primary">

                <tr>
                  <th>#</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Class Teacher</th>
                  <th>Students</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {classes.length === 0 ? (

                  <tr>
                    <td
                      colSpan="6"
                      className="text-center"
                    >
                      No classes found
                    </td>
                  </tr>

                ) : (

                  classes.map((item, index) => (

                    <tr key={item.id}>

                      <td>{index + 1}</td>

                      <td>
                        <span className="badge bg-info">
                          {item.className}
                        </span>
                      </td>

                      <td>
                        {item.section}
                      </td>

                      <td>
                        <strong>
                          {item.teacher}
                        </strong>
                      </td>

                      <td>
                        {item.students}
                      </td>

                      <td>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(item.id)
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

export default Classes;