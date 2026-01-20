import React, { useState } from "react";
import Card from "../../atoms/Card/Card";
import Button from "../../atoms/Button/Button";
import "./Profile.css";

const ProfileDashboard = () => {
  const [profileImage, setProfileImage] = useState(
    "https://thepicturesdp.in/wp-content/uploads/2025/07/black-images-dp-1.jpg"
  );

  const [formData, setFormData] = useState({
    username: "Thathsarani Bandara",
    sex: "Female",
    age: 23,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const isStrongPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    alert("Profile updated (UI only)");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      alert("Account deleted (UI only)");
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handlePasswordUpdate = () => {
    const { oldPassword, newPassword, repeatPassword } = passwordData;

    if (!oldPassword || !newPassword || !repeatPassword) {
      setPasswordError("All fields are required");
      return;
    }

    if (!isStrongPassword(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character"
      );
      return;
    }

    if (newPassword !== repeatPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");
    alert("Password updated successfully (UI only)");
  };

  return (
    <>
      <div className="mb-4">
        <h2>Profile Settings</h2>
        <p className="text-muted">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-4 profile-image-col">
          <Card className="profile-card">
            <div className="profile-image-section">
              <img src={profileImage} alt="Profile" />
              <label className="upload-btn">
                Change Your Profile Photo
                <input type="file" hidden onChange={handleImageChange} />
              </label>
            </div>
          </Card>
        </div>

        <div className="col-md-8">
          <Card>
            <h5 className="card-title-bordered">Personal Information</h5>

            <div className="profile-form">
              <div className="form-group">
                <label>Username</label>
                <input
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Sex</label>
                <select
                  className="form-control"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex gap-3 mt-4">
                <Button variant="primary" onClick={handleUpdate}>
                  Update Profile
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>

          <Card className="mt-4">
            <h5 className="card-title-bordered">Change Password</h5>

            <div className="profile-form">
              <div className="form-group">
                <label>Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  className="form-control"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="form-control"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="form-group">
                <label>Repeat Password</label>
                <input
                  type="password"
                  name="repeatPassword"
                  className="form-control"
                  value={passwordData.repeatPassword}
                  onChange={handlePasswordChange}
                />
              </div>

              {passwordError && (
                <p className="password-error">{passwordError}</p>
              )}

              <Button variant="primary" onClick={handlePasswordUpdate}>
                Update Password
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProfileDashboard;
