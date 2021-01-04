import { faTh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

const GarallyButton: React.FC = () => {
  return (
    <>
      <Wrapper>
        <SideBarWrapper>
          <SideBarContainer className="group">
            <SideBarBG />
            <ListWrapper></ListWrapper>
            <Button>
              <FontAwesomeIcon icon={faTh} />
            </Button>
          </SideBarContainer>
        </SideBarWrapper>
        <Title>Molecular List</Title>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  ${tw`absolute right-0 top-0 bottom-0 w-72`}
`;

const Title = styled.h1`
  ${tw`text-base mr-4`}
`;

const SideBarWrapper = styled.div`
  ${tw`absolute h-screen w-56 right-0 top-0 bottom-0`}
`;

const SideBarContainer = styled.div`
  ${tw`h-12 w-12 absolute inset-0 m-auto hover:h-full hover:w-full`}
`;

const Button = styled.div`
  ${tw`text-2xl text-primary bg-white border-4 border-primary border-solid rounded-full h-12 w-12 group-hover:bg-primary absolute inset-0 m-auto`}

  & > * {
    ${tw`absolute inset-0 m-auto`}
  }
`;

const SideBarBG = styled.div`
  ${tw`h-full w-full group-hover:shadow-pink`}
`;

const ListWrapper = styled.ul`
  ${tw`absolute h-full w-full overflow-y-scroll`}
`;

const ListItem = styled.li`
  ${tw`absolute h-full w-full overflow-y-scroll`}
`;

const ListDevider = styled.li`
  ${tw`absolute h-1 w-full bg-primary overflow-y-scroll`}
`;

export default GarallyButton;
