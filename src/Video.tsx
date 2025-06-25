import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  staticFile,
} from 'remotion';

// Interface pour les props d'effets
interface VideoProps {
  kickTimes?: number[]; // Timestamps des kicks en secondes
  buildUpTimes?: number[]; // Timestamps des build-ups
  dropTimes?: number[]; // Timestamps des drops
}

export const HardstyleVideo: React.FC<VideoProps> = ({
  kickTimes = [],
  buildUpTimes = [],
  dropTimes = [],
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const currentTime = frame / fps;

  // Détection des effets basés sur les timestamps
  const isKickFrame = kickTimes.some(
    time => Math.abs(currentTime - time) < 0.1
  );
  
  const isDropFrame = dropTimes.some(
    time => Math.abs(currentTime - time) < 0.2
  );

  // Effet de flash sur les kicks
  const flashIntensity = isKickFrame 
    ? interpolate(
        frame % 6, // Flash rapide sur 6 frames
        [0, 3, 6],
        [0, 1, 0],
        { easing: Easing.out(Easing.quad) }
      )
    : 0;

  // Effet de zoom sur les drops
  const zoomScale = isDropFrame
    ? interpolate(
        (frame % 30), // Zoom sur 30 frames
        [0, 15, 30],
        [1, 1.2, 1],
        { easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
      )
    : 1;

  // Rotation des éléments de fond
  const backgroundRotation = interpolate(
    frame,
    [0, durationInFrames],
    [0, 360],
    { easing: Easing.linear }
  );

  // Pulsation continue
  const pulse = interpolate(
    Math.sin(frame * 0.2),
    [-1, 1],
    [0.95, 1.05]
  );

  return (
    <AbsoluteFill>
      {/* Fond principal avec image KICKWAVEBASS */}
      <AbsoluteFill
        style={{
          transform: `scale(${zoomScale * pulse}) rotate(${backgroundRotation * 0.1}deg)`,
        }}
      >
        <img
          src={staticFile('kickwavebass-bg.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: `brightness(${0.8 + flashIntensity * 0.4}) contrast(${1.2 + flashIntensity * 0.3})`,
          }}
          alt="Background"
        />
      </AbsoluteFill>

      {/* Overlay de particules énergétiques */}
      <AbsoluteFill>
        {[...Array(20)].map((_, i) => {
          const particleDelay = i * 3;
          const particleProgress = interpolate(
            frame - particleDelay,
            [0, 60],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${10 + (i % 5) * 20}%`,
                top: `${20 + Math.floor(i / 5) * 20}%`,
                width: 4,
                height: 4,
                backgroundColor: i % 2 === 0 ? '#00ffff' : '#ff6600',
                borderRadius: '50%',
                opacity: particleProgress * (1 - particleProgress) * 4,
                transform: `scale(${particleProgress * 2}) translateY(${-particleProgress * 200}px)`,
                boxShadow: `0 0 ${10 + flashIntensity * 20}px currentColor`,
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* Effet de flash blanc pour les kicks */}
      {flashIntensity > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: 'white',
            opacity: flashIntensity * 0.3,
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Lignes d'énergie animées */}
      <AbsoluteFill>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 2,
              height: '120%',
              background: `linear-gradient(to bottom, transparent, ${
                i % 2 === 0 ? '#00ffff' : '#ff6600'
              }, transparent)`,
              transform: `translate(-50%, -50%) rotate(${
                i * 45 + backgroundRotation
              }deg)`,
              opacity: 0.6 + flashIntensity * 0.4,
              filter: `blur(${1 - flashIntensity}px)`,
            }}
          />
        ))}
      </AbsoluteFill>

      {/* Texte principal - peut être dynamique */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${1 + flashIntensity * 0.1})`,
        }}
      >
        <h1
          style={{
            fontSize: 120,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            textShadow: `0 0 ${20 + flashIntensity * 30}px rgba(0, 255, 255, 0.8)`,
            filter: `drop-shadow(0 0 10px rgba(255, 102, 0, ${flashIntensity}))`,
            fontFamily: 'Arial Black, sans-serif',
            letterSpacing: 8,
          }}
        >
          HARDSTYLE
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
