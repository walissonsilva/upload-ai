import { Label } from "../ui/label";
import { PromptSelect } from "../prompt-select";
import { Button } from "../ui/button";
import { Wand2 } from "lucide-react";
import { Separator } from "../ui/separator";
import { useCompletion } from "ai/react";
import { useVideoPicker } from "@/hooks/useVideoPicker";
import { Textarea } from "../ui/textarea";

export const AIPrompts = () => {
  const { pickedVideoId } = useVideoPicker();
  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: "http://localhost:3333/ai/complete",
    body: {
      videoId: pickedVideoId,
      temperature: 0.5,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <section className="flex flex-col flex-1 gap-4">
      <form>
        <div className="space-y-2">
          <Label>Prompt</Label>

          <PromptSelect onPromptSelected={setInput} />
        </div>
      </form>

      <div className="grid grid-rows-2 gap-4 flex-1 lg:grid-cols-2 lg:grid-rows-none">
        <Textarea
          placeholder="Inclua o prompt para a IA..."
          className="resize-none p-4 leading-relaxed"
          value={input}
          onChange={handleInputChange}
          rows={10}
        />
        <Textarea
          placeholder="Resultado gerado pela IA..."
          readOnly
          className="resize-none p-4 leading-relaxed"
          value={completion}
          rows={10}
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Lembre-se: você pode utilizar a variável{" "}
        <code className="text-primary">{`{transcription}`}</code> no seu prompt
        para adicionar o conteúdo da transcrição do vídeo selecionado.
      </p>

      <Separator />

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
        onClick={handleSubmit}
      >
        Executar
        <Wand2 className="w-4 h-4 ml-2" />
      </Button>
    </section>
  );
};
