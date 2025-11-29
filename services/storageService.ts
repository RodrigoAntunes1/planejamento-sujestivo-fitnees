import { ClientData } from '../types';

const STORAGE_KEY = 'team_antunes_clients';

// Helper to generate ID safely in any environment (secure or non-secure)
const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const saveClientData = (data: Omit<ClientData, 'id' | 'submissionDate' | 'paymentStatus'>): ClientData => {
  const currentData = getClients();
  
  const newClient: ClientData = {
    ...data,
    id: generateId(),
    submissionDate: new Date().toISOString(),
    paymentStatus: 'pending_verification'
  };

  const updatedData = [newClient, ...currentData];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  return newClient;
};

export const getClients = (): ClientData[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const deleteClient = (id: string): void => {
  const currentData = getClients();
  const updatedData = currentData.filter(client => client.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
};