import { useState, useCallback, createContext } from 'react';

import { FleuronState } from '~/components/editor/fleuron';
import { Fleuron } from '~/types';

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

const mockFleuron: Fleuron = {
  id: 1,
  rect: { x: 1, y: 1 },
  image: '',
};

const mockFleuron2: Fleuron = {
  id: 2,
  rect: { x: 1, y: 2 },
  image: '',
};

const mockFleuronState: FleuronState = {
  fleuron: mockFleuron,
  position: { x: 0, y: 0 },
  size: 1,
  rotate: 0,
};

interface EditorContext {
  fleuronDb: Map<number, Fleuron>;
  currentFleuron: Fleuron['id'] | null;
  setCurrentFleuron: (current: Fleuron['id'] | null) => void;
  fleurons: Map<string, FleuronState>;
  setFleurons: (current: Map<string, FleuronState>) => void;
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
  fleuronDb: new Map<number, Fleuron>([
    [1, mockFleuron],
    [2, mockFleuron2],
  ]),
  currentFleuron: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentFleuron: () => {},
  fleurons: new Map<string, FleuronState>([['key1', mockFleuronState]]),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFleurons: () => {},

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
  const [fleuronDb, setFleuronDb] = useState(
    new Map<number, Fleuron>([
      [1, mockFleuron],
      [2, mockFleuron2],
    ])
  );
  const [currentFleuron, updateCurrentFleuron] = useState<Fleuron['id'] | null>(
    null
  );
  const setCurrentFleuron = useCallback(
    (current: Fleuron['id'] | null): void => {
      updateCurrentFleuron(current);
    },
    []
  );
  const [fleurons, updateFleurons] = useState(
    new Map<string, FleuronState>([['key1', mockFleuronState]])
  );
  const setFleurons = useCallback(
    (current: Map<string, FleuronState>): void => {
      updateFleurons(current);
    },
    []
  );

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
    fleuronDb,
    currentFleuron,
    setCurrentFleuron,
    fleurons,
    setFleurons,
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
