const canvas = document.querySelector('canvas')
/*  document.querySelector() - "Find me the first element on the html page that matches this description"

   💡 Use querySelectorAll when you want to change the CSS for many matches
     Returns null if none found for both
*/

const context = canvas.getContext('2d')
/*  <Canvas> - A blank drawing surface element

    💡 The context here, '2d', is like the pen to this drawing canvas!
http://192.168.1.31:5500/My_Game_Assets/data/collisions.js net::ERR_ABORTED 404 (Not Found)
*/

canvas.width = 1024
canvas.height = 576

const collisionsMap = []

for (let i = 0; i < collisionsArr.length; i += 70) {
  collisionsMap.push(collisionsArr.slice(i, 70 + i))
}

class Boundary {
  static width = 48
  static height = 48

  constructor({ position }) {
    this.position = position
    this.width = 48
    this.height = 48
  }

  draw() {
    context.fillStyle = 'red'
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const boundaries = []

const offset = {
  x: -1315,
  y: -580
}

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025) {
      console.log(symbol)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,//boundaries.length % 70 * 48,
            y: i * Boundary.height + offset.y //Math.floor(boundaries.length / 70) * 48
          }
        })
      )
    }
  })
})
console.log(boundaries)

const image = new Image()
image.src = 'Game_Resources/My_Game_Assets/My_Pokemon_Game_Map.png'

const playerImage = new Image()
playerImage.src = 'Game_Resources/Character_Movement/playerDown.png'


class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 } }) {
    this.position = position
    this.image = image
    this.frames = frames
  }

  draw() {
    context.drawImage(
      this.image,


      //----- cropped -----
      0, // x-coord that we want to begin cropping from (top left)
      0, // y-coord that we want to begin cropping from (top left)
      this.image.width / this.frames.max, // crop width: 1/4 of the 4 clones
      this.image.height,
      this.position.x, // where to place the cropped image (top left)
      this.position.y, // where to place the cropped image (top left)


      //----- actual -----
      this.image.width / this.frames.max, // crop width: 1/4 of the 4 clones
      this.image.height,
    )
  }
}

/*

*/

const player = new Sprite({
  position: {
    x: (canvas.width / 2) - ((192 / 4) / 2),
    y: (canvas.height / 2) - (68 / 2)
  },
  image: playerImage,
  frames: {
    max: 4
  }
})

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

// let backgroundImageX = -1315
// let playerImageX = -580

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

const testBoundary = new Boundary({
  position: {
    x: 400,
    y: 400
  }
})

const movables = [background, testBoundary]
function animate() { //movement animation loop function
  window.requestAnimationFrame(animate) //infinite loop
  /*  window -  The browser's global object (tons of web APIs live on it)

      💡Tons of methods for this that can requent animation frames, local storage, set timeout, etc.

      requestAnimationFrame - Asks the browser to animate the next frame, then calls the callback function (the parameter)
  */
  background.draw()
  // boundaries.forEach((boundary) => {
  // boundary.draw() //draws out a red rectangle
  // })
  testBoundary.draw()
  player.draw()

  // if () FIXME player.position.x + player.i

  if (keys.w.pressed && lastKey === 'w') {
    movables.forEach((movable) => {
      movable.position.y += 3
    })
  }
  else if (keys.a.pressed && lastKey === 'a') {
    movables.forEach((movable) => {
      movable.position.x += 3
    })
  }
  else if (keys.s.pressed && lastKey === 's') {
    movables.forEach((movable) => {
      movable.position.y -= 3
    })
  }
  else if (keys.d.pressed && lastKey === 'd') {
    movables.forEach((movable) => {
      movable.position.x -= 3
    })
  }
}
animate()
let lastKey = ''
// So that if two keys are pressed at once, the last one takes priority

window.addEventListener('keydown', (e) => {
  /*  addEventListener(type, handler, options?)  -  Subscribes to user events (keyboard, mouse, touch, resize, etc.)

      💡 You might see options like { once: true }, { passive: true }, or { capture: true }
  */

  // console.log(e.key)
  switch (e.key) {
    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break
    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break
    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break
  }
  // console.log(keys)
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
  }
  // console.log(keys)
})
