import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import { toolButtonContext, Tools } from '~/hooks';

interface Props {
  icon: IconDefinition;
  text: string;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const ToolButton: React.FC<Props> = (props) => {
  const { icon, text, onClick } = props;

  return (
    <>
      <Button onClick={onClick}>
        <Icon icon={icon} />
        {text}
      </Button>
    </>
  );
};

const Button = styled.button`
  ${tw`w-full p-2 text-left cursor-pointer`}
`;

const Icon = styled(FontAwesomeIcon)`
  ${tw`w-8 mr-2`}
`;

export default ToolButton;
