import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.prompt.deleteMany();

  await prisma.prompt.create({
    data: {
      title: "Título do Vídeo",
      template:
        `Seu papel é gerar cinco títulos, em português, para um vídeo do YouTube.

Abaixo você receberá uma transcrição desse vídeo, use essa transcrição para gerar os títulos.
Abaixo você também receberá uma lista de títulos, use essa lista como referência para os títulos a serem gerados.

Os títulos devem ter no máximo 60 caracteres.
Os títulos devem ser chamativos e atrativos para maximizar os cliques.

Retorne APENAS os três títulos em formato de lista como no exemplo abaixo:
'''
- Título 1
- Título 2
- Título 3
'''

Transcrição:
'''
{transcription}
'''`.trim(),
    },
  });

  await prisma.prompt.create({
    data: {
      title: "Descrição do Vídeo",
      template:
        `Seu papel é gerar uma descrição sucinta, em português, para um vídeo do YouTube.
  
Abaixo você receberá uma transcrição desse vídeo, use essa transcrição para gerar a descrição.

A descrição deve possuir no máximo 80 palavras em primeira pessoa contendo os pontos principais do vídeo.

Use palavras chamativas e que cativam a atenção de quem está lendo.

Além disso, no final da descrição inclua uma lista de 3 até 10 hashtags em letra minúscula contendo palavras-chave do vídeo.

O retorno deve seguir o seguinte formato:
'''
Descrição.

#hashtag1 #hashtag2 #hashtag3 ...
'''

Transcrição:
'''
{transcription}
'''`.trim(),
    },
  });

  await prisma.prompt.create({
    data: {
      title: "Exercícios sobre o vídeo",
      template:
        `Seu papel é gerar 5 questões de múltipla escolha, em português, para o vídeo cuja transcrição será informada abaixo. Use-a para criar as questões.

Cada questão deve ser composta por um enunciado e cinco alternativas (a, b, c, d, e), sendo apenas uma delas correta. A resposta correta de cada uma das cinco questões só deve ser informada após as cinco questões. As questões devem estar em português e relacionadas ao conteúdo que foi abordado no conteúdo disponível nesta transcrição: '''{transcription}'''.`.trim(),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
