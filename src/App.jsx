import { useState } from "react";
import { DatePicker, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { PlusOutlined } from "@ant-design/icons";
import { addTodo } from "./redux/action";
import { nanoid } from "nanoid";
import TableData from "./compoenet/Table";
import InputModal from "./compoenet/modal";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [dateTime, setDateTime] = useState(null);

  const { todos } = useSelector((state) => state.todoData);

  const dispatch = useDispatch();

  const handleAddTodo = () => {
    const findPreviousTodo = todos.find((item) => item.todo === inputValue);
    if (inputValue === "" || dateTime === null) {
      {
        toast.error("Input Filed is Empty");
      }
    } else if (findPreviousTodo) {
      {
        toast.info("Todo is Already Exist");
      }
    } else {
      const id = nanoid(3);
      const payload = {
        id: id,
        todo: inputValue,
        dateTime: dayjs(dateTime).format("YYYY-MM-DD"),
      };
      handleDatePickerChange();
      dispatch(addTodo(payload));
      setInputValue("");
      setDateTime(null);
      toast.success("Todo Added Successfully");
    }
  };

  const handleDatePickerChange = (date) => {
    setDateTime(date);
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "50%", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <Input
              placeholder="Add Data"
              name="input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
            <DatePicker
              style={{ height: "40px" }}
              value={dateTime}
              onChange={handleDatePickerChange}
              required
            />
            <button style={{ width: "70px" }} onClick={handleAddTodo}>
              <PlusOutlined />
            </button>
          </div>
          <div style={{ marginTop: "20px" }}>
            <InputModal />
            <TableData setInputValue={inputValue} inputValue={inputValue} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
