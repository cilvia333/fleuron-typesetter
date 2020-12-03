import React, { useState, useCallback, createContext } from 'react';

const tools = ['select', 'pen', 'eraser'] as const;

export type Tools = typeof tools[keyof typeof tools];

type ToolButtonContext = {
  currentTool: Tools;
  setCurrentTool: (current: Tools) => void;
};

export const toolButtonContext = createContext<ToolButtonContext>({
  currentTool: 'select',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentTool: () => {},
});

export const useToolButtonContext = (): ToolButtonContext => {
  const [currentTool, setTool] = useState<Tools>('select');
  const setCurrentTool = useCallback((current: Tools): void => {
    setTool(current);
  }, []);
  return {
    currentTool,
    setCurrentTool,
  };
};
