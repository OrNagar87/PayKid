import React, { useContext, useState } from "react";
import KidContext from "../KidContext";

import { Table } from "antd";

import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";

function Kid(props) {
  const setChangeKids = useContext(KidContext).setChangeKids;
  const kids = useContext(KidContext).changeKids;

  var index;

  index = kids
    .map(function (e) {
      return e.id;
    })
    .indexOf(props.id);
  const myChild = kids.find((obj) => {
    return obj.id === props.id;
  });
  const [data, setData] = useState(myChild.data);
  console.log(data);

  const columns = [
    {
      title: "תאריך",
      dataIndex: "date",
    },
    {
      title: "הכנסה/הוצאה",
      dataIndex: "income",
    },
    {
      title: "עבור מה",
      dataIndex: "for",
    },
    {
      title: "הערות",
      dataIndex: "comment",
    },
  ];

  // בסיס לאפשרות הכנסת הוצאה והכנסה חדשה
  async function onFinishincome(values) {
    console.log("Success:", values);
    var key;
    if (myChild.data[0]) {
      key = myChild.data[myChild.data.length - 1].key + 1;
    } else key = 1;

    myChild.income = myChild.income + values.sum;

    let newdata = {
      key: key,
      date: values["date"].format("YYYY-MM-DD"),
      income: values.sum,
      plus: true,
      for: values.incomefor,
      comment: "",
    };
    setData([...data, newdata]);
    myChild.data = [...myChild.data, newdata];
    setChangeKids(kids);

    console.log(kids);

    document.getElementById("income_form").reset();
  }
  const onFinishspend = (values) => {
    console.log("Success:", values);

    var key;
    if (myChild.data[0]) {
      key = myChild.data[myChild.data.length - 1].key + 1;
    } else key = 1;

    myChild.spend = myChild.spend + values.sum;

    let newdata = {
      key: key,
      date: values["date"].format("YYYY-MM-DD"),
      income: values.sum * -1,
      plus: false,
      for: values.spendfor,
      comment: "",
    };
    setData([...data, newdata]);
    myChild.data = [...myChild.data, newdata];

    setChangeKids(kids);
    console.log(kids);

    document.getElementById("spend_form").reset();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <div className="userdetails">
        <h1 className="childName">{kids[index].name}</h1>
        <h2 className="moneyleft">
          יתרה: {kids[index].income - kids[index].spend}
        </h2>
        <h3 className="expense">הוצאות: {kids[index].spend}</h3>
        <h3 className="income">הכנסות: {kids[index].income}</h3>
      </div>

      <div className="incomeform">
        <h4>הוסף הכנסה</h4>
        <Form
          name="income_form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinishincome}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="בחר תאריך הכנסה"
            name="date"
            rules={[{ required: false }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="סכום ההכנסה"
            name="sum"
            rules={[{ required: false }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="עבור מה ההכנסה"
            name="incomefor"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="incomeform">
        <h4>הוסף הוצאה</h4>
        <Form
          name="spend_form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinishspend}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="בחר תאריך הוצאה" name="date">
            <DatePicker />
          </Form.Item>
          <Form.Item label="סכום ההוצאה" name="sum">
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="עבור מה ההוצאה"
            name="spendfor"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      <h4>טבלת הוצאות והכנסות</h4>
      <Table columns={columns} dataSource={data} size="middle" />
    </div>
  );
}
export default Kid;
