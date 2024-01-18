import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, Avatar, Tooltip, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  AntDesignOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
//hooks
import { useContext } from "react";
//contexts
import { cardsContext } from "../store/cardsContext";
const { Meta } = Card;

function SimpleCard({ card, index, listId }) {
  const { removeCard } = useContext(cardsContext);
  const handleDeleteCard = (cardId) => {
    console.log("cardId", cardId);
    removeCard({ id: cardId, listId });
  };
  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="card"
        >
          <Card
            className="cardItem"
            cover={<img alt="example" src="https://picsum.photos/265/160" />}
            actions={[
              <Tooltip title="View">
                <FileTextOutlined key="view" />
              </Tooltip>,
              <Tooltip title="Edit">
                <EditOutlined key="edit" />
              </Tooltip>,
              <Popconfirm
                title="Delete the card"
                description="Are you sure to delete this card?"
                onConfirm={() => {
                  handleDeleteCard(card.id);
                }}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
                className="ml-10"
              >
                <Tooltip title="Delete">
                  <DeleteOutlined key="ellipsis" />
                </Tooltip>
              </Popconfirm>,
            ]}
          >
            <Meta title={card.name} description={<>{card.description}</>} />
          </Card>
        </div>
      )}
    </Draggable>
  );
}

export default SimpleCard;
