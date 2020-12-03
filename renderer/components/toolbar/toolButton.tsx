import React, { useContext } from 'react';

import { toolButtonContext, Tools } from '~/hooks';

interface Props {
  tool: Tools;
}

const ToolButton: React.FC<Props> = (props) => {
  const ctx = useContext(toolButtonContext);
  const tool = props.tool;

  return (
    <>
      <button
        onClick={() => {
          ctx.setCurrentTool(tool);
        }}
      >
        test
      </button>
    </>
  );
};

export default ToolButton;
