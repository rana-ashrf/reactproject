import { useState, useEffect } from "react";
import "../styles/Profile.css";

function Profile() {
  const [editMode, setEditMode] = useState(false);

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    addresses: [],
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};

    setUser({
      fullName: storedUser.fullName || "",
      email: storedUser.email || "",
      phone: storedUser.phone || "",
      gender: storedUser.gender || "",
      dob: storedUser.dob || "",
      addresses: Array.isArray(storedUser.addresses)
        ? storedUser.addresses
        : [],
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-field">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={user.fullName}
          onChange={handleChange}
          disabled={!editMode}
        />
      </div>

      <div className="profile-field">
        <label>Email</label>
        <input type="email" value={user.email} disabled />
      </div>

      <div className="profile-field">
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          disabled={!editMode}
        />
      </div>

      <div className="profile-field">
        <label>Gender</label>
        <select
          name="gender"
          value={user.gender}
          onChange={handleChange}
          disabled={!editMode}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="profile-field">
        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={user.dob}
          onChange={handleChange}
          disabled={!editMode}
        />
      </div>

      

      <div className="profile-actions">
        {!editMode ? (
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        ) : (
          <button onClick={handleSave}>Save Changes</button>
        )}
      </div>
    </div>
  );
}

export default Profile;

