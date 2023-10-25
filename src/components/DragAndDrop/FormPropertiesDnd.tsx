import React from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import FormPropertyControl from "../Forms/FormPropertyControl";
import { StrictModeDroppable } from "./Droppable";

interface FormPropertiesDndProps {
  fields: any[];
  control: any;
  errors: any;
  setValue: any;
  removeProperty: any;
  handleDragEnd: (result: DropResult) => void;
}

const FormPropertiesDnd: React.FC<FormPropertiesDndProps> = ({
  control,
  errors,
  fields,
  setValue,
  removeProperty,
  handleDragEnd,
}) => {
  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <StrictModeDroppable droppableId="Droppable">
          {(provided) => (
            <div
              className="space-y-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {fields.map((item, index) => (
                <Draggable draggableId={item.id} key={item.id} index={index}>
                  {(provided, { isDragging }) => (
                    <div
                      key={item.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <FormPropertyControl
                        control={control}
                        key={item.id}
                        setValue={setValue}
                        errors={errors}
                        index={index}
                        onRemoveProperty={removeProperty}
                        isDragging={isDragging}
                        isDisabled={index === 0}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
};

export default FormPropertiesDnd;
