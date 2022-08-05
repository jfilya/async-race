enum Arrow {
  up = "↑",
  down = "↓",
}

enum StatusEngine {
  start = "status=started",
  stop = "status=stopped",
  drive = "status=drive",
}

enum Link {
  garage = "http://127.0.0.1:3000/garage",
  winners = "http://127.0.0.1:3000/winners",
  engine = "http://127.0.0.1:3000/engine",
}

export enum NotesOnPage {
  win = 10,
  car = 7,
}

export { Arrow, StatusEngine, Link };
