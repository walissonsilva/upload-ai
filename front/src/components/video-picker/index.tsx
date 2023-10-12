import { useQuery } from "react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { VideoInputForm } from "./video-input-form";
import { api } from "@/lib/axios";
import { HistoryVideos } from "./history-videos";

interface VideoPickerProps {
  videoUploadedId: string;
  onVideoUploaded: (videoId: string) => void;
}

export const VideoPicker: React.FC<VideoPickerProps> = ({
  videoUploadedId,
  onVideoUploaded,
}) => {
  const { data } = useQuery(["getUploadedVideos"], {
    queryFn: async () => {
      const response = await api.get("/uploaded-videos");
      console.log(response.data);
      return response.data;
    },
  });

  return (
    <div>
      <Tabs defaultValue="new-video">
        <TabsList className="mb-2">
          <TabsTrigger value="new-video">Novo vídeo</TabsTrigger>
          <TabsTrigger value="load-video">Histórico</TabsTrigger>
        </TabsList>
        <TabsContent value="new-video">
          <VideoInputForm onVideoUploaded={onVideoUploaded} />
        </TabsContent>
        <TabsContent value="load-video">
          <HistoryVideos
            uploadedVideos={data}
            videoUploadedId={videoUploadedId}
            onVideoUploaded={onVideoUploaded}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
