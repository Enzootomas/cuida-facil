import { ArrowLeft, Star, MapPin, Clock, Heart, Search } from 'lucide-react';
import type { View } from '../App';
import { useState } from 'react';

interface FindCaregiverProps {
  onNavigate: (view: View) => void;
  onSelect: (service: any) => void;
}

const caregivers = [
  {
    id: 1,
    name: 'Maria Silva',
    rating: 4.9,
    reviews: 127,
    experience: '8 anos de experiência',
    location: 'Centro, São Paulo',
    availability: 'Disponível hoje',
    specialties: ['Consultas médicas', 'Exames', 'Fisioterapia'],
    price: 'R$ 80/hora',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'João Santos',
    rating: 4.8,
    reviews: 94,
    experience: '5 anos de experiência',
    location: 'Zona Sul, São Paulo',
    availability: 'Disponível amanhã',
    specialties: ['Consultas', 'Acompanhamento hospitalar'],
    price: 'R$ 75/hora',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Ana Costa',
    rating: 5.0,
    reviews: 156,
    experience: '10 anos de experiência',
    location: 'Zona Oeste, São Paulo',
    availability: 'Disponível hoje',
    specialties: ['Consultas', 'Exames', 'Internações'],
    price: 'R$ 90/hora',
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop'
  }
];

export function FindCaregiver({ onNavigate, onSelect }: FindCaregiverProps) {
  const [cep, setCep] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredCaregivers, setFilteredCaregivers] = useState(caregivers);

  const handleSelect = (caregiver: typeof caregivers[0]) => {
    onSelect({ type: 'caregiver', data: caregiver });
    onNavigate('appointment');
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setCep(formatted);
  };

  const searchByCep = async () => {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      alert('Por favor, digite um CEP válido com 8 dígitos');
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado. Verifique e tente novamente.');
        setIsSearching(false);
        return;
      }

      // Atualiza a localização da busca
      const locationText = `${data.bairro}, ${data.localidade}`;
      setSearchLocation(locationText);

      // Filtra cuidadores por bairro ou cidade
      const filtered = caregivers.filter(caregiver => 
        caregiver.location.toLowerCase().includes(data.bairro.toLowerCase()) ||
        caregiver.location.toLowerCase().includes(data.localidade.toLowerCase())
      );

      setFilteredCaregivers(filtered.length > 0 ? filtered : caregivers);
    } catch (error) {
      alert('Erro ao buscar CEP. Tente novamente.');
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setCep('');
    setSearchLocation('');
    setFilteredCaregivers(caregivers);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-6 sm:p-6 sm:pb-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 mb-4 sm:mb-6 active:opacity-70"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-base sm:text-lg">Voltar</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Encontrar Cuidador</h1>
        <p className="text-blue-100 text-sm sm:text-base">Profissionais qualificados para acompanhamento</p>
      </div>

      {/* Search by CEP */}
      <div className="max-w-md mx-auto px-4 sm:px-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 border-2 border-gray-100">
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            Buscar por CEP
          </label>
          <div className="flex gap-2 sm:gap-3">
            <input
              type="text"
              value={cep}
              onChange={handleCepChange}
              placeholder="00000-000"
              maxLength={9}
              className="flex-1 min-w-0 px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-xl text-base focus:outline-none focus:border-blue-600"
            />
            <button
              onClick={searchByCep}
              disabled={isSearching}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base font-medium flex-shrink-0"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              {isSearching ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
          {searchLocation && (
            <div className="mt-3 flex items-center justify-between text-xs sm:text-sm">
              <p className="text-gray-600">
                Buscando em: <span className="text-blue-600 font-medium">{searchLocation}</span>
              </p>
              <button
                onClick={clearSearch}
                className="text-blue-600 hover:underline"
              >
                Limpar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Caregivers List */}
      <div className="max-w-md mx-auto px-4 sm:px-6 mb-8">
        {filteredCaregivers.length === 0 && searchLocation ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center border-2 border-gray-100">
            <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-gray-900 font-semibold mb-2 text-base sm:text-lg">Nenhum cuidador encontrado</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              Não encontramos cuidadores em {searchLocation}. Mostrando todos os cuidadores disponíveis.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCaregivers.map((caregiver) => (
              <div
                key={caregiver.id}
                className="bg-white rounded-2xl shadow-md sm:shadow-lg overflow-hidden border-2 border-gray-100"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <img
                      src={caregiver.photo}
                      alt={caregiver.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 font-semibold text-base sm:text-lg mb-0.5 truncate">{caregiver.name}</h3>
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500" />
                          <span className="text-gray-900 text-sm sm:text-base font-medium">{caregiver.rating}</span>
                        </div>
                        <span className="text-gray-500 text-xs sm:text-sm">({caregiver.reviews} avaliações)</span>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm">{caregiver.experience}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 text-xs sm:text-sm">
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                      <span>{caregiver.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span>{caregiver.availability}</span>
                    </div>
                  </div>

                  <div className="mb-3 sm:mb-4">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {caregiver.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-gray-500 text-xs sm:text-sm">Valor</p>
                      <p className="text-blue-600 text-lg sm:text-xl font-bold">{caregiver.price}</p>
                    </div>
                    <button
                      onClick={() => handleSelect(caregiver)}
                      className="px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors active:scale-95 text-sm sm:text-base font-medium"
                    >
                      Agendar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}