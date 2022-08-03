import { ICars, IEngine, IWinner } from "../types/interface";

class API {
  baseUrl: string;

  garage: string;

  engine: string;

  winners: string;

  cars: ICars[];

  winnersElements: IWinner[];

  constructor() {
    this.baseUrl = "http://127.0.0.1:3000";
    this.garage = `${this.baseUrl}/garage`;
    this.engine = `${this.baseUrl}/engine`;
    this.winners = `${this.baseUrl}/winners`;
    this.cars = [];
    this.winnersElements = [] as IWinner[];
  }

  async get(): Promise<void> {
    const response = await fetch(`${this.garage}`);
    const content = await response.text();
    this.cars = JSON.parse(content) as ICars[];
  }

  async getCarStatus(id: string): Promise<boolean> {
    const response = await fetch(`${this.garage}/${id}`);
    return response.ok;
  }

  async post(el: ICars): Promise<void> {
    await fetch(`${this.garage}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(el),
    });
  }

  async delete(id: string): Promise<void> {
    await fetch(`${this.garage}/${id}`, {
      method: "DELETE",
    });
  }

  async getCar(id: string): Promise<ICars> {
    const response = await fetch(`${this.garage}/${id}`);
    const content = await response.text();
    const car = JSON.parse(content) as ICars;
    return car;
  }

  async put(el: ICars): Promise<void> {
    await fetch(`${this.garage}/${el.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(el),
    });
  }

  async startDrive(el: ICars): Promise<IEngine> {
    const response = (
      await fetch(`${this.engine}?id=${el.id}&status=started`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(el),
      })
    ).text();
    const content = JSON.parse(await response) as Promise<string>;
    return content as unknown as IEngine;
  }

  async stopDrive(el: ICars): Promise<IEngine> {
    const response = (
      await fetch(`${this.engine}?id=${el.id}&status=stopped`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(el),
      })
    ).text();
    const content = JSON.parse(await response) as Promise<string>;
    return content as unknown as IEngine;
  }

  async createWinner(el: IWinner): Promise<void> {
    await fetch(`${this.winners}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(el),
    });
  }

  async getWinners(): Promise<void> {
    const response = await fetch(`${this.winners}`);
    const content = await response.text();
    this.winnersElements = JSON.parse(content) as IWinner[];
  }

  async getWinner(id: string): Promise<IWinner> {
    const response = await fetch(`${this.winners}/${id}`);
    const content = await response.text();
    const win = JSON.parse(content) as IWinner;
    return win;
  }

  async getWinnerStatus(id: string): Promise<boolean> {
    const response = await fetch(`${this.winners}/${id}`);
    return response.ok;
  }

  async changeWinner(el: IWinner): Promise<void> {
    await fetch(`${this.winners}/${el.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(el),
    });
  }

  async deleteWinner(id: string): Promise<void> {
    await fetch(`${this.winners}/${id}`, {
      method: "DELETE",
    });
  }
}
export default API;
