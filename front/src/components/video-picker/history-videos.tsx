import { Video } from "@/types/video";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Check } from "lucide-react";
import clsx from "clsx";
import { useVideoPicker } from "@/hooks/useVideoPicker";

interface HistoryVideosProps {
  uploadedVideos: Video[];
}

export const HistoryVideos: React.FC<HistoryVideosProps> = ({
  uploadedVideos,
}) => {
  const { pickedVideoId, onVideoPicked } = useVideoPicker();

  return (
    <ul className="mt-6 flex flex-col gap-4 w-full">
      {uploadedVideos.map((video) => (
        <li
          key={video.id}
          className={clsx(
            "flex items-center gap-3 px-5 py-3 rounded-md transition-all",
            pickedVideoId === video.id && "bg-green-500/10",
            pickedVideoId !== video.id &&
              "bg-primary/5 hover:bg-primary/10 cursor-pointer",
          )}
        >
          <Input
            type="radio"
            id={video.id}
            name="videoId"
            value={video.id}
            className="sr-only w-0"
            onChange={() => onVideoPicked(video.id)}
          />
          <Label
            htmlFor={video.id}
            className={clsx(
              "flex-1 flex items-center justify-between gap-4",
              pickedVideoId !== video.id && "cursor-pointer",
            )}
          >
            <div>
              <h3 className="text-base font-medium">{video.title}</h3>

              <span className="text-xs text-muted-foreground mt-1 block">
                Enviado em{" "}
                {new Date(video.createdAt).toLocaleString("pt-br", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {pickedVideoId === video.id && <Check className="w-6" />}
          </Label>
        </li>
      ))}
    </ul>
  );
};
