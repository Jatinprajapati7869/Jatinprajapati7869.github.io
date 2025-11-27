import React from 'react';
import ArcFocus from './components/ArcFocus';

const App: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative font-sans text-slate-200 selection:bg-neonOrange selection:text-black">
      <ArcFocus />
    </div>
  );
};

export default App;
