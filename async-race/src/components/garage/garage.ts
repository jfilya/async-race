import { NotesOnPage } from "../../types/enums";
import {
  ICars,
  IEngine,
  IWriteArray,
  IWriteElement,
} from "../../types/interface";
import API from "../API";
import UserInterface from "../user-interface";
import Winners from "../winners/winners";

class Garage extends API {
  private pageNumber: number;

  private readonly interfaceUser: UserInterface;

  private readonly win: Winners;

  private notes: Array<ICars>;

  constructor() {
    super();
    this.interfaceUser = new UserInterface();
    this.pageNumber = 0;
    this.win = new Winners();
    this.notes = [];
  }

  private async buildCarTable(array: ICars[]): Promise<void> {
    await this.get();
    const sTitle = document.querySelector(".amountItems") as HTMLSpanElement;
    sTitle.innerHTML = `(${this.cars.length})`;
    const cars = document.querySelector(".carsTable") as HTMLDivElement;
    cars.innerHTML = "";
    array.forEach((car) => {
      this.interfaceUser.renderCar(car);
    });
    await this.getCars();
    this.deleteCar();
    this.updateCar();
    this.startDrivingOneCar().finally(() => {});
    this.removeDrivingOneCar().finally(() => {});
    this.race().finally(() => {});
    this.resetRace().finally(() => {});
    this.generateRandomCars().finally(() => {});
  }

  private async getCars(): Promise<void> {
    const create = document.getElementById("create") as HTMLInputElement;
    create.onclick = async () => {
      const createName = document.querySelector("#name") as HTMLInputElement;
      const createColor = document.querySelector("#color") as HTMLInputElement;
      const obj: ICars = {
        name: "",
        color: "",
        id: "",
      };
      if (createName.value !== "") {
        obj.name = createName.value;
        obj.color = createColor.value;

        await this.post(obj).finally(() => {});
        await this.pagination().finally(() => {});
        createName.value = "";
      }
    };
  }

  private deleteCar(): void {
    const btnRemoves = document.querySelectorAll(
      ".removeBtn"
    ) as unknown as HTMLButtonElement[];
    btnRemoves.forEach((e) => {
      e.onclick = async () => {
        const el = e.id.replace(/[^0-9]/g, "");
        await this.delete(el);
        await this.pagination();
        await this.deleteWinner(el);
        await this.win.paginationWin();
      };
    });
  }

  private updateCar(): void {
    const btnSelect = document.querySelectorAll(
      ".selectBtn"
    ) as unknown as HTMLButtonElement[];
    btnSelect.forEach((e) => {
      e.onclick = async () => {
        const id = e.id.replace(/[^0-9]/g, "");
        const el = (await this.getCar(id)) as unknown as ICars;
        const selectName = document.querySelector(
          "#name-select"
        ) as HTMLInputElement;
        const selectColor = document.querySelector(
          "#color-select"
        ) as HTMLInputElement;
        selectName.value = el.name;
        selectColor.value = el.color;
        const update = document.getElementById("update") as HTMLInputElement;
        update.onclick = async () => {
          el.name = selectName.value;
          el.color = selectColor.value;
          if (selectName.value !== "") {
            await this.put(el).finally(() => {});
            await this.pagination().finally(() => {});
            selectName.value = "";
          }
        };
      };
    });
  }

  private async startDriving(id: string): Promise<IWriteElement> {
    const el = await this.getCar(id);
    const obj = (await this.startDrive(el).finally(
      () => {}
    )) as unknown as IEngine;
    const time = Math.floor(+obj.distance / +obj.velocity);
    await this.animationDrive(time, id).finally(() => {});
    await this.race();
    return {
      id,
      time,
    };
  }

  private async startDrivingOneCar(): Promise<void> {
    const startBtn = document.querySelectorAll(
      ".startIcon"
    ) as unknown as HTMLButtonElement[];
    startBtn.forEach((e) => {
      e.onclick = async () => {
        e.disabled = true;
        const id = e.id.replace(/[^0-9]/g, "");
        const stopBtn = document.getElementById(
          `stop-${id}`
        ) as HTMLButtonElement;
        stopBtn.disabled = false;
        await this.startDriving(id).finally(() => {});
        const status = await this.engineDrive(id);
        if (!status.success) {
          const car = document.getElementById(`car-${id}`) as HTMLDivElement;
          if (car) {
            const carCoordinates = car ? car.getBoundingClientRect().left : 0;
            car.style.transform = `translateX(${carCoordinates}px)`;
            car.style.transition = "5s";
            window.cancelAnimationFrame(Number(id));
          }
        }
      };
    });
  }

  private async animationDrive(time: number, id: string): Promise<void> {
    const element = document.getElementById(`car-${id}`) as HTMLDivElement;
    function step() {
      element.style.transform = "translateX(103%)";
      element.style.transition = `${time}ms`;
    }
    window.requestAnimationFrame(step);
  }

  private async removeDriving(id: string): Promise<void> {
    const el = await this.getCar(id);
    await this.stopDrive(el).finally(() => {});
    const car = document.getElementById(`car-${id}`) as HTMLDivElement;
    car.style.transform = "translateX(0%)";
    car.style.transition = "0.1ms";
    window.cancelAnimationFrame(Number(id));
  }

  private async removeDrivingOneCar(): Promise<void> {
    const stopBtn = document.querySelectorAll(
      ".stopIcon"
    ) as unknown as HTMLButtonElement[];
    stopBtn.forEach((e) => {
      e.onclick = async () => {
        e.disabled = true;
        const id = e.id.replace(/[^0-9]/g, "");
        const startBtn = document.getElementById(
          `start-${id}`
        ) as HTMLButtonElement;
        startBtn.disabled = false;
        await this.removeDriving(id);
      };
    });
  }

  private async paginationNumberPage(count: number): Promise<void> {
    const pagination = document.querySelector(
      ".pagination"
    ) as HTMLUListElement;
    let paginationNumberOfPage = "";
    for (let i = 1; i <= count; i += 1) {
      paginationNumberOfPage += `<li>${i}</li>`;
    }
    pagination.innerHTML = paginationNumberOfPage;
  }

  private async showPage(li: Element): Promise<void> {
    const active = document.querySelector(
      ".pagination li.activeList"
    ) as HTMLLIElement;
    if (active) {
      active.classList.remove("activeList");
    }
    if (li) {
      li.classList.add("activeList");
    }
    const start = li ? (Number(li.innerHTML) - 1) * NotesOnPage.car : 0;
    const end = li
      ? (Number(li.innerHTML) - 1) * NotesOnPage.car + NotesOnPage.car
      : 0;
    this.notes = this.cars.slice(start, end);
    await this.buildCarTable(this.notes).finally(() => {});
    const raceBtn = document.getElementById("race") as HTMLInputElement;
    const resetRaceBtn = document.getElementById("reset") as HTMLInputElement;
    raceBtn.disabled = false;
    resetRaceBtn.disabled = true;
  }

  async pagination(): Promise<void> {
    await this.get();
    const countOfItem: number = Math.ceil(this.cars.length / NotesOnPage.car);
    await this.paginationNumberPage(countOfItem);
    const list = document.querySelectorAll(".pagination li");
    const arrowLeft = document.querySelector(
      "#pagination-prev"
    ) as HTMLButtonElement;
    const arrowRight = document.querySelector(
      "#pagination-next"
    ) as HTMLButtonElement;
    const disableBtn = () => {
      if (this.pageNumber === countOfItem - 1) {
        arrowRight.disabled = true;
      } else arrowRight.disabled = false;
      if (this.pageNumber === 0) {
        arrowLeft.disabled = true;
      } else arrowLeft.disabled = false;
    };
    if (!list[this.pageNumber]) {
      this.pageNumber -= 1;
    }
    disableBtn();
    arrowRight.onclick = async () => {
      this.pageNumber += 1;
      disableBtn();
      await this.showPage(list[this.pageNumber]).finally(() => {});
    };
    arrowLeft.onclick = async () => {
      this.pageNumber -= 1;
      disableBtn();
      await this.showPage(list[this.pageNumber]).finally(() => {});
    };
    this.showPage(list[this.pageNumber]).finally(() => {});
  }

  private async race(): Promise<void> {
    const raceBtn = document.getElementById("race") as HTMLInputElement;
    const resetRaceBtn = document.getElementById("reset") as HTMLInputElement;
    const carsOnPage = document.querySelectorAll(
      ".car"
    ) as unknown as HTMLDivElement[];
    raceBtn.onclick = async () => {
      raceBtn.disabled = true;
      resetRaceBtn.disabled = false;
      const startBtn = document.querySelectorAll(
        ".startIcon"
      ) as unknown as HTMLButtonElement[];
      const stopBtn = document.querySelectorAll(
        ".stopIcon"
      ) as unknown as HTMLButtonElement[];
      startBtn.forEach((e) => {
        e.disabled = true;
      });
      stopBtn.forEach((e) => {
        e.disabled = false;
      });
      const arr: IWriteArray[] = [];
      carsOnPage.forEach(async (e) => {
        const id = e.id.replace(/[^0-9]/g, "");
        const element = await this.startDriving(id).finally(() => {});
        const status = await this.engineDrive(id);
        if (!status.success) {
          const car = document.getElementById(`car-${id}`) as HTMLDivElement;
          if (car) {
            const carCoordinates = car ? car.getBoundingClientRect().left : 0;
            car.style.transform = `translateX(${carCoordinates}px)`;
            car.style.transition = "5s";
            window.cancelAnimationFrame(Number(id));
          }
        } else if (status.success && id) {
          this.win.writeWinner(id, element, arr).finally(() => {});
        }
      });
    };
  }

  private async resetRace(): Promise<void> {
    const raceBtn = document.getElementById("race") as HTMLInputElement;
    const resetRaceBtn = document.getElementById("reset") as HTMLInputElement;
    const carsOnPage = document.querySelectorAll(
      ".car"
    ) as unknown as HTMLDivElement[];
    resetRaceBtn.onclick = async () => {
      raceBtn.disabled = false;
      resetRaceBtn.disabled = true;
      const startBtn = document.querySelectorAll(
        ".startIcon"
      ) as unknown as HTMLButtonElement[];
      const stopBtn = document.querySelectorAll(
        ".stopIcon"
      ) as unknown as HTMLButtonElement[];
      startBtn.forEach((e) => {
        e.disabled = false;
      });
      stopBtn.forEach((e) => {
        e.disabled = true;
      });
      carsOnPage.forEach((e) => {
        const id = e.id.replace(/[^0-9]/g, "");
        this.removeDriving(id).finally(() => {});
      });
    };
  }

  private async generateRandomCars(): Promise<void> {
    const generateBtn = document.getElementById("generate") as HTMLInputElement;
    const randomCar = this.interfaceUser.randomCars();
    generateBtn.onclick = async () => {
      generateBtn.disabled = true;
      generateBtn.value = "await about 10 s...";
      await Promise.all(randomCar.map(async (r) => this.post(r)));
      await this.pagination().finally(() => {});
      generateBtn.disabled = false;
      generateBtn.value = "generate";
    };
  }
}
export default Garage;
