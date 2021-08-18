import React, { useState, useContext } from "react";
import KidContext from "../KidContext";
import { Modal, Button } from "antd";
import { Form, Input, InputNumber } from "antd";
import Poket from "../Pocket/Poket";

function Poketcontainer() {
  const setChangeKids = useContext(KidContext).setChangeKids;
  const kids = useContext(KidContext).changeKids;

  function onFinish(values) {
    let id = kids[kids.length - 1].id + 1;
    let newkid = {
      id: id,
      name: values.childname,
      income: values.firstIncome,
      spend: 0,
      data: [],
    };
    kids.push(newkid);

    AddChild();
    document.getElementById("add_child_form").reset();
    console.log(values);
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //כפתור הוספת ילד עם antd
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const AddChild = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  function RemoveChild(id) {
    var b;
    if (
      window.confirm(
        "האם אתה בטוח רוצה להוריד את הילד מהרשימה (כל הנתונים שלו יימחקו!)"
      )
    )
      b = kids.filter((child) => child.id !== id);

    setChangeKids(b);
  }
  setChangeKids(kids);
  return (
    <div className="poketcontainer">
      <div className="addButton">
        <Button type="primary" onClick={showModal} size="middle">
          הוספת ילד
        </Button>
      </div>

      {kids.map((child, childIndex) => (
        <Poket
          key={child.id}
          id={child.id}
          name={child.name}
          income={child.income}
          spend={child.spend}
          balance={child.income - child.spend}
          RemoveChild={RemoveChild}
        />
      ))}

      <Modal
        title="הוספת ילד"
        visible={visible}
        onOk={AddChild}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          id="add_child_form"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="שם הילד"
            name="childname"
            rules={[{ required: true, message: "הכניסו את שם הילד" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="הפקדה ראשונית"
            name="firstIncome"
            rules={[{ required: true, message: "מהי ההכנסה הראשונית לילד?" }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              אישור
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Poketcontainer;
