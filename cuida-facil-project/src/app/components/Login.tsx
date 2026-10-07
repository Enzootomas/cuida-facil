import { useState } from 'react';
import { Heart, User, Users, Briefcase, Clock, Search, CreditCard, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import type { UserType } from '../App';

interface LoginProps {
  onLogin: (type: UserType, userData: any) => void;
}

const relationshipOptions = [
  'Pai',
  'Mãe',
  'Avó',
  'Avô',
  'Tio',
  'Tia',
  'Primo',
  'Prima',
  'Sobrinho',
  'Sobrinha',
  'Filho',
  'Filha',
  'Neto',
  'Neta',
  'Amigo',
  'Amiga',
  'Outro'
];

const weekDays = [
  { id: 'monday', label: 'Segunda' },
  { id: 'tuesday', label: 'Terça' },
  { id: 'wednesday', label: 'Quarta' },
  { id: 'thursday', label: 'Quinta' },
  { id: 'friday', label: 'Sexta' },
  { id: 'saturday', label: 'Sábado' },
  { id: 'sunday', label: 'Domingo' }
];

export function Login({ onLogin }: LoginProps) {
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [relationship, setRelationship] = useState('');
  const [partnerType, setPartnerType] = useState<'caregiver' | 'driver'>('caregiver');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('18:00');
  
  // Endereço
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [reference, setReference] = useState('');
  
  // Dados específicos do parceiro
  const [rg, setRg] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  
  const [isSearchingCep, setIsSearchingCep] = useState(false);
  const [nameError, setNameError] = useState('');

  const toggleDay = (dayId: string) => {
    if (selectedDays.includes(dayId)) {
      setSelectedDays(selectedDays.filter(d => d !== dayId));
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }
  };

  const validateName = (value: string) => {
    const words = value.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length < 2) {
      setNameError('Por favor, digite nome e sobrenome');
      return false;
    }
    setNameError('');
    return true;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (value.trim()) {
      validateName(value);
    } else {
      setNameError('');
    }
  };

  const formatCpf = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCpf(e.target.value));
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(formatCep(e.target.value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const searchCep = async () => {
    const cleanCep = cep.replace(/\D/g, '');
    
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

      setStreet(data.logradouro || '');
      setNeighborhood(data.bairro || '');
      setCity(data.localidade || '');
      setState(data.uf || '');
    } catch (error) {
      alert('Erro ao buscar CEP. Tente novamente.');
    } finally {
      setIsSearchingCep(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar nome completo
    if (!validateName(name)) {
      alert('Por favor, digite seu nome completo (nome e sobrenome)');
      return;
    }
    
    // Mock user data based on type
    let userData = {};
    
    const fullAddress = `${street}, ${number}${complement ? ', ' + complement : ''} - ${neighborhood}, ${city} - ${state}`;
    
    if (selectedType === 'user') {
      userData = {
        name: name || 'José da Silva',
        phone: phone,
        email: email || 'jose.silva@email.com',
        cpf: cpf,
        birthDate: birthDate,
        address: fullAddress,
        addressDetails: {
          cep, street, number, complement, neighborhood, city, state, reference
        },
        tutors: [
          {
            id: 1,
            name: 'Ana Silva',
            phone: '(11) 91234-5678',
            relationship: 'Filha',
            status: 'approved'
          }
        ],
        pendingTutorRequests: [
          {
            id: 2,
            name: 'Carlos Silva',
            phone: '(11) 98888-7777',
            relationship: 'Filho',
            status: 'pending'
          }
        ]
      };
    } else if (selectedType === 'tutor') {
      userData = {
        name: name || 'Ana Silva',
        phone: phone,
        email: email || 'ana.silva@email.com',
        cpf: cpf,
        birthDate: birthDate,
        address: fullAddress,
        addressDetails: {
          cep, street, number, complement, neighborhood, city, state, reference
        },
        patients: [
          {
            id: 1,
            name: 'José da Silva',
            relationship: relationship || 'Filha',
            status: 'approved',
            age: 75,
            address: 'Rua das Flores, 123 - Centro, São Paulo - SP'
          },
          {
            id: 2,
            name: 'Maria Santos',
            relationship: 'Mãe',
            status: 'approved',
            age: 82,
            address: 'Av. Paulista, 456 - Bela Vista, São Paulo - SP'
          }
        ],
        pendingRequests: [
          {
            id: 3,
            name: 'Pedro Oliveira',
            relationship: 'Tio',
            status: 'pending',
            requestedAt: '08/12/2024'
          }
        ]
      };
    } else if (selectedType === 'partner') {
      userData = {
        name: name || 'Maria Silva',
        phone: phone,
        email: email || 'maria.cuidadora@email.com',
        cpf: cpf,
        rg: rg,
        birthDate: birthDate,
        address: fullAddress,
        addressDetails: {
          cep, street, number, complement, neighborhood, city, state, reference
        },
        bankAccount: bankAccount,
        type: partnerType,
        experience: '8 anos',
        rating: 4.9,
        availability: {
          days: selectedDays,
          startTime: startTime,
          endTime: endTime
        }
      };
    }
    
    onLogin(selectedType, userData);
  };

  if (!selectedType) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8 sm:p-6 flex flex-col items-center justify-center">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-6 sm:mb-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-md">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">Cuida Fácil</h1>
            <p className="text-gray-600 text-base sm:text-lg">Bem-vindo! Como você deseja acessar?</p>
          </div>

          {/* User Type Selection */}
          <div className="space-y-3 sm:space-y-4">
            <button
              onClick={() => setSelectedType('user')}
              className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-md border-2 border-blue-200 hover:border-blue-400 transition-all active:scale-95"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-0.5">Sou Usuário</h2>
                  <p className="text-gray-600 text-sm sm:text-base">Preciso de cuidador ou transporte</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedType('tutor')}
              className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-md border-2 border-purple-200 hover:border-purple-400 transition-all active:scale-95"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-purple-900 mb-0.5">Sou Tutor</h2>
                  <p className="text-gray-600 text-sm sm:text-base">Cuido de um ou mais familiares</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedType('partner')}
              className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-md border-2 border-green-200 hover:border-green-400 transition-all active:scale-95"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-green-900 mb-0.5">Sou Parceiro</h2>
                  <p className="text-gray-600 text-sm sm:text-base">Cuidador ou motorista</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-6 sm:p-6 flex flex-col items-center">
      <div className="max-w-md w-full">
        {/* Back Button - Always Visible */}
        <button
          onClick={() => setSelectedType(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 sm:mb-6 active:opacity-70"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-base sm:text-lg">Voltar</span>
        </button>

        <div className="text-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-md">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-blue-900 mb-1">
            {selectedType === 'user' && 'Cadastro de Usuário'}
            {selectedType === 'tutor' && 'Cadastro de Tutor'}
            {selectedType === 'partner' && 'Cadastro de Parceiro'}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Preencha seus dados para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
          <div className="space-y-4">
            {/* Dados Pessoais */}
            <div className="pb-2 border-b-2 border-gray-100">
              <h3 className="text-gray-900 font-semibold mb-1 text-base sm:text-lg">Dados Pessoais</h3>
            </div>

            <div>
              <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">Nome completo *</label>
              <input
                type="text"
                required
                placeholder="Seu nome completo"
                value={name}
                onChange={handleNameChange}
                className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
              />
              {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">CPF *</label>
                <input
                  type="text"
                  required
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={handleCpfChange}
                  maxLength={14}
                  className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
                />
              </div>

              <div>
                <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">Data de Nasc. *</label>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">Telefone *</label>
              <input
                type="tel"
                required
                placeholder="(11) 98765-4321"
                value={phone}
                onChange={handlePhoneChange}
                maxLength={15}
                className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
              />
            </div>

            <div>
              <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">Email *</label>
              <input
                type="email"
                required
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
              />
            </div>

            {selectedType === 'partner' && (
              <>
                <div>
                  <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">RG ou CNH *</label>
                  <input
                    type="text"
                    required
                    placeholder="00.000.000-0"
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
                  />
                </div>

                <div>
                  <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">Dados Bancários (Banco/Agência/Conta)</label>
                  <input
                    type="text"
                    placeholder="Ex: Banco do Brasil - Ag 1234 - C/C 12345-6"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
                  />
                </div>
              </>
            )}

            {/* Endereço */}
            <div className="pt-3 pb-2 border-t-2 border-gray-100">
              <h3 className="text-gray-900 font-semibold mb-1 text-base sm:text-lg">Endereço</h3>
            </div>

            <div>
              <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">CEP *</label>
              <div className="flex gap-2 sm:gap-3">
                <input
                  type="text"
                  required
                  value={cep}
                  onChange={handleCepChange}
                  placeholder="00000-000"
                  maxLength={9}
                  className="flex-1 min-w-0 px-3.5 sm:px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
                />
                <button
                  type="button"
                  onClick={searchCep}
                  disabled={isSearchingCep}
                  className="px-4 sm:px-6 py-3 sm:py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base whitespace-nowrap active:scale-95 flex-shrink-0"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  {isSearchingCep ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
            </div>

            <div>
              <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">Rua/Avenida *</label>
              <input
                type="text"
                required
                placeholder="Nome da rua"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">Número *</label>
                <input
                  type="text"
                  required
                  placeholder="123"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
                />
              </div>

              <div>
                <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">Complemento</label>
                <input
                  type="text"
                  placeholder="Apto 45"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">Bairro *</label>
              <input
                type="text"
                required
                placeholder="Nome do bairro"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="sm:col-span-2">
                <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">Cidade *</label>
                <input
                  type="text"
                  required
                  placeholder="Cidade"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">Estado *</label>
                <input
                  type="text"
                  required
                  placeholder="UF"
                  maxLength={2}
                  value={state}
                  onChange={(e) => setState(e.target.value.toUpperCase())}
                  className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base uppercase"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">Ponto de Referência</label>
              <input
                type="text"
                placeholder="Ex: Próximo ao supermercado"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
              />
            </div>

            {selectedType === 'tutor' && (
              <>
                <div className="pt-3 border-t-2 border-gray-100">
                  <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">
                    Qual o seu relacionamento com o paciente? *
                  </label>
                  <select
                    required
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base bg-white"
                  >
                    <option value="">Selecione...</option>
                    {relationshipOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {selectedType === 'partner' && (
              <>
                <div className="pt-3 border-t-2 border-gray-100">
                  <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">Tipo de serviço *</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPartnerType('caregiver')}
                      className={`py-3 rounded-xl border-2 font-medium text-sm sm:text-base transition-all ${
                        partnerType === 'caregiver'
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Cuidador
                    </button>
                    <button
                      type="button"
                      onClick={() => setPartnerType('driver')}
                      className={`py-3 rounded-xl border-2 font-medium text-sm sm:text-base transition-all ${
                        partnerType === 'driver'
                          ? 'bg-green-50 border-green-500 text-green-700'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Motorista
                    </button>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gray-700 mb-2 text-sm sm:text-base">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    Dias disponíveis *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {weekDays.map((day) => (
                      <button
                        key={day.id}
                        type="button"
                        onClick={() => toggleDay(day.id)}
                        className={`py-2.5 px-3 rounded-xl border-2 text-sm sm:text-base transition-all ${
                          selectedDays.includes(day.id)
                            ? 'bg-green-50 border-green-500 text-green-700 font-medium'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                  {selectedDays.length === 0 && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1.5">Selecione pelo menos um dia</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">Horário inicial *</label>
                    <input
                      type="time"
                      required
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 mb-1.5 block text-sm sm:text-base">Horário final *</label>
                    <input
                      type="time"
                      required
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={selectedType === 'partner' && selectedDays.length === 0}
            className="w-full py-3.5 sm:py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors mt-6 text-base sm:text-lg font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}