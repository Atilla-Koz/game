import React, { useState, useEffect } from 'react';
import '../assets/styles/truthordare.css';

const TruthOrDare = () => {
  // localStorage'dan verileri yükle
  const [players, setPlayers] = useState(() => {
    const savedPlayers = localStorage.getItem('truthOrDarePlayers');
    return savedPlayers ? JSON.parse(savedPlayers) : [];
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('truthOrDareTasks');
    return savedTasks ? JSON.parse(savedTasks) : {
      truth: {
        masum: ['En son söylediğin yalan neydi?', 'En utanç verici anın nedir?'],
        orta: ['En büyük pişmanlığın nedir?', 'Hiç birine aşık oldun mu?'],
        plus18: ['En çılgın fantezin nedir?', 'Hiç aldattın mı?']
      },
      dare: {
        masum: ['10 şınav çek', 'Tavuk gibi ses çıkar'],
        orta: ['Komik bir dans yap', 'Bir yabancıya sarıl'],
        plus18: ['Karşı cinsle 1 dakika göz teması kur', 'Birini öp']
      }
    };
  });

  const [difficulty, setDifficulty] = useState(() => {
    const savedDifficulty = localStorage.getItem('truthOrDareDifficulty');
    return savedDifficulty || 'masum';
  });

  const [isRandomMode, setIsRandomMode] = useState(() => {
    const savedRandomMode = localStorage.getItem('truthOrDareRandomMode');
    return savedRandomMode === 'true';
  });

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showTask, setShowTask] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [showPenalty, setShowPenalty] = useState(false);
  const [newTask, setNewTask] = useState({ type: 'truth', content: '', difficulty: 'masum' });
  const [showTaskManager, setShowTaskManager] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const difficultyLevels = ['masum', 'orta', 'plus18'];

  const defaultTasks = {
    truth: {
      masum: ['En son söylediğin yalan neydi?', 'En utanç verici anın nedir?'],
      orta: ['En büyük pişmanlığın nedir?', 'Hiç birine aşık oldun mu?'],
      plus18: ['En çılgın fantezin nedir?', 'Hiç aldattın mı?']
    },
    dare: {
      masum: ['10 şınav çek', 'Tavuk gibi ses çıkar'],
      orta: ['Komik bir dans yap', 'Bir yabancıya sarıl'],
      plus18: ['Karşı cinsle 1 dakika göz teması kur', 'Birini öp']
    }
  };

  // localStorage'a verileri kaydet
  useEffect(() => {
    localStorage.setItem('truthOrDarePlayers', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('truthOrDareTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('truthOrDareDifficulty', difficulty);
  }, [difficulty]);

  useEffect(() => {
    localStorage.setItem('truthOrDareRandomMode', isRandomMode);
  }, [isRandomMode]);

  const getRandomDifficulty = () => {
    return difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];
  };

  const addPlayer = (name) => {
    if (name.trim()) {
      setPlayers([...players, name.trim()]);
    }
  };

  const startGame = () => {
    if (players.length >= 2) {
      setGameStarted(true);
    } else {
      alert('En az 2 oyuncu gerekli!');
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const currentDifficulty = isRandomMode ? getRandomDifficulty() : difficulty;
    const currentTasks = tasks[option][currentDifficulty];
    const randomTask = currentTasks[Math.floor(Math.random() * currentTasks.length)];
    setCurrentTask(randomTask);
    setShowTask(true);
  };

  const handleNextPlayer = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
    setSelectedOption(null);
    setShowTask(false);
    setShowPenalty(false);
  };

  const handleTaskComplete = (completed) => {
    if (!completed) {
      setShowPenalty(true);
    } else {
      handleNextPlayer();
    }
  };

  const addNewTask = () => {
    if (newTask.content.trim()) {
      setTasks(prev => ({
        ...prev,
        [newTask.type]: {
          ...prev[newTask.type],
          [newTask.difficulty]: [...prev[newTask.type][newTask.difficulty], newTask.content]
        }
      }));
      setNewTask({ type: 'truth', content: '', difficulty: 'masum' });
    }
  };

  const deleteTask = (type, difficulty, index) => {
    setTasks(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [difficulty]: prev[type][difficulty].filter((_, i) => i !== index)
      }
    }));
  };

  const editTask = (type, difficulty, index, newContent) => {
    setTasks(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [difficulty]: prev[type][difficulty].map((task, i) => 
          i === index ? newContent : task
        )
      }
    }));
    setEditingTask(null);
  };

  const handleRemovePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const resetTasks = () => {
    if (window.confirm('Tüm görevler varsayılan haline döndürülecek. Emin misiniz?')) {
      setTasks(defaultTasks);
      localStorage.removeItem('truthOrDareTasks');
    }
  };

  return (
    <div className="truth-or-dare-container">
      {!gameStarted ? (
        <div className="setup-container">
          <h2>Truth or Dare</h2>
          <div className="player-input">
            <input
              type="text"
              placeholder="Oyuncu adı"
              onKeyPress={(e) => e.key === 'Enter' && addPlayer(e.target.value)}
            />
            <button onClick={(e) => addPlayer(e.target.previousElementSibling.value)}>
              Oyuncu Ekle
            </button>
          </div>
          <div className="players-list">
            {players.map((player, index) => (
              <div key={index} className="player-item">
                <span>{player}</span>
                <button 
                  className="remove-player" 
                  onClick={() => handleRemovePlayer(index)}
                  title="Oyuncuyu Sil"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="game-mode-select">
            <h3>Oyun Modu</h3>
            <div className="mode-buttons">
              <button
                className={`mode-button ${!isRandomMode ? 'active' : ''}`}
                onClick={() => setIsRandomMode(false)}
              >
                Sabit Zorluk
              </button>
              <button
                className={`mode-button ${isRandomMode ? 'active' : ''}`}
                onClick={() => setIsRandomMode(true)}
              >
                Rastgele Zorluk
              </button>
            </div>
          </div>
          {!isRandomMode && (
            <div className="difficulty-select">
              <h3>Zorluk Seviyesi</h3>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="masum">Masum</option>
                <option value="orta">Orta</option>
                <option value="plus18">+18</option>
              </select>
            </div>
          )}
          <button className="start-button" onClick={startGame}>
            Oyunu Başlat
          </button>
          <button className="task-manager-button" onClick={() => setShowTaskManager(!showTaskManager)}>
            Görevleri Yönet
          </button>
        </div>
      ) : (
        <div className="game-container">
          <h2>Sıra: {players[currentPlayerIndex]}</h2>
          {!selectedOption && !showTask && (
            <div className="options-container">
              <button onClick={() => handleOptionSelect('truth')}>Doğruluk</button>
              <button onClick={() => handleOptionSelect('dare')}>Cesaret</button>
            </div>
          )}
          {showTask && (
            <div className="task-container">
              <h3>{currentTask}</h3>
              <div className="task-buttons">
                <button onClick={() => handleTaskComplete(true)}>Tamamlandı</button>
                <button onClick={() => handleTaskComplete(false)}>Yapılamadı</button>
              </div>
            </div>
          )}
          {showPenalty && (
            <div className="penalty-container">
              <h3>CEZA SHOTU! 🥃</h3>
              <button onClick={handleNextPlayer}>Sonraki Oyuncu</button>
            </div>
          )}
        </div>
      )}

      {showTaskManager && (
        <div className="task-manager">
          <h3>Görev Yöneticisi</h3>
          <div className="task-categories">
            {Object.entries(tasks).map(([type, difficulties]) => (
              <div key={type} className="task-category">
                <h4>{type === 'truth' ? 'Doğruluk' : 'Cesaret'} Görevleri</h4>
                {Object.entries(difficulties).map(([diff, taskList]) => (
                  <div key={diff} className="difficulty-group">
                    <h5>{diff === 'masum' ? 'Masum' : diff === 'orta' ? 'Orta' : '+18'}</h5>
                    {taskList.map((task, index) => (
                      <div key={index} className="task-item">
                        {editingTask?.type === type && 
                         editingTask?.difficulty === diff && 
                         editingTask?.index === index ? (
                          <div className="task-edit">
                            <input
                              type="text"
                              value={editingTask.content}
                              onChange={(e) => setEditingTask({...editingTask, content: e.target.value})}
                            />
                            <button onClick={() => editTask(type, diff, index, editingTask.content)}>
                              Kaydet
                            </button>
                            <button onClick={() => setEditingTask(null)}>İptal</button>
                          </div>
                        ) : (
                          <div className="task-content">
                            <span>{task}</span>
                            <div className="task-actions">
                              <button onClick={() => setEditingTask({
                                type, difficulty: diff, index, content: task
                              })}>
                                Düzenle
                              </button>
                              <button onClick={() => deleteTask(type, diff, index)}>
                                Sil
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="add-task-container">
        <h3>Yeni Görev Ekle</h3>
        <div className="add-task-form">
          <select 
            value={newTask.type} 
            onChange={(e) => setNewTask({...newTask, type: e.target.value})}
          >
            <option value="truth">Doğruluk</option>
            <option value="dare">Cesaret</option>
          </select>
          <select 
            value={newTask.difficulty} 
            onChange={(e) => setNewTask({...newTask, difficulty: e.target.value})}
          >
            <option value="masum">Masum</option>
            <option value="orta">Orta</option>
            <option value="plus18">+18</option>
          </select>
          <input
            type="text"
            value={newTask.content}
            onChange={(e) => setNewTask({...newTask, content: e.target.value})}
            placeholder="Görev içeriğini yazın..."
          />
        </div>
        <button className="add-task-button" onClick={addNewTask}>
          Görev Ekle
        </button>
        <button className="reset-tasks-button" onClick={resetTasks}>
          Görevleri Sıfırla
        </button>
      </div>
    </div>
  );
};

export default TruthOrDare; 