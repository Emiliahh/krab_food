import { LucideIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

interface TabIconProp {
  name: string;
  Icon: LucideIcon;
  path: string;
  isFocus: boolean;
}

const TabIcon: React.FC<TabIconProp> = ({ name, Icon, path, isFocus }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center w-full h-12 px-5 cursor-pointer text-sm transition-colors duration-200 gap-3
        ${
          isFocus
            ? "border-l-4 border-closet bg-gray-200"
            : "border-l-4 border-transparent hover:bg-gray-100"
        }`}
      onClick={() => navigate(`/admin${path.trim()}`)}
    >
      <Icon color={isFocus ? "#333333" : "#909090"} strokeWidth={1.25} className="mr-2" />
      <span className="flex-grow text-gray-500 ">{name}</span>
    </div>
  );
};

export default TabIcon;
