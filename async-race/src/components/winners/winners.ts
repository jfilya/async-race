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
          const elementWinner = {
            id: arr[0].id,
            wins: 1,
            time: arr[0].time,
          } as IWinner;
          console.log(elementWinner);
          this.createWinner(elementWinner).finally(() => {});
        }
      }
    };
    step();
  }
}

export default Winners;
