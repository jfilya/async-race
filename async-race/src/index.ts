import "./global.scss";
import UserInterface from "./components/user-interface";
import Garage from "./components/garage/garage";
// import Winners from "./components/winners/winners";

const interfaceUser = new UserInterface();
interfaceUser.createNav();
interfaceUser.createGarage();
interfaceUser.createWinners();
interfaceUser.clickBtn();
interfaceUser.createInput();
interfaceUser.showWinner();
const garage = new Garage();
garage.pagination().finally(() => {});
