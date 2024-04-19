import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { useEffect, useState } from "react";
import { rootURL } from "~/data";
import { interactData } from "~/functions/interactData";
import Swal from "sweetalert2";
const cx = classNames.bind(styles);

function Profile() {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState("");

  const updateURL = `${rootURL}/actions/updateProfile.php`;
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserData(user);
  }, []);

  const handleChangeName = (e) => {
    setNameValue(e.target.value);
  };
  const handleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const data = {
      id: userData.id,
      name: nameValue,
    };
    interactData(updateURL, "POST", data, (response) => {
      if (response.message === "Profile updated successfully") {
        setUserData({ ...userData, name: nameValue });
        setIsEditing(false);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...userData, name: nameValue })
        );
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile updated successfully",
        });
      }
    });
  };

  return (
    <div className={cx("profile")}>
      <h1 className={cx("title")}>Profile</h1>
      <div className={cx("profile-content")}>
        <div className={cx("info-group")}>
          <div className={cx("info-top")}>
            <span className={cx("info-title")}>Name</span>
            {isEditing ? (
              <span className={cx("info-edit")} onClick={handleSave}>
                Save
              </span>
            ) : (
              <span className={cx("info-edit")} onClick={handleEditing}>
                Edit
              </span>
            )}
          </div>
          {isEditing ? (
            <input
              type="text"
              className={cx("info-input")}
              value={nameValue}
              onChange={handleChangeName}
            />
          ) : (
            <span className={cx("info-description")}>{userData.name}</span>
          )}
        </div>
        <div className={cx("info-group")}>
          <div className={cx("info-top")}>
            <span className={cx("info-title")}>Email</span>
            <span className={cx("info-edit")}>Edit</span>
          </div>
          <span className={cx("info-description")}>{userData.email}</span>
        </div>
        <div className={cx("info-group")}>
          <div className={cx("info-top")}>
            <span className={cx("info-title")}>Your number phone</span>
            <span className={cx("info-edit")}>Edit</span>
          </div>
          <span className={cx("info-description")}>{userData.phone}</span>
        </div>
        <div className={cx("info-group")}>
          <div className={cx("info-top")}>
            <span className={cx("info-title")}>Password</span>
            <span className={cx("info-edit")}>Update</span>
          </div>
          <span className={cx("info-description")}></span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
