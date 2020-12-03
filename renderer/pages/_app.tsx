import { AppProps } from 'next/app';
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

import { useToolButtonContext, toolButtonContext } from '~/hooks';

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
  const ctx = useToolButtonContext();

  return (
    <>
      <toolButtonContext.Provider value={ctx}>
        <GlobalStyle />
        <Component {...pageProps} />
      </toolButtonContext.Provider>
    </>
  );
};

export default App;
