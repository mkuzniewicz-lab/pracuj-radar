'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ThankYou() {
  const router = useRouter();
  const [fireworks, setFireworks] = useState<Array<{ id: number; left: string; delay: string }>>([]);

  useEffect(() => {
    // Generate random fireworks
    const newFireworks = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`
    }));
    setFireworks(newFireworks);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center relative overflow-hidden">
      {/* Fireworks Animation */}
      {fireworks.map((fw) => (
        <div
          key={fw.id}
          className="firework"
          style={{
            left: fw.left,
            animationDelay: fw.delay
          }}
        />
      ))}

      {/* Content */}
      <div className="text-center z-10 px-6">
        <div className="mb-8 animate-bounce-in">
          <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6"
               style={{ backgroundColor: '#4C40F7' }}>
            <span className="text-6xl">🎉</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Dziękujemy!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Gratulacje! Jesteś na liście do programu Beta <span style={{ color: '#4C40F7' }} className="font-bold">Pracuj Radar</span>
          </p>
          <p className="text-lg text-gray-500 mb-12">
            Wkrótce otrzymasz wiadomość email z dalszymi instrukcjami
          </p>
        </div>

        <button
          onClick={() => router.push('/')}
          className="px-8 py-4 text-white rounded-lg transition-all font-medium text-lg shadow-lg hover:shadow-xl hover:scale-105"
          style={{ backgroundColor: '#4C40F7' }}
        >
          ← Wróć do strony głównej
        </button>
      </div>

      <style jsx>{`
        @keyframes firework {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .firework {
          position: absolute;
          bottom: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4C40F7, #f093fb);
          animation: firework 2s ease-out infinite;
          box-shadow:
            0 0 20px rgba(76, 64, 247, 0.8),
            0 0 40px rgba(240, 147, 251, 0.6);
        }

        .firework::before,
        .firework::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: inherit;
        }

        .firework::before {
          left: -20px;
          animation: firework 2s ease-out infinite;
          animation-delay: 0.1s;
        }

        .firework::after {
          left: 20px;
          animation: firework 2s ease-out infinite;
          animation-delay: 0.2s;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  );
}
