import { useState, createContext, Dispatch, SetStateAction } from "react";

export type TabOptions = "new-video" | "history";

interface VideoPickerContextProps {
  tabSelected: string;
  onChangeTabSelected: (tab: TabOptions) => void;
  pickedVideoId: string;
  onVideoPicked: (id: string) => void;
  uploadedVideo: File | null;
  setUploadedVideo: Dispatch<SetStateAction<File | null>>;
}

export const VideoPickerContext = createContext({} as VideoPickerContextProps);

export const VideoPickerProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [pickedVideoId, setPickedVideoId] = useState("");
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);

  const [tabSelected, setTabSelected] = useState<TabOptions>("new-video");

  function onChangeTabSelected(tab: TabOptions) {
    setTabSelected(tab);
  }

  function onVideoPicked(id: string) {
    setPickedVideoId(id);
  }

  return (
    <VideoPickerContext.Provider
      value={{
        pickedVideoId,
        onVideoPicked,
        uploadedVideo,
        setUploadedVideo,
        onChangeTabSelected,
        tabSelected,
      }}
    >
      {children}
    </VideoPickerContext.Provider>
  );
};
