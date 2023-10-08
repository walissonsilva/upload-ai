import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { VideoInputForm } from "./video-input-form";

interface VideoPickerProps {
  onVideoUploaded: (videoId: string) => void;
}

export const VideoPicker: React.FC<VideoPickerProps> = ({
  onVideoUploaded,
}) => {
  return (
    <div>
      <Tabs defaultValue="new-video">
        <TabsList className="mb-2">
          <TabsTrigger value="new-video">Novo vídeo</TabsTrigger>
          <TabsTrigger value="load-video">Carregar vídeo</TabsTrigger>
        </TabsList>
        <TabsContent value="new-video">
          <VideoInputForm onVideoUploaded={onVideoUploaded} />
        </TabsContent>
        <TabsContent value="load-video">In development...</TabsContent>
      </Tabs>
    </div>
  );
};
