import { Heart, Car, User } from 'lucide-react';
import type { View } from '../App';

interface HomeProps {
  onNavigate: (view: View) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-6 sm:p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 mt-4 sm:mt-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-md">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1 sm:mb-2">Cuida Fácil</h1>
          <p className="text-gray-600 text-base sm:text-xl">Cuidado e transporte quando você precisa</p>
        </div>

        {/* Main Actions */}
        <div className="space-y-3 sm:space-y-4 flex-1">
          <button
            onClick={() => onNavigate('caregiver')}
            className="w-full bg-white rounded-2xl p-4 sm:p-6 shadow-md sm:shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all active:scale-95"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-0.5">Encontrar Cuidador</h2>
                <p className="text-gray-600 text-sm sm:text-base">Para consultas e exames</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('driver')}
            className="w-full bg-white rounded-2xl p-4 sm:p-6 shadow-md sm:shadow-lg border-2 border-green-200 hover:border-green-400 transition-all active:scale-95"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Car className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold text-green-900 mb-0.5">Encontrar Transporte</h2>
                <p className="text-gray-600 text-sm sm:text-base">Motoristas parceiros disponíveis</p>
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 sm:mt-8 sm:pt-6 border-t border-gray-200">
          <button
            onClick={() => onNavigate('profile')}
            className="w-full flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 text-gray-600 hover:text-blue-600 transition-colors active:scale-95"
          >
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-base sm:text-lg font-medium">Meu Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
