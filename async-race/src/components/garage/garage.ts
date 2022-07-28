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
        this.renderCar(car.id, car.name, car.color);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    get();
  }

  createColorImg(color: string): string {
    return `<svg width="92" height="40" viewBox="0 0 92 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M45.9998 0.416748H25.1665L12.6665 10.8334H8.49984C3.87484 10.8334 0.166504 14.5417 0.166504 19.1667V31.6667H9.20817C10.9998 36.6667 15.7082 40.0001 20.9998 40.0001C26.2915 40.0001 30.9998 36.6667 32.7498 31.6667H59.2082C60.9998 36.6667 65.7082 40.0001 70.9998 40.0001C76.2915 40.0001 80.9998 36.6667 82.7498 31.6667H91.8332V27.5001C91.8332 22.8751 87.5415 21.3751 83.4998 19.1667L45.9998 0.416748ZM17.8748 15.0001L27.2498 6.66675H43.9165L60.5832 15.0001H17.8748ZM20.9998 21.2501C22.6574 21.2501 24.2472 21.9086 25.4193 23.0807C26.5914 24.2528 27.2498 25.8425 27.2498 27.5001C27.2498 29.1577 26.5914 30.7474 25.4193 31.9195C24.2472 33.0916 22.6574 33.7501 20.9998 33.7501C19.3422 33.7501 17.7525 33.0916 16.5804 31.9195C15.4083 30.7474 14.7498 29.1577 14.7498 27.5001C14.7498 25.8425 15.4083 24.2528 16.5804 23.0807C17.7525 21.9086 19.3422 21.2501 20.9998 21.2501V21.2501ZM70.9998 21.2501C72.6574 21.2501 74.2471 21.9086 75.4192 23.0807C76.5914 24.2528 77.2498 25.8425 77.2498 27.5001C77.2498 29.1577 76.5914 30.7474 75.4192 31.9195C74.2471 33.0916 72.6574 33.7501 70.9998 33.7501C69.3422 33.7501 67.7525 33.0916 66.5804 31.9195C65.4083 30.7474 64.7498 29.1577 64.7498 27.5001C64.7498 25.8425 65.4083 24.2528 66.5804 23.0807C67.7525 21.9086 69.3422 21.2501 70.9998 21.2501Z" fill="${color}"/>
    </svg>`;
  }

  renderCar(id: string, name: string, color: string): void {
    const garage = document.querySelector("#garage") as HTMLElement;

    garage.innerHTML += `<div class="generalBtn">
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
    `;
  }
}
export default Garage;
