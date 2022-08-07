/* eslint-disable @typescript-eslint/comma-dangle */
import { Arrow, NotesOnPage } from "../../types/enums";
import {
  ICreateWinElement,
  IWinner,
  IWriteArray,
  IWriteElement,
} from "../../types/interface";
import { SortTable } from "../../types/types";
import API from "../API";
import UserInterface from "../user-interface";

class Winners extends API {
  private readonly interfaceUser: UserInterface;

  private pageNumberWin: number;

  private notesWinners: IWinner[];

  constructor() {
    super();
    this.interfaceUser = new UserInterface();
    this.notesWinners = [] as IWinner[];
    this.pageNumberWin = 0;
  }

  async writeWinner(
    id: string,
    element: IWriteElement,
    arr: IWriteArray[]
  ): Promise<void> {
    const showWinner = document.querySelector(
      ".showWinner"
    ) as HTMLParagraphElement;
    const flagEl = document.getElementById(`flag${id}`) as HTMLDivElement;
    const flag = flagEl ? flagEl.getBoundingClientRect().left : 0;
    const step = () => {
      const carEl = document.getElementById(`car-${id}`) as HTMLDivElement;
      const car = carEl ? carEl.getBoundingClientRect().left : 0;
      if (car < flag) requestAnimationFrame(step);
      if (car >= flag && car !== 0) {
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

  private async createWin(e: ICreateWinElement, time: number): Promise<void> {
    let elementWinner = {
      id: e.id,
      wins: 1,
      time: e.time,
    } as IWinner;
    const status = await this.getWinnerStatus(elementWinner.id);
    if (!status) {
      await this.createWinner(elementWinner).finally(() => {});
    } else {
      const newElementWinner = await this.getWinner(elementWinner.id);
      elementWinner = {
        id: newElementWinner.id,
        wins: (newElementWinner.wins += 1),
        time: time < newElementWinner.time ? time : newElementWinner.time,
      } as IWinner;
      await this.changeWinner(elementWinner).finally(() => {});
    }
    await this.paginationWin().finally(() => {});
  }

  private async buildWinners(array: IWinner[]): Promise<void> {
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
    (document.querySelector(".wins-arm") as HTMLSpanElement).innerHTML = "";
    (document.querySelector(".time-arm") as HTMLSpanElement).innerHTML = "";
  }

  private async paginationNumberPageWin(count: number): Promise<void> {
    const pagination = document.querySelector(
      ".paginationWinners"
    ) as HTMLUListElement;
    let paginationNumberOfPage = "";
    for (let i = 1; i <= count; i += 1) {
      paginationNumberOfPage += `<li>${i}</li>`;
    }
    pagination.innerHTML = paginationNumberOfPage;
  }

  private async showPageWin(li: Element): Promise<void> {
    const active = document.querySelector(
      ".paginationWinners li.activeList"
    ) as HTMLLIElement;
    if (active) {
      active.classList.remove("activeList");
    }
    li.classList.add("activeList");
    const start = (Number(li.innerHTML) - 1) * NotesOnPage.win;
    const end = (Number(li.innerHTML) - 1) * NotesOnPage.win + NotesOnPage.win;
    this.notesWinners = this.winnersElements.slice(start, end);
    await this.buildWinners(this.notesWinners).finally(() => {});
  }

  async paginationWin(): Promise<void> {
    await this.getWinners();
    const countOfItem: number = Math.ceil(
      this.winnersElements.length / NotesOnPage.win
    );
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

  sortAmountWins(): void {
    const tbody = document.querySelector(".tbody") as HTMLTableSectionElement;
    const trs = tbody.rows as unknown as HTMLTableRowElement[];
    const winsSort = document.querySelector(
      ".wins-sort"
    ) as HTMLTableCellElement;
    const bestTime = document.querySelector(
      ".time-sort"
    ) as HTMLTableCellElement;
    const sortTable: SortTable = (
      index,
      sortElement,
      nameClass,
      anotherClass
    ) => {
      sortElement.classList.toggle("sort-up");
      (document.querySelector(anotherClass) as HTMLSpanElement).innerHTML = "";
      const arrow = document.querySelector(nameClass) as HTMLSpanElement;
      let sorted = [] as HTMLTableRowElement[];
      if (sortElement.classList.contains("sort-up")) {
        sorted = [...trs].sort(
          (a, b) => +a.cells[index].innerHTML - +b.cells[index].innerHTML
        );
        arrow.innerHTML = Arrow.down;
      }
      if (!sortElement.classList.contains("sort-up")) {
        sorted = [...trs].sort(
          (a, b) => +b.cells[index].innerHTML - +a.cells[index].innerHTML
        );
        arrow.innerHTML = Arrow.up;
      }
      tbody.innerHTML = "";
      sorted.forEach((el) => tbody.append(el));
    };
    winsSort.onclick = () => sortTable(3, winsSort, ".wins-arm", ".time-arm");
    bestTime.onclick = () => sortTable(4, bestTime, ".time-arm", ".wins-arm");
  }
}

export default Winners;
