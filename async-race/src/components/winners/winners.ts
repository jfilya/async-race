/* eslint-disable @typescript-eslint/comma-dangle */
import { IWinner } from "../../types/interface";
import API from "../API";
import UserInterface from "../user-interface";

class Winners extends API {
  interfaceUser: UserInterface;

  constructor() {
    super();
    this.interfaceUser = new UserInterface();
  }

  async writeWinner(
    id: string,
    element: {
      id: string;
      time: number;
    },
    arr: { name: string; id: string; time: number }[]
  ): Promise<void> {
    const showWinner = document.querySelector(
      ".showWinner"
    ) as HTMLParagraphElement;
    const flag = (
      document.getElementById(`flag${id}`) as HTMLDivElement
    ).getBoundingClientRect().left;
    const step = () => {
      const car = (
        document.getElementById(`car-${id}`) as HTMLDivElement
      ).getBoundingClientRect().left;
      if (car < flag) requestAnimationFrame(step);
      if (car >= flag) {
        const name = (
          document.getElementById(`carName-${id}`) as HTMLSpanElement
        ).innerHTML;
        const time = element.id === id ? element.time : 0;
        arr.push({ name, id, time });
        showWinner.innerHTML = `Winner: ${arr[0].name} <br> time: ${
          arr[0].time / 1000
        }s!`;
        showWinner.style.visibility = "visible";
        if (arr.length === 1) {
          this.createWin(arr[0], time).finally(() => {});
        }
      }
    };
    step();
  }

  async createWin(
    e: {
      name: string;
      id: string;
      time: number;
    },
    time: number
  ): Promise<void> {
    let elementWinner = {
      id: e.id,
      wins: 1,
      time: e.time,
    } as IWinner;
    const status = await this.getWinnerStatus(elementWinner.id);
    if (!status) {
      this.createWinner(elementWinner).finally(() => {});
    } else {
      const newElementWinner = await this.getWinner(elementWinner.id);
      elementWinner = {
        id: newElementWinner.id,
        wins: (newElementWinner.wins += 1),
        time: time < newElementWinner.time ? time : newElementWinner.time,
      } as IWinner;
      this.changeWinner(elementWinner).finally(() => {});
    }
    await this.buildWinners().finally(() => {});
  }

  async buildWinners(): Promise<void> {
    const table = document.querySelector(".tbody") as HTMLTableSectionElement;
    table.innerHTML = "";
    const elementsWinner = await this.getWinners();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    elementsWinner.forEach(async (element, index) => {
      const car = await this.getCar(element.id);
      this.interfaceUser.buildWinnersTable(element, car, index + 1);
    });
  }
}

export default Winners;
