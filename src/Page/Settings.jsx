import { useState } from "react";
import "../styles/Settings.css";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    alert("Password change feature will be added later");
    setShowPasswordForm(false);
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* CHANGE PASSWORD */}
      <div className="settings-card">
        <div className="settings-header">
          <h3>Change Password</h3>
          <button onClick={() => setShowPasswordForm(!showPasswordForm)}>
            {showPasswordForm ? "Cancel" : "Change"}
          </button>
        </div>

        {showPasswordForm && (
          <form className="password-form" onSubmit={handlePasswordSubmit}>
            <input type="password" placeholder="Current Password" required />
            <input type="password" placeholder="New Password" required />
            <input type="password" placeholder="Confirm New Password" required />
            <button type="submit">Update Password</button>
          </form>
        )}
      </div>

      {/* NOTIFICATIONS */}
      <div className="settings-card">
        <h3>Notification Preferences</h3>

        <label className="toggle-row">
          <span>Email Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </label>
      </div>

      <div className="settings-card disabled">
        <h3>Language</h3>
        <select >
          <option>English</option>
          <option>Hindi</option>
          <option>Malayalam</option>
        </select>
      </div>

      <div className="settings-card danger disabled">
        <button >Delete My Account</button>
      </div>
    </div>
  );
}

export default Settings;
