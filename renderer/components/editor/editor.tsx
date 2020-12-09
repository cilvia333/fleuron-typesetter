import { nanoid } from 'nanoid';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { useEffectOnce } from 'react-use';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Fleuron, { FleuronState } from '~/components/editor/fleuron';
import { toolContext, editorContext } from '~/hooks';
import { Point2D, Rectangle, Pixel, Grid } from '~/utils/Geometory';

interface Props {
  provided: DroppableProvided;
  snapshot: DroppableStateSnapshot;
}

const Editor: React.FC<Props> = (props) => {
  const { provided, snapshot } = props;

  const toolCtx = useContext(toolContext);
  const editorCtx = useContext(editorContext);

  const editorRef = useRef(null);

  const [displayFleurons, setDisplayFleurons] = useState(
    new Map<string, FleuronState>()
  );

  const [selectedFleurons, setSelectedFleurons] = useState(
    new Map<string, boolean>()
  );
  const [isSelected, setIsSelected] = useState(false);
  const [fleuronsMap, setFleuronsMap] = useState<(string | null)[][]>([[]]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);

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
    console.log('changeFleuron');
    editorCtx.setFleurons(displayFleurons);
  }, [displayFleurons]);

  const updateEditorState = () => {
    let array: string[][] = [];
    for (let y = 0; y < editorCtx.gridSize; y++) {
      array[y] = new Array(editorCtx.gridSize).fill('');
    }

    array = array.map((v, x) => {
      return v.map((state, y) => {
        const item = editorCtx.fleurons.get('key1');
        if (
          item &&
          x >= item?.position?.x &&
          x < item?.position?.x + item?.size &&
          y >= item?.position?.y &&
          y < item?.position?.y + item?.size
        ) {
          return 'key1';
        }
        return null;
      });
    });

    setFleuronsMap(array);

    const height: number =
      editorRef?.current?.getBoundingClientRect()?.height ?? null;

    if (height) {
      editorCtx.setEditorSize(height);
    }

    const positionX: number =
      editorRef?.current?.getBoundingClientRect()?.left ?? null;
    const positionY: number =
      editorRef?.current?.getBoundingClientRect()?.top ?? null;

    if (positionX !== null && positionY !== null) {
      editorCtx.setEditorPosition({ x: positionX, y: positionY });

      const array: { x: number; y: number }[][] = [];
      const gridLiteralSize = height / editorCtx.gridSize;
      for (let x = 0; x < editorCtx.gridSize; x++) {
        const tmpArray: { x: number; y: number }[] = [];
        for (let y = 0; y < editorCtx.gridSize; y++) {
          tmpArray[y] = {
            x: positionX + gridLiteralSize * x,
            y: positionY + gridLiteralSize * y,
          };
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
      { x: e.clientX, y: e.clientY },
      editorCtx
    );

    switch (toolCtx.currentTool) {
      case 'select': {
        if (!isSelected && fleuronsMap[position.x][position.y]) {
          setIsSelected(true);
          updateSelectedFleuron('key1', true);
        } else {
          clearSelectedFleurons();
          setIsSelected(false);
        }
        break;
      }
      case 'pen': {
        console.log('pen');
        if (editorCtx.currentFleuron) {
          const fleuron = editorCtx.fleuronDb.get(editorCtx.currentFleuron);

          if (!fleuron) {
            return;
          }

          const currentSize = {
            x: fleuron.rect.x,
            y: fleuron.rect.y,
          };

          if (
            position.x + currentSize.x - 1 >= editorCtx.gridSize ||
            position.y + currentSize.y - 1 >= editorCtx.gridSize
          ) {
            return;
          }

          const newFleuronsMap = fleuronsMap;
          const uuid = nanoid();

          updateDisplayFleuron(uuid, {
            fleuron,
            position,
            size: 1,
            rotate: 0,
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
        console.log('eraser');
        console.log(position, fleuronsMap);

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
                selected={selectedFleurons.has('key1')}
                key={`fleuron_${i}`}
              />
            );
          })}
        </GridStyle>
        {/* 選択中花形装飾描画 */}
        <GridStyle gridSize={editorCtx.gridSize}>
          {[...displayFleurons.entries()].map((fleuron, i) => {
            return (
              <Fleuron
                state={fleuron[1]}
                selected={selectedFleurons.has('key1')}
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
