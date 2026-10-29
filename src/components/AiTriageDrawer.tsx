import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Bot,
  Send,
  AlertTriangle,
  Phone,
  Sparkles,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Square,
  Mic,
  MicOff,
  RotateCcw,
  ShieldAlert,
  CheckCircle,
  HelpCircle,
  Info,
  Loader2,
  Trash2,
  Heart,
  Shield,
} from 'lucide-react';
import { TriageResult, ChatMessage } from '../types';
import { directCall } from '../utils/emergency';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { SUPPORTED_LANGUAGES } from '../types/i18n';

interface AiTriageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  activeDiseaseContext?: string;
  onOpenSos: () => void;
}

export const AiTriageDrawer: React.FC<AiTriageDrawerProps> = ({
  isOpen,
  onClose,
  initialPrompt,
  activeDiseaseContext,
  onOpenSos,
}) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'triage' | 'chat'>('triage');
  const [currentContext, setCurrentContext] = useState<string | undefined>(activeDiseaseContext);

  // Triage state
  const [triageInput, setTriageInput] = useState(initialPrompt || '');
  const [selectedLanguage, setSelectedLanguage] = useState<string>(language);
  const [triageLoading, setTriageLoading] = useState(false);
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [triageError, setTriageError] = useState<string | null>(null);

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // Immediate red flag detection
  const [immediateEmergencyFlag, setImmediateEmergencyFlag] = useState(false);

  // Speech Recognition state
  const [isListening, setIsListening] = useState(false);
  const [recognizedInterim, setRecognizedInterim] = useState('');
  const [micNotice, setMicNotice] = useState<string | null>(null);

  // Speech Synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize welcome message based on language
  useEffect(() => {
    if (chatMessages.length === 0) {
      const welcomeMap: Record<string, string> = {
        en: 'Hello! I am your SwasthSeva AI Medical Assistant. You can ask me emergency first-aid advice, symptom questions, or self-care guidance in English, Hindi, Marathi, Tamil, or Marwari.\n\nHow can I help you right now?',
        hi: 'नमस्ते! मैं स्वास्थ्यसेवा AI साथी हूँ। आप मुझसे हिन्दी, अंग्रेजी, मराठी, तमिल या मारवाड़ी में किसी भी बीमारी, लक्षण या प्राथमिक उपचार के बारे में पूछ सकते हैं।\n\nकृपया बताएं क्या समस्या हो रही है?',
        mr: 'नमस्कार! मी स्वास्थ्यसेवा AI सहाय्यक आहे. आपण मराठी, हिंदी किंवा इंग्रजीमध्ये आरोग्यासंबंधी प्रश्न आणि प्रथमोपचार विचारू शकता.\n\nतुम्हाला काय त्रास होत आहे?',
        ta: 'வணக்கம்! நான் உங்கள் சுவஸ்த்சேவா AI மருத்துவ உதவியாளர். நீங்கள் தமிழ், ஆங்கிலம் அல்லது இந்தியில் முதலுதவி ஆலோசனைகளைக் கேட்கலாம்.\n\nஉங்களுக்கு என்ன பிரச்சனை?',
        mwr: 'खम्मा घणी सा! हूँ आपरो स्वास्थ्यसेवा AI साथी हूँ। आप मारवाड़ी, हिन्दी या अंग्रेजी में कोई भी बीमारी या इलाज री सलाह पूछ सको हो।\n\nकांई तकलीफ व्है री है सा?',
      };

      setChatMessages([
        {
          id: 'welcome',
          role: 'model',
          text: welcomeMap[language] || welcomeMap.en,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [language]);

  // Sync initial prompt or context
  useEffect(() => {
    if (initialPrompt) {
      setTriageInput(initialPrompt);
      checkImmediateRedFlags(initialPrompt);
      handleRunTriage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    if (activeDiseaseContext) {
      setCurrentContext(activeDiseaseContext);
      setActiveTab('chat');
    }
  }, [activeDiseaseContext]);

  // Auto-scroll chat
  useEffect(() => {
    if (activeTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab, chatLoading]);

  // Immediate red flag detection function (Zero delay safety)
  const checkImmediateRedFlags = (text: string) => {
    const lower = text.toLowerCase();
    const criticalTerms = [
      'chest pain',
      'heart attack',
      'chhati me dard',
      'left arm',
      'unconscious',
      'behosh',
      'cannot breathe',
      'saans nahi',
      'stroke',
      'paralysis',
      'snake bite',
      'saanp',
      'poison',
      'severe bleed',
      'artery',
      'choking',
    ];
    const isCritical = criticalTerms.some((term) => lower.includes(term));
    setImmediateEmergencyFlag(isCritical);
  };

  const quickSymptoms = [
    { label: 'Chest pain & sweating', query: 'Crushing chest pain radiating to left arm with cold sweating and nausea' },
    { label: 'Hot oil burn on hand', query: 'Boiling hot cooking oil fell on my hand with severe blistering and burning' },
    { label: 'Dog bite on leg', query: 'Street dog bite on leg with bleeding puncture marks' },
    { label: 'Snake bite fang marks', query: 'Snake bite on ankle with swelling and rapid tooth marks' },
    { label: 'Severe dehydration', query: 'Severe loose motions and vomiting for 12 hours with dizziness and dry mouth' },
    { label: 'Panic & fast heartbeat', query: 'Sudden racing heart, hyperventilation, chest tightness and extreme panic' },
  ];

  // Run Symptom Triage
  const handleRunTriage = async (textToTriage?: string) => {
    const text = (textToTriage || triageInput).trim();
    if (!text) return;

    checkImmediateRedFlags(text);
    setTriageLoading(true);
    setTriageError(null);
    setTriageResult(null);

    try {
      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: text,
          language: selectedLanguage,
          patientProfile: user?.profile,
          activeContext: currentContext ? { diseaseName: currentContext } : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to triage symptoms');
      }

      setTriageResult(data.data);
    } catch (err: any) {
      setTriageError(err.message || 'Error occurred while analyzing symptoms.');
    } finally {
      setTriageLoading(false);
    }
  };

  // Send Chat Message
  const handleSendChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const userMsg = chatInput.trim();
    if (!userMsg || chatLoading) return;

    checkImmediateRedFlags(userMsg);

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userMsg,
      timestamp: Date.now(),
    };

    const updatedHistory = [...chatMessages, newMsg];
    setChatMessages(updatedHistory);
    setChatInput('');
    setChatLoading(true);
    setChatError(null);

    try {
      const historyPayload = updatedHistory.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: historyPayload,
          patientProfile: user?.profile,
          activeContext: currentContext ? { diseaseName: currentContext } : undefined,
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get AI response');
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: data.reply,
          timestamp: Date.now(),
        },
      ]);
    } catch (err: any) {
      setChatError(err.message || 'Chat service encountered an error.');
    } finally {
      setChatLoading(false);
    }
  };

  // Text-To-Speech Controls (Play, Pause, Resume, Stop)
  const handleSpeakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech audio is not supported in this browser.');
      return;
    }

    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    // Pick appropriate voice
    const voices = window.speechSynthesis.getVoices();
    const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);
    const targetCode = langObj ? langObj.speechCode : 'en-IN';

    const matchedVoice =
      voices.find((v) => v.lang.replace('_', '-').includes(targetCode)) ||
      voices.find((v) => v.lang.includes('hi') || v.lang.includes('IN'));

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.rate = 0.95;
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    setIsSpeaking(true);
    setIsPaused(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleStopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  // Speech Recognition (Microphone) with language switching
  const handleToggleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicNotice(
        'Speech recognition is not supported on this browser. Please type your message into the text box.'
      );
      setTimeout(() => setMicNotice(null), 5000);
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);
      recognition.lang = langObj ? langObj.speechCode : 'hi-IN';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setMicNotice('Listening... Speak your symptoms clearly now.');
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        const recognizedText = final || interim;
        setRecognizedInterim(recognizedText);

        if (activeTab === 'triage') {
          setTriageInput(recognizedText);
        } else {
          setChatInput(recognizedText);
        }

        checkImmediateRedFlags(recognizedText);
      };

      recognition.onerror = (e: any) => {
        setIsListening(false);
        setMicNotice(`Microphone error: ${e.error || 'Permission denied or timed out.'}`);
        setTimeout(() => setMicNotice(null), 5000);
      };

      recognition.onend = () => {
        setIsListening(false);
        setMicNotice(null);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      setIsListening(false);
      setMicNotice('Failed to start microphone. Please check browser microphone permissions.');
      setTimeout(() => setMicNotice(null), 5000);
    }
  };

  const handleClearChat = () => {
    setChatMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        text: 'Conversation cleared. How can I assist you with your health today?',
        timestamp: Date.now(),
      },
    ]);
    setChatError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col h-[92vh] overflow-hidden border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 transition-colors">
        {/* Top Header */}
        <div className="bg-sky-600 dark:bg-sky-700 p-3.5 sm:p-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5 text-sky-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base leading-tight">
                  {t('aiAssistantTitle')}
                </h3>
                <span className="text-[10px] bg-sky-500/80 font-semibold px-2 py-0.5 rounded-full">
                  Eng • हिन्दी • मराठी • தமிழ் • मारवाड़ी
                </span>
              </div>
              <p className="text-[11px] text-sky-100 truncate max-w-[220px] sm:max-w-none">
                {t('aiSubtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              handleStopAudio();
              onClose();
            }}
            className="p-1.5 rounded-xl text-sky-100 hover:text-white hover:bg-sky-700/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Immediate Red Flag Emergency Warning Banner (Safety First!) */}
        {immediateEmergencyFlag && (
          <div className="p-3 bg-red-600 text-white flex items-center justify-between gap-3 text-xs font-bold animate-pulse shrink-0">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span>{t('lifeThreateningWarning')}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => directCall('112')}
                className="bg-white text-red-700 text-xs font-black px-3 py-1 rounded-lg shadow-xs"
              >
                Call 112
              </button>
              <button
                onClick={onOpenSos}
                className="bg-red-800 text-white text-xs font-bold px-2.5 py-1 rounded-lg"
              >
                SOS Bar
              </button>
            </div>
          </div>
        )}

        {/* Active Context Banner */}
        {currentContext && (
          <div className="px-4 py-2 bg-sky-50 dark:bg-sky-950/60 border-b border-sky-100 dark:border-sky-900 flex items-center justify-between text-xs text-sky-900 dark:text-sky-200 shrink-0">
            <div className="flex items-center gap-2 truncate">
              <Sparkles className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span className="font-semibold truncate">
                {t('contextualBanner')} <strong>{currentContext}</strong>
              </span>
            </div>
            <button
              onClick={() => setCurrentContext(undefined)}
              className="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline shrink-0"
            >
              Clear Context
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 shrink-0">
          <button
            onClick={() => setActiveTab('triage')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold border-b-2 text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'triage'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{t('symptomTriageTab')}</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold border-b-2 text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'chat'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>{t('aiChatTab')}</span>
          </button>
        </div>

        {/* Microphone Notice Alert */}
        {micNotice && (
          <div className="px-4 py-2 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 text-xs border-b border-amber-200 dark:border-amber-800 flex items-center gap-2">
            <Mic className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{micNotice}</span>
          </div>
        )}

        {/* TAB 1: SYMPTOM TRIAGE */}
        {activeTab === 'triage' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Input Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span>{t('describeSymptoms')}</span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    ({t('anyLanguageNote')})
                  </span>
                </label>

                <div className="flex items-center gap-1 text-[11px]">
                  <span className="text-slate-400">{t('language')}:</span>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded px-1.5 py-0.5 border border-slate-200 dark:border-slate-700 text-xs"
                  >
                    <option value="auto">Auto Detect</option>
                    <option value="en">English</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="mr">मराठी (Marathi)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="mwr">मारवाड़ी (Marwari)</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <textarea
                  rows={3}
                  value={triageInput}
                  onChange={(e) => {
                    setTriageInput(e.target.value);
                    checkImmediateRedFlags(e.target.value);
                  }}
                  placeholder="e.g. Mere seene me dard ho raha hai... / I have sore throat with high fever... / घशात खूप दुखत आहे..."
                  className="w-full text-xs sm:text-sm p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 focus:outline-hidden transition-all placeholder:text-slate-400"
                />

                {/* Voice Input Mic Button inside Triage */}
                <button
                  type="button"
                  onClick={handleToggleVoiceInput}
                  className={`absolute right-3 bottom-3 p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                    isListening
                      ? 'bg-red-500 text-white border-red-600 animate-pulse shadow-md'
                      : 'bg-white dark:bg-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600'
                  }`}
                  title={isListening ? 'Stop Speaking' : 'Speak Symptoms (Voice Input)'}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-sky-600 dark:text-sky-400" />}
                </button>
              </div>

              <button
                onClick={() => handleRunTriage()}
                disabled={triageLoading || !triageInput.trim()}
                className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 active:scale-[0.98] disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {triageLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Triage Urgency...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t('evaluateUrgency')}</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Symptom Chips */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                {t('quickSymptomsLabel')}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickSymptoms.map((qs, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setTriageInput(qs.query);
                      handleRunTriage(qs.query);
                    }}
                    className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/60 text-slate-700 dark:text-slate-300 py-1.5 px-3 rounded-xl border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    {qs.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Triage Error Alert */}
            {triageError && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-red-800 dark:text-red-300 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{triageError}</p>
                  <p className="mt-1 text-[11px]">
                    If in danger, dial 112 or 108 immediately.
                  </p>
                </div>
                <button
                  onClick={() => directCall('112')}
                  className="bg-red-600 text-white font-bold px-2.5 py-1 rounded-lg text-xs shrink-0"
                >
                  Call 112
                </button>
              </div>
            )}

            {/* TRIAGE RESULT REPORT */}
            {triageResult && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4 animate-in fade-in duration-200">
                {/* Urgency Badge */}
                <div
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                    triageResult.urgency === 'RED'
                      ? 'bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900 text-red-900 dark:text-red-200'
                      : triageResult.urgency === 'YELLOW'
                      ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200'
                      : 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-3.5 h-3.5 rounded-full shrink-0 ${
                        triageResult.urgency === 'RED'
                          ? 'bg-red-600 animate-ping'
                          : triageResult.urgency === 'YELLOW'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm leading-tight">
                        {triageResult.urgencyLevelLabel}
                      </h4>
                      <p className="text-xs opacity-90">{triageResult.emergencyAction}</p>
                    </div>
                  </div>

                  {/* Audio Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() =>
                        handleSpeakText(
                          `${triageResult.urgencyLevelLabel}. ${triageResult.triageSummary}. Steps: ${triageResult.immediateSteps.join(
                            '. '
                          )}`
                        )
                      }
                      className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
                      title={isSpeaking ? 'Pause/Resume' : t('audioReadAloud')}
                    >
                      {isSpeaking && !isPaused ? (
                        <Pause className="w-4 h-4 text-sky-600" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-sky-600" />
                      )}
                    </button>
                    {isSpeaking && (
                      <button
                        onClick={handleStopAudio}
                        className="p-2 rounded-xl bg-white dark:bg-slate-800 text-red-600 transition-colors"
                        title="Stop Audio"
                      >
                        <Square className="w-4 h-4 fill-current" />
                      </button>
                    )}

                    {triageResult.urgency === 'RED' && (
                      <button
                        onClick={() => directCall('112')}
                        className="bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3 fill-current" />
                        <span>Call 112</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Triage Summary */}
                <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {t('medicalTriageAssessment')}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {triageResult.triageSummary}
                  </p>
                </div>

                {/* Immediate Action Steps */}
                <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{t('immediateActionSteps')}:</span>
                  </div>
                  <div className="space-y-1.5">
                    {triageResult.immediateSteps.map((st, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-snug">{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What NOT to do */}
                {triageResult.whatToAvoid && triageResult.whatToAvoid.length > 0 && (
                  <div className="bg-red-50/70 dark:bg-red-950/40 p-3.5 rounded-2xl border border-red-200 dark:border-red-900 space-y-1.5">
                    <div className="text-xs font-bold text-red-900 dark:text-red-200 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>{t('whatNotToDo')}:</span>
                    </div>
                    <div className="space-y-1">
                      {triageResult.whatToAvoid.map((avoid, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-red-800 dark:text-red-300">
                          <span className="font-bold text-red-600">✕</span>
                          <span>{avoid}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={onOpenSos}
                    className="flex-1 py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>{t('sosButton')}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('chat')}
                    className="py-2.5 px-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-100 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Ask AI Follow-up Questions
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CHATBOT */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-950">
            {/* Context & Clear Bar */}
            <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 shrink-0">
              <span className="truncate">
                {currentContext ? `Discussing: ${currentContext}` : 'General Health Inquiry'}
              </span>
              <button
                onClick={handleClearChat}
                className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Clear Conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('clearChat')}</span>
              </button>
            </div>

            {/* Chat Bubbles */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-3xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-sky-600 text-white rounded-br-xs shadow-xs'
                          : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 rounded-bl-xs shadow-xs'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>
                      {!isUser && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                          <span>SwasthSeva Clinical AI</span>
                          <button
                            onClick={() => handleSpeakText(msg.text)}
                            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
                            title="Play Spoken Audio"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-bl-xs p-3 text-xs text-slate-500 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
                    <span>SwasthSeva AI is consulting clinical guidelines...</span>
                  </div>
                </div>
              )}

              {chatError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs rounded-xl border border-red-200 dark:border-red-900">
                  {chatError}
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input & Voice Bar */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
              <form onSubmit={handleSendChat} className="flex items-center gap-2">
                {/* Voice Input Mic Button */}
                <button
                  type="button"
                  onClick={handleToggleVoiceInput}
                  className={`p-3 rounded-2xl border text-xs transition-all shrink-0 cursor-pointer ${
                    isListening
                      ? 'bg-red-500 text-white border-red-600 animate-pulse shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                  title={isListening ? 'Stop Speaking' : 'Tap to Speak (Voice Input)'}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  )}
                </button>

                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => {
                    setChatInput(e.target.value);
                    checkImmediateRedFlags(e.target.value);
                  }}
                  placeholder={
                    isListening
                      ? 'Listening... Speak now'
                      : t('typeMessagePlaceholder')
                  }
                  className="flex-1 text-xs sm:text-sm p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 focus:outline-hidden transition-all"
                />

                <button
                  type="submit"
                  disabled={!chatInput.trim() || chatLoading}
                  className="p-3 bg-sky-600 hover:bg-sky-700 active:scale-95 disabled:opacity-40 text-white rounded-2xl shadow-xs transition-all shrink-0 cursor-pointer"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
