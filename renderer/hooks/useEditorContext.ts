import { useState, useCallback, createContext } from 'react';

import { FleuronState } from '~/components/editor/fleuron';

type DraggingState = {
  position: { x: number; y: number };
  editorPosition: { x: number; y: number };
  isDroppable: boolean;
  selectedFleuron: FleuronState | null;
};

type Position = {
  x: number;
  y: number;
};

const mockFleuron: FleuronState = {
  id: 1,
  position: { x: 1, y: 1 },
  size: 1,
  rotate: 0,
  selected: false,
};

interface EditorContext {
  fleurons: Map<string, FleuronState>;
  updateFleuron: (key: string, value: FleuronState) => void;
  deleteFleuron: (key: string) => void;
  clearFleurons: () => void;
  currentDraggingState: DraggingState;
  setCurrentDraggingState: (current: DraggingState) => void;
  gridSize: number;
  setGridSize: (size: number) => void;
  gridPositions: Position[][];
  setGridPositions: (position: Position[][]) => void;
  editorSize: number;
  setEditorSize: (size: number) => void;
  editorPosition: Position;
  setEditorPosition: (position: Position) => void;
  calcGridPosition: (position: Position, ctx: EditorContext) => Position;
}

export const editorContext = createContext<EditorContext>({
  fleurons: new Map<string, FleuronState>([['key1', mockFleuron]]),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateFleuron: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deleteFleuron: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearFleurons: () => {},

  currentDraggingState: {
    position: { x: 0, y: 0 },
    editorPosition: { x: 0, y: 0 },
    isDroppable: false,
    selectedFleuron: null,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentDraggingState: () => {},
  gridSize: 4,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setGridSize: () => {},
  gridPositions: [
    [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  ],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setGridPositions: () => {},
  editorSize: 4,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setEditorSize: () => {},
  editorPosition: { x: 0, y: 0 },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setEditorPosition: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  calcGridPosition: () => {},
});

export const useEditorContext = (): EditorContext => {
  const [fleurons, setFleurons] = useState(
    new Map<string, FleuronState>([['key1', mockFleuron]])
  );
  const updateFleuron = (key: string, value: FleuronState) => {
    setFleurons((old) => old.set(key, value));
  };

  const clearFleurons = () => {
    setFleurons((old) => {
      old.clear();
      return old;
    });
  };

  const deleteFleuron = (key: string) => {
    setFleurons((old) => {
      old.delete(key);
      return old;
    });
  };

  const [currentDraggingState, setDraggingState] = useState<DraggingState>({
    position: { x: 0, y: 0 },
    editorPosition: { x: 0, y: 0 },
    isDroppable: false,
    selectedFleuron: null,
  });
  const setCurrentDraggingState = useCallback(
    (current: DraggingState): void => {
      setDraggingState(current);
    },
    []
  );
  const [gridSize, updateGridSize] = useState(4);
  const setGridSize = useCallback((size: number): void => {
    updateGridSize(size);
  }, []);
  const [gridPositions, updateGridPositions] = useState<Position[][]>([[]]);
  const setGridPositions = useCallback((position: Position[][]): void => {
    updateGridPositions(position);
  }, []);
  const [editorSize, updateEditorSize] = useState(4);
  const setEditorSize = useCallback((size: number): void => {
    updateEditorSize(size);
  }, []);
  const [editorPosition, updateEditorPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const setEditorPosition = useCallback((position: Position): void => {
    updateEditorPosition(position);
  }, []);
  const calcGridPosition = useCallback(
    (position: Position, ctx: EditorContext): Position => {
      const currentX = Math.floor(
        ((position.x - ctx.editorPosition.x) / ctx.editorSize) * ctx.gridSize
      );
      const currentY = Math.floor(
        ((position.y - ctx.editorPosition.y) / ctx.editorSize) * ctx.gridSize
      );

      return { x: currentX, y: currentY };
    },
    []
  );
  return {
    fleurons,
    updateFleuron,
    deleteFleuron,
    clearFleurons,
    currentDraggingState,
    setCurrentDraggingState,
    gridSize,
    setGridSize,
    gridPositions,
    setGridPositions,
    editorSize,
    setEditorSize,
    editorPosition,
    setEditorPosition,
    calcGridPosition,
  };
};
