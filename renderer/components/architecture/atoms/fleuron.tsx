import React from 'react';

import F268 from '../../../assets/fleurons/svgs/268.svg';
import F466 from '../../../assets/fleurons/svgs/466.svg';

const iconTypes = {
  F268,
  F466,
};

interface Props {
  name: string;
}

const Fleuron: React.FC<Props> = (props) => {
  const { name } = props;
  const IconList = Object.entries(iconTypes).find(
    ([id, data]) => data.name === name
  );
  const Icon: typeof React.Component = IconList ? IconList[1] : null;

  return <Icon {...props} />;
};

export default Fleuron;
