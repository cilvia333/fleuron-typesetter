import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import AtomItem from './atomItem';

interface Props {
  ids: number[];
}

const AtomList: React.FC<Props> = (props) => {
  const { ids } = props;

  return (
    <>
      <Wrapper>
        {ids.map((id, index) => (
          <AtomItem id={id} key={`atomItem_${index}`} />
        ))}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${tw`w-full h-full relative`}

  & > * {
    ${tw`mb-4`}
  }
`;

export default AtomList;
