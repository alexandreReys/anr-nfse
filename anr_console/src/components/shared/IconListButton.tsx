import React from 'react';

interface Props {
  tooltipId: string;
  tooltipContent: string;
  icon: React.ReactElement;
  onClick: () => void;
}

const IconListButton: React.FC<Props> = ({ tooltipId, tooltipContent, icon, onClick }) => {
  return (
    <a data-tooltip-id={tooltipId} data-tooltip-content={tooltipContent} onClick={onClick}>
      {icon}
    </a>
  );
};

export default IconListButton;
