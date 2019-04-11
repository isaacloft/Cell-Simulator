export default interface ICell {
  id: string;
  isActivated: boolean;
  x: number;
  y: number;
  cellOnClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
  // onClick: (event: React.MouseEvent<HTMLElement>) => void;
  activatedCellNOCounterHandler: () => void;
}
