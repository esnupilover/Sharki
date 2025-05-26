import React from 'react';

interface ColorPaletteProps {
  onColorChange: (color: string) => void;
  currentColor: string;
}

const colorPalettes = [
  { name: 'Classic Blue', color: '#4A90E2', description: 'Ocean Blue' },
  { name: 'Great White', color: '#E8E8E8', description: 'Classic White' },
  { name: 'Tiger Shark', color: '#D2691E', description: 'Sandy Orange' },
  { name: 'Hammerhead', color: '#708090', description: 'Steel Gray' },
  { name: 'Mako', color: '#2F4F4F', description: 'Dark Slate' },
  { name: 'Reef Shark', color: '#4682B4', description: 'Steel Blue' },
  { name: 'Bull Shark', color: '#8B4513', description: 'Saddle Brown' },
  { name: 'Blacktip', color: '#2C2C2C', description: 'Charcoal' },
  { name: 'Lemon Shark', color: '#FFD700', description: 'Golden Yellow' },
  { name: 'Nurse Shark', color: '#CD853F', description: 'Peru Brown' },
  { name: 'Goblin Shark', color: '#FF69B4', description: 'Hot Pink' },
  { name: 'Greenland', color: '#556B2F', description: 'Dark Olive' }
];

const ColorPalette: React.FC<ColorPaletteProps> = ({ onColorChange, currentColor }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid rgba(0, 0, 0, 0.2)',
      borderRadius: '12px',
      padding: '15px',
      fontFamily: 'Inter, sans-serif',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      maxWidth: '280px'
    }}>
      <h3 style={{
        margin: '0 0 12px 0',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center'
      }}>
        🎨 Shark Color Palette
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px'
      }}>
        {colorPalettes.map((palette) => (
          <button
            key={palette.name}
            onClick={() => onColorChange(palette.color)}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '8px',
              border: currentColor === palette.color ? '3px solid #000' : '2px solid rgba(0, 0, 0, 0.2)',
              backgroundColor: palette.color,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            title={`${palette.name} - ${palette.description}`}
            onMouseOver={(e) => {
              if (currentColor !== palette.color) {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {currentColor === palette.color && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: palette.color === '#FFD700' || palette.color === '#E8E8E8' ? '#000' : '#fff',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                ✓
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div style={{
        marginTop: '10px',
        fontSize: '11px',
        color: '#666',
        textAlign: 'center'
      }}>
        Click any color to change your shark!
      </div>
    </div>
  );
};

export default ColorPalette;