/* eslint-disable @typescript-eslint/comma-dangle */
import { IWinner } from "../../types/interface";
import API from "../API";

class Winners extends API {
  // constructor() {
  //   super();
  // }

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
      elementWinner = {
        id: e.id,
        wins: (elementWinner.wins += 1),
        time: time < elementWinner.time ? time : elementWinner.time,
      } as IWinner;
      this.changeWinner(elementWinner).finally(() => {});
    }
  }
}

export default Winners;
