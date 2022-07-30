import "./global.scss";
import UserInterface from "./components/user-interface";
import Garage from "./components/garage/garage";

const interfaceUser = new UserInterface();
interfaceUser.createNav();
interfaceUser.createGarage();
interfaceUser.createWinners();
interfaceUser.clickBtn();
interfaceUser.createInput();
const garage = new Garage();
garage.pagination().finally(() => {});
