# UploadAI

Uma aplicação web que visa gerar insigths de títulos e descrição de vídeos a partir de seu conteúdo, utilizando a ChatGPT. O sistema permite que o usuário realize upload de vídeos, os quais serão convertidos para o formato mp3, tendo em vista que apenas o áudio do vídeo será utilizado para que, a partir da sua transcrição, gerada pelo modelo Whisper da OpenAI, a ChatGPT possa utilizá-la como input para gerar títulos com uma bom SEO, além de uma descrição sucinta do vídeo que inclui algumas hashtags com palavras-chave do conteúdo do vídeo.

Pode ser uma excelente ferramenta para youtubers, professores e criadores de conteúdo, sendo possível expandir a sua utilização para outros diversos cenários.

A aplicação foi desenvolvida utilizando o ReactJS (Vite) no Front-end, e o Node.js (Fastify) no Back-end, ambos baseados na linguagem TypeScript. Além disso, os dados são armazenados em banco de dados SQLite, o que pode ser facilmente customizado, uma vez que foi utilizado o Prisma como ORM.

## Funcionamento da Aplicação

![Demonstração do funcionamento da aplicação](./front/public/screenshots/upload-ai-demo.gif)

## Ferramentas Utilizadas

- ReactJS (Front-end) com o Vite e TypeScript para a construção da interface (front-end).
- TailwindCSS como ferramenta de estilização.
- ShadcnUI para uma biblioteca de componentes (baseada no TailwindCSS) para acelerar o desenvolvimento da interface.
- Node.js para a construção do backe-end.
- Fastify como framework para o desenvolvimento da API Rest.
- ffmpeg.wasm para a conversão do vídeo em áudio dentro do próprio navegador (utiliza WebAssembly/JavaScript para manipular áudios e vídeos).
- OpenAI API para utilizar o modelo Whisper (gerar a transcrição do aúdio do vídeo) e a ChatGPT (na geração dos títulos e descrição do vídeo a partir da transcrição).
