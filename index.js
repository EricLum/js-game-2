window.addEventListener("load", () => {
  initBoard();
  //   initPlayer();
});

const initBoard = () => {
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
    // Vectors for doing rates of change.
    this.dx = 10;
    this.dy = 0;
    this.baseMovementUnit = 2;
    // Adds event listener for base player movement
    window.addEventListener("keydown", (e) =>
      this.handleMovement(e, getElement(this.id))
    );
    this.interval = setInterval(()=>this.doit(100),10);
  }

  // Original movement code
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

  handleHockeyMovement = (e) => {
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
          this.dx = this.dx + this.baseMovementUnit;
          break;
        case LEFT:
          this.dx = this.dx - this.baseMovementUnit;
          break;
        case UP:
          this.dy = this.dy -this.baseMovementUnit;
          break;
        case DOWN:
          this.dy = this.dy + this.baseMovementUnit;
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

  setPosition = (x, y) => {
    if (x && y) {
      element.style.left = x + "px";
      element.style.top = y + "px";
      return;
    }
    const element = getElement(this.id);
    element.style.left = this.x + "px";
    element.style.top = this.y + "px";
  };

  // Illustrates some "floaty" behavior you can use
  hockey = (arg) => {

    const floatingResistance = 0.1;
    const element = getElement(this.id);
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;


    this.dx =
      this.dx > 0 ? Math.max(this.dx - floatingResistance, 0) : Math.min(this.dx + floatingResistance, 0);
    this.dy =
      this.dy > 0 ? Math.max(this.dy - floatingResistance, 0) : Math.min(this.dy + floatingResistance, 0);
    element.style.left = this.x + "px";
    element.style.top = this.y + "px";
   
    // handle cleanup of interval 
    if (this.dx <= .001 && this.dy <= .001 ){
      if (this.interval >= 1){
    } else {
    }

    }
  };

  doit = (count) => {
    if (count > 0){
      let x = Math.random()
      let y = Math.random()

      this.moveX(x > .5 ? -1 * Math.random() : Math.random())
      this.moveY(y > .5 ? -1 * Math.random() : Math.random())
      setTimeout( ()=>this.doit(count-1), 100)
    }
    else {
      clearInterval(this.interval)
      console.log('cleared')
    }
  }


}
