import { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, ZoomIn, ZoomOut, Gauge, Volume2, VolumeX } from 'lucide-react';
import { useSimulationStore } from '../../stores/useSimulationStore';
import { speakNarration, stopNarration, playCircuitBeep } from '../../engines/voice-engine/speechSynthesis';

export default function UniversalSimulationControlBar() {
  const {
    isPlaying,
    togglePlay,
    playbackSpeed,
    setSpeed,
    stepForward,
    stepBack,
    resetSimulation,
    currentFrame,
    totalFrames,
    zoomLevel,
    setZoom,
    activeSimulatorId,
  } = useSimulationStore();

  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const speeds = [0.5, 1.0, 1.5, 2.0];

  // Automated audio narration text based on simulator step
  const getNarrationText = (frame: number, simId: string): string => {
    switch (simId) {
      case 'cmos-inverter':
        if (frame === 0) return 'Simulation started. Voltage is set to 5 Volts. PMOS transistor is OFF, NMOS is ON. Output bit is 0.';
        if (frame > 0 && frame < 50) return 'Switching input voltage signal to LOW ground state. Electrons moving through PMOS pull-up network.';
        return 'Input signal is LOW. PMOS transistor is ON, pulling output to 5 Volts. Interpreted Bit is 1!';
      default:
        return `Simulation step ${frame}. Circuit state updated. Audio signal active.`;
    }
  };

  // Handle Play/Pause audio narration
  const handleTogglePlay = () => {
    togglePlay();
    playCircuitBeep(isPlaying ? 350 : 650, 'sine', 0.2);
    if (!isPlaying && isAudioEnabled) {
      speakNarration(getNarrationText(currentFrame, activeSimulatorId));
    } else {
      stopNarration();
    }
  };

  const handleStepForward = () => {
    stepForward();
    playCircuitBeep(580, 'triangle', 0.1);
    if (isAudioEnabled) {
      speakNarration(getNarrationText(currentFrame + 1, activeSimulatorId));
    }
  };

  const handleStepBack = () => {
    stepBack();
    playCircuitBeep(420, 'triangle', 0.1);
    if (isAudioEnabled) {
      speakNarration(getNarrationText(Math.max(0, currentFrame - 1), activeSimulatorId));
    }
  };

  const handleReset = () => {
    resetSimulation();
    stopNarration();
    playCircuitBeep(300, 'sawtooth', 0.2);
  };

  // Automatic interval stepping when isPlaying is true
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        stepForward();
      }, 1000 / playbackSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed, stepForward]);

  return (
    <div className="w-full max-w-2xl glass-strong rounded-2xl p-3 px-5 border border-primary-500/30 flex items-center justify-between gap-4 shadow-xl">
      {/* Step Back & Play/Pause & Step Forward & Reset */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleStepBack}
          className="p-2 rounded-xl glass text-white/70 hover:text-white hover:bg-white/10 transition-all"
          title="Step Back"
        >
          <SkipBack size={16} />
        </button>

        <button
          onClick={handleTogglePlay}
          className={`p-2.5 rounded-xl text-white font-bold transition-all shadow-md ${
            isPlaying
              ? 'bg-yellow-500 shadow-yellow-500/30'
              : 'bg-primary-500 shadow-primary-500/30 hover:bg-primary-600'
          }`}
          title={isPlaying ? 'Pause Simulation' : 'Play Simulation Voice Guide'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <button
          onClick={handleStepForward}
          className="p-2 rounded-xl glass text-white/70 hover:text-white hover:bg-white/10 transition-all"
          title="Step Forward"
        >
          <SkipForward size={16} />
        </button>

        <button
          onClick={handleReset}
          className="p-2 rounded-xl glass text-white/50 hover:text-white hover:bg-white/10 transition-all ml-1"
          title="Reset Simulation"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Frame Scrubber Bar */}
      <div className="flex-1 flex items-center gap-3 px-2">
        <span className="text-[10px] font-mono text-white/50 min-w-[30px]">
          {currentFrame}/{totalFrames}
        </span>
        <div className="flex-1 h-2 bg-surface-500 rounded-full overflow-hidden relative border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-green-400 transition-all duration-150"
            style={{ width: `${(currentFrame / totalFrames) * 100}%` }}
          />
        </div>
      </div>

      {/* Voice Toggle, Speed Controls & Zoom */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Audio / Voice Narration Toggle */}
        <button
          onClick={() => {
            const next = !isAudioEnabled;
            setIsAudioEnabled(next);
            if (!next) stopNarration();
          }}
          className={`p-2 rounded-xl glass border transition-all ${
            isAudioEnabled ? 'text-green-400 border-green-500/30 bg-green-500/10' : 'text-white/40 border-white/10'
          }`}
          title={isAudioEnabled ? 'Voice Guide Enabled (Click to Mute)' : 'Voice Guide Muted (Click to Enable)'}
        >
          {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        {/* Speed Dropdown */}
        <div className="hidden sm:flex items-center gap-1 glass px-2 py-1 rounded-xl border border-white/10 text-[10px] font-mono">
          <Gauge size={12} className="text-primary-300" />
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-1.5 py-0.5 rounded-md transition-all ${
                playbackSpeed === s ? 'bg-primary-500 text-white font-bold' : 'text-white/40 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Zoom */}
        <div className="flex items-center gap-1 glass p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setZoom(Math.max(0.75, zoomLevel - 0.25))}
            className="p-1 text-white/60 hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <span className="text-[10px] font-mono text-white/70 px-1">{zoomLevel.toFixed(1)}x</span>
          <button
            onClick={() => setZoom(Math.min(2.0, zoomLevel + 0.25))}
            className="p-1 text-white/60 hover:text-white"
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
