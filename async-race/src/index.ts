import "./global.scss";
import Navigation from "./components/navigation";
import Garage from "./components/garage/garage";

const nav = new Navigation();
nav.createNav();
nav.createGarage();
nav.createWinners();
nav.clickBtn();
const garage = new Garage();
garage.createInput();
garage.buildCarTable();
garage.getArr();
