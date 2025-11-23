'use client';

import React, { useState } from 'react';
import { Play, Users } from 'lucide-react';
import { VideoModal } from '@/components/ui/VideoModal';
import { trackVideoOpen } from '@/lib/metaPixel';

export const TestimonialsVideoSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);

  const openModal = (url: string, title: string) => {
    setSelectedVideo({ url, title });
    setIsModalOpen(true);
    trackVideoOpen(title, 'testimonial-video-destravamento');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  // Extract video ID from YouTube URL for thumbnail
  const getVideoId = (url: string): string => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/live\/([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return '';
  };

  const videos = [
    {
      id: 'lucas',
      title: 'Lucas - Destravamento após anos travado',
      description: 'Mentorado da Mentoria Elite Pódium que estava travado há anos e conseguiu destravar através do processo de destravamento',
      url: 'https://youtu.be/7jmzCwzby3g',
      icon: Users,
      type: 'Depoimento'
    },
    {
      id: 'vinicius',
      title: 'Vinícius - Transformação no processo de destravamento',
      description: 'Mentorado da Mentoria Elite Pódium que passou pelo processo de destravamento e obteve resultados reais',
      url: 'https://youtu.be/X14E0T7IfHU',
      icon: Users,
      type: 'Depoimento'
    }
  ];

  return (
    <section id="depoimentos-destravamento" className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900">
      {/* Background with gradient similar to other sections */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {/* Floating yellow orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Users className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">Depoimentos Reais</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Mentorados que{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-md animate-shimmer bg-[length:200%_auto]">destravaram</span>
            {' '}através do processo
          </h2>

          {/* Subheadline */}
          <p className="text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Veja depoimentos reais de mentorados da Mentoria Elite Pódium que passaram pelo processo de destravamento e transformaram suas ligações
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-8 max-w-5xl mx-auto">
          {videos.map((video, index) => {
            const IconComponent = video.icon;
            const videoId = getVideoId(video.url);
            const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
            
            return (
              <button
                key={video.id}
                onClick={() => openModal(video.url, video.title)}
                className="w-full text-left bg-gray-800/30 border-2 border-gray-700/50 rounded-2xl p-4 sm:p-6 hover:border-yellow-400/60 transition-all duration-300 backdrop-blur-xl animate-fade-in-up group cursor-pointer relative overflow-hidden hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/20"
                style={{animationDelay: `${0.4 + index * 0.1}s`}}
              >
                {/* Glassmorphism glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-shimmer"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row gap-6">
                  {/* Video Thumbnail */}
                  <div className="relative flex-shrink-0">
                    <div className="relative w-full lg:w-48 h-32 sm:h-48 bg-gray-700/50 rounded-xl overflow-hidden border-2 border-yellow-400/20 group-hover:border-yellow-400/50 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:shadow-yellow-400/30">
                      {thumbnailUrl ? (
                        <img
                          src={thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                          <Play className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 transition-all duration-300"></div>
                      
                      {/* Play button with enhanced effect */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center group-hover:scale-125 transition-all duration-300 shadow-2xl shadow-yellow-400/50 group-hover:shadow-yellow-400/70 relative opacity-60 group-hover:opacity-100">
                          {/* Pulsing ring */}
                          <div className="absolute inset-0 rounded-full border-2 border-yellow-300/50 animate-ping"></div>
                          <Play className="w-8 h-8 text-gray-900 ml-1 relative z-10" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Badge */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-yellow-400/50 group-hover:scale-110 transition-transform duration-300">
                      {video.type}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-yellow-400/30 transition-all duration-300">
                        <IconComponent className="w-4 h-4 text-yellow-400" />
                      </div>
                      <span className="text-yellow-400 text-sm font-semibold">{video.type}</span>
                    </div>
                    
                    <h3 className="text-base sm:text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                      {video.title}
                    </h3>
                    
                    <p className="text-gray-300 text-xs sm:text-base leading-relaxed mb-4">
                      {video.description}
                    </p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400/10 to-yellow-500/5 border border-yellow-400/30 text-yellow-400 rounded-full group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-yellow-500 group-hover:text-gray-900 group-hover:border-yellow-400 transition-all duration-300 text-sm font-semibold shadow-lg group-hover:shadow-yellow-400/40">
                      <Play className="w-4 h-4 group-hover:animate-pulse" />
                      Assistir Depoimento
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

