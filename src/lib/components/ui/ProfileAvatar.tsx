import React, { useState } from "react";
import { Maximize, X } from "lucide-react"; // Import Lucide icons

interface Props {
  url?: string | null;
  name?: string;
  size?: number;
  font?: number;
  square?: boolean;
}
const ProfileAvatar: React.FC<Props> = ({ url, name, size, font, square }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const nameRow = name?.split(" ");
  const firstLetter = nameRow && nameRow[0]?.charAt(0);
  const lastLetter = nameRow && nameRow?.length > 1 && nameRow[1]?.charAt(0);

  const handleImageClick = () => {
    if (url?.trim()) {
      setIsFullscreen(true);
    }
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  if (url?.trim()) {
    return (
      <>
        <div className="relative inline-block">
          <img
            src={url}
            alt="profile"
            width={size}
            height={size}
            className={
              square
                ? "aspect-square object-cover"
                : "circle object-cover aspect-square"
            }
          />
          <button
            className="absolute bottom-1 right-1 bg-black bg-opacity-50 p-1 rounded-full text-white hover:bg-opacity-75 transition-opacity"
            onClick={handleImageClick}
            aria-label="View image in fullscreen"
          >
            <Maximize size={16} />
          </button>
        </div>

        {isFullscreen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={handleCloseFullscreen}
          >
            <img
              src={url}
              alt="profile-fullscreen"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-opacity"
              onClick={handleCloseFullscreen}
              aria-label="Close fullscreen"
            >
              <X size={24} />
            </button>
          </div>
        )}
      </>
    );
  } else
    return (
      <div
        className={`${square ? "" : "circle"} relative border-2 flex gap-x-[1px] justify-center items-center fw-600 bg-primary text-white`}
        style={{ width: size, height: size }}
      >
        <p style={{ fontSize: font }} className="uppercase">
          {firstLetter}
        </p>
        <p style={{ fontSize: font }} className="uppercase">
          {lastLetter}
        </p>
      </div>
    );
};

export default ProfileAvatar;
