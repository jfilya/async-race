/* eslint-disable @typescript-eslint/comma-dangle */
import { ICars, IEngine } from "../../types/interface";
import API from "../API";
import UserInterface from "../user-interface";

class Garage extends API {
  notes: Array<ICars>;

  pageNumber: number;

  interfaceUser: UserInterface;

  constructor() {
    super();
    this.interfaceUser = new UserInterface();
    this.notes = [];
    this.pageNumber = 0;
  }

  async buildCarTable(array: ICars[]): Promise<void> {
    await this.get();
    const sTitle = document.querySelector(".amountItems") as HTMLSpanElement;
    sTitle.innerHTML = `(${this.cars.length})`;
    const cars = document.querySelector(".carsTable") as HTMLDivElement;
    cars.innerHTML = "";
    array.forEach((car) => {
      this.interfaceUser.renderCar(car);
    });
    this.getCars();
    this.deleteCar();
    this.updateCar();
    this.startDrivingOneCar().finally(() => {});
    this.removeDriving().finally(() => {});
  }

  getCars(): void {
    (document.getElementById("create") as HTMLInputElement).onclick = () => {
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

        this.post(obj).finally(() => {});
        this.pagination().finally(() => {});

        createName.value = "";
      }
    };
  }

  deleteCar(): void {
    const btnRemoves = document.querySelectorAll(
      ".removeBtn"
    ) as unknown as HTMLButtonElement[];
    btnRemoves.forEach((e) => {
      e.onclick = async () => {
        const el = e.id.replace(/[^0-9]/g, "");
        await this.delete(el);
        await this.pagination();
      };
    });
  }

  updateCar(): void {
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

  async startDriving(id: string): Promise<void> {
    const el = await this.getCar(id);
    const obj = (await this.startDrive(el).finally(
      () => {}
    )) as unknown as IEngine;
    const time = Math.floor(+obj.distance / +obj.velocity);
    this.animationDrive(time, id).finally(() => {});
  }

  async startDrivingOneCar(): Promise<void> {
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
        this.startDriving(id).finally(() => {});
      };
    });
  }

  async animationDrive(time: number, id: string): Promise<void> {
    const element = document.getElementById(`car-${id}`) as HTMLDivElement;
    function step() {
      element.style.transform = "translateX(103%)";
      element.style.transition = `${time}ms`;
    }
    window.requestAnimationFrame(step);
  }

  async removeDriving(): Promise<void> {
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
        const el = await this.getCar(id);
        await this.stopDrive(el).finally(() => {});
        const car = document.getElementById(`car-${id}`) as HTMLDivElement;
        car.style.transform = "translateX(0%)";
        car.style.transition = "0.1ms";
        window.cancelAnimationFrame(Number(id));
      };
    });
  }

  async paginationNumberPage(count: number): Promise<void> {
    const pagination = document.querySelector(
      ".pagination"
    ) as HTMLUListElement;
    let paginationNumberOfPage = "";
    for (let i = 1; i <= count; i += 1) {
      paginationNumberOfPage += `<li>${i}</li>`;
    }
    pagination.innerHTML = paginationNumberOfPage;
  }

  async showPage(li: Element): Promise<void> {
    const active = document.querySelector(
      ".pagination li.active"
    ) as HTMLLIElement;
    if (active) {
      active.classList.remove("active");
    }
    li.classList.add("active");
    const start = (Number(li.innerHTML) - 1) * 7;
    const end = (Number(li.innerHTML) - 1) * 7 + 7;
    this.notes = this.cars.slice(start, end);
    await this.buildCarTable(this.notes).finally(() => {});
  }

  async pagination(): Promise<void> {
    await this.get();
    const countOfItem: number = Math.ceil(this.cars.length / 7);
    await this.paginationNumberPage(countOfItem);
    const list = document.querySelectorAll(".pagination li");
    const arrowLeft = document.querySelector(
      "#pagination-prev"
    ) as HTMLButtonElement;
    const arrowRight = document.querySelector(
      "#pagination-next"
    ) as HTMLButtonElement;
    const disableBtn = () => {
      if (this.pageNumber === countOfItem - 1) arrowRight.disabled = true;
      if (this.pageNumber < countOfItem - 1) arrowRight.disabled = false;
      if (this.pageNumber === 0) arrowLeft.disabled = true;
      if (this.pageNumber > 0) arrowLeft.disabled = false;
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

  async race(): Promise<void> {
    await this.get();
    await this.pagination();
    const raceBtn = document.getElementById("race") as HTMLInputElement;
    const carsOnPage = document.querySelectorAll(
      ".car"
    ) as unknown as HTMLDivElement[];
    raceBtn.onclick = async () => {
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
      carsOnPage.forEach((e) => {
        const id = e.id.replace(/[^0-9]/g, "");
        this.startDriving(id).finally(() => {});
      });
    };
  }
}
export default Garage;
