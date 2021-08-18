import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import KidContext from "../KidContext";
import Kid from "../Kid/Kid";

function Users(props) {
  const { idParam } = useParams();
  const setChangeKids = useContext(KidContext).setChangeKids;
  const kids = useContext(KidContext).changeKids;

  var index;

  index = kids
    .map(function (e) {
      return e.id;
    })
    .indexOf(+idParam);
  console.log(index);

  console.log(kids[index].name);

  return (
    <div className="userpage">
      <Kid id={kids[index].id} />
    </div>
  );
}

export default Users;
