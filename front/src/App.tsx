import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Header } from "./components/header";
import { Wizard } from "react-use-wizard";
import { WizardWrapper } from "./components/wizard-wrapper";
import { VideoPicker } from "./components/video-picker";
import { Toaster } from "@/components/ui/toaster";
import { VideoPickerProvider } from "./hooks/contexts/VideoPickerContext";
import { AIPrompts } from "./components/ai-prompts/ai-prompts";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <VideoPickerProvider>
        <div className="flex flex-col">
          <Header />

          <Wizard wrapper={<WizardWrapper />}>
            <VideoPicker />
            <AIPrompts />
          </Wizard>
        </div>

        <Toaster />
      </VideoPickerProvider>
    </QueryClientProvider>
  );
}

export default App;
