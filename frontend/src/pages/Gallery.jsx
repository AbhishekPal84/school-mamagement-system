import React, { useEffect , useState } from "react";
const isAdmin = localStorage.getItem("isAdmin") === "true";

function Gallery() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [gallery, setGallery] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/gallery/images/", {
  credentials: "include",
})
        .then((response) => response.json())
        .then((data) => {
            setGallery(data);
        })
        .catch((error) => {
            console.log("Gallery fetch error:", error);
        });
}, []);

const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
        "Kya aap is image ko delete karna chahte hain?"
    );

    if (!confirmDelete) return;

    try {
        const response = await fetch(
  `http://127.0.0.1:8000/api/gallery/images/?id=${id}`,
  {
    method: "DELETE",
    credentials: "include",
  }
);
        if (response.ok) {
            setGallery((prevGallery) =>
                prevGallery.filter((item) => item.id !== id)
            );

            setMessage("✅ Image successfully delete ho gayi!");
        } else {
            setMessage("❌ Image delete nahi hui.");
        }
    } catch (error) {
        console.log(error);
        setMessage("❌ Server se connection nahi ho raha.");
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      setMessage("Title aur image select karo.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await fetch(
  "http://127.0.0.1:8000/api/gallery/images/",
  {
    method: "POST",
    credentials: "include",
    body: formData,
  }
);

      if (response.ok) {
        setMessage("✅ Image successfully upload ho gayi!");
        setTitle("");
        setDescription("");
        setImage(null);
        document.getElementById("gallery-image").value = "";
      } else {
        setMessage("❌ Image upload nahi hui.");
      }
    } catch (error) {
      console.log(error);
      setMessage("❌ Server se connection nahi ho raha.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>🖼️ Add Gallery Image</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter image title"
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </div>

        <div className="mb-3">
          <label>Image</label>
          <input
            id="gallery-image"
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {isAdmin && (
  <button type="submit" className="btn btn-primary">
    📤 Upload Image
  </button>
)}

        <div className="mt-3 d-flex gap-2 align-items-center">

  <select
    className="form-control"
    value={selectedImageId}
    onChange={(e) => setSelectedImageId(e.target.value)}
  >
    <option value="">Select image to delete</option>

    {gallery.map((item) => (
      <option key={item.id} value={item.id}>
        {item.title}
      </option>
    ))}
  </select>

  {isAdmin && (
  <button
    type="button"
    className="btn btn-danger mt-2"
    onClick={() => handleDelete(selectedImageId)}
  >
    🗑️ Delete
  </button>
)}

</div>

      </form>

      {message && (
        <p className="mt-3">
          {message}
        </p>
      )}
    </div>
  );
}

export default Gallery;