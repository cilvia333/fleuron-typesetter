import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Fleuron from '~/components/architecture/share/fleuron';

interface Props {
  id: number;
}

const AtomItem: React.FC<Props> = (props) => {
  const { id } = props;

  return (
    <>
      <Wrapper>
        <FleuronWrapper>
          <Fleuron name={`F${id}`} />
        </FleuronWrapper>
        <Id>
          {`#${id}`} <LinkIcon icon={faLink} />
        </Id>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${tw`flex items-center cursor-pointer`}

  height: 56px;
`;

const FleuronWrapper = styled.div`
  ${tw`bg-no-repeat bg-bottom border border-solid text-darkGray hover:text-primary`}

  width: 56px;

  & > svg {
    ${tw`block fill-current`}
  }
`;

const Id = styled.div`
  ${tw`ml-4 font-text text-3xl text-darkGray select-none hover:text-primary`}
`;

const LinkIcon = styled(FontAwesomeIcon)`
  ${tw`text-base`}
`;

export default AtomItem;
