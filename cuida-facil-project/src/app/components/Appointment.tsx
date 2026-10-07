import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, FileText, CheckCircle, Search } from 'lucide-react';
import type { View } from '../App';

interface AppointmentProps {
  onNavigate: (view: View) => void;
  service: any;
}

export function Appointment({ onNavigate, service }: AppointmentProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSearchingCep, setIsSearchingCep] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    reference: '',
    notes: ''
  });

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setFormData({ ...formData, cep: formatted });
  };

  const searchCep = async () => {
    const cleanCep = formData.cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      alert('Por favor, digite um CEP válido com 8 dígitos');
      return;
    }

    setIsSearchingCep(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado. Verifique e tente novamente.');
        setIsSearchingCep(false);
        return;
      }

      setFormData({
        ...formData,
        street: data.logradouro || '',
        neighborhood: data.bairro || '',
        city: data.localidade || '',
        state: data.uf || ''
      });
    } catch (error) {
      alert('Erro ao buscar CEP. Tente novamente.');
    } finally {
      setIsSearchingCep(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação adicional
    if (!formData.number.trim()) {
      alert('Por favor, preencha o número do endereço');
      return;
    }
    
    setIsConfirmed(true);
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Nenhum serviço selecionado</p>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl"
          >
            Voltar para início
          </button>
        </div>
      </div>
    );
  }

  const isCaregiver = service.type === 'caregiver';
  const professional = service.data;
  const bgColor = isCaregiver ? 'bg-blue-600' : 'bg-green-600';
  const buttonColor = isCaregiver ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700';

  if (isConfirmed) {
    const fullAddress = `${formData.street}, ${formData.number}${formData.complement ? ', ' + formData.complement : ''} - ${formData.neighborhood}, ${formData.city} - ${formData.state}`;
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-12 h-12 text-yellow-600" />
          </div>
          <h2 className="text-gray-900 mb-3">Solicitação Enviada!</h2>
          <p className="text-gray-600 mb-8">
            Sua solicitação foi enviada para {professional.name}. Aguarde a confirmação do profissional.
          </p>
          
          <div className="bg-yellow-50 rounded-xl p-5 mb-6 border-2 border-yellow-200">
            <p className="text-yellow-800 text-sm mb-3">
              <span className="text-yellow-900">⏳ Aguardando confirmação</span>
            </p>
            <p className="text-yellow-700 text-sm">
              O profissional tem até 24 horas para aceitar ou recusar sua solicitação. Você será notificado assim que houver uma resposta.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
            <p className="text-gray-500 text-sm mb-4">Resumo da solicitação:</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{formData.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{formData.time}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <span className="text-gray-700 block">{fullAddress}</span>
                  {formData.reference && (
                    <span className="text-gray-500 text-sm block mt-1">
                      Ref: {formData.reference}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Voltar para início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className={`${bgColor} text-white px-4 py-6 sm:p-6 sm:pb-8`}>
        <button
          onClick={() => onNavigate(isCaregiver ? 'caregiver' : 'driver')}
          className="flex items-center gap-2 mb-4 sm:mb-6 active:opacity-70"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-base sm:text-lg">Voltar</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Solicitar Serviço</h1>
        <p className={`${isCaregiver ? 'text-blue-100' : 'text-green-100'} text-sm sm:text-base`}>
          Complete as informações abaixo
        </p>
      </div>

      <div className="max-w-md mx-auto px-4 sm:px-6 -mt-4">
        {/* Professional Info */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 mb-5">
          <div className="flex gap-3 sm:gap-4 items-center">
            <img
              src={professional.photo}
              alt={professional.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-gray-900 font-semibold text-base sm:text-lg mb-0.5 truncate">{professional.name}</h3>
              <p className="text-gray-600 text-xs sm:text-sm">{professional.experience}</p>
              <p className={`${isCaregiver ? 'text-blue-600' : 'text-green-600'} text-sm sm:text-base font-bold mt-0.5`}>
                {professional.price}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
          <div className="space-y-4 sm:space-y-5">
            {/* Data e Horário */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-gray-700 mb-1.5 text-sm sm:text-base font-medium">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  Data *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-gray-700 mb-1.5 text-sm sm:text-base font-medium">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  Horário *
                </label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
                />
              </div>
            </div>

            {/* Separador de Endereço */}
            <div className="pt-3 border-t-2 border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-gray-700" />
                <h3 className="text-gray-900 font-semibold text-base sm:text-lg">Endereço do Atendimento</h3>
              </div>
            </div>

            {/* CEP com busca */}
            <div>
              <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">
                CEP *
              </label>
              <div className="flex gap-2 sm:gap-3">
                <input
                  type="text"
                  required
                  value={formData.cep}
                  onChange={handleCepChange}
                  placeholder="00000-000"
                  maxLength={9}
                  className="flex-1 min-w-0 px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
                />
                <button
                  type="button"
                  onClick={searchCep}
                  disabled={isSearchingCep}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base font-medium flex-shrink-0 active:scale-95"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  {isSearchingCep ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
            </div>

            {/* Rua */}
            <div>
              <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">
                Rua/Avenida *
              </label>
              <input
                type="text"
                required
                placeholder="Nome da rua"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
              />
            </div>

            {/* Número e Complemento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">
                  Número *
                </label>
                <input
                  type="text"
                  required
                  placeholder="123"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
                />
              </div>

              <div>
                <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">
                  Complemento
                </label>
                <input
                  type="text"
                  placeholder="Apto 45"
                  value={formData.complement}
                  onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
                />
              </div>
            </div>

            {/* Bairro */}
            <div>
              <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">
                Bairro *
              </label>
              <input
                type="text"
                required
                placeholder="Nome do bairro"
                value={formData.neighborhood}
                onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
              />
            </div>

            {/* Cidade e Estado */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="sm:col-span-2">
                <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">
                  Cidade *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Cidade"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">
                  Estado *
                </label>
                <input
                  type="text"
                  required
                  placeholder="UF"
                  maxLength={2}
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base uppercase"
                />
              </div>
            </div>

            {/* Ponto de Referência */}
            <div>
              <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">
                Ponto de Referência
              </label>
              <input
                type="text"
                placeholder="Ex: Próximo ao banco Itaú"
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
              />
            </div>

            {/* Observações */}
            <div className="pt-3 border-t-2 border-gray-100">
              <label className="flex items-center gap-2 text-gray-700 mb-1.5 text-sm sm:text-base font-medium">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                Observações (opcional)
              </label>
              <textarea
                rows={3}
                placeholder="Informações adicionais sobre o atendimento..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none text-base"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 sm:py-4 ${buttonColor} text-white rounded-xl transition-colors text-base sm:text-lg font-medium shadow-md active:scale-98`}
            >
              Enviar Solicitação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}