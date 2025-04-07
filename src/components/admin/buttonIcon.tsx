import { LucideIcon } from "lucide-react";
import React from "react";

interface ButtonIconProps {
  name: string;
  Icon: LucideIcon;
  onClick?: () => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ name, Icon, onClick }) => {
  return (
    <div
      className="flex items-center w-full h-12 px-5 cursor-pointer text-sm transition-colors duration-200 gap-3 border-l-4 border-transparent hover:bg-gray-100"
      onClick={onClick}
    >
      <Icon color="#909090" className="mr-2" strokeWidth={1.25} />
      <span className="flex-grow text-gray-500">{name}</span>
    </div>
  );
};

export default ButtonIcon;