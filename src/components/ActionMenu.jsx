import { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit, Trash } from "lucide-react";

const ActionMenu = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Menutup menu ketika user mengklik di luar menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="text-gray-400 hover:text-gray-600 focus:outline-none"
        onClick={toggleMenu}
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
