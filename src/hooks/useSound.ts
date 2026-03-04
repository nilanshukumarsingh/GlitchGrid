import { Howl } from 'howler';
import { useCallback, useRef, useEffect } from 'react';
import { SOUNDS } from '../constants';
import { useSoundContext } from '../context/SoundContext';

type SoundType = 'click' | 'win' | 'lose' | 'draw' | 'switch' | 'fall' | 'glitch' | 'explosion' | 'powerup' | 'error';

export const useSoundEffects = () => {
  // Use refs to persist Howl instances without re-creating them
  const sounds = useRef<{ [key in SoundType]?: Howl }>({});
  const { isMuted } = useSoundContext();

  // EFFECT: Immediately stop all sounds if muted
  useEffect(() => {
    if (isMuted) {
      Object.values(sounds.current).forEach((sound) => {
        const s = sound as Howl | undefined;
        if (s && s.playing()) {
          s.stop();
        }
      });
    }
  }, [isMuted]);

  const play = useCallback((type: SoundType) => {
    if (isMuted) return;

    if (!sounds.current[type]) {
        let src = '';
        let volume = 0.4;
        switch(type) {
            case 'click': src = SOUNDS.clickUrl; break;
            case 'switch': src = SOUNDS.switchUrl; break;
            case 'win': src = SOUNDS.winUrl; break;
            case 'lose': src = SOUNDS.loseUrl; break;
            case 'draw': src = SOUNDS.drawUrl; break;
            case 'fall': src = SOUNDS.fallUrl; volume=0.3; break;
            case 'glitch': src = SOUNDS.glitchUrl; volume=0.2; break;
            case 'explosion': src = SOUNDS.explosionUrl; volume=0.5; break;
            case 'powerup': src = SOUNDS.powerupUrl; break;
            case 'error': src = SOUNDS.errorUrl; volume=0.3; break;
        }

        sounds.current[type] = new Howl({
            src: [src],
            volume: volume,
            preload: true,
        });
    }
    
    // Stop chaotic overlapping sounds (especially for rapid glitch/fall events)
    if (type === 'glitch' || type === 'fall') {
         sounds.current[type]?.stop();
    }

    // Ensure glitch sound stops if we reset or win (clearing the board context)
    // This prevents the "fade sound" from playing if the visual fade didn't finish or was reset
    if (type === 'switch' || type === 'win') {
        sounds.current['glitch']?.stop();
    }
    
    sounds.current[type]?.play();
  }, [isMuted]);

  return { play };
};