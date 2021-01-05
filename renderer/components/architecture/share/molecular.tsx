import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Svg001, { svg001Info } from '~/components/architecture/atoms/svg001';
import Svg002, { svg002Info } from '~/components/architecture/atoms/svg002';
import Svg003, { svg003Info } from '~/components/architecture/atoms/svg003';
import Svg004, { svg004Info } from '~/components/architecture/atoms/svg004';
import Svg005, { svg005Info } from '~/components/architecture/atoms/svg005';

export type Atom = {
  id: number;
  type: number;
};

export type Atoms = Atom[];

export interface MolecularProps {
  animationAtom?: Atom;
  animation?: boolean;
  onAnimationEnd?: (id: number) => void;
  borderActive?: boolean;
  className?: string;
}

export type MolecularInfo = {
  id: string;
  atoms: Atoms;
  page: number;
};

export const molecularTypes = {
  Svg001,
  Svg002,
  Svg003,
  Svg004,
  Svg005,
};

export const molecularInfos: MolecularInfo[] = [
  svg001Info,
  svg002Info,
  svg003Info,
  svg004Info,
  svg005Info,
];

export const molecularList = Object.entries(molecularTypes).map(
  ([id, data]) => id
);

interface Props {
  name: string;
  className?: string;
}

const Molecular: React.FC<Props> = ({ name, className, ...props }) => {
  const MolecularList = Object.entries(molecularTypes).find(
    ([id, data]) => id === name
  );
  const Molecular: React.FunctionComponent<MolecularProps> = MolecularList
    ? MolecularList[1]
    : Svg001;

  return <Molecular className={className} {...props} />;
};

export default Molecular;
