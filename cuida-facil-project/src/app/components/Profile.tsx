import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Users,
  Edit,
  Bell,
  UserPlus,
  X,
  Save,
  Trash2,
  ShieldAlert
} from 'lucide-react';
import type { View } from '../App';

interface ProfileProps {
  onNavigate: (view: View) => void;
  service?: any;
  currentUser?: any;
  onUpdateUser?: (updatedUser: any) => void;
  onDeleteUser?: () => void;
}

const mockAppointments = [
  {
    id: 1,
    type: 'caregiver',
    professional: 'Maria Silva',
    professionalPhone: '(11) 99999-1111',
    date: '15/12/2024',
    time: '14:00',
    status: 'confirmado',
    address: 'Hospital São Luiz - Av. Paulista, 1234'
  },
  {
    id: 2,
    type: 'driver',
    professional: 'Carlos Oliveira',
    professionalPhone: '(11) 99999-2222',
    date: '18/12/2024',
    time: '09:30',
    status: 'pendente',
    address: 'Clínica Medical - Rua Augusta, 567'
  }
];

export function Profile({ onNavigate, currentUser, onUpdateUser, onDeleteUser }: ProfileProps) {
  const defaultUser = {
    name: 'José da Silva',
    phone: '(11) 98765-4321',
    email: 'jose.silva@email.com',
    address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
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

  const [user, setUser] = useState(() => currentUser || defaultUser);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [editForm, setEditForm] = useState({
    name: user.name || '',
    phone: user.phone || '',
    email: user.email || '',
    address: user.address || ''
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setEditForm({
        name: currentUser.name || '',
        phone: currentUser.phone || '',
        email: currentUser.email || '',
        address: currentUser.address || ''
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
      name: user.name || '',
      phone: user.phone || '',
      email: user.email || '',
      address: user.address || ''
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
      errors.phone = 'Telefone inválido (mínimo 10 dígitos com DDD)';
    }

    if (!editForm.email.includes('@') || !editForm.email.includes('.')) {
      errors.email = 'Digite um e-mail válido';
    }

    if (!editForm.address.trim()) {
      errors.address = 'Informe seu endereço completo';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const updatedUser = {
      ...user,
      name: editForm.name.trim(),
      phone: editForm.phone.trim(),
      email: editForm.email.trim(),
      address: editForm.address.trim()
    };

    setUser(updatedUser);
    onUpdateUser?.(updatedUser);
    setIsEditing(false);
  };

  const handleConfirmDelete = () => {
    setShowDeleteConfirm(false);
    if (onDeleteUser) {
      onDeleteUser();
    } else {
      onNavigate('landing');
    }
  };

  const hasPendingRequests = user.pendingTutorRequests && user.pendingTutorRequests.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 pb-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 mb-6 active:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">Voltar</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Meu Perfil</h1>
            <p className="text-blue-100 text-sm">Informações pessoais e agendamentos</p>
          </div>
          {hasPendingRequests && (
            <button
              onClick={() => onNavigate('tutor-requests')}
              className="relative w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
              title="Solicitações pendentes"
            >
              <Bell className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                {user.pendingTutorRequests.length}
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4 space-y-6">
        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-0.5">{user.name}</h2>
                <p className="text-gray-500 text-sm">Usuário da plataforma</p>
              </div>
            </div>
            <button
              onClick={handleOpenEdit}
              className="w-10 h-10 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full flex items-center justify-center transition-colors active:scale-95"
              title="Editar Perfil"
              aria-label="Editar Perfil"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span className="text-sm">{user.phone || 'Telefone não informado'}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span className="text-sm">{user.email || 'E-mail não informado'}</span>
            </div>
            <div className="flex items-start gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{user.address || 'Endereço não informado'}</span>
            </div>
          </div>
        </div>

        {/* Account Management Card (Editar e Excluir Perfil) */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Gerenciar Perfil</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Atualize seus dados cadastrais ou encerre sua conta neste dispositivo.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleOpenEdit}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-xl transition-all active:scale-98"
            >
              <Edit className="w-4 h-4 text-blue-600" />
              <span>Editar Perfil</span>
            </button>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl border border-red-200 transition-all active:scale-98"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
              <span>Excluir Perfil Atual</span>
            </button>
          </div>
        </div>

        {/* Tutors Section */}
        <div className="bg-purple-50 rounded-2xl shadow-lg p-6 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-purple-900 font-semibold mb-0.5">Tutores Responsáveis</h3>
                <p className="text-purple-700 text-xs">Podem acompanhar seus agendamentos</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('manage-tutors')}
              className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors"
              title="Adicionar ou gerenciar tutores"
            >
              <UserPlus className="w-5 h-5 text-purple-600" />
            </button>
          </div>
          
          {user.tutors && user.tutors.length > 0 ? (
            <div className="space-y-3">
              {user.tutors.map((tutor: any) => (
                <div key={tutor.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900 font-medium mb-1">{tutor.name}</p>
                      <p className="text-purple-700 text-xs mb-1 font-medium">{tutor.relationship}</p>
                      <div className="flex items-center gap-2 text-gray-600 text-xs">
                        <Phone className="w-3 h-3" />
                        <span>{tutor.phone}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Ativo
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-purple-700 text-center py-4 text-sm">Nenhum tutor cadastrado ainda</p>
          )}
        </div>

        {/* Appointments */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-900 font-bold mb-4">Meus Agendamentos</h3>
          
          <div className="space-y-4">
            {mockAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border-2 border-gray-100 rounded-xl p-4 hover:border-blue-100 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-gray-900 font-medium mb-0.5">{appointment.professional}</p>
                    <p className="text-gray-500 text-xs">
                      {appointment.type === 'caregiver' ? 'Cuidador' : 'Motorista'}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      appointment.status === 'confirmado'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {appointment.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-xs">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-xs">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600 text-xs">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span>{appointment.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {mockAppointments.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">
              Você ainda não tem agendamentos
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 animate-scale-up">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <Edit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Editar Perfil</h3>
                  <p className="text-xs text-gray-500">Altere suas informações de cadastro</p>
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
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => {
                      setEditForm({ ...editForm, name: e.target.value });
                      if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                    }}
                    placeholder="Seu nome e sobrenome"
                    className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none transition-colors ${
                      formErrors.name ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                </div>
                {formErrors.name && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Telefone / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    required
                    maxLength={15}
                    value={editForm.phone}
                    onChange={(e) => {
                      setEditForm({ ...editForm, phone: formatPhone(e.target.value) });
                      if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                    }}
                    placeholder="(11) 98765-4321"
                    className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none transition-colors ${
                      formErrors.phone ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  E-mail *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => {
                      setEditForm({ ...editForm, email: e.target.value });
                      if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                    }}
                    placeholder="seu.email@exemplo.com"
                    className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none transition-colors ${
                      formErrors.email ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Endereço completo *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  <textarea
                    required
                    rows={2}
                    value={editForm.address}
                    onChange={(e) => {
                      setEditForm({ ...editForm, address: e.target.value });
                      if (formErrors.address) setFormErrors({ ...formErrors, address: '' });
                    }}
                    placeholder="Rua, número, complemento, bairro, cidade - UF"
                    className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none resize-none transition-colors ${
                      formErrors.address ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                </div>
                {formErrors.address && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.address}</p>
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
                  className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-md shadow-blue-200"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center animate-scale-up">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <Trash2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">Excluir Perfil Atual?</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Tem certeza que deseja excluir o perfil de <strong className="text-gray-900">{user.name}</strong>?
              Esta ação é <strong>irreversível</strong> e removerá todos os seus dados e agendamentos.
            </p>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleConfirmDelete}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-colors active:scale-95 shadow-md shadow-red-200"
              >
                Sim, excluir perfil
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full py-3 px-4 border-2 border-gray-200 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}