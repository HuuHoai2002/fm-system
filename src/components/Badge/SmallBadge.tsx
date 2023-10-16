import classNames from "classnames";

interface SmallBadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

const SmallBadge: React.FC<SmallBadgeProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(
        "relative p-1 rounded-md bg-transparent hover:bg-gray-300 active:scale-[0.95] transition-all text-black flex items-center justify-center cursor-pointer select-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default SmallBadge;
