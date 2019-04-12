export default interface IButton {
  text: string;
  event: string;
  btnClass: string;
  clickHandler: (event: React.MouseEvent<HTMLElement>) => void;
}
