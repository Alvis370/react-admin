import React from 'react';
import memoryUtils from '../../utils/memoryUtils';
import { useHistory } from "react-router-dom";

export default function Admin() {

  const history = useHistory();

  function getUser() {
    const user = memoryUtils.user;

    if (!user || !user._id) {
      history.replace("/login");
    }

    return user.username;
  }

  return (
    <div>
      Hello, {getUser()}
    </div>
  )
}
