import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileVideo, Upload } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useEffect, useMemo, useState } from "react";
import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { api } from "@/lib/axios";
import { Input } from "../ui/input";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { isAxiosError } from "axios";
import { useVideoPicker } from "@/hooks/useVideoPicker";

const videoUploadFormSchema = z.object({
  fileList: z.any(),
  title: z
    .string()
    .min(3, { message: "Informe o título do vídeo (pelo menos, 3 letras)" }),
  prompt: z.string().optional(),
});

type UploadVideoFormData = Exclude<
  z.infer<typeof videoUploadFormSchema>,
  "file"
> & {
  fileList: FileList;
};

type Status = "waiting" | "converting" | "uploading" | "generating" | "success";

const statusMessages = {
  converting: "Convertendo para mp3...",
  generating: "Gerando transcrição...",
  uploading: "Carregando...",
  success: "Sucesso!",
};

export function VideoInputForm() {
  const { toast } = useToast();
  const [status, setStatus] = useState<Status>("waiting");
  const { uploadedVideo, setUploadedVideo, onVideoPicked } = useVideoPicker();
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UploadVideoFormData>({
    defaultValues: {
      fileList: uploadedVideo ? [uploadedVideo] : null,
    },
    resolver: zodResolver(videoUploadFormSchema),
  });

  const videoFile: FileList = watch("fileList");

  useEffect(() => {
    if (!videoFile) {
      setUploadedVideo(null);
    } else {
      setUploadedVideo(videoFile[0]);
    }
  }, [videoFile, setUploadedVideo]);

  const onSubmit: SubmitHandler<UploadVideoFormData> = async (data) => {
    const prompt = data.prompt;

    if (!data.fileList) return;

    setStatus("converting");

    // converter vídeo em áudio
    const audioFile = await convertVideoToAudio(data.fileList[0], data.title);

    const formData = new FormData();

    formData.append("file", audioFile);
    formData.append("title", data.title);

    setStatus("uploading");

    try {
      const response = await api.post("/videos", formData);
      const videoId = response.data.video.id;

      setStatus("generating");

      await api.post(`/videos/${videoId}/transcription`, {
        prompt,
      });

      setStatus("success");
      onVideoPicked(videoId);
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        toast({
          title: "Erro no upload do vídeo",
          description: String(error.response?.data.message),
        });
      }
    }
  };

  async function convertVideoToAudio(video: File, title: string) {
    console.log("Convertion started...");

    const ffmpeg = await getFFmpeg();

    await ffmpeg.writeFile("input.mp4", await fetchFile(video));

    // ffmpeg.on("log", (log) => {
    //   console.log(log);
    // });

    ffmpeg.on("progress", (progress) => {
      console.log("Convert progress: ", Math.round(progress.progress * 100));
    });

    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-map",
      "0:a",
      "-b:a",
      "20k",
      "-acodec",
      "libmp3lame",
      "output.mp3",
    ]);

    const data = await ffmpeg.readFile("output.mp3");

    const audioFileBlob = new Blob([data], { type: "audio/mpeg" });
    const audioFile = new File([audioFileBlob], `${title}.mp3`, {
      type: "audio/mpeg",
    });

    console.log("Conversion finished.");

    return audioFile;
  }

  const previewURL = useMemo(() => {
    if (!videoFile || videoFile.length === 0) return null;

    return URL.createObjectURL(videoFile[0]);
  }, [videoFile]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row lg:items-stretch gap-6"
    >
      <fieldset className="flex flex-col gap-4 flex-1">
        <label
          htmlFor="video"
          className="relative border flex rounded-md aspect-video justify-center items-center cursor-pointer border-dashed text-sm flex-col gap-2 text-muted-foreground hover:bg-primary/10"
        >
          {previewURL ? (
            <video
              src={previewURL}
              controls={false}
              className="absolute pointer-events-none inset-0 w-full"
            ></video>
          ) : (
            <>
              <FileVideo className="w-4 h-4" />
              Selecione um vídeo
            </>
          )}
        </label>
        <Input
          type="file"
          id="video"
          accept="video/mp4"
          className="w-0 sr-only"
          {...register("fileList")}
        />
      </fieldset>

      <div className="flex-1 flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="video-title">Título do vídeo</Label>
          <Input
            type="text"
            id="video-title"
            placeholder="Título para identificar seu vídeo no histórico..."
            {...register("title")}
          />
          <span className="text-xs text-red-500 ml-1">
            <>{errors["title"]?.message}</>
          </span>
        </div>

        <div className="space-y-2 flex-1 flex flex-col">
          <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>

          <Textarea
            id="transcription_prompt"
            className="flex-1 h-full leading-relaxed resize-none min-h-20"
            placeholder="Inclua palavras-chave mencionadas no vídeo separadas por ','"
            disabled={status !== "waiting"}
            {...register("prompt")}
          />
        </div>

        <Button
          data-success={status === "success"}
          type="submit"
          disabled={status !== "waiting" || videoFile == null}
          className="w-full data-[success=true]:bg-emerald-400"
        >
          {status === "waiting" ? (
            <>
              Carregar vídeo <Upload className="w-4  h-4 ml-2" />
            </>
          ) : (
            statusMessages[status]
          )}
        </Button>
      </div>
    </form>
  );
}
