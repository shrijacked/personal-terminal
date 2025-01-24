import React, { useEffect, useRef } from 'react';

interface CommandLineProps {
  currentCommand: string;
  setCurrentCommand: (command: string) => void;
  onSubmit: () => void;
  onHistoryNavigation: (direction: 'up' | 'down') => void;
}

export const CommandLine: React.FC<CommandLineProps> = ({
  currentCommand,
  setCurrentCommand,
  onSubmit,
  onHistoryNavigation
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Add command auto-completion logic here
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      // Clear screen shortcut
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      onHistoryNavigation('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onHistoryNavigation('down');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-green-400">❯</span>
      <input
        ref={inputRef}
        type="text"
        value={currentCommand}
        onChange={(e) => setCurrentCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none text-gray-300 focus:outline-none"
        aria-label="Terminal input"
        autoFocus
        spellCheck="false"
      />
    </div>
  );
};