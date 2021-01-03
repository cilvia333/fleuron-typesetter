import { faTh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

const GarallyButton: React.FC = () => {
  return (
    <>
      <Wrapper>
        <Title>Molecular List</Title>
        <Button>
          <FontAwesomeIcon icon={faTh} />
        </Button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  ${tw`flex relative justify-end items-center`}
`;

const Title = styled.h1`
  ${tw`text-base mr-4`}
`;

const Button = styled.button`
  ${tw`text-2xl text-primary bg-white border-4 border-primary border-solid rounded-full h-12 w-12 hover:text-white hover:bg-primary`}
`;

export default GarallyButton;
