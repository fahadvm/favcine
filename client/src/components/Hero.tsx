import React from 'react';
import { Play } from 'lucide-react';

interface HeroProps {
    onStartExploring: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartExploring }) => {
    return (
        <div className="hero-section">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="hero-app-name">FAV CINE</h1>
                <p className="hero-tagline">Discover movies. Save your favorites.</p>
                <button className="hero-cta-btn" onClick={onStartExploring}>
                    <Play size={20} fill="currentColor" />
                    <span>Start Exploring</span>
                </button>
            </div>
        </div>
    );
};

export default Hero;
