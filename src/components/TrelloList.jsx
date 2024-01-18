import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

// ant core
import { Card, Tooltip, Button, Popconfirm } from "antd";

// ant icons
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

// components
import SimpleCard from "./SimpleCard";
//hooks
import { useContext } from "react";
//context
import { listsContext } from "../store/listsContext";
function TrelloList({ index, listItem, cards, setOpen }) {
  const { removeList } = useContext(listsContext);
  const handleDeleteList = (listId) => {
    removeList({ id: listId });
  };
  return (
    <Draggable draggableId={String(listItem.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="todoList "
        >
          <Droppable droppableId={String(listItem.id)} type="CARD">
            {(provided, snapshot) => (
              <Card
                title={listItem.name}
                className="cardList"
                extra={
                  <>
                    <Tooltip title="Add a card">
                      <Button
                        shape="circle"
                        icon={<PlusOutlined />}
                        onClick={() => setOpen(listItem.id)}
                      />
                    </Tooltip>

                    <Popconfirm
                      title="Delete the list"
                      description="Are you sure to delete this list?"
                      onConfirm={() => {
                        handleDeleteList(listItem.id);
                      }}
                      onCancel={() => {}}
                      okText="Yes"
                      cancelText="No"
                      className="ml-10"
                    >
                      <Tooltip title="Delete this list">
                        <Button shape="circle" icon={<DeleteOutlined />} />
                      </Tooltip>
                    </Popconfirm>
                  </>
                }
              >
                <div
                  ref={provided.innerRef}
                  // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                  style={{ minHeight: "5px" }}
                  {...provided.droppableProps}
                >
                  {cards.map((card, cardIndex) => {
                    return (
                      <SimpleCard
                        key={card.id}
                        index={cardIndex}
                        card={card}
                        listId={listItem.id}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              </Card>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default TrelloList;
