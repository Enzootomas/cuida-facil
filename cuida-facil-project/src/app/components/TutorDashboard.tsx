import {
  ArrowLeft,
  User,
  Phone,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  ChevronDown,
  Edit,
  X,
  Save
} from 'lucide-react';
import { useState, useEffect } from 'react';
import type { View } from '../App';

interface TutorDashboardProps {
  onNavigate: (view: View) => void;
  currentUser: any;
  onUpdateUser?: (updatedUser: any) => void;
  onDeleteUser?: () => void;
}

const patientsData = [
  {
    id: 1,
    name: 'José da Silva',
    relationship: 'Pai',
    age: 75,
    address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    appointments: [
      {
        id: 1,
        type: 'caregiver',
        professional: {
          name: 'Maria Silva',
          phone: '(11) 99999-1111',
          email: 'maria.cuidadora@email.com',
          photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop'
        },
        date: '15/12/2024',
        time: '14:00',
        status: 'confirmado',
        address: 'Hospital São Luiz - Av. Paulista, 1234',
        notes: 'Consulta cardiologista - Dr. Roberto'
      }
    ]
  },
  {
    id: 2,
    name: 'Maria Santos',
    relationship: 'Mãe',
    age: 82,
    address: 'Av. Paulista, 456 - Bela Vista, São Paulo - SP',
    appointments: [
      {
        id: 2,
        type: 'driver',
        professional: {
          name: 'Carlos Oliveira',
          phone: '(11) 99999-2222',
          email: 'carlos.motorista@email.com',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
        },
        date: '18/12/2024',
        time: '09:30',
        status: 'confirmado',
        address: 'Clínica Medical - Rua Augusta, 567',
        notes: 'Exame de sangue'
      }
    ]
  }
];

export function TutorDashboard({ onNavigate, currentUser, onUpdateUser }: TutorDashboardProps) {
  const [selectedPatient, setSelectedPatient] = useState(patientsData[0]);
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);

  const defaultTutor = {
    name: 'Ana Silva',
    phone: '(11) 91234-5678',
    email: 'ana.silva@email.com',
    patients: patientsData
  };

  const [tutor, setTutor] = useState(() => currentUser || defaultTutor);
  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    name: tutor.name || '',
    phone: tutor.phone || '',
    email: tutor.email || ''
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (currentUser) {
      setTutor(currentUser);
      setEditForm({
        name: currentUser.name || '',
        phone: currentUser.phone || '',
        email: currentUser.email || ''
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
      name: tutor.name || '',
      phone: tutor.phone || '',
      email: tutor.email || ''
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

    if (editForm.email && (!editForm.email.includes('@') || !editForm.email.includes('.'))) {
      errors.email = 'Digite um e-mail válido';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const updated = {
      ...tutor,
      name: editForm.name.trim(),
      phone: editForm.phone.trim(),
      email: editForm.email.trim()
    };

    setTutor(updated);
    onUpdateUser?.(updated);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-purple-600 text-white p-6 pb-8">
        <button
          onClick={() => onNavigate('login')}
          className="flex items-center gap-2 mb-6 active:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">Sair</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Área do Tutor</h1>
            <p className="text-purple-100 text-sm">Olá, {tutor.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('messages')}
              className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-400 relative transition-colors"
              title="Mensagens"
            >
              <MessageCircle className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                2
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4 space-y-6">
        {/* Patient Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <p className="text-gray-600 text-sm mb-2 font-medium">Paciente selecionado:</p>
          <div className="relative">
            <button
              onClick={() => setShowPatientDropdown(!showPatientDropdown)}
              className="w-full flex items-center justify-between p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900 font-semibold">{selectedPatient.name}</p>
                  <p className="text-purple-700 text-xs font-medium">{selectedPatient.relationship}</p>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-purple-600 transition-transform ${showPatientDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showPatientDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-10 animate-fade-in">
                {patientsData.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => {
                      setSelectedPatient(patient);
                      setShowPatientDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 p-4 hover:bg-purple-50 transition-colors text-left border-b border-gray-50 last:border-b-0"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">{patient.name}</p>
                      <p className="text-gray-500 text-xs">{patient.relationship}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected Patient Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Informações do Paciente</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700 text-sm">
              <User className="w-4 h-4 text-purple-600" />
              <span>{selectedPatient.name} ({selectedPatient.age} anos)</span>
            </div>
            <div className="flex items-start gap-3 text-gray-700 text-sm">
              <MapPin className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <span>{selectedPatient.address}</span>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Agendamentos</h2>
          
          <div className="space-y-4">
            {selectedPatient.appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border-2 border-purple-100 rounded-xl p-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={appointment.professional.photo}
                    alt={appointment.professional.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-gray-900 font-semibold">{appointment.professional.name}</p>
                    <p className="text-purple-600 text-xs mb-1">
                      {appointment.type === 'caregiver' ? 'Cuidador(a)' : 'Motorista'}
                    </p>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        appointment.status === 'confirmado'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {appointment.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 text-xs">
                    <Calendar className="w-4 h-4" />
                    <span>{appointment.date} às {appointment.time}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600 text-xs">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{appointment.address}</span>
                  </div>
                  {appointment.notes && (
                    <div className="bg-gray-50 rounded-lg p-2.5 mt-2">
                      <p className="text-gray-700 text-xs">{appointment.notes}</p>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <p className="text-gray-500 text-xs mb-2">Contato do profissional:</p>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${appointment.professional.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-xs font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Ligar</span>
                    </a>
                    <button
                      onClick={() => onNavigate('messages')}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs font-semibold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Mensagem</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedPatient.appointments.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">
              Nenhum agendamento próximo para {selectedPatient.name}
            </div>
          )}
        </div>
      </div>

      {/* Edit Tutor Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 animate-scale-up">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Edit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Editar Perfil do Tutor</h3>
                  <p className="text-xs text-gray-500">Atualize suas informações</p>
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
                    formErrors.name ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-purple-500'
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
                    formErrors.phone ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-purple-500'
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  E-mail
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => {
                    setEditForm({ ...editForm, email: e.target.value });
                    if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                  }}
                  placeholder="seu.email@exemplo.com"
                  className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none transition-colors ${
                    formErrors.email ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-purple-500'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
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
                  className="flex-1 py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-md shadow-purple-200"
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