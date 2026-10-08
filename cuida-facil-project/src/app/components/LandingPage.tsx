import { motion } from 'motion/react';
import { Heart, MapPin, Stethoscope, Activity, Users, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-green-50 to-blue-100 overflow-x-hidden relative">
      {/* Sky and Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-12 sm:top-20 left-4 sm:left-10 w-24 sm:w-32 h-12 sm:h-16 bg-white rounded-full opacity-60 sm:opacity-70"
          animate={{ x: [0, 80, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-28 sm:top-40 right-6 sm:right-20 w-28 sm:w-40 h-14 sm:h-20 bg-white rounded-full opacity-50 sm:opacity-60"
          animate={{ x: [0, -60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-20 sm:top-32 left-1/3 w-20 sm:w-24 h-10 sm:h-12 bg-white rounded-full opacity-40 sm:opacity-50"
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* City Buildings Background - Shown gracefully on tablet/desktop */}
      <div className="hidden sm:flex absolute bottom-0 left-0 right-0 h-96 items-end justify-center gap-4 px-8 pointer-events-none opacity-40 md:opacity-80">
        {/* Hospital */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="w-32 h-64 bg-gradient-to-b from-blue-400 to-blue-500 rounded-t-lg relative shadow-lg">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-5 h-1 bg-white absolute" />
              <div className="w-1 h-5 bg-white absolute" />
            </div>
            {/* Windows */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute grid grid-cols-3 gap-2 px-4 mt-16">
                {[...Array(3)].map((_, j) => (
                  <div
                    key={j}
                    className="w-6 h-6 bg-yellow-200 rounded-sm"
                    style={{ top: `${Math.floor(i / 3) * 40 + 20}px`, left: `${(j * 28) + 16}px`, position: 'absolute' }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-blue-700 text-xs whitespace-nowrap">
            Hospital
          </div>
        </motion.div>

        {/* Park/Trees */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex gap-2 items-end mb-4"
        >
          <div className="w-4 h-32 bg-gradient-to-t from-green-700 to-green-600 rounded-t-full" />
          <div className="w-16 h-20 bg-green-500 rounded-full" />
          <div className="w-4 h-28 bg-gradient-to-t from-green-700 to-green-600 rounded-t-full" />
          <div className="w-12 h-16 bg-green-500 rounded-full" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-green-700 text-xs whitespace-nowrap">
            Parque
          </div>
        </motion.div>

        {/* Clinic */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative"
        >
          <div className="w-28 h-48 bg-gradient-to-b from-purple-300 to-purple-400 rounded-t-lg shadow-lg relative">
            <Stethoscope className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 text-white" />
            {/* Windows */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-5 h-5 bg-blue-100 rounded-sm"
                style={{ 
                  top: `${Math.floor(i / 2) * 30 + 50}px`, 
                  left: `${(i % 2) * 36 + 16}px` 
                }}
              />
            ))}
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-purple-700 text-xs whitespace-nowrap">
            Clínica
          </div>
        </motion.div>

        {/* Medical Lab */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative"
        >
          <div className="w-24 h-40 bg-gradient-to-b from-teal-300 to-teal-400 rounded-t-lg shadow-lg relative">
            <Activity className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 text-white" />
            {/* Windows */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-5 h-5 bg-cyan-100 rounded-sm"
                style={{ 
                  top: `${Math.floor(i / 2) * 28 + 50}px`, 
                  left: `${(i % 2) * 28 + 12}px` 
                }}
              />
            ))}
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-teal-700 text-xs whitespace-nowrap">
            Lab. Exames
          </div>
        </motion.div>
      </div>

      {/* Walking People - Desktop only so it doesn't collide with mobile layout */}
      <div className="hidden md:block absolute bottom-20 left-0 right-0 pointer-events-none overflow-hidden">
        {/* Person 1 - Walking right */}
        <motion.div
          className="absolute bottom-0"
          animate={{ x: [-100, 1200] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative">
            <div className="w-12 h-12 bg-pink-300 rounded-full mb-1" />
            <div className="w-10 h-16 bg-pink-400 rounded-lg mx-auto" />
            <motion.div
              animate={{ rotate: [0, 20, 0, -20, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute top-12 -left-2 w-3 h-8 bg-pink-400 rounded-full origin-top"
            />
            <motion.div
              animate={{ rotate: [0, -20, 0, 20, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute top-12 -right-2 w-3 h-8 bg-pink-400 rounded-full origin-top"
            />
          </div>
        </motion.div>

        {/* Person 2 - Walking left */}
        <motion.div
          className="absolute bottom-0"
          animate={{ x: [1200, -100] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
        >
          <div className="relative">
            <div className="w-12 h-12 bg-blue-300 rounded-full mb-1" />
            <div className="w-10 h-16 bg-blue-400 rounded-lg mx-auto" />
            <motion.div
              animate={{ rotate: [0, -20, 0, 20, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute top-12 -left-2 w-3 h-8 bg-blue-400 rounded-full origin-top"
            />
            <motion.div
              animate={{ rotate: [0, 20, 0, -20, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute top-12 -right-2 w-3 h-8 bg-blue-400 rounded-full origin-top"
            />
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-2xl w-full"
        >
          {/* Logo */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl"
          >
            <Heart className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-3 sm:mb-4 tracking-tight"
          >
            Cuida Fácil
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-gray-700 text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 leading-relaxed px-2"
          >
            Liberdade e Autonomia para Viver com Dignidade
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 text-left sm:text-center"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-md border border-blue-50 flex sm:flex-col items-center gap-4 sm:gap-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl sm:rounded-full flex items-center justify-center flex-shrink-0 sm:mx-auto sm:mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-blue-900 font-semibold mb-1 text-base sm:text-lg">Cuidadores</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Profissionais qualificados para acompanhamento
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-md border border-green-50 flex sm:flex-col items-center gap-4 sm:gap-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-2xl sm:rounded-full flex items-center justify-center flex-shrink-0 sm:mx-auto sm:mb-4">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-green-900 font-semibold mb-1 text-base sm:text-lg">Transporte</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Motoristas parceiros com veículos adaptados
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-md border border-purple-50 flex sm:flex-col items-center gap-4 sm:gap-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-2xl sm:rounded-full flex items-center justify-center flex-shrink-0 sm:mx-auto sm:mb-4">
                <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-purple-900 font-semibold mb-1 text-base sm:text-lg">Saúde</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Consultas, exames e acompanhamento médico
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onEnter}
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl text-lg sm:text-xl font-medium shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 mx-auto"
          >
            Começar Agora
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="text-gray-600 text-sm sm:text-base mt-6"
          >
            Sua independência é nossa prioridade
          </motion.p>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="hidden sm:block absolute top-1/4 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-30 pointer-events-none"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="hidden sm:block absolute top-1/3 right-20 w-12 h-12 bg-purple-200 rounded-full opacity-30 pointer-events-none"
        animate={{ 
          y: [0, 20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="hidden sm:block absolute bottom-1/3 left-1/4 w-10 h-10 bg-green-200 rounded-full opacity-30 pointer-events-none"
        animate={{ 
          y: [0, -15, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
    </div>
  );
}
