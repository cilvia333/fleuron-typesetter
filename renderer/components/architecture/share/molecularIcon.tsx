import React from 'react';

import Svg001 from '../../../assets/moleculars/svg001.svg';
import Svg002 from '../../../assets/moleculars/svg002.svg';
import Svg003 from '../../../assets/moleculars/svg003.svg';
import Svg004 from '../../../assets/moleculars/svg004.svg';
import Svg005 from '../../../assets/moleculars/svg005.svg';

export const iconTypes = {
  Svg001,
  Svg002,
  Svg003,
  Svg004,
  Svg005,
};

interface Props {
  name: string;
}

const MolecularIcon: React.FC<Props> = ({ name, ...props }) => {
  const IconList = Object.entries(iconTypes).find(([id, data]) => id === name);
  const Icon: typeof React.Component = IconList ? IconList[1] : null;

  return <Icon {...props} />;
};

export default MolecularIcon;
