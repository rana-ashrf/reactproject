import { useState, useEffect } from "react";
import "../styles/Profile.css";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";

function Profile() {
  const { user, login } = useAuth();
  const [editMode, setEditMode] = useState(false);

  const [userState, setUserState] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: ""
  });

  useEffect(() => {
    if (!user) return;

    setUserState({
      fullName: user.fullName || user.username || "",
      email: user.email || "",
      phone: user.phone || "",
      gender: user.gender || "",
      dob: user.dob || ""
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/users/${user.id}`,
        userState
      );

      // sync AuthContext + localStorage via login()
      login(res.data);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-field">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={userState.fullName}
          onChange={handleChange}
          disabled={!editMode}
        />
      </div>

      <div className="profile-field">
        <label>Email</label>
        <input
          type="email"
          value={userState.email}
          disabled
        />
      </div>

      <div className="profile-field">
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={userState.phone}
          onChange={handleChange}
          disabled={!editMode}
        />
      </div>

      <div className="profile-field">
        <label>Gender</label>
        <select
          name="gender"
          value={userState.gender}
          onChange={handleChange}
          disabled={!editMode}
        >
          <option value="">Select</option>
          <option value="Male">
            Male
          </option>
          <option value="Female">
            Female
          </option>
          <option value="Other">
            Other
          </option>
        </select>
      </div>

      <div className="profile-field">
        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={userState.dob}
          onChange={handleChange}
          disabled={!editMode}
        />
      </div>

      <div className="profile-actions">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        ) : (
          <button onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;