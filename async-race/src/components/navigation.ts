import INav from "../types/interface";
import "./navigation.scss";

class Navigation implements INav {
  garage: HTMLElement;

  winners: HTMLElement;

  body: HTMLElement;

  btnWinners: HTMLButtonElement;

  btnGarage: HTMLButtonElement;

  nav: HTMLElement;

  container: HTMLDivElement;

  constructor() {
    this.body = document.body;
    this.winners = document.createElement("section");
    this.garage = document.createElement("section");
    this.btnWinners = document.createElement("button");
    this.btnGarage = document.createElement("button");
    this.container = document.createElement("div");
    this.nav = document.createElement("nav");
  }

  createNav(): void {
    this.body.append(this.container);
    this.container.append(this.nav);
    this.container.className = "container";
    this.nav.className = "nav";
    this.btnGarage.className = "btnGarage";
    this.btnWinners.className = "btnWinners";
    this.btnGarage.innerHTML = "Garage";
    this.btnWinners.innerHTML = "Winners";
    this.nav.append(this.btnGarage);
    this.nav.append(this.btnWinners);
  }

  createGarage(): void {
    this.body.append(this.container);
    this.container.append(this.garage);
    this.garage.id = "garage";
  }

  createWinners(): void {
    this.body.append(this.container);
    this.container.append(this.winners);
    this.winners.id = "winners";
  }
}

export default Navigation;
