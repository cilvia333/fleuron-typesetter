import React, { useContext, useState, useRef, useEffect } from 'react';
import { useEffectOnce } from 'react-use';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Fleuron, { FleuronState } from '~/components/editor/fleuron';
import { toolButtonContext } from '~/hooks';

const mockFleuron: FleuronState = {
  id: 1,
  position: { x: 1, y: 1 },
  size: 1,
  rotate: 0,
};

const Editor: React.FC = () => {
  const ctx = useContext(toolButtonContext);
  const [editorSize, setEditorSize] = useState(0);
  const [editorPosition, setEditorPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const editorRef = useRef(null);
  const [gridSize, setGridSize] = useState(4);
  const [fleurons, setFleurons] = useState(
    new Map<string, FleuronState>([['key1', mockFleuron]])
  );
  const [selectedFleurons, setSelectedFleurons] = useState(
    new Map<string, boolean>()
  );
  const [isSelected, setIsSelected] = useState(false);
  const [fleuronsMap, setFleuronsMap] = useState<string[][]>([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);

  useEffectOnce(() => {
    let array: string[][] = [];
    for (let y = 0; y < gridSize; y++) {
      array[y] = new Array(gridSize).fill('');
    }

    array = array.map((v, x) => {
      return v.map((state, y) => {
        const item = fleurons.get('key1');
        if (
          item &&
          x >= item?.position?.x - 1 &&
          x < item?.position?.x - 1 + item?.size &&
          y >= item?.position?.y - 1 &&
          y < item?.position?.y - 1 + item?.size
        ) {
          return 'key1';
        }
        return '';
      });
    });

    setFleuronsMap(array);
  });

  useEffect(() => {
    const height: number =
      editorRef?.current?.getBoundingClientRect()?.height ?? null;

    if (height) {
      setEditorSize(height);
    }

    const positionX: number =
      editorRef?.current?.getBoundingClientRect()?.top ?? null;
    const positionY: number =
      editorRef?.current?.getBoundingClientRect()?.left ?? null;

    if (positionX && positionY) {
      setEditorPosition({ x: positionX, y: positionY });
    }
  }, [editorRef?.current]);

  const changeGridSize = (size: number) => {
    if (size > 0) {
      setGridSize(size);
    }
  };

  const updateFleurons = (key: string, value: FleuronState) => {
    setFleurons((old) => old.set(key, value));
  };

  const clearFleurons = () => {
    setFleurons((old) => {
      old.clear();
      return old;
    });
  };

  const deleteFleurons = (key: string) => {
    setFleurons((old) => {
      old.delete(key);
      return old;
    });
  };

  const updateSelectedFleurons = (key: string, value: boolean) => {
    setSelectedFleurons((old) => old.set(key, value));
  };

  const clearSelectedFleurons = () => {
    setSelectedFleurons((old) => {
      old.clear();
      return old;
    });
  };

  const deleteSelectedFleurons = (key: string) => {
    setSelectedFleurons((old) => {
      old.delete(key);
      return old;
    });
  };

  const onClickEditor = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();

    const x = Math.floor(
      ((e.clientX - editorPosition.x) / editorSize) * gridSize
    );
    const y = Math.floor(
      ((e.clientY - editorPosition.y) / editorSize) * gridSize
    );

    if (!isSelected && fleuronsMap[x][y]) {
      setIsSelected(true);
      updateSelectedFleurons('key1', true);
    } else {
      clearSelectedFleurons();
      setIsSelected(false);
    }
  };

  return (
    <>
      <Wrapper ref={editorRef} onClick={onClickEditor}>
        {/* 花形装飾描画 */}
        <Grid gridSize={gridSize}>
          {[...fleurons.entries()].map((fleuron, i) => {
            return (
              <Fleuron
                state={fleuron[1]}
                selected={selectedFleurons.has('key1')}
                key={`fleuron_${i}`}
              />
            );
          })}
        </Grid>
        {/* グリッドライン描画 */}
        <Grid gridSize={gridSize}>
          {[...Array(gridSize ** 2).keys()].map((v, i) => (
            <GridLine key={`grid_${i}`} />
          ))}
        </Grid>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${tw`w-full bg-white overflow-hidden relative`};

  &::before {
    ${tw`block`};
    content: '';
    padding-top: 100%;
  }
`;

const Grid = styled.div<{ gridSize: number }>`
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
