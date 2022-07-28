class Garage {
  baseUrl: string;

  garage: string;

  engine: string;

  winners: string;

  constructor() {
    this.baseUrl = "http://127.0.0.1:3000";
    this.garage = `${this.baseUrl}/garage`;
    this.engine = `${this.baseUrl}/engine`;
    this.winners = `${this.baseUrl}/winners`;
  }

  clickBtnGarage(): void {
    const btnGarage = document.querySelector(".btnGarage") as HTMLButtonElement;
    const garage = document.querySelector("#garage") as HTMLElement;
    const winners = document.querySelector("#winners") as HTMLElement;
    btnGarage.onclick = () => {
      garage.classList.remove("notActive");
      winners.classList.remove("active");
    };
  }

  createInput(): void {
    const garage = document.querySelector("#garage") as HTMLElement;

    garage.innerHTML += `<div class="create">
      <input type="text">
      <input type="color" value="#ffffff">
      <input type="submit" value="create">
    </div>
    <div class="update">  
      <input type="text">
      <input type="color" value="#ffffff">
      <input type="submit" value="update">
    </div>
    <div class="allBtn">  
      <input type="submit" value="race">
      <input type="submit" value="reset">
      <input type="submit" value="generate cars">
  </div>`;
  }

  buildCarTable(): void {
    const get = async () => {
      const response = await fetch(`${this.garage}`);
      const content = await response.text();
      const cars = JSON.parse(content) as { [key: string]: string }[];

      // eslint-disable-next-line no-restricted-syntax
      for (const car of cars) {
        console.log(car);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    get();
  }
}
export default Garage;
