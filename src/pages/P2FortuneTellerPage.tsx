import { useState } from 'react';

const P2FortuneTeller = () => {
  const [step, setStep] = useState(0);
  const [selectedQuadrant, setSelectedQuadrant] = useState<{ name: string; color: string; description: string } | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [animation, setAnimation] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const quadrants = [
    { name: 'Flow Factory', color: '#1eba8c', description: 'High productivity, low play' },
    { name: 'P² Zone', color: '#4a6ff3', description: 'High productivity, high play' },
    { name: 'Grind Zone', color: '#e74c6f', description: 'Low productivity, low play' },
    { name: 'Distraction Den', color: '#f3c053', description: 'Low productivity, high play' }
  ];

  // Strategies to move to P² Zone from each quadrant
  const strategies = {
    'P² Zone': [
      'Reflect on what makes this activity both productive and enjoyable',
      'Share your approach with someone else to solidify your understanding',
      'Document your process so you can replicate it for other tasks',
      'Identify what triggers helped you enter this zone',
      'Set up your environment to maintain this state longer',
      'Challenge yourself to go even deeper into flow',
      'Notice what intrinsic rewards you\'re experiencing',
      'Celebrate your achievements while continuing momentum'
    ],
    'Flow Factory': [
      'Add elements of play to your current workflow',
      'Take short, enjoyable breaks to prevent burnout',
      'Connect your work to a deeper purpose',
      'Gamify aspects of your process',
      'Collaborate with others to add social enjoyment',
      'Customize your workspace with things that bring joy',
      'Add music or ambient sounds that energize you',
      'Reframe challenges as puzzles to be solved'
    ],
    'Distraction Den': [
      'Channel your playful energy toward meaningful outcomes',
      'Set a timer to transition from play to productive work',
      'Identify what needs you\'re meeting through distraction',
      'Find work that incorporates elements you enjoy',
      'Create a reward system for completing important tasks',
      'Start with just 5 minutes of focused work',
      'Use your distraction as inspiration for productive work',
      'Partner with someone for mutual accountability'
    ],
    'Grind Zone': [
      'Break your task into smaller, more manageable pieces',
      'Change your environment completely',
      'Pair the task with something you enjoy (music, location)',
      'Find a more meaningful purpose behind the task',
      'Ask: "How could this be more enjoyable?"',
      'Start with just 5 minutes, then reassess',
      'Delegate or eliminate parts of the task if possible',
      'Consider if this task needs to be done at all'
    ]
  };

  const handleQuadrantSelect = (index: number) => {
    setSelectedQuadrant(quadrants[index]);
    setStep(1);
    setAnimation('fortune-open');
  };

  const handleNumberSelect = (number: number) => {
    setSelectedNumber(number);
    setStep(2);

    // Select random strategy for the selected quadrant
    if (selectedQuadrant && selectedQuadrant.name in strategies) {
      const quadrantStrategies = strategies[selectedQuadrant.name as keyof typeof strategies];
      const strategy = quadrantStrategies[number - 1];
      setResultMessage(strategy);

      // Animate the fortune teller
      setAnimation('fortune-reveal');
      setTimeout(() => {
        setShowResult(true);
      }, 1000);
    }
    
    // Animate the fortune teller
    setAnimation('fortune-reveal');
    setTimeout(() => {
      setShowResult(true);
    }, 1000);
  };

  const resetFortuneTeller = () => {
    setStep(0);
    setSelectedQuadrant(null);
    setSelectedNumber(null);
    setShowResult(false);
    setAnimation('');
    setResultMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-8 rounded-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">P² Fortune Teller</h1>
      
      {step === 0 && (
        <div className="mb-8">
          <p className="text-lg mb-4">Which quadrant are you currently in?</p>
          <div className="grid grid-cols-2 gap-4">
            {quadrants.map((quadrant, index) => (
              <button
                key={index}
                className="p-6 rounded-lg text-white font-bold text-xl transition-transform hover:scale-105"
                style={{ backgroundColor: quadrant.color }}
                onClick={() => handleQuadrantSelect(index)}
              >
                <div className="text-2xl mb-2">{quadrant.name}</div>
                <div className="text-sm opacity-90">{quadrant.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className={`mb-8 ${animation}`}>
          {selectedQuadrant && (
            <p className="text-lg mb-4">You selected: <span style={{ color: selectedQuadrant.color }} className="font-bold">{selectedQuadrant.name}</span></p>
          )}
          <p className="mb-6">Now pick a number from 1 to 8:</p>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
              <button
                key={number}
                className="p-4 rounded-lg bg-white shadow-md hover:shadow-lg text-2xl w-16 h-16 flex items-center justify-center font-bold"
                style={{ borderColor: selectedQuadrant?.color || 'transparent', borderWidth: '2px' }}
                onClick={() => handleNumberSelect(number)}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={`mb-8 ${animation} max-w-lg`}>
          <div className="bg-white p-6 rounded-lg shadow-lg border-4" style={{ borderColor: selectedQuadrant?.color || 'transparent' }}>
            <h2 className="text-2xl font-bold mb-4">Your P² Strategy:</h2>
            {showResult ? (
              <p className="text-xl mb-6">{resultMessage}</p>
            ) : (
              <div className="animate-pulse h-8 bg-gray-200 rounded mb-6"></div>
            )}
            <div className="flex justify-between">
              <p className="text-sm opacity-75">From: {selectedQuadrant?.name || 'N/A'}</p>
              <p className="text-sm opacity-75">Strategy #{selectedNumber}</p>
            </div>
          </div>
          
          <button
            className="mt-6 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
            onClick={resetFortuneTeller}
          >
            Try Again
          </button>
        </div>
      )}
      
      <div className="mt-4 text-gray-500 text-sm">
        Select your current state to receive a personalized strategy to move toward the P² Zone.
      </div>
    </div>
  );
};

export default P2FortuneTeller;
