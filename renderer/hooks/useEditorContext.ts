import { useState, useCallback, createContext } from 'react';

type DraggingState = {
  position: { x: number; y: number };
  editorPosition: { x: number; y: number };
  isDroppable: boolean;
};

type Position = {
  x: number;
  y: number;
};

interface EditorContext {
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
  currentDraggingState: {
    position: { x: 0, y: 0 },
    editorPosition: { x: 0, y: 0 },
    isDroppable: false,
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
  const [currentDraggingState, setDraggingState] = useState<DraggingState>({
    position: { x: 0, y: 0 },
    editorPosition: { x: 0, y: 0 },
    isDroppable: false,
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
