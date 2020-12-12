import { type } from 'os';

import { Rectangle, Grid } from '~/utils/Geometory';

export type Fleuron = {
  id: number;
  image: string;
  rect: Rectangle<Grid>;
};
