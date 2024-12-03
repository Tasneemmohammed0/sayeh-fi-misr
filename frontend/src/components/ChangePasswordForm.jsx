import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import styles from "../styles/WishListForm.module.css";
import ErrorMessage from "./ErrorMessage";
function ChangePasswordForm({ isOpen, handleForm, userPassword }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  function handleCurrentPassword(e) {
    setCurrentPassword(e.target.value);
    if (e.target.value === userPassword) {
      setError("Current password is correct you can change it .");
      setDisable(false);
    } else {
      setError("Current password is incorrect.");
      setDisable(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Error Handling

    if (currentPassword !== userPassword) {
      setError("Current password is incorrect.");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (
      !newPassword.match(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    console.log({ currentPassword, newPassword });
    handleForm(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");

    // TODO: Post to the API to change the password
  }

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <button className={styles.popupClose} onClick={() => handleForm(false)}>
          <IoMdClose />
        </button>
        <h2>Change Password</h2>
        <form>
          {error === "Current password is correct you can change it ." && (
            <ErrorMessage error={error} color="green" />
          )}
          {error &&
            error !== "Current password is correct you can change it ." && (
              <ErrorMessage error={error} />
            )}

          {/* Current Password */}
          <label className={styles.formLabel}>
            Current Password:
            <input
              type="password"
              placeholder="Enter current password"
              className={styles.formInput}
              value={currentPassword}
              onChange={(e) => handleCurrentPassword(e)}
            />
          </label>

          {/* New Password */}
          <label className={styles.formLabel}>
            New Password:
            <input
              type="password"
              placeholder="Enter new password"
              className={styles.formInput}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={disable}
            />
          </label>

          {/* Confirm Password */}
          <label className={styles.formLabel}>
            Confirm New Password:
            <input
              type="password"
              placeholder="Confirm new password"
              className={styles.formInput}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={disable}
            />
          </label>

          <button
            type="submit"
            className={styles.formButton}
            onClick={(e) => handleSubmit(e)}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordForm;