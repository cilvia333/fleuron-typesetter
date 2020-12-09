export type Pixel = Branded<number, 'Pixel'>;
export type Grid = Branded<number, 'Grid'>;

export type AxisX<N extends number> = Branded<N, 'AxisX'>;
export type AxisY<N extends number> = Branded<N, 'AxisY'>;

export type UnitOfLength = Pixel | Grid;

export type Rectangle<U extends UnitOfLength> = {
  x: AxisX<U>;
  y: AxisY<U>;
};

export type Point2D<U extends UnitOfLength> = {
  x: AxisX<U>;
  y: AxisY<U>;
};
