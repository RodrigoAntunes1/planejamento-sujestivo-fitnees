import { ClientData } from '../types';

const STORAGE_KEY = 'team_antunes_clients';

export const saveClientData = (data: Omit<ClientData, 'id' | 'submissionDate' | 'paymentStatus'>): ClientData => {
  const currentData = getClients();
  
  const newClient: ClientData = {
    ...data,
    id: crypto.randomUUID(),
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