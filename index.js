
window.addEventListener("load"
,()=>{
    initBoard()
    initPlayer()
})

const initBoard = () => {
    const board = document.createElement('div')
    board.id="board"
    paste("main", board)
}

const initPlayer = () => {
    const player = document.createElement('div')
    player.id = 'player'
    withMovement(player)
    paste("board", player)
}

const paste = (parentElementId="main", element) => {
    parent = document.getElementById(parentElementId)
    if (!parent){
        throw new Error(`could not append child to parent for parent ${parentElementId} and child`)
    }
    parent.appendChild(element);
}

const withMovement = (element) => {
    window.addEventListener("keydown", (e)=>onKeyPress(e,element))
    return element
} 

const onKeyPress = (e,element) => {
    const code = e.keyCode;
    console.log(e)
    
    const LEFT = 'left';
    const RIGHT = 'right';
    const UP = 'up';
    const DOWN = 'down';
    const MAP_ARROW_KEY_CODE_TO_DIR = {
        37: LEFT, 
        38: UP,
        39: RIGHT,
        83: RIGHT,
        40: DOWN
    }
    // debugger;
    const direction = Object.keys(MAP_ARROW_KEY_CODE_TO_DIR).includes(code.toString()) ? MAP_ARROW_KEY_CODE_TO_DIR[code] : null
    console.log(direction)
    const test = element.getBoundingClientRect();
    // debugger;
    if (direction) {
        switch(direction) {
            case RIGHT: 
                getElement(player).style.left = getElement(player).style.left +  50
        }
    }
}

const getElement = (id) => document.getElementById(id);