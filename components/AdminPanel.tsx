import React, { useState, useEffect } from 'react';
import { getClients, deleteClient } from '../services/storageService';
import { generatePlanSuggestion } from '../services/geminiService';
import { ClientData } from '../types';
import { Trash2, Eye, Cpu, X } from 'lucide-react';

interface AdminPanelProps {
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    setClients(getClients());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      deleteClient(id);
      setClients(getClients());
    }
  };

  const handleGenerateAi = async (client: ClientData) => {
    setLoadingAi(true);
    setAiSuggestion('Gerando estratégia baseada no perfil do aluno...');
    const suggestion = await generatePlanSuggestion(client);
    setAiSuggestion(suggestion);
    setLoadingAi(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-display text-gold-500">Painel #TeamAntunes</h1>
          <button onClick={onLogout} className="text-sm text-gray-500 hover:text-white underline">Sair</button>
        </div>

        {clients.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Nenhum cliente cadastrado ainda.
          </div>
        ) : (
          <div className="grid gap-6">
             <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="bg-dark-800 text-gold-500 uppercase font-bold text-xs">
                    <tr>
                      <th className="p-4">Data</th>
                      <th className="p-4">Nome</th>
                      <th className="p-4">Plano</th>
                      <th className="p-4">WhatsApp</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {clients.map(client => (
                      <tr key={client.id} className="hover:bg-dark-900 transition-colors">
                        <td className="p-4">{new Date(client.submissionDate).toLocaleDateString()}</td>
                        <td className="p-4 text-white font-medium">{client.name}</td>
                        <td className="p-4">
                           <span className={`px-2 py-1 rounded text-xs font-bold ${client.selectedPlan === 'VIP' ? 'bg-purple-900 text-purple-200' : 'bg-zinc-800 text-zinc-300'}`}>
                             {client.selectedPlan}
                           </span>
                        </td>
                        <td className="p-4">{client.whatsapp}</td>
                        <td className="p-4 text-yellow-500">{client.paymentStatus === 'pending_verification' ? 'Aguardando Pagto' : 'Pago'}</td>
                        <td className="p-4 flex justify-end gap-2">
                          <button 
                            onClick={() => setSelectedClient(client)}
                            className="p-2 hover:bg-zinc-800 rounded text-blue-400" 
                            title="Ver Detalhes"
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(client.id)}
                            className="p-2 hover:bg-zinc-800 rounded text-red-500"
                            title="Excluir"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-900 border border-zinc-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl flex flex-col md:flex-row">
            
            {/* Left: Data */}
            <div className="p-8 md:w-1/2 border-r border-zinc-800">
               <div className="flex justify-between items-start mb-6">
                 <h2 className="text-2xl font-bold text-white">{selectedClient.name}</h2>
               </div>
               
               <div className="space-y-4 text-sm">
                 <div className="grid grid-cols-2 gap-4">
                   <div className="bg-black p-3 rounded border border-zinc-800">
                     <span className="block text-xs text-gray-500 uppercase">Idade</span>
                     <span className="text-lg text-white">{selectedClient.age}</span>
                   </div>
                   <div className="bg-black p-3 rounded border border-zinc-800">
                     <span className="block text-xs text-gray-500 uppercase">Peso</span>
                     <span className="text-lg text-white">{selectedClient.weight}kg</span>
                   </div>
                   <div className="bg-black p-3 rounded border border-zinc-800">
                     <span className="block text-xs text-gray-500 uppercase">Altura</span>
                     <span className="text-lg text-white">{selectedClient.height}cm</span>
                   </div>
                   <div className="bg-black p-3 rounded border border-zinc-800">
                     <span className="block text-xs text-gray-500 uppercase">Objetivo</span>
                     <span className="text-lg text-gold-500">{selectedClient.goal === 'hypertrophy' ? 'Hipertrofia' : 'Emagrecimento'}</span>
                   </div>
                 </div>

                 <div className="bg-black p-4 rounded border border-zinc-800">
                   <span className="block text-xs text-gray-500 uppercase mb-1">Restrições</span>
                   <p className="text-gray-300">{selectedClient.restrictions || "Nenhuma"}</p>
                 </div>
                 
                 <div className="bg-black p-4 rounded border border-zinc-800">
                   <span className="block text-xs text-gray-500 uppercase mb-1">Contato</span>
                   <a 
                     href={`https://wa.me/55${selectedClient.whatsapp.replace(/\D/g, '')}`} 
                     target="_blank" 
                     rel="noreferrer"
                     className="text-green-500 hover:underline font-mono"
                   >
                     {selectedClient.whatsapp} (Abrir WhatsApp)
                   </a>
                 </div>
               </div>
            </div>

            {/* Right: AI */}
            <div className="p-8 md:w-1/2 bg-zinc-900/50 flex flex-col relative">
               <button 
                 onClick={() => setSelectedClient(null)}
                 className="absolute top-4 right-4 text-gray-500 hover:text-white"
               >
                 <X size={24} />
               </button>

               <div className="mb-6">
                 <h3 className="text-xl font-bold text-gold-500 flex items-center gap-2">
                   <Cpu size={20} /> IA TeamAntunes
                 </h3>
                 <p className="text-xs text-gray-500">Gerador de esboço de protocolo</p>
               </div>

               <div className="flex-1 bg-black border border-zinc-800 rounded p-4 overflow-y-auto mb-4 font-mono text-sm text-gray-300 whitespace-pre-wrap">
                 {aiSuggestion || "Clique no botão abaixo para gerar uma sugestão de protocolo baseada nos dados do aluno."}
               </div>

               <button
                 onClick={() => handleGenerateAi(selectedClient)}
                 disabled={loadingAi}
                 className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
               >
                 {loadingAi ? 'Processando Inteligência...' : 'Gerar Protocolo com IA'}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};