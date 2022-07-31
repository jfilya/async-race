/* eslint-disable @typescript-eslint/comma-dangle */
import { IWinner } from "../../types/interface";
import API from "../API";
import Garage from "../garage/garage";

class Winners extends API {
  gar: Garage;

  constructor() {
    super();
    this.gar = new Garage();
  }

  async winnerCar(): Promise<void> {
    const win = (await this.getWinner().finally(
      () => {}
    )) as unknown as IWinner[];
    console.log(win[win.length - 1]);
  }
}

export default Winners;
