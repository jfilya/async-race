class Garage {
  baseUrl: string;

  garage: string;

  engine: string;

  winners: string;

  cars: { [key: string]: string }[];

  constructor() {
    this.baseUrl = "http://127.0.0.1:3000";
    this.garage = `${this.baseUrl}/garage`;
    this.engine = `${this.baseUrl}/engine`;
    this.winners = `${this.baseUrl}/winners`;
    this.cars = [];
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
    const inputs = document.querySelector(".inputs") as HTMLDivElement;
    inputs.innerHTML = `<div class="create">
      <input type="text" id="name">
      <input type="color" id="color" value="#ffffff">
      <input type="submit" value="create" id="create">
    </div>
    <div class="update">  
      <input type="text" id="name">
      <input type="color" id="color" value="#ffffff">
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
      this.cars = JSON.parse(content) as { [key: string]: string }[];
      const sTitle = document.querySelector(".amountItems") as HTMLSpanElement;
      sTitle.innerHTML = `(${this.cars.length})`;
      const cars = document.querySelector(".carsTable") as HTMLDivElement;
      cars.innerHTML = "";
      // eslint-disable-next-line no-restricted-syntax
      for (const car of this.cars) {
        this.renderCar(car.id, car.name, car.color);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    get();
  }

  createColorImg(color: string): string {
    return `<svg width="66" height="29" viewBox="0 0 66 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32.9998 0.791748H18.4165L9.6665 8.08341H6.74984C3.51234 8.08341 0.916504 10.6792 0.916504 13.9167V22.6667H7.24567C8.49984 26.1667 11.7957 28.5001 15.4998 28.5001C19.204 28.5001 22.4998 26.1667 23.7248 22.6667H42.2457C43.4998 26.1667 46.7957 28.5001 50.4998 28.5001C54.204 28.5001 57.4998 26.1667 58.7248 22.6667H65.0832V19.7501C65.0832 16.5126 62.079 15.4626 59.2498 13.9167L32.9998 0.791748ZM13.3123 11.0001L19.8748 5.16675H31.5415L43.2082 11.0001H13.3123ZM15.4998 15.3751C16.6602 15.3751 17.773 15.836 18.5934 16.6565C19.4139 17.477 19.8748 18.5898 19.8748 19.7501C19.8748 20.9104 19.4139 22.0232 18.5934 22.8437C17.773 23.6641 16.6602 24.1251 15.4998 24.1251C14.3395 24.1251 13.2267 23.6641 12.4062 22.8437C11.5858 22.0232 11.1248 20.9104 11.1248 19.7501C11.1248 18.5898 11.5858 17.477 12.4062 16.6565C13.2267 15.836 14.3395 15.3751 15.4998 15.3751V15.3751ZM50.4998 15.3751C51.6602 15.3751 52.773 15.836 53.5934 16.6565C54.4139 17.477 54.8748 18.5898 54.8748 19.7501C54.8748 20.9104 54.4139 22.0232 53.5934 22.8437C52.773 23.6641 51.6602 24.1251 50.4998 24.1251C49.3395 24.1251 48.2267 23.6641 47.4062 22.8437C46.5858 22.0232 46.1248 20.9104 46.1248 19.7501C46.1248 18.5898 46.5858 17.477 47.4062 16.6565C48.2267 15.836 49.3395 15.3751 50.4998 15.3751Z" fill="${color}"/>
    </svg>`;
  }

  renderCar(id: string, name: string, color: string): void {
    const cars = document.querySelector(".carsTable") as HTMLDivElement;
    cars.innerHTML += `<div class="carItem">
    <div class="generalBtn">
      <button class="btn selectBtn" id="${id}Select">Select</button>
      <button class="btn removeBtn" id="${id}Remove">Remove</button>
      <span class="carName">${name}</span>
    </div>
    <div class="road">
      <div class="launch">
        <div class="control">
          <button class="icon startIcon" id="${id}Start">A</button>
          <button class="icon stopIcon" id="${id}Stop">B</button>
        </div>
        <div class="car" id="${id}-car">
          ${this.createColorImg(color)}
        </div> 
      </div>
      <div class="flag" id="${id}flag">🏲</div>
    </div>
    </div>         
    `;
  }

  post = async (el: { name: string; color: string }) => {
    await fetch(`${this.garage}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(el),
    });
  };

  getArr() {
    (document.getElementById("create") as HTMLInputElement).onclick = () => {
      const createName = document.querySelector("#name") as HTMLInputElement;
      const createColor = document.querySelector("#color") as HTMLInputElement;
      const obj: { name: string; color: string } = {
        name: "",
        color: "",
      };
      obj.name = createName.value;
      obj.color = createColor.value;

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.post(obj);
      this.buildCarTable();
    };
  }
}
export default Garage;
