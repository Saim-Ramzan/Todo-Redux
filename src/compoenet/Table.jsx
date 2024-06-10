import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodos } from "../redux/action";
import InputModal from "./modal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const TableData = ({ setInputValue }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [todoRecord, setTodoRecord] = useState({});
  const [filterData, setFilterData] = useState();
  const dispatch = useDispatch();

  const { todos } = useSelector((state) => state.todoData);

  useEffect(() => {
    onChnageFilterColumn();
  }, [setInputValue]);

  const columns = [
    {
      title: "Name",
      dataIndex: "todo",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "DueDate",
      dataIndex: "dateTime",
      key: "id",
      render: (date) => dayjs(date).format("MMM,DD,YYYY"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => dispatch(deleteTodos(record.id))}>
            {<DeleteOutlined />}
          </a>
          <a onClick={() => updateModal(record)}>{<EditOutlined />}</a>
        </Space>
      ),
    },
  ];
  const rowClassName = (record) => {
    const currentDate = dayjs();
    if (dayjs(record.dateTime).isBefore(currentDate)) {
      return "row-red";
    }
    return "";
  };

  const updateModal = (record) => {
    setModalOpen(true);
    setTodoRecord(record);
  };

  const onChnageFilterColumn = () => {
    const filterItem = todos?.map((item) => item.todo == setInputValue);
    setFilterData(filterItem);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={todos}
        key={todos.id}
        updateModal={updateModal}
        records={setTodoRecord}
        rowClassName={rowClassName}
      />
      <InputModal
        setTodoRecord={setTodoRecord}
        todoRecord={todoRecord}
        showModal={modalOpen}
        setModalOpen={setModalOpen}
        handleClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default TableData;
