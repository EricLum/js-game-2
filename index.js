window.addEventListener("load", () => {
  initBoard();
  //   initPlayer();
});

const initBoard = () => {
  const board = document.createElement("div");
  board.id = "board";
  paste("main", board);
  const player = new Player();
};

const paste = (parentElementId = "main", element) => {
  parent = document.getElementById(parentElementId);
  if (!parent) {
    throw new Error(
      `could not append child to parent for parent ${parentElementId} and child`
    );
  }
  parent.appendChild(element);
};

const getPixels = (s) => {
  const res = parseInt(s.split("px")[0]);
  return res || 0;
};

const getElement = (id) => document.getElementById(id);

class Player {
  constructor() {
    this.id = "player";
    this.x = getPixels(getElement(this.id).style.left) || 30;
    this.y = getPixels(getElement(this.id).style.top) || 30;
    this.baseMovementUnit = 3;
    window.addEventListener("keydown", (e) =>
      this.handleMovement(e, getElement(this.id))
    );
    this.interval = setInterval(this.setPosition2,10)
  }

  handleMovement = (e) => {
    const code = e.keyCode;

    const LEFT = "left";
    const RIGHT = "right";
    const UP = "up";
    const DOWN = "down";
    const MAP_ARROW_KEY_CODE_TO_DIR = {
      37: LEFT,
      38: UP,
      39: RIGHT,
      83: RIGHT,
      40: DOWN,
    };
    const direction = Object.keys(MAP_ARROW_KEY_CODE_TO_DIR).includes(
      code.toString()
    )
      ? MAP_ARROW_KEY_CODE_TO_DIR[code]
      : null;

    if (direction) {
      switch (direction) {
        case RIGHT:
          this.moveX(this.baseMovementUnit);
          break;
        case LEFT:
          this.moveX(-1 * this.baseMovementUnit);
          break;
        case UP:
          this.moveY(-1 * this.baseMovementUnit);
          break;
        case DOWN:
          this.moveY(this.baseMovementUnit);
          break;
      }
    }
  };

  moveX = (dir) => {
    this.x = this.x + dir;
    this.setPosition();
  };

  moveY = (dir) => {
    this.y = this.y + dir;
    this.setPosition();
  };

  setPosition = () => {
    const element = getElement(this.id);
    element.style.left = this.x + "px";
    element.style.top = this.y + "px";
    
  };

  setPosition2 = () => {
    const element = getElement(this.id);
    this.x = this.x + this.baseMovementUnit * Math.random() - this.baseMovementUnit * Math.random() + .1
    this.y = this.y + this.baseMovementUnit * Math.random() - this.baseMovementUnit * Math.random() + .1
    element.style.left = this.x  + "px";
    element.style.top = this.y + "px";
  }
}
