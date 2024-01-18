import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
//hooks
import { useState, useContext } from "react";
//reducers
import { listsContext } from "../store/listsContext";
//others
import { v4 as uuidv4 } from "uuid";
export default function AddList() {
  const [isAdd, setIsAdd] = useState(false);
  const [name, setName] = useState("");
  const { addList } = useContext(listsContext);
  const handleShowInput = () => {
    setIsAdd((prev) => !prev);
  };
  const handleHideInput = () => {
    setIsAdd(false);
    setName("");
  };
  const handleAddList = () => {
    addList({ list: { id: uuidv4(), name, cards: [] } });
    handleHideInput();
  };
  return (
    <>
      {!isAdd ? (
        <Button type="text" onClick={handleShowInput} className="">
          <PlusOutlined /> Add another list
        </Button>
      ) : (
        <div className="addList">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter list title..."
            className="p-4 border border-1 border-[#eee]"
            autoFocus
            onPressEnter={handleAddList}
            onBlur={handleHideInput}
          />
        </div>
      )}
    </>
  );
}
