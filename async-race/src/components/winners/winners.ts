/* eslint-disable @typescript-eslint/comma-dangle */
import { IWinner } from "../../types/interface";
import API from "../API";
import UserInterface from "../user-interface";

class Winners extends API {
  interfaceUser: UserInterface;

  pageNumberWin: number;

  notesWinners: IWinner[];

  constructor() {
    super();
    this.interfaceUser = new UserInterface();
    this.notesWinners = [] as IWinner[];
    this.pageNumberWin = 0;
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
    await this.paginationWin().finally(() => {});
  }

  async buildWinners(array: IWinner[]): Promise<void> {
    const table = document.querySelector(".tbody") as HTMLTableSectionElement;
    table.innerHTML = "";
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    array.forEach(async (element, index) => {
      const status = await this.getCarStatus(element.id);
      if (!status) {
        this.deleteWinner(element.id).finally(() => {});
      } else {
        const car = await this.getCar(element.id);
        this.interfaceUser.buildWinnersTable(element, car, index + 1);
      }
    });
  }

  async paginationNumberPageWin(count: number): Promise<void> {
    const pagination = document.querySelector(
      ".paginationWinners"
    ) as HTMLUListElement;
    let paginationNumberOfPage = "";
    for (let i = 1; i <= count; i += 1) {
      paginationNumberOfPage += `<li>${i}</li>`;
    }
    pagination.innerHTML = paginationNumberOfPage;
  }

  async showPageWin(li: Element): Promise<void> {
    const active = document.querySelector(
      ".paginationWinners li.activeList"
    ) as HTMLLIElement;
    if (active) {
      active.classList.remove("activeList");
    }
    li.classList.add("activeList");
    const start = (Number(li.innerHTML) - 1) * 10;
    const end = (Number(li.innerHTML) - 1) * 10 + 10;
    this.notesWinners = this.winnersElements.slice(start, end);
    await this.buildWinners(this.notesWinners).finally(() => {});
  }

  async paginationWin(): Promise<void> {
    await this.getWinners();
    const countOfItem: number = Math.ceil(this.winnersElements.length / 10);
    await this.paginationNumberPageWin(countOfItem);
    const list = document.querySelectorAll(".paginationWinners li");
    const arrowLeft = document.querySelector(
      "#paginationWinners-prev"
    ) as HTMLButtonElement;
    const arrowRight = document.querySelector(
      "#paginationWinners-next"
    ) as HTMLButtonElement;
    const disableBtn = () => {
      if (this.pageNumberWin === countOfItem - 1) arrowRight.disabled = true;
      if (this.pageNumberWin < countOfItem - 1) arrowRight.disabled = false;
      if (this.pageNumberWin === 0) arrowLeft.disabled = true;
      if (this.pageNumberWin > 0) arrowLeft.disabled = false;
    };
    if (!list[this.pageNumberWin]) {
      this.pageNumberWin -= 1;
    }
    disableBtn();
    arrowRight.onclick = async () => {
      this.pageNumberWin += 1;
      disableBtn();
      await this.showPageWin(list[this.pageNumberWin]).finally(() => {});
    };
    arrowLeft.onclick = async () => {
      this.pageNumberWin -= 1;
      disableBtn();
      await this.showPageWin(list[this.pageNumberWin]).finally(() => {});
    };
    this.showPageWin(list[this.pageNumberWin]).finally(() => {});
  }
}

export default Winners;
