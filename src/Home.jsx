// import React,{useState} from 'react'
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//     const[roomId, setRoomId] = useState("");
//     const navigate = useNavigate();

//     const handleClick = () => {
//         navigate(`/room/${roomId}`);
//     };

//   return (
//     <div>
//       <input 
//       type='text' 
//       placeholder='Enter room id' 
//       value={roomId} 
//       onChange={(e)=> setRoomId(e.target.value)}
//       />
//       <button onClick={handleClick}>Join Room</button>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Tv, Users, Zap } from 'lucide-react';

// Theme configuration
const theme = {
  background: {
    page: '#111827',
    card: 'rgba(31, 41, 55, 0.5)',
    cardHover: 'rgba(55, 65, 81, 0.4)',
    cardDefault: 'rgba(55, 65, 81, 0.3)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#9CA3AF',
    tertiary: '#D1D5DB',
  },
  accent: {
    primary: '#10B981',
    primaryHover: '#059669',
    secondary: 'rgba(16, 185, 129, 0.2)',
    tertiary: 'rgba(16, 185, 129, 0.1)',
  },
  border: {
    card: '#374151',
  },
};

// CSS Styles
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.background.page,
  },
  mainCard: {
    width: '100%',
    height: '70%',
    maxWidth: '64rem',
    padding: '2rem',
    borderRadius: '0.75rem',
    backgroundColor: theme.background.card,
    backdropFilter: 'blur(16px)',
    border: `1px solid ${theme.border.card}`,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    position: 'relative',
    transform: 'translateZ(0)',
    transition: 'box-shadow 0.5s ease',
  },
  title: {
    fontSize: '3.75rem',
    fontWeight: 'bold',
    color: theme.text.primary,
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  accentText: {
    color: theme.accent.primary,
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: theme.background.cardDefault,
    border: `1px solid ${theme.border.card}`,
    borderRadius: '0.375rem',
    color: theme.text.primary,
    transition: 'all 0.3s ease',
  },
  
    button: {
      padding: '1rem 2rem',
      backgroundImage: 'linear-gradient(to right, #10B981, #14B8A6)', // gradient background
      color: theme.text.primary,
      borderRadius: '0.375rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease, transform 0.3s ease', // add transform transition
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundImage: 'linear-gradient(to right, #059669, #0D9488)', // hover gradient
      transform: 'scale(1.05)', // hover scale effect
    },
    buttonFocus: {
      outline: 'none',
      // boxShadow: '0 0 0 2px #10B981, 0 0 0 4px rgba(31, 41, 55, 0.8)', // emerald focus ring with offset
    },
  
  
  featureCard: {
    padding: '1.5rem',
    borderRadius: '0.5rem',
    backgroundColor: theme.background.cardDefault,
    transition: 'all 0.3s ease',
  },
};

const ParticleAnimation = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 20,
      delay: Math.random() * 5,
    })));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden h-auto">
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: theme.accent.secondary,
            borderRadius: '50%',
            animation: `float ${particle.duration}s infinite alternate`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.featureCard,
        backgroundColor: isHovered ? theme.background.cardHover : theme.background.cardDefault,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        style={{
          color: theme.accent.primary,
          width: '3rem',
          height: '3rem',
          marginBottom: '1rem',
        }}
      />
      <h3 style={{ color: theme.text.primary, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ color: theme.text.secondary }}>{description}</p>
    </div>
  );
};

const LiveStream = () => {
  const [roomId, setRoomId] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (roomId) navigate(`/room/${roomId}`);
  };

  return (
    <div style={styles.container}>
      <ParticleAnimation />
      
      <div style={styles.mainCard}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h1 style={styles.title}>
            Live Stream <span style={styles.accentText}>Now</span>
          </h1>
          <p style={{ color: theme.text.secondary, fontSize: '1.25rem' }}>
            Experience the thrill of live content at your fingertips
          </p>
        </div>

        <div style={{ maxWidth: '32rem', margin: '0 auto', marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Enter room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
  <button
    style={{
      ...styles.button,
      backgroundColor: isButtonHovered ? theme.accent.primaryHover : theme.accent.primary,
    }}
    onMouseEnter={() => setIsButtonHovered(true)}
    onMouseLeave={() => setIsButtonHovered(false)}
    onClick={handleClick}
  >
    Join Room
    <ArrowRight size={20} />
  </button>
</div>

        {/* Feature section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <FeatureCard icon={Tv} title="High-Quality Streaming" description="Enjoy crystal-clear video and audio with our advanced streaming technology." />
          <FeatureCard icon={Users} title="Interactive Community" description="Connect with viewers through live chat and real-time interactions." />
          <FeatureCard icon={Zap} title="Low Latency" description="Experience near real-time engagement with ultra-low latency streaming." />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
          100% { transform: translate(-20px, 20px) scale(1); }
        }
        input::placeholder {
          color: ${theme.text.secondary};
        }
        input:focus {
          outline: none;
          box-shadow: 0 0 0 2px ${theme.accent.primary};
        }
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default LiveStream;
