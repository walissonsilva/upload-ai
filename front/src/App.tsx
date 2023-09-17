import "./index.css";
import { Button } from "./components/ui/button";
import { Github, Wand2 } from "lucide-react";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";
import { Prompt, PromptSelect } from "./components/prompt-select";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [temperature, setTemperature] = useState(0.5);

  function handlePromptSelected(prompt: Prompt) {
    console.log(prompt);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-3 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold">upload.ui</h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Desenvolvido por Walisson Silva
            </span>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline">
              <Github className="w-4 h4- mr-2" />
              GitHub
            </Button>
          </div>
        </div>

        <main className="flex-1 flex gap-6 p-6">
          <section className="flex flex-col flex-1 gap-4">
            <div className="grid grid-rows-2 gap-4 flex-1">
              <Textarea
                placeholder="Inclua o prompt para a IA..."
                className="resize-none p-4 leading-relaxed"
              />
              <Textarea
                placeholder="Resultado gerado pela IA..."
                readOnly
                className="resize-none p-4 leading-relaxed"
              />
            </div>

            <p className="text-sm text-muted-foreground">
              Lembre-se: você pode utilizar a variável{" "}
              <code className="text-primary">{`{transcription}`}</code> no seu
              prompt para adicionar o conteúdo da transcrição do vídeo
              selecionado.
            </p>
          </section>

          <aside className="w-80 space-y-6">
            <VideoInputForm />

            <Separator />

            <form className="space-y-6">
              <div className="space-y-2">
                <Label>Prompt</Label>

                <PromptSelect onPromptSelected={handlePromptSelected} />

                <span className="block text-sm text-muted-foreground italic">
                  Você poderá customizar essa opção em breve.
                </span>
              </div>

              <div className="space-y-2">
                <Label>Modelo</Label>

                <Select defaultValue="gpt-3.5" disabled>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="gpt-3.5">GPT 3.5 turbo 16k</SelectItem>
                  </SelectContent>
                </Select>

                <span className="block text-sm text-muted-foreground italic">
                  Você poderá customizar essa opção em breve.
                </span>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Temperatura</Label>

                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  value={[temperature]}
                  onValueChange={(value) => setTemperature(value[0])}
                />

                <span className="block text-sm text-muted-foreground italic leading-relaxed">
                  Valores mais altos tendem a deixar o resultado mais criativo e
                  com possíveis erros.
                </span>
              </div>

              <Separator />

              <Button type="submit" className="w-full">
                Executar
                <Wand2 className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </aside>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
