import { nanoid } from 'nanoid';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { useEffectOnce } from 'react-use';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Fleuron, { FleuronState } from '~/components/editor/fleuron';
import SelectedArea from '~/components/editor/selectedArea';
import { toolContext, editorContext } from '~/hooks';
import {
  Point2D,
  Rectangle,
  Pixel,
  Grid,
  Area,
  AxisX,
  AxisY,
} from '~/utils/Geometory';

interface Props {
  provided: DroppableProvided;
  snapshot: DroppableStateSnapshot;
}

const Editor: React.FC<Props> = (props) => {
  const { provided, snapshot } = props;

  const toolCtx = useContext(toolContext);
  const editorCtx = useContext(editorContext);

  const editorRef = useRef<HTMLDivElement>(null);

  const [displayFleurons, setDisplayFleurons] = useState(
    new Map<string, FleuronState>()
  );

  const [selectedFleurons, setSelectedFleurons] = useState(
    new Map<string, boolean>()
  );
  const [selectedArea, setSelectedArea] = useState<Area<Grid>>();
  const [fleuronsMap, setFleuronsMap] = useState<(string | null)[][]>([[]]);

  //useEffect
  useEffectOnce(() => {
    setDisplayFleurons(editorCtx.fleurons);

    updateEditorState();
  });

  useEffect(() => {
    updateEditorState();
  }, [editorRef?.current, editorCtx.gridSize]);

  useEffect(() => {
    if (snapshot.isDraggingOver) {
      editorCtx.setCurrentDraggingState({
        ...editorCtx.currentDraggingState,
        isDroppable: true,
      });
    } else {
      editorCtx.setCurrentDraggingState({
        ...editorCtx.currentDraggingState,
        isDroppable: false,
      });
    }
  }, [snapshot]);

  useEffect(() => {
    editorCtx.setFleurons(displayFleurons);
  }, [displayFleurons]);

  useEffect(() => {
    if (selectedFleurons.size <= 0) {
      setSelectedArea(null);
      return;
    }

    const minPosition: Point2D<Grid> = { x: 100, y: 100 } as Point2D<Grid>;
    const maxPosition: Point2D<Grid> = { x: -1, y: -1 } as Point2D<Grid>;
    selectedFleurons.forEach((v, key) => {
      const fleuronState = displayFleurons.get(key);
      if (!fleuronState) {
        return;
      }

      const position = fleuronState.position;
      const rect = fleuronState.fleuron.rect;
      const size = {
        x: rect.x * fleuronState.size,
        y: rect.y * fleuronState.size,
      } as Rectangle<Grid>;

      if (minPosition.x > position.x) {
        minPosition.x = position.x;
      }
      if (minPosition.y > position.y) {
        minPosition.y = position.y;
      }
      if (maxPosition.x < position.x + size.x) {
        maxPosition.x = (position.x + size.x) as AxisX<Grid>;
      }
      if (maxPosition.y < position.y + size.y) {
        maxPosition.y = (position.y + size.y) as AxisY<Grid>;
      }
    });

    setSelectedArea({
      position: minPosition,
      size: {
        x: maxPosition.x - minPosition.x,
        y: maxPosition.y - minPosition.y,
      } as Rectangle<Grid>,
    });
  }, [selectedFleurons]);

  const updateEditorState = () => {
    let array: typeof fleuronsMap = [];
    for (let y = 0; y < editorCtx.gridSize; y++) {
      array[y] = new Array(editorCtx.gridSize).fill('');
    }

    array = array.map((v, x) => v.map((state, y) => null));

    setFleuronsMap(array);

    const currentEl = editorRef?.current;

    if (!currentEl) {
      return;
    }

    const height: number = currentEl.getBoundingClientRect()?.height ?? null;

    if (height) {
      editorCtx.setEditorSize(height);
    }

    const positionX: number = currentEl.getBoundingClientRect()?.left ?? null;
    const positionY: number = currentEl.getBoundingClientRect()?.top ?? null;

    if (positionX !== null && positionY !== null) {
      editorCtx.setEditorPosition({
        x: positionX,
        y: positionY,
      } as Point2D<Pixel>);

      const array: Point2D<Pixel>[][] = [];
      const gridLiteralSize = height / editorCtx.gridSize;
      for (let x = 0; x < editorCtx.gridSize; x++) {
        const tmpArray: Point2D<Pixel>[] = [];
        for (let y = 0; y < editorCtx.gridSize; y++) {
          tmpArray[y] = {
            x: positionX + gridLiteralSize * x,
            y: positionY + gridLiteralSize * y,
          } as Point2D<Pixel>;
        }
        array[x] = tmpArray;
      }

      editorCtx.setGridPositions(array);
    }
  };

  const updateDisplayFleuron = (key: string, value: FleuronState) => {
    setDisplayFleurons((old) => {
      return new Map(old.set(key, value));
    });
  };

  const clearDisplayFleurons = () => {
    setDisplayFleurons((old) => {
      old.clear();
      return new Map(old);
    });
  };

  const deleteDisplayFleuron = (key: string) => {
    setDisplayFleurons((old) => {
      old.delete(key);
      return new Map(old);
    });
  };

  const updateSelectedFleuron = (key: string, value: boolean) => {
    setSelectedFleurons((old) => {
      return new Map(old.set(key, value));
    });
  };

  const clearSelectedFleurons = () => {
    setSelectedFleurons((old) => {
      old.clear();
      return new Map(old);
    });
  };

  const deleteSelectedFleuron = (key: string) => {
    setSelectedFleurons((old) => {
      old.delete(key);
      return new Map(old);
    });
  };

  //イベントハンドラ
  const onClickEditor = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();

    const position = editorCtx.calcGridPosition(
      { x: e.clientX, y: e.clientY } as Point2D<Pixel>,
      editorCtx
    );

    switch (toolCtx.currentTool) {
      case 'select': {
        const fleuronId = fleuronsMap[position.x][position.y];

        if (fleuronId) {
          updateSelectedFleuron(fleuronId, true);
        } else {
          clearSelectedFleurons();
        }
        break;
      }
      case 'pen': {
        if (editorCtx.currentFleuron) {
          const fleuron = editorCtx.fleuronDb.get(editorCtx.currentFleuron);

          if (!fleuron) {
            return;
          }

          const currentAngle = editorCtx.currentAngle;
          let isRotateRect = false;

          if (currentAngle === 90 && currentAngle === 270) {
            isRotateRect = true;
          }

          const currentSize: Rectangle<Grid> = {
            x: isRotateRect ? fleuron.rect.y : fleuron.rect.x,
            y: isRotateRect ? fleuron.rect.x : fleuron.rect.y,
          } as Rectangle<Grid>;

          if (
            position.x + currentSize.x - 1 >= editorCtx.gridSize ||
            position.y + currentSize.y - 1 >= editorCtx.gridSize
          ) {
            return;
          }

          for (let i = position.x; i < position.x + currentSize.x; i++) {
            for (let j = position.y; j < position.y + currentSize.y; j++) {
              if (fleuronsMap[i][j]) {
                return;
              }
            }
          }

          const newFleuronsMap = fleuronsMap;
          const uuid = nanoid();

          updateDisplayFleuron(uuid, {
            fleuron,
            position,
            size: 1,
            rotate: editorCtx.currentAngle,
          });

          for (let i = position.x; i < position.x + currentSize.x; i++) {
            for (let j = position.y; j < position.y + currentSize.y; j++) {
              newFleuronsMap[i][j] = uuid;
            }
          }

          setFleuronsMap(newFleuronsMap);
        }
        break;
      }
      case 'eraser': {
        const fleuronId = fleuronsMap[position.x][position.y];

        if (!fleuronId) {
          return;
        }

        deleteDisplayFleuron(fleuronId);

        setFleuronsMap((old) =>
          old.map((yAxis) =>
            yAxis.map((v) => {
              return v === fleuronId ? null : v;
            })
          )
        );

        break;
      }
      default:
        break;
    }
  };

  return (
    <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
      <GridWrapper ref={editorRef} onClick={onClickEditor}>
        {/* 花形装飾描画 */}
        <GridStyle gridSize={editorCtx.gridSize}>
          {[...editorCtx.fleurons.entries()].map((fleuron, i) => {
            return (
              <Fleuron
                state={fleuron[1]}
                selected={selectedFleurons.has(fleuron[0])}
                key={`fleuron_${i}`}
              />
            );
          })}
        </GridStyle>
        {/* 選択中花形装飾描画 */}
        <GridStyle gridSize={editorCtx.gridSize}>
          <SelectedArea
            area={selectedArea}
            select={selectedFleurons.size > 0}
          />
        </GridStyle>
        {/* グリッドライン描画 */}
        <GridStyle gridSize={editorCtx.gridSize}>
          {[...Array(editorCtx.gridSize ** 2).keys()].map((v, i) => (
            <GridLine key={`grid_${i}`} />
          ))}
        </GridStyle>
      </GridWrapper>
      {provided.placeholder}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${tw`block absolute inset-0 m-auto py-10`};

  width: 80%;
`;

const GridWrapper = styled.div`
  ${tw`w-full bg-white overflow-hidden relative border border-black border-solid`};

  &::before {
    ${tw`block`};
    content: '';
    padding-top: 100%;
  }
`;

const GridStyle = styled.div<{ gridSize: number }>`
  ${tw`w-full h-full grid absolute inset-0`};

  ${({ gridSize }) => css`
    grid-template-columns: repeat(${gridSize}, 1fr);
    grid-template-rows: repeat(${gridSize}, 1fr);
  `}
`;

const GridLine = styled.div`
  ${tw`w-full h-full border-black border border-solid border-opacity-70`};

  box-sizing: content-box;
`;

export default Editor;
