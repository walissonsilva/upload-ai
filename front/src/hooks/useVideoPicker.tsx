import { useContext } from "react";
import { VideoPickerContext } from "./contexts/VideoPickerContext";

export const useVideoPicker = () => {
  const context = useContext(VideoPickerContext);

  if (!context)
    throw new Error(
      "VideoPickerContext must be used inside of a VideoPickerProvider.",
    );

  return context;
};
