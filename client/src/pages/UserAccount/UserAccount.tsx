import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/UserSlice";
import "./UserAccount.scss";

interface Props {}

function UserAccount({}: Props): ReactElement {
  const user = useSelector(selectUser);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="UserAccount-container">
      <div className="UserAccount-picture">
        <span>{user.userName[0].toUpperCase()}</span>
      </div>
      <div className="UserAccount-info-group">
        <span className="UserAccount-username">{user.userName}</span>
        <span className="UserAccount-email">{user.email}</span>
      </div>
    </div>
  );
}

export default UserAccount;
