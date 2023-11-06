import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
// import { v4 as uuidv4 } from "uuid";
import { FaRegImage } from "react-icons/fa";
import { BsCheck } from "react-icons/bs";

import Image_d from "./assets/images/image-11.jpeg";
import Image from "./assets/images/image-10.jpeg";
import Image1 from "./assets/images/image-1.webp";
import Image2 from "./assets/images/image-2.webp";
import Image3 from "./assets/images/image-3.webp";
import Image4 from "./assets/images/image-4.webp";
import Image5 from "./assets/images/image-5.webp";
import Image6 from "./assets/images/image-6.webp";
import Image7 from "./assets/images/image-7.webp";
import Image8 from "./assets/images/image-8.webp";
import Image9 from "./assets/images/image-9.webp";

function App() {
  const images = [
    { id: 1, image: Image_d },
    { id: 2, image: Image1 },
    { id: 3, image: Image2 },
    { id: 4, image: Image3 },
    { id: 5, image: Image4 },
    { id: 6, image: Image5 },
    { id: 7, image: Image6 },
    { id: 8, image: Image7 },
    { id: 9, image: Image8 },
    { id: 10, image: Image9 },
    { id: 11, image: Image },
  ];
  const [imagesData, setImagesData] = useState(images);
  const [selected, setSelected] = useState([]);
  const handleDelete = () => {
    setImagesData((prevImagesD) => {
      return prevImagesD.filter((img) => !selected.includes(img.id));
    });
    setSelected([]);
  };

  const handleToggleSelection = (imageId) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(imageId)) {
        return prevSelected.filter((id) => id !== imageId);
      } else {
        return [...prevSelected, imageId];
      }
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(imagesData);
    const [recordedItem] = items.splice(result.destination.index, 1);
    items.splice(result.source.index, 0, recordedItem);
    setImagesData(items);
  };
  return (
    <div className="container">
      <div className="top">
        {selected.length > 0 ? (
          <h3>
            <BsCheck className="checked" />
            {selected.length} Files Selected
          </h3>
        ) : (
          <h2>Gallery</h2>
        )}
        {selected.length > 0 && (
          <button className="delete_btn" onClick={handleDelete}>
            delete
          </button>
        )}
      </div>
      <hr />

      <div className="gallary_main">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="imagesData">
            {(provided) => {
              return (
                <div
                  className="galleries"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {imagesData?.map((data, index) => {
                    const draggableId = data.id.toString();
                    return (
                      <Draggable
                        key={draggableId}
                        draggableId={draggableId}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="gallery_item"
                            key={draggableId}
                          >
                            <div className="gallery_item_img">
                              <img src={data.image} alt="" />
                              <div className="overlay"></div>
                              <input
                                checked={selected.includes(data.id)}
                                className="check"
                                type="checkbox"
                                onChange={() => handleToggleSelection(data.id)}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <div className="gallery_item">
                    <div className="gallery_item_img item_l_l">
                      <div>
                        <label>
                          <FaRegImage className="input_file" />
                          <h4 className="add_title">Add Image</h4>
                          <input className="input" type="file" name="" id="" />
                        </label>
                      </div>
                      <div className="overlay"></div>
                    </div>
                  </div>
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
