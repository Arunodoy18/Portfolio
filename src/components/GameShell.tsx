"use client";

import { useState, useCallback, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LobbyScreen from "./screens/LobbyScreen";
import MainMenu from "./screens/MainMenu";
import PlayerProfile from "./screens/PlayerProfile";
import MissionSelect from "./screens/MissionSelect";
import SkillTree from "./screens/SkillTree";
import Achievements from "./screens/Achievements";
import CommTerminal from "./screens/CommTerminal";
import GameNav from "./ui/GameNav";

export type GameState = "LOBBY" | "MENU" | "PROFILE" | "MISSIONS" | "SKILLS" | "ACHIEVEMENTS" | "COMMS";

interface GameContextType {
  state: GameState;
  navigate: (to: GameState) => void;
  previousState: GameState | null;
}

export const GameContext = createContext<GameContextType>({
  state: "LOBBY",
  navigate: () => {},
  previousState: null,
});

export const useGame = () => useContext(GameContext);

const pageTransition = {
  initial: { opacity: 0, scale: 0.97, filter: "blur(8px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 1.02, filter: "blur(4px)" },
};

const transitionConfig = {
  duration: 0.45,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export default function GameShell() {
  const [state, setState] = useState<GameState>("LOBBY");
  const [previousState, setPreviousState] = useState<GameState | null>(null);

  const navigate = useCallback((to: GameState) => {
    setPreviousState(state);
    setState(to);
  }, [state]);

  const showNav = state !== "LOBBY";

  return (
    <GameContext.Provider value={{ state, navigate, previousState }}>
      <div className="h-screen w-screen bg-[#0a0a0f] overflow-hidden relative">
        {/* Scanline overlay */}
        <div className="fixed inset-0 pointer-events-none z-[200] scanlines" />

        {/* Fixed crosshair */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[199]">
          <span className="text-[#ff4655]/15 text-2xl font-thin select-none">+</span>
        </div>

        {/* Game Navigation */}
        <AnimatePresence>
          {showNav && (
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 right-0 z-[100]"
            >
              <GameNav />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Screen Router */}
        <AnimatePresence mode="wait">
          <motion.div
            key={state}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={transitionConfig}
            className="h-full w-full"
          >
            {state === "LOBBY" && <LobbyScreen />}
            {state === "MENU" && <MainMenu />}
            {state === "PROFILE" && <PlayerProfile />}
            {state === "MISSIONS" && <MissionSelect />}
            {state === "SKILLS" && <SkillTree />}
            {state === "ACHIEVEMENTS" && <Achievements />}
            {state === "COMMS" && <CommTerminal />}
          </motion.div>
        </AnimatePresence>

        {/* Fixed bottom branding */}
        {showNav && (
          <div className="fixed bottom-4 left-6 z-50 flex items-center gap-4 pointer-events-auto">
            <a
              href="https://github.com/Arunodoy18"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#53545f] hover:text-[#ff4655] transition-colors"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <span className="font-mono-game text-[9px] text-[#53545f]">// ARUNODOY BANERJEE</span>
          </div>
        )}
      </div>
    </GameContext.Provider>
  );
}
