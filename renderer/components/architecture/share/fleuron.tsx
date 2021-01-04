import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import F214 from '../../../assets/fleurons/svgs/214.svg';
import F215 from '../../../assets/fleurons/svgs/215.svg';
import F268 from '../../../assets/fleurons/svgs/268.svg';
import F466 from '../../../assets/fleurons/svgs/466.svg';
import F467 from '../../../assets/fleurons/svgs/467.svg';

export const iconTypes = {
  F268,
  F466,
  F467,
  F214,
  F215,
};

interface Props {
  name: string;
  border: boolean;
  className: string;
}

const Fleuron: React.FC<Props> = ({ name, border, className, ...props }) => {
  const IconList = Object.entries(iconTypes).find(([id, data]) => id === name);
  const Icon: typeof React.Component = IconList ? IconList[1] : null;

  return (
    <Wrapper border={border} className={className}>
      <Icon {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ border: boolean }>`
  ${tw`border-0 border-solid`}

  & > svg {
    ${tw`block`}
  }

  ${({ border }) =>
    css`
      ${tw`border`}
    `}
`;

export default Fleuron;
