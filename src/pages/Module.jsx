import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, BookOpen, HelpCircle } from 'lucide-react'; // Icons for tabs

const Module = () => {
  const [activeTab, setActiveTab] = useState('notes');

  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);

  const [flashcardFront, setFlashcardFront] = useState('');
  const [flashcardBack, setFlashcardBack] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [quizList, setQuizList] = useState([]);

  const addNote = () => {
    if (note.trim()) {
      setNotesList([...notesList, note]);
      setNote('');
    }
  };

  const addFlashcard = () => {
    if (flashcardFront && flashcardBack) {
      setFlashcards([...flashcards, { front: flashcardFront, back: flashcardBack }]);
      setFlashcardFront('');
      setFlashcardBack('');
    }
  };

  const addQuiz = () => {
    if (question && answer) {
      setQuizList([...quizList, { question, answer }]);
      setQuestion('');
      setAnswer('');
    }
  };

  const tabs = [
    { id: 'notes', label: 'Notes', icon: <StickyNote size={18} /> },
    { id: 'flashcards', label: 'Flashcards', icon: <BookOpen size={18} /> },
    { id: 'quizzes', label: 'Quizzes', icon: <HelpCircle size={18} /> }
  ];

  return (
    <div className="max-w-5xl mx-auto pt-5 text-white">


      {/* Enhanced Nav Tabs */}
      <div className="flex justify-center mb-10">
      <div className="flex bg-white rounded-full px-4 py-2 space-x-4 shadow-md border border-pink-200">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition duration-200 ${
        activeTab === tab.id
          ? 'bg-pink-100 text-pink-600 font-semibold'
          : 'text-gray-500 hover:text-pink-500'
      }`}
    >
      {tab.icon}
      <span className="text-sm font-medium">{tab.label}</span>
    </button>
  ))}
</div>

      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'notes' && (
          <motion.div
            key="notes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your note..."
              className="w-full h-32 p-4 border rounded-lg focus:ring focus:ring-blue-200 text-black"
            />
            <button
              onClick={addNote}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Note
            </button>
            <div className="grid gap-4 mt-6">
              {notesList.map((n, i) => (
                <div key={i} className="p-4 bg-blue-50 border border-blue-100 rounded shadow text-black">
                  {n}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'flashcards' && (
          <motion.div
            key="flashcards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={flashcardFront}
                onChange={(e) => setFlashcardFront(e.target.value)}
                placeholder="Front (Question)"
                className="p-3 border rounded-lg focus:ring focus:ring-green-200 text-black"
              />
              <input
                type="text"
                value={flashcardBack}
                onChange={(e) => setFlashcardBack(e.target.value)}
                placeholder="Back (Answer)"
                className="p-3 border rounded-lg focus:ring focus:ring-green-200 text-black"
              />
            </div>
            <button
              onClick={addFlashcard}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Add Flashcard
            </button>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {flashcards.map((fc, i) => (
                <div key={i} className="p-4 bg-white border border-gray-200 rounded shadow text-black">
                  <p className="font-semibold text-gray-800">Q: {fc.front}</p>
                  <p className="mt-2 text-gray-600">A: {fc.back}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'quizzes' && (
          <motion.div
            key="quizzes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Question"
                className="p-3 border rounded-lg focus:ring focus:ring-purple-200 text-black"
              />
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Answer"
                className="p-3 border rounded-lg focus:ring focus:ring-purple-200 text-black"
              />
            </div>
            <button
              onClick={addQuiz}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
            >
              Add Quiz
            </button>
            <div className="space-y-4 mt-6">
              {quizList.map((qz, i) => (
                <div key={i} className="p-4 bg-purple-50 border border-purple-200 rounded text-black">
                  <p className="font-medium text-gray-800">Q: {qz.question}</p>
                  <p className="text-gray-600 mt-1">Answer: {qz.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Module;
