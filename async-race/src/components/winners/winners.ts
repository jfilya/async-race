/* eslint-disable @typescript-eslint/comma-dangle */
class Winners {
  // constructor() {}

  clickBtnWinners(): void {
    const btnWinners = document.querySelector(
      ".btnWinners"
    ) as HTMLButtonElement;
    const garage = document.querySelector("#garage") as HTMLElement;
    const winners = document.querySelector("#winners") as HTMLElement;
    btnWinners.onclick = () => {
      garage.classList.add("notActive");
      winners.classList.add("active");
    };
  }
}

export default Winners;
