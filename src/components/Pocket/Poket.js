import React from "react";

import "./poket.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Popconfirm } from "antd";

function Poket(props) {
  return (
    <div className="poket">
      <Link to={"/user/" + props.id}>
        <h1 className="childName">{props.name}</h1>
      </Link>

      <h2 className="moneyleft">יתרה: {props.balance}</h2>
      <h3 className="expense">הוצאות: {props.spend}</h3>
      <h3 className="income">הכנסות: {props.income}</h3>

      <button
        onClick={() => {
          props.RemoveChild(props.id);
        }}
      >
        מחיקת משתמש
      </button>
    </div>
  );
}

export default Poket;
