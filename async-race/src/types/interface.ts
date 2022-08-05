export interface INav {
  garage: HTMLElement;
  winners: HTMLElement;
  body: HTMLElement;
  btnWinners: HTMLButtonElement;
  btnGarage: HTMLButtonElement;
  nav: HTMLElement;
  main: HTMLElement;
}
export interface ICars {
  name: string;
  color: string;
  id: string;
}

export interface IEngine {
  velocity: string;
  distance: string;
}

export interface IWinner {
  id: string;
  wins: number;
  time: number;
}

export interface IWriteElement {
  id: string;
  time: number;
}

export interface IWriteArray {
  name: string;
  id: string;
  time: number;
}

export interface ICreateWinElement {
  name: string;
  id: string;
  time: number;
}
