import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import "./UserAccount.scss";
import axios from "axios";
import { allTranslationsType } from "../../models/SessionModel";
import { appUserInformation } from "../../models/ProgressModel";

function UserAccount(): ReactElement {
  const user = useSelector(selectUser);
  const [userInfo, setUserInfo] = useState<appUserInformation | undefined>(
    undefined
  );

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/progress", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setUserInfo(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="UserAccount-container">
        <div className="UserAccount-picture">
          <span>{user.userName[0].toUpperCase()}</span>
        </div>
        <div className="UserAccount-info-group">
          <span className="UserAccount-username">{user.userName}</span>
          <span className="UserAccount-email">{user.email}</span>
        </div>
      </div>
      <div className="UserAccount-container" style={{ marginTop: "20px" }}>
        <div className="info-row">
          <span className="info-title">Points: </span>
          <span className="info-details">{userInfo && userInfo.points}</span>
        </div>
        <div className="info-row">
          <span className="info-title">My courses: </span>
          <span className="info-details">{userInfo && userInfo.points}</span>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
