import { GoogleGenAI } from "@google/genai";
import { ClientData } from '../types';

// Safe access to API Key to prevent "process is not defined" errors in browser-only environments
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

export const generatePlanSuggestion = async (client: ClientData): Promise<string> => {
  if (!apiKey) {
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