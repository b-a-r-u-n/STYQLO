import { ArrowLeft, Home, Sparkles } from 'lucide-react';
import React from 'react';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#F1DBD5]/40 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#EDD5CF]/40 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#C8756A] to-[#D4A398] flex items-center justify-center mx-auto mb-6 shadow-[0_8px_32px_rgba(200,117,106,0.35)]">
          <Sparkles size={32} className="text-white" />
        </div>

        {/* 404 */}
        <h1 className="text-8xl md:text-[140px] font-bold leading-none mb-2"
          style={{
            background: 'linear-gradient(135deg, #C8756A, #D4A398)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-[#2C1810] mb-3">
          Page Not Found
        </h2>

        <p className="text-[#9B7B75] mb-8 leading-relaxed max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => navigate('/')} variant="primary" size="lg">
            <Home size={18} />
            Go Home
          </Button>
          <Button onClick={() => navigate(-1)} variant="outline" size="lg">
            <ArrowLeft size={18} />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
