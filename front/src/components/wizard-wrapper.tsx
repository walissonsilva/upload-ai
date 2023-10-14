import React, { PropsWithChildren } from "react";
import { Button } from "./ui/button";
import { useWizard } from "react-use-wizard";
import { Separator } from "./ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useVideoPicker } from "@/hooks/useVideoPicker";

export const WizardWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { isFirstStep, nextStep, previousStep, isLastStep, activeStep } =
    useWizard();

  const { pickedVideoId } = useVideoPicker();

  const stepTitleMapper: Record<number, string> = {
    0: "Carregue um novo vídeo ou selecione algum vídeo do seu histórico",
    1: "Selecione o prompt desejado e execute para obter a resposta da ChatGPT",
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 xl:py-12 xl:px-8 w-full">
      <h2 className="text-2xl font-medium mb-1">Passo {activeStep + 1}</h2>
      <h3 className="text-sm text-muted-foreground">{`${stepTitleMapper[activeStep]}`}</h3>

      <Separator className="my-6" />

      {children}

      <div className="flex items-center justify-between mt-8">
        <div>
          {!isFirstStep && (
            <Button onClick={previousStep}>
              <ArrowLeft className="mr-2 w-4" />
              Anterior
            </Button>
          )}
        </div>

        {!isLastStep && (
          <Button onClick={nextStep} disabled={!Boolean(pickedVideoId)}>
            Avançar <ArrowRight className="w-4 ml-2" />
          </Button>
        )}
      </div>
    </main>
  );
};
