import React, { useState, useRef, useEffect } from "react";

const appData = {
  userData: {
    name: "Edinson Cavani",
    role: "Web Designer",
  },
  clients: [
    { id: 1, name: "Entrepôt du bricolage", company: "Entrepôt du bricolage" },
    { id: 2, name: "TechStart", company: "TechStart SAS" },
    { id: 3, name: "MediaGroup", company: "MediaGroup International" },
    { id: 4, name: "Acme Inc.", company: "Acme Incorporated" },
    { id: 5, name: "Green Solutions", company: "Green Solutions SARL" },
    { id: 6, name: "PixelWorks", company: "PixelWorks Agency" }
  ],
  projects: [
    { id: 1, name: "Refonte site web", clientId: 1 },
    { id: 2, name: "Campagne publicitaire Q2", clientId: 1 },
    { id: 3, name: "Application mobile", clientId: 2 },
    { id: 4, name: "Logo et charte graphique", clientId: 3 },
    { id: 5, name: "E-commerce plateforme", clientId: 2 },
    { id: 6, name: "SEO Optimisation", clientId: 4 },
    { id: 7, name: "Développement CRM", clientId: 5 },
    { id: 8, name: "Audit sécurité", clientId: 4 },
    { id: 9, name: "Newsletter mensuelle", clientId: 3 },
    { id: 10, name: "Campagne réseaux sociaux", clientId: 5 },
    { id: 11, name: "Refonte identité visuelle", clientId: 6 },
    { id: 12, name: "Déploiement cloud", clientId: 2 },
    { id: 13, name: "Maintenance applicative", clientId: 1 },
    { id: 14, name: "Création landing page", clientId: 6 },
    { id: 15, name: "Formation équipe", clientId: 4 },
    { id: 16, name: "Migration base de données", clientId: 5 },
    { id: 17, name: "Développement API", clientId: 2 },
    { id: 18, name: "Gestion newsletter", clientId: 3 },
    { id: 19, name: "Optimisation UX", clientId: 6 },
    { id: 20, name: "Support technique", clientId: 1 }
  ],
  timeEntries: [
    { id: 1, client: "Acme Inc.", project: "Refonte site web", description: "Design page d'accueil", duration: "2h 15m", date: "10/06/2025" },
    { id: 2, client: "TechStart", project: "Application mobile", description: "Wireframes", duration: "1h 30m", date: "09/06/2025" },
    { id: 3, client: "MediaGroup", project: "Logo et charte graphique", description: "Recherche", duration: "45m", date: "09/06/2025" },
    { id: 4, client: "Acme Inc.", project: "Campagne publicitaire Q2", description: "Concept visuel", duration: "3h 20m", date: "08/06/2025" }
  ]
};

function Home() {
  const [timer, setTimer] = useState({
    isRunning: false,
    isPaused: false,
    startTime: null,
    pauseTime: 0,
    totalTime: 0,
    display: '00:00:00'
  });
  
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [clientInput, setClientInput] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeEntries, setTimeEntries] = useState(appData.timeEntries);
  const [theme, setTheme] = useState('light');
  const [filteredClients, setFilteredClients] = useState(appData.clients);
  
  const [newClient, setNewClient] = useState({
    name: '',
    company: '',
    email: '',
    phone: ''
  });

  const timerInterval = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-color-scheme', savedTheme);
  }, []);

  useEffect(() => {
    if (timer.isRunning) {
      timerInterval.current = setInterval(() => {
        const currentTime = Date.now() - timer.startTime;
        setTimer(prev => ({
          ...prev,
          display: formatTime(currentTime)
        }));
      }, 1000);
    } else {
      clearInterval(timerInterval.current);
    }

    return () => clearInterval(timerInterval.current);
  }, [timer.isRunning, timer.startTime]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDuration = (milliseconds) => {
    const totalMinutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const startTimer = () => {
    if (!clientInput || !selectedProject || !taskDescription) {
      alert('Veuillez remplir tous les champs avant de démarrer le chronomètre.');
      return;
    }

    if (timer.isPaused) {
      setTimer(prev => ({
        ...prev,
        startTime: Date.now() - prev.pauseTime,
        isRunning: true,
        isPaused: false
      }));
    } else {
      setTimer(prev => ({
        ...prev,
        startTime: Date.now(),
        isRunning: true,
        totalTime: 0
      }));
    }
  };

  const pauseTimer = () => {
    if (timer.isRunning) {
      setTimer(prev => ({
        ...prev,
        isRunning: false,
        isPaused: true,
        pauseTime: Date.now() - prev.startTime
      }));
    }
  };

  const stopTimer = () => {
    if (timer.isRunning || timer.isPaused) {
      const totalTime = timer.isPaused 
        ? timer.pauseTime 
        : Date.now() - timer.startTime;
      
      addTimeEntry(totalTime);
      
      setTimer({
        isRunning: false,
        isPaused: false,
        startTime: null,
        pauseTime: 0,
        totalTime: 0,
        display: '00:00:00'
      });
      
      setTaskDescription('');
    }
  };

  const addTimeEntry = (duration) => {
    const formattedDuration = formatDuration(duration);
    const today = formatDate(new Date());
    
    const newEntry = {
      id: timeEntries.length + 1,
      client: clientInput,
      project: selectedProject,
      description: taskDescription,
      duration: formattedDuration,
      date: today
    };
    
    setTimeEntries(prev => [newEntry, ...prev]);
  };

  const handleClientInput = (value) => {
    setClientInput(value);
    const filtered = appData.clients.filter(client => 
      client.name.toLowerCase().includes(value.toLowerCase()) || 
      client.company.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredClients(filtered);
    
    const exactMatch = appData.clients.find(client => 
      client.name.toLowerCase() === value.toLowerCase()
    );
    
    if (exactMatch) {
      setSelectedClient(exactMatch.id);
    } else {
      setSelectedClient(null);
      setSelectedProject('');
    }
  };

  const selectClient = (client) => {
    setClientInput(client.name);
    setSelectedClient(client.id);
    setShowClientDropdown(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-color-scheme', newTheme);
  };

  const handleNewClientSubmit = (e) => {
    e.preventDefault();
    const client = {
      id: appData.clients.length + 1,
      name: newClient.name,
      company: newClient.company
    };
    
    appData.clients.push(client);
    setClientInput(client.name);
    setSelectedClient(client.id);
    setShowModal(false);
    setNewClient({ name: '', company: '', email: '', phone: '' });
  };

  const availableProjects = selectedClient 
    ? appData.projects.filter(project => project.clientId === selectedClient)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Chronoymedia</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">{appData.userData.name}</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {appData.userData.role}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 bg-blue-50 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <span>Tableau de bord</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>Clients</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
                  <span>Projets</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                  <span>Rapports</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Suivi de temps</h2>
                <p className="text-gray-600">{formatDate(new Date())}</p>
              </div>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                {theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}
              </button>
            </div>

            {/* Timer Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Client Selection */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client
                  </label>
                  <input
                    type="text"
                    value={clientInput}
                    onChange={(e) => handleClientInput(e.target.value)}
                    onFocus={() => setShowClientDropdown(true)}
                    onBlur={() => setTimeout(() => setShowClientDropdown(false), 200)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Sélectionner un client"
                  />
                  
                  {showClientDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredClients.map(client => (
                        <div
                          key={client.id}
                          onClick={() => selectClient(client)}
                          className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="font-medium text-gray-900">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.company}</div>
                        </div>
                      ))}
                      {filteredClients.length === 0 && clientInput && (
                        <div
                          onClick={() => {
                            setNewClient(prev => ({ ...prev, name: clientInput }));
                            setShowModal(true);
                            setShowClientDropdown(false);
                          }}
                          className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-blue-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                          Créer un nouveau client : "{clientInput}"
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Project Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Projet
                  </label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    disabled={!selectedClient}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">Sélectionner un projet</option>
                    {availableProjects.map(project => (
                      <option key={project.id} value={project.name}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Task Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description de la tâche
                </label>
                <input
                  type="text"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Décrivez votre tâche"
                />
              </div>

              {/* Timer Display */}
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-gray-900 mb-4">
                  {timer.display}
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={startTimer}
                    disabled={timer.isRunning}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    {timer.isPaused ? 'Reprendre' : 'Démarrer'}
                  </button>
                  
                  <button
                    onClick={pauseTimer}
                    disabled={!timer.isRunning}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                    Pause
                  </button>
                  
                  <button
                    onClick={stopTimer}
                    disabled={!timer.isRunning && !timer.isPaused}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    </svg>
                    Arrêter
                  </button>
                </div>
              </div>
            </div>

            {/* Time Entries Table */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-900">Dernières entrées de temps</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projet</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durée</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employé</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {timeEntries.map(entry => (
                      <tr key={entry.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.client}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.project}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.duration}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appData.userData.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chart Section */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-900">Répartition du temps par activité</h3>
              </div>
              <div className="p-6">
                <img 
                  src="https://pplx-res.cloudinary.com/image/upload/v1749546425/pplx_code_interpreter/2550914c_pgq4kw.jpg" 
                  alt="Répartition typique du temps passé par type d'activité dans un projet" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal for New Client */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Nouveau client</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleNewClientSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du client
                  </label>
                  <input
                    type="text"
                    value={newClient.name}
                    onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'entreprise
                  </label>
                  <input
                    type="text"
                    value={newClient.company}
                    onChange={(e) => setNewClient(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={newClient.phone}
                    onChange={(e) => setNewClient(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Créer le client
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
