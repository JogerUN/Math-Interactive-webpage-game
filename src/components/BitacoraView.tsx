import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  Printer,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Edit2,
  Save,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { WORLDS_DATA } from '../data/missionsData';
import { MathBlock, MathInline, MathText } from './MathView';

export const BitacoraView: React.FC = () => {
  const {
    logbook,
    profile,
    updateLogPersonalNote,
    exportBitacoraJSON,
    triggerPrintBitacora,
    setActiveTab,
  } = useGame();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorldFilter, setSelectedWorldFilter] = useState('todos');
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  const filteredLogs = logbook.filter((entry) => {
    const matchesSearch =
      entry.missionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.exerciseQuestion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.procedureNotes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.keyLearning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.userPersonalNote && entry.userPersonalNote.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesWorld =
      selectedWorldFilter === 'todos' || entry.worldId === selectedWorldFilter;

    return matchesSearch && matchesWorld;
  });

  const handleStartEditing = (logId: string, currentNote: string = '') => {
    setEditingLogId(logId);
    setNoteDraft(currentNote);
  };

  const handleSaveNote = (logId: string) => {
    updateLogPersonalNote(logId, noteDraft);
    setEditingLogId(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Export Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>PORTAFOLIO DE EVIDENCIAS ACADÉMICAS</span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-black text-white">
            Mi Bitácora de Cálculo Diferencial
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Registro sistemático de procedimientos analíticos, resultados verificados, errores corregidos y aprendizajes.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 no-print">
          <button
            onClick={triggerPrintBitacora}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            title="Imprimir o Exportar en PDF"
          >
            <Printer className="w-4 h-4 text-purple-400" />
            <span>Imprimir / PDF</span>
          </button>

          <button
            onClick={exportBitacoraJSON}
            className="px-4 py-2 bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:text-white border border-purple-500/40 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            title="Descargar archivo JSON de evidencias"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Descargar JSON</span>
          </button>
        </div>
      </div>

      {/* Student Identity Card in the Logbook */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 bitacora-sheet">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-600/30 border border-purple-500/40 flex items-center justify-center font-bold text-lg text-amber-400">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono">Titular de la Bitácora:</div>
            <h3 className="font-bold text-white text-base">{profile.name}</h3>
            <div className="text-xs text-purple-300 font-medium">
              {profile.title} · Nivel {profile.level} ({profile.xp} XP)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <div>
            Total Ejercicios: <b className="text-white tabular-nums">{logbook.length}</b>
          </div>
          <div>·</div>
          <div>
            Anotaciones Propias: <b className="text-amber-400 tabular-nums">{logbook.filter(l => !!l.userPersonalNote).length}</b>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#080d1a] border border-slate-800 p-3 rounded-2xl no-print">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por tema, procedimiento o nota..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 placeholder:text-slate-500"
          />
        </div>

        {/* World Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedWorldFilter('todos')}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedWorldFilter === 'todos'
                ? 'bg-purple-900/60 text-amber-300 border border-purple-500/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Todos
          </button>
          {WORLDS_DATA.map((w) => (
            <button
              key={w.id}
              onClick={() => setSelectedWorldFilter(w.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedWorldFilter === w.id
                  ? 'bg-purple-900/60 text-amber-300 border border-purple-500/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {w.realmName.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Log Entries List */}
      {filteredLogs.length === 0 ? (
        <div className="bg-[#090e1c] border border-slate-800/80 rounded-2xl p-10 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-lg text-white">
              {logbook.length === 0
                ? 'Tu Bitácora Académica está esperando tu primera misión'
                : 'No se encontraron registros con los filtros seleccionados'}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {logbook.length === 0
                ? 'Cada vez que resuelvas un ejercicio en cualquier reino, se registrará aquí automáticamente tu procedimiento, resultado y reflexiones.'
                : 'Intenta ajustar tu búsqueda o seleccionar "Todos" los reinos.'}
            </p>
          </div>

          {logbook.length === 0 && (
            <button
              onClick={() => setActiveTab('misiones')}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs inline-flex items-center gap-2 shadow cursor-pointer transition-all"
            >
              <span>Ir a las Misiones</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          {filteredLogs.map((entry) => {
            const isEditing = editingLogId === entry.id;

            return (
              <div
                key={entry.id}
                className="bg-[#090e1c] border border-slate-800/90 rounded-2xl p-6 space-y-4 shadow-lg bitacora-sheet"
              >
                {/* Entry Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <h3 className="font-serif font-bold text-base text-white">
                      {entry.missionTitle}
                    </h3>
                    <span className="text-xs text-purple-300 font-mono">
                      ({entry.worldTitle})
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(entry.timestamp).toLocaleDateString()} {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span>·</span>
                    <span className="text-amber-400">
                      {entry.attemptsCount} {entry.attemptsCount === 1 ? 'intento' : 'intentos'}
                    </span>
                  </div>
                </div>

                {/* Problem & Verified Answer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1">
                    <span className="text-slate-400 uppercase text-[10px] tracking-wider font-sans font-semibold">
                      Enunciado del Ejercicio:
                    </span>
                    <div className="text-slate-200 font-sans font-medium">
                      <MathText text={entry.exerciseQuestion} />
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1">
                    <span className="text-emerald-400 uppercase text-[10px] tracking-wider font-sans font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Resultado Verificado:
                    </span>
                    <div className="text-white font-bold">
                      Respuesta del estudiante: <span className="text-amber-400"><MathText text={entry.userAnswer} /></span> (Correcta)
                    </div>
                  </div>
                </div>

                {/* Procedure Notes */}
                <div className="p-3.5 bg-slate-900/50 border border-slate-800/80 rounded-xl space-y-1 text-xs">
                  <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    Procedimiento y Justificación Matemática Registrada:
                  </div>
                  <div className="text-slate-300 leading-relaxed pl-5 overflow-x-auto">
                    <MathText text={entry.procedureNotes} />
                  </div>
                </div>

                {/* Educational Learnings: Key concept & Mistake Avoided */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-purple-950/20 border border-purple-500/20 rounded-xl space-y-1">
                    <div className="font-semibold text-purple-300 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-purple-400" />
                      Aprendizaje Clave:
                    </div>
                    <div className="text-slate-300 leading-relaxed">
                      <MathText text={entry.keyLearning} />
                    </div>
                  </div>

                  <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl space-y-1">
                    <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      Error Común Evitado:
                    </div>
                    <div className="text-slate-300 leading-relaxed">
                      <MathText text={entry.commonMistakeAvoided} />
                    </div>
                  </div>
                </div>

                {/* Personal Student Note (Interactive & Editable) */}
                <div className="pt-2 border-t border-slate-800/80 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-300 flex items-center gap-1.5 font-mono text-[11px]">
                      <Edit2 className="w-3 h-3 text-amber-400" />
                      Mi Apunte Personal del Ejercicio:
                    </span>

                    {!isEditing && (
                      <button
                        onClick={() => handleStartEditing(entry.id, entry.userPersonalNote)}
                        className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer no-print"
                      >
                        {entry.userPersonalNote ? 'Editar Apunte' : '+ Añadir Apunte Personal'}
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-2 no-print">
                      <textarea
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder="Escribe tu observación personal, duda aclarada o mnemotécnica..."
                        rows={2}
                        className="w-full px-3 py-2 bg-slate-950 border border-amber-400/60 rounded-xl text-xs text-white focus:outline-none resize-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingLogId(null)}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleSaveNote(entry.id)}
                          className="px-3.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Save className="w-3 h-3" />
                          <span>Guardar Apunte</span>
                        </button>
                      </div>
                    </div>
                  ) : entry.userPersonalNote ? (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 italic font-mono">
                      <MathText text={`"${entry.userPersonalNote}"`} />
                    </div>
                  ) : (
                    <div className="text-slate-500 text-[11px] italic">
                      Sin anotaciones personales aún. Puedes agregar notas sobre tus errores o métodos propios.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
