import React, { useEffect, useRef } from 'react';
import { Terminal } from './components/Terminal';
import { CommandLine } from './components/CommandLine';
import { useTerminal } from './hooks/useTerminal';
import { Monitor } from 'lucide-react';

function App() {
  const {
    history,
    currentCommand,
    setCurrentCommand,
    processCommand,
    output,
    handleHistory,
    currentTheme,
    themes
  } = useTerminal();

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className={`min-h-screen ${themes.bg} ${themes.text} p-4 font-mono`}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
          <div className="bg-gray-700 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Monitor size={16} />
              <span className="text-sm">guest@portfolio ~ </span>
            </div>
            <div className="w-4"></div>
          </div>

          <div 
            ref={terminalRef}
            className="p-4 h-[80vh] overflow-y-auto bg-gray-900 font-jetbrains"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="space-y-2">
              <div className={`${themes.text} animate-pulse`}>
                Welcome to my interactive portfolio! Type 'help' to see available commands.
              </div>
              {output.map((line, i) => (
                <div key={i} className="space-y-1">
                  {line.type === 'command' && (
                    <div className="flex items-center space-x-2 text-gray-400">
                      <span className={themes.text}>❯</span>
                      <span>{line.content}</span>
                    </div>
                  )}
                  {line.type === 'output' && (
                    <div 
                      className="text-gray-300"
                      dangerouslySetInnerHTML={{ __html: line.content }}
                    />
                  )}
                  {line.type === 'error' && (
                    <div className="text-red-400">{line.content}</div>
                  )}
                </div>
              ))}
              <CommandLine
                currentCommand={currentCommand}
                setCurrentCommand={setCurrentCommand}
                onSubmit={processCommand}
                onHistoryNavigation={handleHistory}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;