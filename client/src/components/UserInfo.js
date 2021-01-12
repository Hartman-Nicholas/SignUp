import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../components/store/actions";

const UserInfo = () => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchUser());
  }, [dispatch]);

  const renderUser = () => {
    if (!auth) {
      return;
    }
    return (
      <div>
        <h1>UserInfo</h1>
        <ul>
          <img alt="profile" src={auth.profilePhoto}></img>
          <li>UserName: {auth.displayName}</li>
          <li>FirstName: {auth.givenName}</li>
          <li>Surname: {auth.familyName}</li>
          <li>Email: {auth.email}</li>
        </ul>
      </div>
    );
  };

  return <div>{renderUser()}</div>;
};

export default UserInfo;
