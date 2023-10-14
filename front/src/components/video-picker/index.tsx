import { useQuery } from "react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { VideoInputForm } from "./video-input-form";
import { api } from "@/lib/axios";
import { HistoryVideos } from "./history-videos";
import { useVideoPicker } from "@/hooks/useVideoPicker";
import { TabOptions } from "@/hooks/contexts/VideoPickerContext";

export const VideoPicker: React.FC = () => {
  const { pickedVideoId, onVideoPicked, onChangeTabSelected, tabSelected } =
    useVideoPicker();

  const { data } = useQuery(["getUploadedVideos"], {
    queryFn: async () => {
      const response = await api.get("/uploaded-videos");
      return response.data;
    },
  });

  return (
    <div>
      <Tabs
        defaultValue={tabSelected}
        onValueChange={(value) => onChangeTabSelected(value as TabOptions)}
      >
        <TabsList className="mb-2">
          <TabsTrigger value="new-video">Novo vídeo</TabsTrigger>
          <TabsTrigger value="load-video">Histórico</TabsTrigger>
        </TabsList>
        <TabsContent value="new-video">
          <VideoInputForm />
        </TabsContent>
        <TabsContent value="load-video">
          <HistoryVideos uploadedVideos={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
