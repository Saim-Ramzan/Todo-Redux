import React, { useEffect, useState } from "react";
import { DatePicker, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateTodos } from "../redux/action";
import dayjs from "dayjs";
const InputModal = ({ showModal, handleClose, todoRecord, setModalOpen }) => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todoData);
  const [date, setDate] = useState("");
  const [inputField, setInputField] = useState("");

  useEffect(() => {
    if (todoRecord) {
      setDate(
        todoRecord?.dateTime ? dayjs(todoRecord?.dateTime, "YYYY-MM-DD") : null
      );
      setInputField(todoRecord?.todo || "");
    }
  }, [todoRecord]);

  const pickDate = (first) => {
    setDate(first);
  };
  const onChangeTodo = () => {
    const newTodoItems = [...todos];
    const id = todoRecord.id;
    let todoObj = {
      todo: inputField,
      dateTime: dayjs(date).format("YYYY-MM-DD"),
      id: id,
    };
    const updatedTodos = newTodoItems.map((todo) =>
      todo.id === id ? todoObj : todo
    );
    dispatch(updateTodos(updatedTodos));
    setModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={showModal}
        onOk={onChangeTodo}
        onCancel={handleClose}
      >
        <Input
          placeholder="Add Data"
          name="input"
          value={inputField}
          onChange={(e) => setInputField(e.target.value)}
          required
        />

        <DatePicker
          style={{ width: "100%", margin: "10px 0" }}
          required
          value={date}
          onChange={pickDate}
        />
      </Modal>
    </>
  );
};
export default InputModal;
