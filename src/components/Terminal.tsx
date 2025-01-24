import React from 'react';

interface TerminalProps {
  children: React.ReactNode;
}

export const Terminal: React.FC<TerminalProps> = ({ children }) => {
  return (
    <div className="font-mono text-sm">
      {children}
    </div>
  );
};