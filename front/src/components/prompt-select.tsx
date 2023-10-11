import { useQuery } from "react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { api } from "@/lib/axios";
import { Dispatch, SetStateAction } from "react";

export type Prompt = {
  id: string;
  title: string;
  template: string;
};

interface PromptSelectProps {
  onPromptSelected: Dispatch<SetStateAction<string>>;
}

export function PromptSelect({ onPromptSelected }: PromptSelectProps) {
  const { data: prompts, isLoading } = useQuery(["getAllPrompts"], {
    queryFn: async () => {
      const response = await api.get("/prompts");

      return response.data;
    },
  });

  function handlePromptSelected(promptId: string) {
    const selectedPrompt: Prompt = prompts.find(
      (prompt: Prompt) => prompt.id === promptId
    );

    if (!selectedPrompt) return;

    onPromptSelected(selectedPrompt.template);
  }

  if (isLoading) return null;

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>

      <SelectContent>
        {prompts.map((prompt: Prompt) => (
          <SelectItem key={prompt.id} value={prompt.id}>
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
