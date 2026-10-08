import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Star,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  TrendingUp,
  DollarSign,
  User,
  Bell,
  Edit,
  X,
  Save
} from 'lucide-react';
import type { View } from '../App';

interface PartnerProfileProps {
  onNavigate: (view: View) => void;
  currentUser: any;
  onUpdateUser?: (updatedUser: any) => void;
  onDeleteUser?: () => void;
}

const upcomingJobs = [
  {
    id: 1,
    patient: 'José da Silva',
    tutor: {
      name: 'Ana Silva',
      relationship: 'Filha',
      phone: '(11) 91234-5678'
    },
    date: '15/12/2024',
    time: '14:00',
    address: 'Hospital São Luiz - Av. Paulista, 1234',
    type: 'Consulta médica',
    payment: 'R$ 80,00',
    status: 'confirmado'
  },
  {
    id: 2,
    patient: 'Maria Santos',
    tutor: {
      name: 'Pedro Santos',
      relationship: 'Filho',
      phone: '(11) 92345-6789'
    },
    date: '16/12/2024',
    time: '10:00',
    address: 'Clínica Reabilitar - Rua Augusta, 456',
    type: 'Fisioterapia',
    payment: 'R$ 80,00',
    status: 'confirmado'
  }
];

const completedJobs = [
  {
    id: 3,
    patient: 'Carlos Mendes',
    date: '12/12/2024',
    payment: 'R$ 80,00',
    rating: 5
  },
  {
    id: 4,
    patient: 'Lucia Oliveira',
    date: '10/12/2024',
    payment: 'R$ 80,00',
    rating: 5
  }
];

const pendingRequestsCount = 2;

export function PartnerProfile({ onNavigate, currentUser, onUpdateUser }: PartnerProfileProps) {
  const defaultPartner = {
    name: 'Maria Silva',
    phone: '(11) 99999-1111',
    email: 'maria.cuidadora@email.com',
    type: 'caregiver',
    experience: '8 anos',
    rating: 4.9,
    reviews: 127,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    availability: {
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      startTime: '08:00',
      endTime: '18:00'
    }
  };

  const [partner, setPartner] = useState(() => currentUser || defaultPartner);
  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    name: partner.name || '',
    phone: partner.phone || '',
    email: partner.email || '',
    experience: partner.experience || '1 ano'
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (currentUser) {
      setPartner(currentUser);
      setEditForm({
        name: currentUser.name || '',
        phone: currentUser.phone || '',
        email: currentUser.email || '',
        experience: currentUser.experience || '1 ano'
      });
    }
  }, [currentUser]);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleOpenEdit = () => {
    setEditForm({
      name: partner.name || '',
      phone: partner.phone || '',
      email: partner.email || '',
      experience: partner.experience || '1 ano'
    });
    setFormErrors({});
    setIsEditing(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    const nameWords = editForm.name.trim().split(/\s+/).filter(Boolean);
    if (nameWords.length < 2) {
      errors.name = 'Por favor, digite seu nome e sobrenome';
    }

    const cleanPhone = editForm.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      errors.phone = 'Telefone inválido com DDD';
    }

    if (!editForm.email.includes('@') || !editForm.email.includes('.')) {
      errors.email = 'Digite um e-mail válido';
    }

    if (!editForm.experience.trim()) {
      errors.experience = 'Informe o tempo de experiência';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const updated = {
      ...partner,
      name: editForm.name.trim(),
      phone: editForm.phone.trim(),
      email: editForm.email.trim(),
      experience: editForm.experience.trim()
    };

    setPartner(updated);
    onUpdateUser?.(updated);
    setIsEditing(false);
  };

  const thisMonthEarnings = 'R$ 2.400,00';
  const completedThisMonth = 30;

  const dayLabels: { [key: string]: string } = {
    monday: 'Seg',
    tuesday: 'Ter',
    wednesday: 'Qua',
    thursday: 'Qui',
    friday: 'Sex',
    saturday: 'Sáb',
    sunday: 'Dom'
  };

  const isCaregiver = partner.type === 'caregiver';
  const bgColor = isCaregiver ? 'bg-blue-600' : 'bg-green-600';

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className={`${bgColor} text-white p-6 pb-8`}>
        <button
          onClick={() => onNavigate('login')}
          className="flex items-center gap-2 mb-6 active:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">Sair</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Área do Parceiro</h1>
            <p className={isCaregiver ? 'text-blue-100 text-sm' : 'text-green-100 text-sm'}>
              {isCaregiver ? 'Cuidador Profissional' : 'Motorista Parceiro'}
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onNavigate('partner-requests')}
              className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isCaregiver ? 'bg-blue-500 hover:bg-blue-400' : 'bg-green-500 hover:bg-green-400'
              }`}
              title="Solicitações"
            >
              <Bell className="w-6 h-6 text-white" />
              {pendingRequestsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                  {pendingRequestsCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => onNavigate('messages')}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isCaregiver ? 'bg-blue-500 hover:bg-blue-400' : 'bg-green-500 hover:bg-green-400'
              }`}
              title="Mensagens"
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img
                src={partner.photo || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop'}
                alt={partner.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 shadow-sm"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-0.5">{partner.name}</h2>
                <p className="text-gray-600 text-sm mb-1">{partner.experience} de experiência</p>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-gray-900 text-sm font-semibold">{partner.rating || 5.0}</span>
                  <span className="text-gray-400 text-xs">({partner.reviews || 0} avaliações)</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleOpenEdit}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center transition-colors active:scale-95"
              title="Editar Perfil"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Contact Details */}
          <div className="border-t border-b border-gray-100 py-3 my-3 space-y-1.5 text-xs text-gray-600">
            <p><strong>Telefone:</strong> {partner.phone || 'Não informado'}</p>
            <p><strong>E-mail:</strong> {partner.email || 'Não informado'}</p>
          </div>

          {/* Availability */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <p className="text-gray-900 font-medium text-sm">Disponibilidade</p>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {partner.availability?.days?.map((day: string) => (
                <span
                  key={day}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isCaregiver ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}
                >
                  {dayLabels[day] || day}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-xs">
              {partner.availability?.startTime || '08:00'} - {partner.availability?.endTime || '18:00'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl ${isCaregiver ? 'bg-blue-50' : 'bg-green-50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className={`w-4 h-4 ${isCaregiver ? 'text-blue-600' : 'text-green-600'}`} />
                <p className={`text-xs font-medium ${isCaregiver ? 'text-blue-900' : 'text-green-900'}`}>Este mês</p>
              </div>
              <p className={`text-lg font-bold ${isCaregiver ? 'text-blue-700' : 'text-green-700'}`}>{thisMonthEarnings}</p>
            </div>
            <div className={`p-4 rounded-xl ${isCaregiver ? 'bg-blue-50' : 'bg-green-50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className={`w-4 h-4 ${isCaregiver ? 'text-blue-600' : 'text-green-600'}`} />
                <p className={`text-xs font-medium ${isCaregiver ? 'text-blue-900' : 'text-green-900'}`}>Atendimentos</p>
              </div>
              <p className={`text-lg font-bold ${isCaregiver ? 'text-blue-700' : 'text-green-700'}`}>{completedThisMonth}</p>
            </div>
          </div>
        </div>

        {/* Pending Requests Alert */}
        {pendingRequestsCount > 0 && (
          <button
            onClick={() => onNavigate('partner-requests')}
            className="w-full bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-5 hover:bg-yellow-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-yellow-600" />
                <div className="text-left">
                  <p className="text-yellow-900 font-medium">
                    {pendingRequestsCount} solicitações pendentes
                  </p>
                  <p className="text-yellow-700 text-xs">Toque para visualizar e responder</p>
                </div>
              </div>
              <span className="w-8 h-8 bg-yellow-200 text-yellow-900 rounded-full flex items-center justify-center font-bold text-sm">
                {pendingRequestsCount}
              </span>
            </div>
          </button>
        )}

        {/* Upcoming Jobs */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-900 font-bold mb-4">Próximos Atendimentos</h3>
          
          <div className="space-y-4">
            {upcomingJobs.map((job) => (
              <div
                key={job.id}
                className="border-2 border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900 font-medium">{job.patient}</p>
                    </div>
                    <p className="text-gray-600 text-xs">{job.type}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    isCaregiver ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {job.payment}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 text-xs">
                    <Calendar className="w-4 h-4" />
                    <span>{job.date} às {job.time}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600 text-xs">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>{job.address}</span>
                  </div>
                </div>

                {/* Tutor Contact */}
                <div className="bg-purple-50 rounded-lg p-3 mb-3">
                  <p className="text-purple-900 text-xs font-semibold mb-1">Contato do Tutor:</p>
                  <p className="text-purple-700 text-xs">{job.tutor.name} ({job.tutor.relationship})</p>
                  <p className="text-purple-600 text-xs">{job.tutor.phone}</p>
                </div>

                <button
                  onClick={() => onNavigate('messages')}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 text-white rounded-lg transition-colors text-sm font-semibold ${
                    isCaregiver ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Mensagem para tutor</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Completed */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-900 font-bold mb-4">Atendimentos Recentes</h3>
          
          <div className="space-y-3">
            {completedJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="text-gray-900 font-medium mb-0.5">{job.patient}</p>
                  <p className="text-gray-500 text-xs">{job.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold text-sm mb-0.5 ${isCaregiver ? 'text-blue-600' : 'text-green-600'}`}>
                    {job.payment}
                  </p>
                  <div className="flex items-center gap-1 justify-end">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="text-gray-700 text-xs font-medium">{job.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Partner Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 animate-scale-up">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  isCaregiver ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                }`}>
                  <Edit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Editar Perfil do Parceiro</h3>
                  <p className="text-xs text-gray-500">Atualize seus dados profissionais</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Nome completo *
                </label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => {
                    setEditForm({ ...editForm, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                  }}
                  className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none transition-colors ${
                    formErrors.name ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-blue-500'
                  }`}
                />
                {formErrors.name && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Telefone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={15}
                  value={editForm.phone}
                  onChange={(e) => {
                    setEditForm({ ...editForm, phone: formatPhone(e.target.value) });
                    if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                  }}
                  className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none transition-colors ${
                    formErrors.phone ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-blue-500'
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  E-mail *
                </label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => {
                    setEditForm({ ...editForm, email: e.target.value });
                    if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                  }}
                  className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none transition-colors ${
                    formErrors.email ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-blue-500'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Tempo de experiência *
                </label>
                <input
                  type="text"
                  required
                  value={editForm.experience}
                  onChange={(e) => {
                    setEditForm({ ...editForm, experience: e.target.value });
                    if (formErrors.experience) setFormErrors({ ...formErrors, experience: '' });
                  }}
                  placeholder="Ex: 5 anos"
                  className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none transition-colors ${
                    formErrors.experience ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-blue-500'
                  }`}
                />
                {formErrors.experience && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.experience}</p>
                )}
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 px-4 border-2 border-gray-200 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-3 px-4 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-md ${
                    isCaregiver ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}