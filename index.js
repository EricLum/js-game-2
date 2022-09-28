window.addEventListener("load", () => {
  initBoard();
  initPlayer();
});

const initBoard = () => {
  const board = document.createElement("div");
  board.id = "board";
  paste("main", board);
};

const initPlayer = () => {
  const player = document.getElementById("player");
  withMovement(player);
  // paste("board", player)
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

const withMovement = (element) => {
  window.addEventListener("keydown", (e) => onKeyPress(e, element));
  return element;
};

const onKeyPress = (e, element) => {
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
    const p = getElement("player");
    switch (direction) {
      case RIGHT:
        p.style.left = getPixels(p.style.left) + 50 + "px";
        break;
      case LEFT:
        p.style.left = getPixels(p.style.left) + -50 + "px";
        break;
      case UP:
        p.style.top = getPixels(p.style.top) + -50 + "px";
        break;
      case DOWN:
        p.style.top = getPixels(p.style.top) + 50 + "px";
        break;
    }
  }
};

const getPixels = (s) => {
  const res = parseInt(s.split("px")[0]);
  console.log(res);
  return res || 0;
};

const getElement = (id) => document.getElementById(id);
