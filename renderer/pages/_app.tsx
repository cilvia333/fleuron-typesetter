import { AppProps } from 'next/app';
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

import {
  useToolContext,
  toolContext,
  useEditorContext,
  editorContext,
} from '~/hooks';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    position: relative;
    box-sizing: border-box;
    ${tw`font-text`}
  }
  h1 {
    ${tw`font-header text-4xl`}
  }

  button{
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
  }
`;

export type Props = AppProps;
const App: React.FC<Props> = ({ Component, pageProps }) => {
  const toolCtx = useToolContext();
  const editorCtx = useEditorContext();

  return (
    <>
      <toolContext.Provider value={toolCtx}>
        <editorContext.Provider value={editorCtx}>
          <GlobalStyle />
          <Component {...pageProps} />
        </editorContext.Provider>
      </toolContext.Provider>
    </>
  );
};

export default App;
