class Garage {
  // constructor() {}

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

    garage.innerHTML = `<div class="create">
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
}
export default Garage;
