import { useState, useCallback } from 'react';

interface OutputLine {
  type: 'command' | 'output' | 'error' | 'ascii';
  content: string;
}

interface Project {
  name: string;
  description: string;
  tech: string[];
  link?: string;
}

export const useTerminal = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');
  const [currentTheme, setCurrentTheme] = useState('classic');
  const [output, setOutput] = useState<OutputLine[]>([{
    type: 'ascii',
    content: `
    Step into my digital realm. Type 'help' to launch the experience.
    `
  }]);

  const projects: Project[] = [
    
    {
      name: "AudioMOS",
      description: "AudioMOS is a cutting-edge platform for audio processing, enabling seamless Text-to-Speech (TTS), Speech-to-Text (STT), and Voice Cloning functionalities. Built on the Akash Network, it provides both API access and a web dashboard for real-time and batch audio processing. Features include multi-language support, real-time synthesis, accurate transcription, and high-fidelity voice cloning. Additionally, it offers advanced audio enhancement tools such as noise reduction and format conversion.",
      tech: [
        "FastAPI", 
        "PyTorch",
        "Docker",
        "MongoDB",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Akash Network",
        "Docker"
      ],
      link: "https://github.com/shrijacked/audiomos.git"
    },
    {
      name: "WatchDawg",
      description: "WatchDawg is an AI-powered security surveillance system that utilizes computer vision for real-time trespasser detection. Built with YOLOv5, it identifies unauthorized individuals and sends automated email alerts. The system also generates heatmaps for activity visualization, records video footage, and maintains logs for security analysis.",
      tech: [
        "YOLOv5",
        "Python",
        "OpenCV"
      ],
      link: "https://github.com/shrijacked/WatchDawg.git"
    },
    {
      name: "Shrijak's Terminal",
      description: "Web-based interactive terminal simulating a command-line interface to explore projects, skills, and achievements through text commands.",
      tech: [
        "React", 
        "TypeScript",
        "Tailwind CSS",
        "JavaScript"
      ],
      link: "https://github.com/shrijacked/terminal"
    },
    {
      name: "GesturePilot",
      description: "AI-powered hand gesture recognition system enabling touch-free presentation control through real-time landmark detection. Supports slide navigation, pointer control, and interaction via hand gestures without physical devices.",
      tech: [
        "OpenCV",
        "Mediapipe",
        "NumPy",
      ]
    },
    
  ];

  const handleHistory = useCallback((direction: 'up' | 'down') => {
    if (history.length === 0) return;

    let newIndex = historyIndex;
    if (direction === 'up') {
      newIndex = historyIndex >= history.length - 1 ? history.length - 1 : historyIndex + 1;
      const historyCommand = history[history.length - 1 - newIndex];
      setCurrentCommand(historyCommand || '');
    } else {
      newIndex = historyIndex <= 0 ? -1 : historyIndex - 1;
      const historyCommand = newIndex === -1 ? '' : history[history.length - 1 - newIndex];
      setCurrentCommand(historyCommand);
    }
    setHistoryIndex(newIndex);
  }, [history, historyIndex]);

  const themes = {
    classic: {
      bg: 'bg-gray-900',
      text: 'text-green-400',
      accent: 'text-yellow-400'
    },
    cyberpunk: {
      bg: 'bg-gray-900',
      text: 'text-cyan-400',
      accent: 'text-pink-400'
    },
    retro: {
      bg: 'bg-gray-900',
      text: 'text-amber-400',
      accent: 'text-red-400'
    },
    synthwave: {
      bg: 'bg-gray-900',
      text: 'text-purple-400',
      accent: 'text-pink-400'
    },
    ocean: {
      bg: 'bg-gray-900',
      text: 'text-blue-400',
      accent: 'text-teal-400'
    }
  };

  const commands = {
    help: () => `Available commands:
      <br/><br/>
      <span class="text-yellow-400">about</span>      - Learn more about me
      <br/>
      <span class="text-yellow-400">skills</span>     - View my technical skills
      <br/>
      <span class="text-yellow-400">projects</span>   - Browse my projects
      <br/>
      <span class="text-yellow-400">contact</span>    - Get my contact information
      <br/>
      <span class="text-yellow-400">education</span>  - View my educational background
      <br/>
      <span class="text-yellow-400">achievements</span> - View my certifications and awards
      <br/>
      <span class="text-yellow-400">theme</span>      - Change terminal theme
      <br/>
      <span class="text-yellow-400">clear</span>      - Clear the terminal
      <br/>
      <span class="text-yellow-400">date</span>       - Show current date and time
      <br/><br/>
      <span class="text-gray-400">Navigation:</span>
      <br/>
      ↑/↓ - Browse command history
      <br/>
      `,

      about: () => `<div class="space-y-4">
      <p class="text-xl font-bold text-green-400">👋 Hello, World!</p>
      <p>Hi, I’m Shrijak. I’m a 2nd-year Computer Science & AI student at Plaksha University, someone who once dreamed of being a fighter pilot but ended up navigating a different kind of frontier—one driven by curiosity, logic, and the power of AI. Along the way, I realized that understanding how knowledge is structured, discovered, and expanded is key to pushing human potential forward. AI isn’t just about automating tasks; it’s about enhancing human intelligence, accelerating breakthroughs, and opening new possibilities.</p>
      <br/>
      <p>These ideas come to life where AI, mathematics, and real-world impact intersect. From building AudioMOS—an open-source AI audio processing platform (Winner, Akashathon 3 - $5,000)—to developing GesturePilot, a hands-free presentation control system powered by Computer Vision, I’m driven by the challenge of making technology accessible and transformative.</p>
      <br/>
      <p>Beyond these, I’m a national athlete, marathon runner, and an aspiring Ironman competitor—pushing limits, both physically and intellectually.</p>
      <br/>
      <p>I also find beauty in the logic of nature—the hexagonal perfection of a beehive, the organized chaos of ant colonies, the golden ratio shaping the world around us. And there’s something grounding about the smell of food cooking, a reminder that some of the best things in life are simple and meant to be shared.</p>
      <br/>
    </div>`
    ,

    skills: () => `<div class="space-y-4">
  <p class="text-xl font-bold text-green-400">🛠 Technical Skills</p>
  <br/>
  <div class="space-y-4">
    <p class="text-yellow-400">💻 Programming Languages: <span class="text-white">C/C++, Python, Rust, JavaScript, TypeScript</span></p>
    <p class="text-yellow-400">📦 Frameworks & Libraries: <span class="text-white">React.js, Node.js, Express.js, Tailwind CSS, Seaborn, SciPy, Scikit-Learn, Pandas, OpenCV, NumPy, PyTorch, TensorFlow</span></p>
    <p class="text-yellow-400">🗄️ Databases: <span class="text-white">MongoDB, SQL</span></p>
    <p class="text-yellow-400">⚙️ Tools & Technologies: <span class="text-white">HTML, Bash, MATLAB, UI/UX, Git/GitHub</span></p>
    <p class="text-yellow-400">🧠 Core Concepts: <span class="text-white">Data Structures & Algorithms, Linear Algebra, Probability, Statistics, Computational Optimization, AI/ML, Data Science</span></p>
  </div>
</div>`
,

    projects: () => {
      const projectList = projects.map((project, index) => `
        <div class="mb-4">
          <p class="text-blue-400 font-bold">${index + 1}. ${project.name}</p>
          <p class="text-gray-300 ml-4">${project.description}</p>
          <p class="text-yellow-400 ml-4">Tech: ${project.tech.join(', ')}</p>
          ${project.link ? `<p class="text-blue-300 ml-4"><a href="${project.link}" target="_blank">View Project →</a></p>` : ''}
        </div>
      `).join('');

      return `<div class="space-y-4">
        <p class="text-xl font-bold text-green-400">🚀 Featured Projects</p>
        <br/>
        ${projectList}
        <br/>
        <p class="text-gray-400">Type 'project [number]' for more details about a specific project.</p>
      </div>`;
    },

    // experience: () => `<div class="space-y-4">
    //   <p class="text-xl font-bold text-green-400">💼 Work Experience</p>
    //   <br/>
    //   <div class="space-y-6">
    //     <div>
    //       <p class="text-yellow-400">Senior Full Stack Developer @ Tech Corp</p>
    //       <p class="text-gray-400">2021 - Present</p>
    //       <ul class="list-disc list-inside space-y-1 mt-2">
    //         <li>Led development of microservices architecture</li>
    //         <li>Improved system performance by 40%</li>
    //         <li>Mentored junior developers</li>
    //       </ul>
    //     </div>
    //     <div>
    //       <p class="text-yellow-400">Frontend Developer @ StartupX</p>
    //       <p class="text-gray-400">2019 - 2021</p>
    //       <ul class="list-disc list-inside space-y-1 mt-2">
    //         <li>Built responsive web applications</li>
    //         <li>Implemented CI/CD pipelines</li>
    //         <li>Reduced load times by 60%</li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>`,

    education: () => `<div class="space-y-4">
      <p class="text-xl font-bold text-green-400">🎓 Education</p>
      <div class="space-y-6">
        <div>
          <p class="text-yellow-400">Bachelor of Technology</p>
          <p class="text-gray-400">Computer Science and Aritificial Intelligence</p>
          <p class="text-gray-300">Plaksha University</p>
        </div>
      </div>
    </div>`,

    contact: () => `<div class="space-y-4">
      <p class="text-xl font-bold text-green-400">🤝 How about we join forces?</p>
      <br/>
      <div class="space-y-2">
        <p>📧 <span class="text-blue-400">shrijakkumar@gmail.com</span></p>
        <p>🐙 <a href="https://github.com/shrijacked" class="text-blue-400">github.com/shrijacked</a></p>
        <p>💼 <a href="https://www.linkedin.com/in/shrijakkumar/" class="text-blue-400">linkedin.com/in/shrijakkumar</a></p>
        <p>𝕏 <a href="https://x.com/shrijacked" class="text-blue-400">x.com/shrijacked</a></p>
        <p>👾 <a href="https://discord.com/users/822451644104048700" class="text-blue-400">Discord</a></p>
        
      </div>
      <br/>
      <p class="text-gray-400">Ping me to transform ‘What if?’ into ‘What’s next!’</p>
    </div>`,

    achievements: () => `<div class="space-y-4">
      <p class="text-xl font-bold text-green-400">🏆 Awards & Scholarships</p>
      <br/>
      <div class="space-y-6">
        <div>
          <p class="text-yellow-400">Awards</p>
          <ul class="list-disc list-inside space-y-1 mt-2">
            <li>
              <span class="font-semibold">AudioMOS – Akashathon 3: OpenSource AI (1st Place)</span><br/>
              Developed an open-source platform for advanced audio processing models, including Text-to-Speech, Speech-to-Text, Voice Cloning and Voice Cleaning. Deployed solutions on the Akash Network using GPU instances, ensuring high performance and scalability. Integrated a seamless web dashboard and API access, allowing users to process audio efficiently. Recognized for technical excellence and awarded $5,000 for outstanding innovation in the hackathon.
            </li>
          </ul>
        </div>
        <div>
          <p class="text-yellow-400">Scholarships</p>
          <ul class="list-disc list-inside space-y-1 mt-2">
            <li><span class="font-semibold">Bharti Scholar</span> – Awarded a prestigious full scholarship by the Bharti Airtel Foundation to support exceptional academic performance and leadership potential. Covers tuition, accommodation, and meals at Plaksha University.</li>
            <li><span class="font-semibold">Reliance Foundation Scholar</span> – Selected for the highly competitive Reliance Foundation Undergraduate Scholarship, providing financial assistance of up to ₹2 lakhs INR for a four-year undergraduate program (2023-2027). Recognized for academic excellence and innovative potential.</li>
            <li><span class="font-semibold">IAFBA Subroto Memorial Scholarship</span> – Conferred since 2021 under the prestigious scheme supporting meritorious wards of Indian Air Force personnel. Acknowledges consistent academic achievements and dedication to excellence.</li>
          </ul>
        </div>
      </div>
    </div>`,

    // blog: () => `<div class="space-y-4">
    //   <p class="text-xl font-bold text-green-400">📝 Latest Blog Posts</p>
    //   <br/>
    //   <div class="space-y-4">
    //     <div>
    //       <p class="text-yellow-400">Mastering React Performance</p>
    //       <p class="text-gray-400">Posted on March 15, 2024</p>
    //       <p class="text-gray-300">Deep dive into React optimization techniques...</p>
    //     </div>
    //     <div>
    //       <p class="text-yellow-400">The Future of Web Development</p>
    //       <p class="text-gray-400">Posted on March 1, 2024</p>
    //       <p class="text-gray-300">Exploring upcoming trends and technologies...</p>
    //     </div>
    //   </div>
    // </div>`,

    clear: () => {
      setOutput([]);
      return '';
    },

    date: () => {
      const now = new Date();
      return `<span class="text-yellow-400">${now.toLocaleString()}</span>`;
    },

    theme: (args?: string[]) => {
      if (!args || args.length === 0) {
        return `Available themes:
          <br/><br/>
          1. <span class="text-green-400">Classic</span>
          2. <span class="text-cyan-400">Cyberpunk</span>
          3. <span class="text-amber-400">Retro</span>
          4. <span class="text-purple-400">Synthwave</span>
          5. <span class="text-blue-400">Ocean</span>
          <br/><br/>
          Use 'theme [number]' to change`;
      }

      const themeNumber = parseInt(args[0]);
      const themeNames = ['classic', 'cyberpunk', 'retro', 'synthwave', 'ocean'];
      const themeName = themeNames[themeNumber - 1];

      if (!themeName) {
        return 'Invalid theme number. Use "theme" to see available themes.';
      }

      setCurrentTheme(themeName);
      return `Theme changed to ${themeName}`;
    }
  };

  const processCommand = () => {
    if (!currentCommand.trim()) return;

    const newOutput: OutputLine[] = [
      ...output,
      { type: 'command', content: currentCommand },
    ];

    const [cmd, ...args] = currentCommand.toLowerCase().trim().split(' ');

    if (cmd in commands) {
      const result = (commands[cmd as keyof typeof commands] as any)(args);
      if (cmd === 'clear') {
        setOutput([]);
      } else if (result) {
        newOutput.push({ type: 'output', content: result });
      }
    } else if (cmd === 'project' && args[0]) {
      const projectIndex = parseInt(args[0]) - 1;
      if (projectIndex >= 0 && projectIndex < projects.length) {
        const project = projects[projectIndex];
        newOutput.push({
          type: 'output',
          content: `
            <div class="space-y-4">
              <p class="text-xl font-bold text-green-400">${project.name}</p>
              <p class="text-gray-300">${project.description}</p>
              <p class="text-yellow-400">Technologies:</p>
              <ul class="list-disc list-inside">
                ${project.tech.map(t => `<li>${t}</li>`).join('')}
              </ul>
              ${project.link ? `<a href="${project.link}" class="text-blue-400">View Project →</a>` : ''}
            </div>
          `
        });
      } else {
        newOutput.push({
          type: 'error',
          content: 'Project not found. Type "projects" to see available projects.'
        });
      }
    } else {
      newOutput.push({
        type: 'error',
        content: `Command not found: ${cmd}. Type 'help' for available commands.`,
      });
    }

    if (cmd !== 'clear') {
      setOutput(newOutput);
    }
    setHistory([...history, currentCommand]);
    setHistoryIndex(-1);
    setCurrentCommand('');
  };

  return {
    history,
    currentCommand,
    setCurrentCommand,
    processCommand,
    output,
    handleHistory,
    currentTheme,
    themes: themes[currentTheme as keyof typeof themes]
  };
};