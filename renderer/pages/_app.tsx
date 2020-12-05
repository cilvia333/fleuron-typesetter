import { AppProps } from 'next/app';
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

import {
  useToolButtonContext,
  toolButtonContext,
  useEditorContext,
  editorContext,
} from '~/hooks';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    position: relative;
    box-sizing: border-box;
  }
  h1 {
    ${tw`font-header text-4xl`}
  }
`;

export type Props = AppProps;
const App: React.FC<Props> = ({ Component, pageProps }) => {
  const toolButtonCtx = useToolButtonContext();
  const editorCtx = useEditorContext();

  return (
    <>
      <toolButtonContext.Provider value={toolButtonCtx}>
        <editorContext.Provider value={editorCtx}>
          <GlobalStyle />
          <Component {...pageProps} />
        </editorContext.Provider>
      </toolButtonContext.Provider>
    </>
  );
};

export default App;
