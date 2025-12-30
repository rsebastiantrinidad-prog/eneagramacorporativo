import React, { useState } from 'react';
import { ChevronRight, RefreshCw, Users, Zap, Lightbulb, ArrowRight, CheckCircle } from 'lucide-react';

// --- Datos de Configuración (Preguntas y Resultados) ---

const questions = [
  {
    id: 1,
    text: "¿Cuál es tu enfoque principal ante un nuevo proyecto en la empresa?",
    options: [
      { id: 'A', text: "Definir objetivos claros, métricas de éxito y ejecutar rápidamente.", type: '3' },
      { id: 'B', text: "Analizar riesgos, asegurar la estabilidad del equipo y planificar contingencias.", type: '6' },
      { id: 'C', text: "Buscar consenso, asegurar que todos estén cómodos y mantener la armonía.", type: '9' }
    ]
  },
  {
    id: 2,
    text: "¿Cómo sueles manejar los conflictos con un compañero de trabajo?",
    options: [
      { id: 'A', text: "Trato de resolverlo rápido y de forma práctica para volver al trabajo.", type: '3' },
      { id: 'B', text: "Busco apoyo en otros o consulto las normas/procedimientos antes de actuar.", type: '6' },
      { id: 'C', text: "Evito la confrontación directa y espero a que los ánimos se calmen.", type: '9' }
    ]
  },
  {
    id: 3,
    text: "¿Qué es lo que más te motiva en tu entorno laboral?",
    options: [
      { id: 'A', text: "El reconocimiento, los logros visibles y el ascenso profesional.", type: '3' },
      { id: 'B', text: "La seguridad, la lealtad del grupo y tener reglas claras.", type: '6' },
      { id: 'C', text: "Un ambiente tranquilo, sin presiones excesivas y buena conexión humana.", type: '9' }
    ]
  },
  {
    id: 4,
    text: "¿Cuál consideras que es tu mayor aporte a un equipo?",
    options: [
      { id: 'A', text: "Eficiencia, imagen y capacidad de venta.", type: '3' },
      { id: 'B', text: "Previsión de problemas, responsabilidad y fidelidad.", type: '6' },
      { id: 'C', text: "Escucha activa, diplomacia y reducción del estrés grupal.", type: '9' }
    ]
  }
];

const resultsData = {
  '3': {
    title: "Eneatipo 3: El Ejecutor Eficiente",
    imageAlt: "Flecha ascendente y trofeo",
    description: "En el entorno corporativo, eres el motor del logro. Te orientas a resultados, eres adaptable y sabes cómo presentar una imagen de éxito. Tu energía impulsa al equipo hacia metas ambiciosas.",
    synergy: "Trabajas muy bien con Eneatipos 7 (Entusiastas) y 8 (Desafiadores) para proyectos de alto impacto.",
    complement: "Tu complemento ideal es el Eneatipo 6, que te ayuda a ver los riesgos que a veces ignoras por correr.",
    tips: [
      "Recuerda que tu valor personal no depende solo de tus éxitos laborales.",
      "Intenta conectar con tus compañeros más allá de la utilidad del trabajo.",
      "A veces, desacelerar ayuda a encontrar soluciones más profundas."
    ]
  },
  '6': {
    title: "Eneatipo 6: El Colaborador Leal",
    imageAlt: "Escudo y engranajes unidos",
    description: "Eres el ancla del equipo. Aportas responsabilidad, previsión de riesgos y una lealtad inquebrantable a la organización. Eres excelente detectando problemas antes de que ocurran.",
    synergy: "Haces buena sinergia con Eneatipos 1 (Perfeccionistas) por su estructura y orden.",
    complement: "Tu complemento es el Eneatipo 9, que te ayuda a relajarte y confiar en que todo estará bien.",
    tips: [
      "Confía más en tu propia autoridad interna y menos en validación externa.",
      "Distingue entre un riesgo real y una proyección de miedo.",
      "Atrévete a tomar decisiones aunque no tengas toda la información asegurada."
    ]
  },
  '9': {
    title: "Eneatipo 9: El Mediador Diplomático",
    imageAlt: "Balanza equilibrada y símbolo de paz",
    description: "Eres el pegamento que mantiene unido al equipo. Tu capacidad para escuchar y entender múltiples puntos de vista te hace un líder inclusivo y empático. Creas ambientes de trabajo sostenibles.",
    synergy: "Fuyes bien con Eneatipos 2 (Ayudadores) creando un clima laboral cálido.",
    complement: "Tu complemento es el Eneatipo 3, que te impulsa a la acción y a concretar tus ideas.",
    tips: [
      "No sacrifiques tu propia opinión solo por mantener la paz.",
      "Establece prioridades claras para evitar la procrastinación.",
      "Tu voz es importante; asegúrate de expresarla en las reuniones."
    ]
  }
};

// --- Componentes Visuales ---

const EneagramaLogo = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 text-violet-600 opacity-80">
    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M50 5 L85 85 L15 85 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M50 5 L85 65 L15 35 L85 35 L15 65 Z" fill="none" stroke="#2dd4bf" strokeWidth="1.5" />
  </svg>
);

const Header = () => (
  <header className="flex flex-col items-center justify-center py-6 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
    <div className="flex items-center gap-3">
        {/* Simulación del logo del usuario */}
       <div className="text-2xl font-bold tracking-tight text-violet-700 font-sans">
           Enegrama <span className="text-violet-500">Corporativo</span>
       </div>
    </div>
    <div className="text-xs tracking-[0.3em] text-slate-500 mt-1 uppercase">Coach & Eneagrama</div>
  </header>
);

// --- Componente Principal ---

export default function CorporateEnneagramApp() {
  const [step, setStep] = useState('welcome'); // welcome, quiz, processing, result
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finalType, setFinalType] = useState(null);

  const handleStart = () => {
    setStep('quiz');
  };

  const handleAnswer = (type) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 250);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    setStep('processing');
    
    // Lógica simple de mayoría para la demo
    const counts = finalAnswers.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    
    // Obtener el tipo con más votos (por defecto '3' si hay empate o error)
    const resultType = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, '3');

    setTimeout(() => {
      setFinalType(resultType);
      setStep('result');
    }, 1500);
  };

  const restart = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setFinalType(null);
    setStep('welcome');
  };

  // --- Renderizado de Pantallas ---

  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-teal-50 flex flex-col font-sans text-slate-800">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto w-full">
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-teal-200 blur-2xl opacity-30 rounded-full animate-pulse"></div>
            <EneagramaLogo />
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">
            Descubre tu <br/>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-teal-500">
              Talento Corporativo
            </span>
          </h1>
          <p className="text-slate-500 mb-10 leading-relaxed">
            Una breve evaluación basada en el Eneagrama para identificar tus fortalezas, desafíos y sinergias en el entorno laboral.
          </p>
          <button 
            onClick={handleStart}
            className="group relative px-8 py-4 bg-violet-600 text-white rounded-full shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all active:scale-95 flex items-center gap-2 overflow-hidden"
          >
            <span className="relative z-10 font-medium tracking-wide">Iniciar Diagnóstico</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </main>
      </div>
    );
  }

  if (step === 'quiz') {
    const question = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
        <Header />
        
        {/* Barra de progreso */}
        <div className="w-full h-1 bg-slate-200">
          <div 
            className="h-full bg-gradient-to-r from-violet-500 to-teal-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <main className="flex-1 flex flex-col justify-center p-6 max-w-lg mx-auto w-full">
          <div className="mb-8">
            <span className="text-xs font-bold text-teal-600 tracking-wider uppercase mb-2 block">
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </span>
            <h2 className="text-2xl font-medium text-slate-800 leading-snug">
              {question.text}
            </h2>
          </div>

          <div className="space-y-4">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.type)}
                className="w-full text-left p-5 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-violet-300 hover:shadow-md hover:bg-violet-50/30 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0 mt-0.5 group-hover:border-violet-500 transition-colors"></div>
                  <span className="text-slate-600 group-hover:text-slate-900 transition-colors">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans text-slate-800">
        <div className="relative w-20 h-20 mb-6">
           <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
           <div className="absolute inset-0 border-4 border-t-violet-500 border-r-teal-400 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        <h3 className="text-xl font-medium text-slate-700">Analizando tu perfil...</h3>
        <p className="text-slate-400 text-sm mt-2">Conectando sinergias</p>
      </div>
    );
  }

  if (step === 'result' && finalType) {
    const data = resultsData[finalType];
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50/50 to-white flex flex-col font-sans text-slate-800">
        <Header />
        
        <main className="flex-1 p-6 max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Tarjeta Principal del Resultado */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-violet-100 border border-violet-50 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-100 to-transparent rounded-bl-full opacity-50"></div>
            
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold tracking-wide uppercase mb-4">
                Tu Arquetipo
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                {data.title}
              </h2>
              <div className="w-16 h-1 bg-teal-400 rounded-full mb-6"></div>
              <p className="text-lg text-slate-600 leading-relaxed">
                {data.description}
              </p>
            </div>
          </div>

          {/* Grid de Detalles */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            
            {/* Sinergias */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                  <Users size={20} />
                </div>
                <h3 className="font-bold text-slate-800">Sinergias</h3>
              </div>
              <p className="text-sm text-slate-600">{data.synergy}</p>
            </div>

            {/* Complementos */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-violet-50 text-violet-600 rounded-lg">
                  <Zap size={20} />
                </div>
                <h3 className="font-bold text-slate-800">Tu Complemento</h3>
              </div>
              <p className="text-sm text-slate-600">{data.complement}</p>
            </div>

          </div>

          {/* Sugerencias de Mejora */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white mb-10 shadow-lg shadow-violet-200">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="text-yellow-300" />
              <h3 className="font-bold text-xl">Sugerencias de Crecimiento</h3>
            </div>
            <ul className="space-y-4">
              {data.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" />
                  <span className="text-violet-50 font-light leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Botón Reiniciar */}
          <div className="text-center pb-10">
            <button 
              onClick={restart}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-violet-600 transition-colors text-sm font-medium"
            >
              <RefreshCw size={16} />
              Realizar nuevo diagnóstico
            </button>
          </div>

        </main>
      </div>
    );
  }

  return null;
}
