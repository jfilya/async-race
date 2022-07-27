import INav from "../types/interface";
import Garage from "./garage/garage";
import Winners from "./winners/winners";

class Navigation implements INav {
  garage: HTMLElement;

  winners: HTMLElement;

  body: HTMLElement;

  btnWinners: HTMLButtonElement;

  btnGarage: HTMLButtonElement;

  nav: HTMLElement;

  win: Winners;

  gar: Garage;

  main: HTMLElement;

  constructor() {
    this.body = document.body;
    this.winners = document.createElement("section");
    this.garage = document.createElement("section");
    this.btnWinners = document.createElement("button");
    this.btnGarage = document.createElement("button");
    this.nav = document.createElement("nav");
    this.main = document.createElement("main");
    this.win = new Winners();
    this.gar = new Garage();
  }

  createNav(): void {
    this.body.append(this.nav);
    this.body.append(this.main);
    this.nav.className = "nav";
    this.btnGarage.className = "btnGarage";
    this.btnWinners.className = "btnWinners";
    this.btnGarage.innerHTML = "Garage";
    this.btnWinners.innerHTML = "Winners";
    this.nav.append(this.btnGarage);
    this.nav.append(this.btnWinners);
  }

  createGarage(): void {
    this.main.append(this.garage);
    this.garage.id = "garage";
    this.garage.innerHTML = "garage";
  }

  createWinners(): void {
    this.main.append(this.winners);
    this.winners.id = "winners";
    this.winners.innerHTML = "winners";
  }

  clickBtn(): void {
    this.gar.clickBtnGarage();
    this.win.clickBtnWinners();
  }
}

export default Navigation;
