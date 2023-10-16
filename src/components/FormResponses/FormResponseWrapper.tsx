import React from "react";

interface FormReponseWrapperProps {
  title: string;
  children: React.ReactNode;
}

const FormReponseWrapper: React.FC<FormReponseWrapperProps> = ({
  title,
  children,
}) => {
  return (
    <div>
      <div className="p-3 bg-gray-200 rounded-md">
        <div className="py-2 flex items-center justify-center">
          <span className="font-medium text-base">{title}</span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FormReponseWrapper;
