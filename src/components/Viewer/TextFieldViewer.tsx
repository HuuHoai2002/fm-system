import React from "react";
import Input from "../Input/Input";
import { InputLabel } from "../Input/InputControl";

interface TextFieldViewerProps {
  label: string;
  value: string;
}

const TextFieldViewer: React.FC<TextFieldViewerProps> = ({ label, value }) => {
  return (
    <div>
      <InputLabel label={label} className="mb-1" id="" />
      <Input value={value} readOnly fullWidth />
    </div>
  );
};

export default TextFieldViewer;
