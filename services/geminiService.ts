import { GoogleGenAI } from "@google/genai";
import { ClientData } from '../types';

// NOTE: In a real production app, never expose API keys in frontend code.
// Since this is a generated demo running in a controlled environment, we use process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generatePlanSuggestion = async (client: ClientData): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key não configurada. Não é possível gerar sugestão.";
  }

  try {
    const prompt = `
      Atue como um treinador de elite e nutricionista esportivo do #TeamAntunes.
      Crie um esboço RÁPIDO e DIRETO de protocolo para este aluno:
      
      Perfil:
      - Objetivo: ${client.goal === 'hypertrophy' ? 'Hipertrofia Extrema' : 'Emagrecimento/Definição'}
      - Idade: ${client.age}
      - Peso: ${client.weight}kg
      - Altura: ${client.height}cm
      - Nível Atividade: ${client.activityLevel}
      - Restrições: ${client.restrictions || 'Nenhuma'}

      Retorne em formato Markdown:
      1. Sugestão de Divisão de Treino (Ex: ABC, ABCD).
      2. Sugestão de Macros (Proteína/Carbo/Gordura).
      3. 2 Dicas essenciais baseadas no objetivo dele.
      
      Seja motivador e agressivo no estilo "Coach".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Não foi possível gerar a sugestão.";
  } catch (error) {
    console.error("Erro ao gerar sugestão:", error);
    return "Erro ao conectar com a IA do TeamAntunes.";
  }
};