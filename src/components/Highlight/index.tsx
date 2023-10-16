import React from "react";

interface HighlightProps extends React.HTMLAttributes<HTMLDivElement> {}

const Highlight: React.FC<HighlightProps> = ({ ...props }) => {
  return <div {...props}>Highlight</div>;
};

export default Highlight;
