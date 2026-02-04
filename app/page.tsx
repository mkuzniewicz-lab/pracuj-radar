'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    '/chart1.png',
    '/chart2.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send email to API
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Store email in localStorage for potential future use
      if (typeof window !== 'undefined') {
        localStorage.setItem('pracuj-radar-email', email);
      }

      router.push('/thank-you');
    } catch (error) {
      console.error('Subscription error:', error);
      // Still redirect to thank you page even if API fails
      router.push('/thank-you');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="px-6 py-4 border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Pracuj.pl"
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold" style={{ color: '#4C40F7' }}>
              Pracuj Radar
            </span>
          </div>
          <button className="px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700">
            Kontakt
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-6 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              🚀 Powered by AI
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Inteligentny Asystent
              <br />
              <span style={{ color: '#4C40F7' }}>
                Rynku Pracy
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
              Analiza tysięcy ofert pracy w mgnieniu oka. Odkryj trendy, wymagania i insights
              dzięki mocy sztucznej inteligencji.
            </p>

            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Twój email"
                  required
                  className="flex-1 px-6 py-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-purple-500 text-lg"
                />
                <button
                  type="submit"
                  className="px-8 py-4 text-white rounded-lg transition-all font-medium text-lg shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#4C40F7' }}
                >
                  Dołącz
                </button>
              </div>
            </form>

            <p className="text-sm text-gray-500">
              Bądź pierwszy, który otrzyma dostęp do Beta
            </p>
          </div>

          {/* Hero Image Carousel */}
          <div className="hidden md:block relative">
            <div className="relative rounded-2xl shadow-2xl overflow-hidden h-[500px]">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'w-8'
                      : 'bg-gray-300'
                  }`}
                  style={index === currentSlide ? { backgroundColor: '#4C40F7' } : {}}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Example Questions Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Zadaj pytanie, <span className="text-blue-600">otrzymaj odpowiedź</span>
            </h2>
            <p className="text-xl text-gray-600">
              Nasz AI Assistant analizuje dane z tysięcy ofert pracy, aby dostarczyć precyzyjne odpowiedzi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📈",
                question: "Jakie umiejętności w ciągu ostatnich 24 miesięcy rosną na znaczeniu w ofertach pracy na Senior UX Designera?",
                gradient: "from-purple-500 to-indigo-500"
              },
              {
                icon: "📊",
                question: "O ile procent zmieniła się ilość ofert na Przedstawicieli Handlowych w Warszawie w ciągu ostatniego roku?",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: "🛠️",
                question: "Znajomość jakich narzędzi wymagana jest na stanowisku Kontroler Jakości?",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="text-gray-700 leading-relaxed">
                  "{item.question}"
                </p>
                <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${item.gradient}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Dlaczego <span style={{ color: '#4C40F7' }}>Pracuj Radar</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "⚡",
                title: "Natychmiastowe Odpowiedzi",
                description: "Otrzymuj kompleksowe analizy w ułamku sekundy. Nie musisz już przeglądać setek ogłoszeń ręcznie."
              },
              {
                icon: "🎯",
                title: "Precyzyjne Dane",
                description: "Wszystkie odpowiedzi bazują wyłącznie na rzeczywistych danych z naszej bazy ofert pracy."
              },
              {
                icon: "🧠",
                title: "Inteligentna Analiza",
                description: "AI rozumie kontekst i interpretuje złożone zapytania analityczne."
              },
              {
                icon: "📱",
                title: "Zawsze Aktualne",
                description: "Model na bieżąco analizuje najnowsze ogłoszenia, dostarczając aktualnych trendów rynkowych."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all"
              >
                <div className="text-5xl">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20" style={{ background: 'linear-gradient(135deg, #4C40F7 0%, #5B57D9 100%)' }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Gotowy na nową erę analizy rynku pracy?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Dołącz do programu Beta i jako pierwszy doświadcz mocy AI w analizie ofert pracy
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Twój email"
                required
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white text-lg"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg shadow-lg"
                style={{ color: '#4C40F7' }}
              >
                Zapisz się
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4C40F7' }}>
              <span className="text-white font-bold">PR</span>
            </div>
            <span className="text-xl font-bold text-white">Pracuj Radar</span>
          </div>
          <p className="text-sm">
            © 2026 Pracuj Radar. Inteligentny asystent rynku pracy napędzany przez AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
