import "./index.css";
import { Button } from "./components/ui/button";
import { Wand2 } from "lucide-react";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { PromptSelect } from "./components/prompt-select";
import { QueryClient, QueryClientProvider } from "react-query";
import { useCompletion } from "ai/react";
import { useState } from "react";
import { Header } from "./components/header";
import { Wizard } from "react-use-wizard";
import { WizardWrapper } from "./components/wizard-wrapper";
import { VideoPicker } from "./components/video-picker";

const queryClient = new QueryClient();

function App() {
  const [videoId, setVideoId] = useState("");

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
      videoId,
      temperature: 0.5,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  function onVideoUploaded(id: string) {
    setVideoId(id);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header />

        <Wizard wrapper={<WizardWrapper videoUploadedId={videoId} />}>
          <VideoPicker onVideoUploaded={onVideoUploaded} />

          <section className="flex flex-col flex-1 gap-4">
            <form>
              <div className="space-y-2">
                <Label>Prompt</Label>

                <PromptSelect onPromptSelected={setInput} />
              </div>
            </form>

            <div className="grid grid-rows-2 gap-4 flex-1 lg:grid-cols-2">
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
              <code className="text-primary">{`{transcription}`}</code> no seu
              prompt para adicionar o conteúdo da transcrição do vídeo
              selecionado.
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
        </Wizard>
      </div>
    </QueryClientProvider>
  );
}

export default App;
