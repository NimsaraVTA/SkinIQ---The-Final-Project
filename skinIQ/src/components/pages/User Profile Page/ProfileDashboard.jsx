import React, { useState, useEffect } from "react";
import Card from "../../atoms/Card/Card";
import Button from "../../atoms/Button/Button";
import "./Profile.css";

import { auth } from "../../services/firebase";
import { db, storage } from "../../services/firebase";

import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import {
  onAuthStateChanged,
  deleteUser,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProfileDashboard = () => {
  const [profileImage, setProfileImage] = useState(
    "https://img.freepik.com/premium-vector/account-avatar-profile-icon-simple-editable-vector-graphics_922357-21587.jpg"
  );

  const [isUploading, setIsUploading] = useState(false);

  // ✅ NEW STATE ADDED
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    sex: "",
    age: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Removed timeout (no waiting seconds now)
  const showSuccessPopup = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
  };

  // Load user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            username: data.username || "",
            sex: data.sex || "",
            age: data.age || "",
          });

          if (data.photoURL) {
            setProfileImage(data.photoURL);
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const isStrongPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Upload Image
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !currentUser) return;

    try {
      setIsUploading(true);

      const storageRef = ref(storage, `profileImages/${currentUser.uid}`);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "users", currentUser.uid), {
        photoURL: downloadURL,
      });
      setProfileImage(downloadURL);

      showSuccessPopup("Profile updated successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!currentUser) return;

    showSuccessPopup("Updating profile...");

    try {
      await setDoc(doc(db, "users", currentUser.uid), {
        ...formData,
        email: currentUser.email,
        photoURL: profileImage,
      });

      showSuccessPopup("Profile updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!currentUser) return;

    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteUser(currentUser);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handlePasswordUpdate = async () => {
    const { oldPassword, newPassword, repeatPassword } = passwordData;

    if (!currentUser) return;

    if (!oldPassword || !newPassword || !repeatPassword) {
      setPasswordError("All fields are required");
      return;
    }

    if (oldPassword === newPassword) {
      setPasswordError("New password cannot be same as old password");
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

    try {
      setIsUpdatingPassword(true);
      setPasswordError("");
      setShowSuccess(false);

      const credential = EmailAuthProvider.credential(
        currentUser.email,
        oldPassword
      );

      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);

      showSuccessPopup("Password updated successfully!");

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
      });

    } catch (error) {
      console.error(error);

      if (error.code === "auth/wrong-password") {
        setPasswordError("Old password is incorrect");
      } else {
        setPasswordError("Re-login required or something went wrong.");
      }
    } finally {
      setIsUpdatingPassword(false);
    }
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

              {isUploading && (
                <p className="uploading-text">Uploading...</p>
              )}

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

              <Button
                variant="primary"
                onClick={handlePasswordUpdate}
                disabled={isUpdatingPassword}
              >
                {isUpdatingPassword
                  ? "Updating Password..."
                  : "Update Password"}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {showSuccess && (
        <div className="success-popup">{successMessage}</div>
      )}
    </>
  );
};

export default ProfileDashboard;
