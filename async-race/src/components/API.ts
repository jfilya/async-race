import { Link, StatusEngine } from "../types/enums";
import { ICars, IEngine, IWinner } from "../types/interface";

class API {
  protected cars: ICars[];

  protected winnersElements: IWinner[];

  constructor() {
    this.cars = [];
    this.winnersElements = [] as IWinner[];
  }

  protected async get(): Promise<void> {
    const response = await fetch(`${Link.garage}`);
    const content = await response.text();
    this.cars = JSON.parse(content) as ICars[];
  }

  protected async getCarStatus(id: string): Promise<boolean> {
    const response = await fetch(`${Link.garage}/${id}`);
    return response.ok;
  }

  protected async post(el: ICars): Promise<void> {
    await fetch(`${Link.garage}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(el),
    });
  }

  protected async delete(id: string): Promise<void> {
    await fetch(`${Link.garage}/${id}`, {
      method: "DELETE",
    });
  }

  protected async getCar(id: string): Promise<ICars> {
    const response = await fetch(`${Link.garage}/${id}`);
    const content = await response.text();
    const car = JSON.parse(content) as ICars;
    return car;
  }

  protected async put(el: ICars): Promise<void> {
    await fetch(`${Link.garage}/${el.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(el),
    });
  }

  protected async startDrive(el: ICars): Promise<IEngine> {
    const response = (
      await fetch(`${Link.engine}?id=${el.id}&${StatusEngine.start}`, {
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

  protected async stopDrive(el: ICars): Promise<IEngine> {
    const response = (
      await fetch(`${Link.engine}?id=${el.id}&${StatusEngine.stop}`, {
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

  protected async engineDrive(id: string): Promise<{ success: boolean }> {
    const response = await fetch(
      `${Link.engine}?id=${id}&${StatusEngine.drive}`,
      {
        method: "PATCH",
        // eslint-disable-next-line @typescript-eslint/comma-dangle
      }
    ).catch();
    if (response.ok) {
      const json = await response.text();
      const res = JSON.parse(json) as { success: boolean };
      return res;
    }
    return { success: false };
  }

  protected async createWinner(el: IWinner): Promise<void> {
    await fetch(`${Link.winners}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(el),
    });
  }

  protected async getWinners(): Promise<void> {
    const response = await fetch(`${Link.winners}`);
    const content = await response.text();
    this.winnersElements = JSON.parse(content) as IWinner[];
  }

  protected async getWinner(id: string): Promise<IWinner> {
    const response = await fetch(`${Link.winners}/${id}`);
    const content = await response.text();
    const win = JSON.parse(content) as IWinner;
    return win;
  }

  protected async getWinnerStatus(id: string): Promise<boolean> {
    const response = await fetch(`${Link.winners}/${id}`);
    return response.ok;
  }

  protected async changeWinner(el: IWinner): Promise<void> {
    await fetch(`${Link.winners}/${el.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(el),
    });
  }

  protected async deleteWinner(id: string): Promise<void> {
    await fetch(`${Link.winners}/${id}`, {
      method: "DELETE",
    });
  }
}
export default API;
