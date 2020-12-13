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
  const [tmpSelectedFleurons, setTmpSelectedFleurons] = useState(
    new Map<string, boolean>()
  );
  const [selectedArea, setSelectedArea] = useState<Area<Grid>>();
  const [fleuronsMap, setFleuronsMap] = useState<(string | null)[][]>([[]]);
  const [dragSelectArea, setDragSelectArea] = useState<Area<Pixel>>();
  const [isSelectDragging, setIsSelectDragging] = useState(false);
  const [startSelectDragPosition, setStartSelectDragPosition] = useState<
    Point2D<Pixel>
  >({ x: 0, y: 0 } as Point2D<Pixel>);

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
      setSelectedArea(undefined);
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

    const height = (currentEl.getBoundingClientRect()?.height as Pixel) ?? null;

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

  const getRawPosition = (position: Point2D<Pixel>): Point2D<Pixel> => {
    const rawPosition = JSON.parse(JSON.stringify(position));

    if (rawPosition.x < editorCtx.editorPosition.x) {
      rawPosition.x = editorCtx.editorPosition.x as AxisX<Pixel>;
    }
    if (rawPosition.x > editorCtx.editorPosition.x + editorCtx.editorSize) {
      rawPosition.x = (editorCtx.editorPosition.x +
        editorCtx.editorSize) as AxisX<Pixel>;
    }
    if (rawPosition.y < editorCtx.editorPosition.y) {
      rawPosition.y = editorCtx.editorPosition.y as AxisY<Pixel>;
    }
    if (rawPosition.y > editorCtx.editorPosition.y + editorCtx.editorSize) {
      rawPosition.y = (editorCtx.editorPosition.y +
        editorCtx.editorSize) as AxisY<Pixel>;
    }

    return rawPosition;
  };

  const getArea = (
    posi1: Point2D<Pixel>,
    posi2: Point2D<Pixel>
  ): [Area<Pixel>, Area<Grid>] => {
    const fixedStartPosition = JSON.parse(JSON.stringify(posi1));
    if (fixedStartPosition.x > posi2.x) {
      fixedStartPosition.x = posi2.x;
    }
    if (fixedStartPosition.y > posi2.y) {
      fixedStartPosition.y = posi2.y;
    }

    const fixedEndPosition = JSON.parse(JSON.stringify(posi2));
    if (fixedEndPosition.x < posi1.x) {
      fixedEndPosition.x = posi1.x;
    }
    if (fixedEndPosition.y < posi1.y) {
      fixedEndPosition.y = posi1.y;
    }

    const fixedSize = {
      x: Math.abs(posi1.x - posi2.x),
      y: Math.abs(posi1.y - posi2.y),
    } as Rectangle<Pixel>;

    const pixelArea = {
      position: fixedStartPosition,
      size: fixedSize,
    } as Area<Pixel>;

    const startGridPosition = editorCtx.calcGridPosition(
      fixedStartPosition,
      editorCtx
    );
    const endGridPosition = editorCtx.calcGridPosition(
      fixedEndPosition,
      editorCtx
    );

    const gridSize = {
      x: Math.abs(startGridPosition.x - endGridPosition.x),
      y: Math.abs(startGridPosition.y - endGridPosition.y),
    } as Rectangle<Grid>;

    const gridArea = {
      position: startGridPosition,
      size: gridSize,
    } as Area<Grid>;

    return [pixelArea, gridArea];
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
        const fleuron = fleuronId ? selectedFleurons.get(fleuronId) : null;
        const isPressKey = e.ctrlKey || e.shiftKey || e.metaKey;

        if (!((fleuronId && isPressKey) || fleuron)) {
          clearSelectedFleurons();
        }
        if (fleuronId) {
          if (fleuron && isPressKey) {
            deleteSelectedFleuron(fleuronId);
          }

          if (!fleuron) {
            updateSelectedFleuron(fleuronId, true);
          }
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
            size: 1 as Grid,
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

  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isSelectDragging) {
      return;
    }

    const rawPosition = getRawPosition({
      x: e.clientX,
      y: e.clientY,
    } as Point2D<Pixel>);

    setIsSelectDragging(true);
    setStartSelectDragPosition(rawPosition);
  };
  const onMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!isSelectDragging) {
      return;
    }

    const rawPosition = getRawPosition({
      x: e.clientX,
      y: e.clientY,
    } as Point2D<Pixel>);
    const [pixelArea, gridArea] = getArea(startSelectDragPosition, rawPosition);

    setDragSelectArea(pixelArea);
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsSelectDragging(false);

    if (
      !dragSelectArea ||
      (dragSelectArea?.size.x < 10 && dragSelectArea?.size.y < 10)
    ) {
      onClickEditor(e);
      return;
    }

    setDragSelectArea(undefined);

    const rawPosition = getRawPosition({
      x: e.clientX,
      y: e.clientY,
    } as Point2D<Pixel>);
    const [pixelArea, gridArea] = getArea(startSelectDragPosition, rawPosition);
    const isPressKey = e.ctrlKey || e.shiftKey || e.metaKey;

    switch (toolCtx.currentTool) {
      case 'select': {
        if (!isPressKey) {
          clearSelectedFleurons();
        }
        for (
          let i = gridArea.position.x;
          i < gridArea.position.x + gridArea.size.x + 1;
          i++
        ) {
          for (
            let j = gridArea.position.y;
            j < gridArea.position.y + gridArea.size.y + 1;
            j++
          ) {
            const fleuronId = fleuronsMap[i][j];
            const fleuron = fleuronId ? selectedFleurons.get(fleuronId) : null;
            if (fleuronId && !fleuron) {
              updateSelectedFleuron(fleuronId, true);
            }
            if (fleuronId && fleuron) {
              deleteSelectedFleuron(fleuronId);
            }
          }
        }
        break;
      }
      case 'pen': {
        break;
      }
      case 'eraser': {
        break;
      }
      default:
        break;
    }
  };

  return (
    <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
      <GridWrapper
        ref={editorRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {/* 花形装飾描画 */}
        <GridStyle gridSize={editorCtx.gridSize}>
          {[...editorCtx.fleurons.entries()].map((fleuron, i) => {
            return (
              <Fleuron
                state={fleuron[1]}
                selected={
                  selectedFleurons.has(fleuron[0]) ||
                  tmpSelectedFleurons.has(fleuron[0])
                }
                key={`fleuron_${i}`}
              />
            );
          })}
        </GridStyle>
        {/* グリッドライン描画 */}
        <GridStyle gridSize={editorCtx.gridSize}>
          {[...Array(editorCtx.gridSize ** 2).keys()].map((v, i) => (
            <GridLine key={`grid_${i}`} />
          ))}
        </GridStyle>
        {/* 選択中花形装飾描画 */}
        <GridStyle gridSize={editorCtx.gridSize}>
          <SelectedArea
            area={selectedArea}
            select={selectedFleurons.size > 0}
          />
        </GridStyle>
      </GridWrapper>
      {/* {provided.placeholder} */}
      {isSelectDragging && (
        <MultiSelectArea
          style={
            dragSelectArea && {
              width: `${dragSelectArea.size.x}px`,
              height: `${dragSelectArea.size.y}px`,
              transform: `translate(${dragSelectArea.position.x}px, ${dragSelectArea.position.y}px)`,
            }
          }
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${tw`block absolute inset-0 m-auto py-10`};

  width: 80%;
`;

const GridWrapper = styled.div`
  ${tw`w-full bg-white relative border border-black border-solid`};

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

const MultiSelectArea = styled.div`
  ${tw`bg-primary bg-opacity-50 border-primary border border-solid border-opacity-70 fixed top-0 left-0 pointer-events-none`};
`;

export default Editor;
