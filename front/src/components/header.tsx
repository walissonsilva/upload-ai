import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="px-4 py-3 border-b xl:px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido por Walisson Silva
          </span>
          <Separator orientation="vertical" className="h-6" />
          <a href="https://www.github.com/walissonsilva">
            <Button variant="outline">
              <Github className="w-4 h4- mr-2" />
              GitHub
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};
