import { memo } from "react";
import Logo from "./Logo";

interface HeaderProps {
  onAddClick: () => void;
}

const Header = memo(function Header({ onAddClick }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center">
        <Logo className="" />
      </div>
      <button
        onClick={onAddClick}
        className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl hover:bg-orange-600 transition-colors font-pretendard"
      >
        +
      </button>
    </div>
  );
});

export default Header;
