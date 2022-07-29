interface INav {
  garage: HTMLElement;
  winners: HTMLElement;
  body: HTMLElement;
  btnWinners: HTMLButtonElement;
  btnGarage: HTMLButtonElement;
  nav: HTMLElement;
  main: HTMLElement;
}
interface ICars {
  name: string;
  color: string;
  id: string;
}

interface IEngine {
  velocity: string;
  distance: string;
}
export { INav, ICars, IEngine };
