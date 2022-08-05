import { ICars, INav, IWinner } from "../types/interface";

class UserInterface implements INav {
  garage: HTMLElement;

  winners: HTMLElement;

  body: HTMLElement;

  btnWinners: HTMLButtonElement;

  btnGarage: HTMLButtonElement;

  nav: HTMLElement;

  main: HTMLElement;

  constructor() {
    this.body = document.body;
    this.winners = document.createElement("section");
    this.garage = document.createElement("section");
    this.btnWinners = document.createElement("button");
    this.btnGarage = document.createElement("button");
    this.nav = document.createElement("nav");
    this.main = document.createElement("main");
  }

  createNav(): void {
    this.body.append(this.nav);
    this.body.append(this.main);
    this.nav.className = "nav";
    this.btnGarage.className = "btnGarage";
    this.btnWinners.className = "btnWinners";
    this.btnGarage.innerHTML = "Garage";
    this.btnWinners.innerHTML = "Winners";
    this.nav.append(this.btnGarage);
    this.nav.append(this.btnWinners);
  }

  createGarage(): void {
    this.main.append(this.garage);
    this.garage.id = "garage";
    const inputs = document.createElement("div");
    inputs.className = "inputs";
    this.garage.append(inputs);
    this.garage.innerHTML += `<h2>garage <span class='amountItems'><span></h2>
    <div class="listPagination">
      Page № 
      <ul class="pagination"></ul>
    </div>
    <br>
    `;
    const cars = document.createElement("div");
    cars.className = "carsTable";
    this.garage.append(cars);
    const buttonPrevNext = `<div class="buttonPrevNext">
      <button class="btnPagination" id="pagination-prev">🢀</button>
      <button class="btnPagination" id="pagination-next">🢂</button>
    </div>
    `;
    this.garage.innerHTML += buttonPrevNext;
  }

  createWinners(): void {
    this.main.append(this.winners);
    this.winners.id = "winners";
    this.winners.innerHTML = "<h2>winners</h2>";
  }

  createInput(): void {
    const inputs = document.querySelector(".inputs") as HTMLDivElement;
    inputs.innerHTML = `<div class="create">
      <input type="text" id="name">
      <input type="color" id="color" value="#ffffff">
      <input type="submit" value="create" id="create">
    </div>
    <div class="update">  
      <input type="text" id="name-select">
      <input type="color" id="color-select" value="#ffffff">
      <input type="submit" value="update" id="update">
    </div>
    <div class="allBtn">  
      <input type="submit" value="race" id="race">
      <input type="submit" value="reset" id="reset" disabled>
      <input type="submit" value="generate cars" id="generate">
  </div>
  <p class="additional">При генерации 100 новых машин, может быть задержка около 10 секунд, пожалуйста подождте=)</p>`;
  }

  clickBtn(): void {
    const btnGarage = document.querySelector(".btnGarage") as HTMLButtonElement;
    const garage = document.querySelector("#garage") as HTMLElement;
    const winners = document.querySelector("#winners") as HTMLElement;
    btnGarage.onclick = () => {
      garage.classList.remove("notActive");
      winners.classList.remove("active");
    };
    const btnWin = document.querySelector(".btnWinners") as HTMLButtonElement;
    btnWin.onclick = () => {
      garage.classList.add("notActive");
      winners.classList.add("active");
    };
    window.onclick = () => {
      (
        document.querySelector(".showWinner") as HTMLParagraphElement
      ).style.visibility = "hidden";
      (
        document.querySelector(".showWinner") as HTMLParagraphElement
      ).innerHTML = "";
    };
  }

  createColorImg(color: string): string {
    return `<svg width="68" height="34" viewBox="0 0 68 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_127_14)">
    <path d="M32.0344 6.7257C34.0319 6.90101 34.9669 7.06039 36.38 7.47476L37.0334 7.66601L36.6881 8.01664C36.4969 8.2132 36.3375 8.39383 36.3375 8.4257C36.3375 8.45226 36.7625 8.7232 37.2778 9.02601C40.2156 10.742 42.8825 12.4685 43.6953 13.1804L43.9822 13.4301L44.4975 13.4673C45.6716 13.5576 46.8616 13.3291 47.5362 12.8776L47.8284 12.6863L49.1884 12.8245C53.0559 13.2335 56.2753 13.7063 57.8478 14.1101C58.2356 14.211 58.6819 14.2907 58.8306 14.2907C59.7391 14.2907 61.1362 14.9229 62.2519 15.842C62.56 16.097 62.7141 16.182 63.0222 16.267C63.9572 16.5326 65.0409 17.032 65.8537 17.5738C66.4116 17.951 67.1553 18.5885 67.4422 18.9391L67.6441 19.1835L67.5803 20.3523C67.5431 20.9951 67.4953 21.7282 67.4687 21.9832C67.4316 22.3232 67.4369 22.4666 67.4847 22.5304C67.5219 22.5782 67.6494 22.7641 67.7716 22.9395L68 23.2635L67.6919 23.4016C66.1141 24.1295 63.4206 24.6395 60.6581 24.7404L59.7178 24.7723L59.7019 24.2729L59.6859 23.7735L59.4362 23.7363C59.0591 23.6726 58.9422 23.7416 58.7616 24.1454C58.2462 25.2823 57.0244 26.4298 55.8291 26.8973C54.4691 27.4338 52.9072 27.4285 51.595 26.8866C50.4687 26.4191 49.3744 25.3938 48.8112 24.2835C48.6997 24.0604 48.5828 23.8479 48.5509 23.8107C48.5137 23.7629 48.3703 23.747 48.0887 23.7576L47.6797 23.7735L47.6903 24.1295L47.7009 24.4801L47.3716 24.512C46.8669 24.5545 21.42 24.666 21.3562 24.6235C21.3191 24.6023 21.3031 24.4748 21.3084 24.3101C21.3191 24.1613 21.3084 24.0073 21.2872 23.9701C21.2606 23.9276 21.1012 23.9063 20.825 23.9063H20.4053L20.1875 24.3154C19.4756 25.686 18.1581 26.7485 16.7131 27.1204C15.8312 27.3435 14.7103 27.3541 13.8656 27.1416C13.3078 27.0035 12.4578 26.6051 12.0275 26.281C11.3741 25.7816 10.7525 25.0485 10.3434 24.2782L10.1734 23.9541L9.49343 23.9223C8.73374 23.8904 8.65937 23.917 8.65937 24.2038C8.65937 24.3685 8.64874 24.3791 8.51062 24.3579C8.43093 24.342 7.66062 24.2357 6.79999 24.1188C2.94312 23.5929 2.03468 23.4495 1.84874 23.3326C1.62562 23.1945 0.398431 21.8823 0.281556 21.6591C0.132806 21.367 0.111556 21.1545 0.196556 20.8304C0.318743 20.3841 0.292181 19.5607 0.132806 18.4876C-0.0318817 17.441 -0.0212567 17.0426 0.154056 16.6813C0.228431 16.5273 0.552493 16.1713 1.03593 15.6985C1.69999 15.0557 1.82218 14.907 1.96562 14.5935C2.05062 14.397 2.13562 14.2376 2.14624 14.2376C2.15687 14.2376 2.72531 14.0941 3.40531 13.9188L4.64843 13.6054V13.3345V13.0688H4.96718C5.14249 13.0688 5.45062 13.0529 5.64718 13.0316L6.00843 12.9998L5.99781 12.7182C5.98718 12.5588 5.99249 12.4207 6.00843 12.4101C6.01906 12.3995 6.28999 12.4207 6.61406 12.4632C6.93281 12.5004 7.23031 12.5323 7.26749 12.5376C7.32062 12.5376 7.33656 12.442 7.32593 12.1498C7.32062 11.9426 7.33124 11.7566 7.35249 11.746C7.37374 11.7354 7.62343 11.7673 7.91031 11.8204L8.43093 11.916L9.56781 11.5176C14.2428 9.8707 20.0866 8.20258 23.7575 7.46945C26.3075 6.95414 28.0925 6.75226 30.2812 6.7257C31.1153 6.71508 31.9016 6.71508 32.0344 6.7257ZM28.9531 8.28758C27.4284 8.37789 25.4894 8.61164 25.3512 8.72851C25.3087 8.76039 25.2928 8.83476 25.3141 8.91976C25.3725 9.15351 26.6209 13.1432 26.6475 13.1698C26.6687 13.191 36.7519 13.5416 37.5169 13.547H37.9791L38.0109 13.3451C38.1703 12.3835 38.675 11.7407 39.27 11.7407C40.0137 11.7407 40.9912 12.3729 41.6872 13.3079C41.9475 13.6585 42.0166 13.6957 42.4575 13.701C42.7816 13.7063 42.8719 13.6479 42.755 13.5098C42.6381 13.3663 38.1703 10.4126 37.4425 9.9982C35.3759 8.81351 34.1062 8.44695 31.5828 8.29289C30.515 8.22914 30.005 8.22914 28.9531 8.28758ZM22.5569 9.30226C19.9962 9.94508 17.9137 10.6251 16.7237 11.2095C15.5125 11.7991 15.3425 12.1498 16.1128 12.4313C16.4262 12.5429 21.2181 12.9201 23.2794 12.9998C24.1453 13.0316 24.225 13.0263 24.2569 12.9413C24.2941 12.8457 24.0284 9.24383 23.9753 9.1057C23.9275 8.98351 23.6725 9.0207 22.5569 9.30226ZM26.0897 13.3716C25.9675 13.5151 25.7709 13.8285 25.6487 14.0729L25.4203 14.5191V15.1088C25.4256 16.1341 25.7391 17.1329 26.5572 18.732C27.0991 19.7838 27.3859 20.2035 27.9916 20.841C28.6397 21.5104 29.1922 21.9248 29.9306 22.286C30.8656 22.7482 31.1153 22.796 32.8578 22.8491C34.9244 22.9076 43.3978 23.0829 44.4656 23.0829H45.3422L45.3794 22.7641C45.4272 22.3976 45.6609 19.3057 45.7512 17.8607C45.8469 16.3732 45.7141 15.656 45.1722 14.7635C44.7366 14.041 44.1416 13.4301 44.0087 13.5629C43.9875 13.5841 44.1256 13.7595 44.3169 13.9613C45.1934 14.8645 45.6184 15.9641 45.5706 17.1754C45.5122 18.4929 45.1456 22.711 45.0819 22.7801C45.0234 22.8385 44.3328 22.8385 41.1134 22.7695C38.9672 22.7216 36.1144 22.6738 34.7703 22.6579C32.2469 22.6207 31.5987 22.5835 31.0516 22.4454C29.7022 22.0895 28.2891 21.0535 27.4709 19.8157C26.9131 18.971 25.9622 16.931 25.7603 16.1554C25.6434 15.6879 25.6275 14.9229 25.7337 14.5298C25.8347 14.1473 26.01 13.8338 26.2756 13.547C26.4031 13.4088 26.5094 13.2601 26.5094 13.207C26.5094 13.0423 26.3075 13.122 26.0897 13.3716ZM58.5491 14.4182C58.4959 14.482 58.5491 14.567 58.82 14.8857C59.5425 15.7091 60.6741 16.5538 61.7578 17.0798C62.6662 17.5154 63.6756 17.797 63.7766 17.6429C63.835 17.542 63.5534 17.1807 63.0434 16.7132C61.795 15.571 60.4616 14.7954 59.1547 14.4501C58.6978 14.3279 58.6287 14.3226 58.5491 14.4182ZM1.80624 15.4116C1.67874 15.6826 1.57781 15.9748 1.57249 16.0863L1.56718 16.2829L2.20468 16.3148C2.55531 16.336 3.63374 16.352 4.59531 16.3573C6.51312 16.3626 6.60874 16.352 7.35249 16.0438C7.84124 15.8366 8.10156 15.6773 8.04312 15.6188C8.01656 15.5923 7.23031 15.486 6.29531 15.3798C5.36031 15.2682 4.12781 15.1301 3.55937 15.061C2.99093 14.9973 2.41187 14.9388 2.27906 14.9335L2.03468 14.9282L1.80624 15.4116ZM53.3534 17.2126C52.5991 17.3135 51.9562 17.5632 51.2284 18.0413C50.6653 18.4079 50.2934 18.7798 49.9641 19.3057C48.79 21.1916 49.0928 23.3751 50.7609 25.0538C51.1753 25.4735 51.7862 25.8188 52.4875 26.042C53.0453 26.212 54.2725 26.2173 54.8887 26.0473C55.8875 25.7657 56.4187 25.4576 57.0244 24.8041C58.4269 23.2848 58.65 21.351 57.6512 19.4173C57.2209 18.5885 56.1319 17.7226 55.0906 17.3773C54.4744 17.1754 53.9856 17.1329 53.3534 17.2126ZM14.6572 17.2126C12.3781 17.542 10.6569 19.6563 10.8003 21.9407C10.9384 24.0816 12.3462 25.7285 14.4234 26.1641C15.0184 26.2916 15.9694 26.2916 16.4156 26.1641C18.2059 25.6648 19.6562 23.9541 19.7997 22.1691C19.8687 21.3351 19.5925 20.1876 19.1409 19.4013C18.4503 18.2113 17.3612 17.4835 15.895 17.2391C15.385 17.1541 15.1034 17.1488 14.6572 17.2126ZM65.3862 19.2366C64.8072 19.3588 64.3397 19.7095 64.09 20.1982C64.0209 20.3363 63.9625 20.4745 63.9625 20.5063C63.9625 20.5382 64.2547 20.5595 64.7859 20.5595H65.6094V20.7188V20.8835L66.2841 20.8676L66.9587 20.8516L67.0012 20.6391C67.0278 20.5223 67.1075 20.3735 67.1766 20.3045C67.4209 20.076 67.3147 19.6191 66.9747 19.4173C66.5869 19.1888 65.96 19.1145 65.3862 19.2366ZM65.6041 21.1279C65.5722 21.1598 65.5403 21.3298 65.535 21.4998L65.5297 21.8079L66.1247 21.8238C66.7994 21.8398 66.7887 21.8451 66.8578 21.3882C66.8844 21.197 66.8737 21.1173 66.8206 21.0801C66.7197 21.011 65.6784 21.0535 65.6041 21.1279ZM65.6094 22.047C65.6094 22.1479 65.7687 22.4932 65.8644 22.5941C65.9812 22.7216 66.3159 22.897 66.4487 22.897C66.5337 22.897 66.5656 22.8279 66.6347 22.4826C66.6772 22.2595 66.7037 22.0576 66.6878 22.031C66.6506 21.9726 65.6094 21.9832 65.6094 22.047Z" fill="${color}"/>
    <path d="M54.6073 17.6111C56.5091 18.0254 57.5823 19.1942 57.8798 21.1811C57.9754 21.8186 57.9754 22.1692 57.8851 22.6845C57.6141 24.1773 56.5569 25.2398 54.8516 25.7445C54.4479 25.8667 54.2726 25.8879 53.736 25.8879C52.9604 25.8879 52.4769 25.7711 51.7438 25.4151C51.3135 25.2026 51.1701 25.0964 50.761 24.682C50.4954 24.4164 50.2032 24.0604 50.1023 23.8958C49.7198 23.237 49.4701 22.2223 49.5338 21.5636C49.6613 20.2992 50.2298 19.1623 51.0798 18.4717C51.4994 18.1317 52.2432 17.7758 52.8063 17.6376C53.3376 17.5154 54.0919 17.5048 54.6073 17.6111Z" fill="${color}"/>
    <path d="M16.0384 17.611C17.0159 17.8342 17.6162 18.1476 18.2271 18.7532C18.6149 19.141 18.7212 19.2845 18.9602 19.7626C19.3268 20.5064 19.4649 21.1439 19.4277 21.9673C19.4118 22.456 19.3746 22.626 19.2365 23.0085C18.9709 23.7204 18.6415 24.2464 18.1209 24.7617C17.4249 25.4523 16.7237 25.7657 15.6452 25.8667C13.5043 26.0739 11.7299 24.8945 11.204 22.9235C11.119 22.5942 11.0924 22.3339 11.0871 21.7814C11.0818 20.9154 11.1668 20.5276 11.5015 19.8423C12.0168 18.7798 12.8296 18.0892 14.0249 17.6907C14.4765 17.5367 15.5337 17.4942 16.0384 17.611Z" fill="${color}"/>
    <path d="M37.3735 7.80411C37.8675 8.0113 40.29 9.17474 44.7313 11.3529C45.7406 11.8469 46.7766 12.3463 47.0316 12.4579L47.5044 12.6704L47.2388 12.7926C46.6438 13.0635 45.321 13.2707 44.5878 13.2122C44.2585 13.1857 44.2372 13.1751 42.7072 12.1657C40.6247 10.7951 38.7122 9.57318 37.7453 9.00474C37.3044 8.74974 36.9166 8.50536 36.8741 8.46818C36.8103 8.40974 36.8316 8.3513 37.0069 8.08036C37.1185 7.89974 37.2247 7.7563 37.2406 7.76161C37.2566 7.76161 37.315 7.78286 37.3735 7.80411Z" fill="${color}"/>
    </g>
    <defs>
    <clipPath id="clip0_127_14">
    <rect width="68" height="34" fill="white" transform="matrix(-1 0 0 1 68 0)"/>
    </clipPath>
    </defs>
    </svg>`;
  }

  renderCar(car: ICars): void {
    const cars = document.querySelector(".carsTable") as HTMLDivElement;
    cars.innerHTML += `<div class="carItem">
    <div class="generalBtn">
      <button class="btn selectBtn" id="select-${car.id}">Select</button>
      <button class="btn removeBtn" id="remove-${car.id}">Remove</button>
      <span class="carName" id="carName-${car.id}">${car.name}</span>
    </div>
    <div class="road">
      <div class="launch">
        <div class="control">
          <button class="icon startIcon" id="start-${car.id}">A</button>
          <button class="icon stopIcon" id="stop-${car.id}" disabled>B</button>
        </div>
        <div class="car" id="car-${car.id}">
          ${this.createColorImg(car.color)}
        </div> 
      </div>
      <div class="flag" id="flag${car.id}">🏲</div>
    </div>
    </div>         
    `;
  }

  showWinner(): void {
    this.garage.innerHTML += `
    <p class="showWinner"><p>`;
  }

  buildWinnersTableHeader(): void {
    this.winners.innerHTML += `
    <div class="listPaginationWinners">
    Page № 
    <ul class="paginationWinners"></ul>
    </div>
    <table class="table">
      <thead class="thead">
        <tr>
            <th>Number</th>
            <th>Car</th>
            <th>Name</th>
            <th class="wins-sort">Wins <span class="wins-sort-arrow"> </span></th>
            <th class="time-sort">Best time <span class="time-sort-arrow"> </span></th>
        </tr>
      </thead>
      <tbody class="tbody">
      </tbody>
    </table>
    <div class="buttonPrevNext">
    <button class="btnPagination" id="paginationWinners-prev">🢀</button>
    <button class="btnPagination" id="paginationWinners-next">🢂</button>
  </div>`;
  }

  buildWinnersTable(winner: IWinner, car: ICars, count: number): void {
    (document.querySelector(".tbody") as HTMLTableSectionElement).innerHTML += `
        <tr>
            <td>${count}</td>
            <td>${this.createColorImg(car.color)}</td>
            <td>${car.name}</td>
            <td>${winner.wins}</td>
            <td>${winner.time / 1000}</td>
        </tr>`;
  }

  randomNameCars(): string {
    const makes = [
      "Audi",
      "Alfa Romeo",
      "Aston Martin",
      "BMW",
      "Bentley",
      "Bugatti",
      "DS",
      "Ferrari",
      "Fiat",
      "Ford",
      "Nissan",
      "Renault",
      "Jaguar",
      "Mazda",
    ];
    const models = [
      "model 5",
      "CSX",
      "X7",
      "L200",
      "Carisma",
      "Prelude",
      "Lachetti",
      "780",
      "900",
      "Y654",
      "M0",
      "Logan",
      "NPM",
      "AMG",
    ];
    const make = makes[Math.floor(Math.random() * makes.length)];
    const model = models[Math.floor(Math.random() * models.length)];
    return `${make} ${model}`;
  }

  randomColor(): string {
    const simbols = "123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6; i += 1) {
      color += simbols[Math.floor(Math.random() * simbols.length)];
    }
    return color;
  }

  randomCars(): ICars[] {
    const randomCar = new Array(100).fill(1).map(() => ({
      name: this.randomNameCars(),
      color: this.randomColor(),
      id: "",
    }));
    return randomCar;
  }
}

export default UserInterface;
