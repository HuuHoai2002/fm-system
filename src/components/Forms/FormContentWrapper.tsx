interface FormContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const FormContentWrapper: React.FC<FormContentWrapperProps> = ({
  title,
  children,
}) => {
  return (
    <div>
      <div className="p-2 md:p-4 rounded-md bg-gray-100">
        <div>
          <div className="select-none mb-1 text-gray-700 inline-flex items-center font-medium gap-x-2 text-sm">
            {title}
            <span className="text-red-500 leading-none h-2">*</span>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default FormContentWrapper;
