const canvas = document.querySelector('canvas')
/*  document.querySelector() - "Find me the first element on the html page that matches this description"

   💡 Use querySelectorAll when you want to change the CSS for many matches
     Returns null if none found for both
*/

const context = canvas.getContext('2d')
/*  <Canvas> - A blank drawing surface element

    💡 The context here, '2d', is like the pen to this drawing canvas!

*/

canvas.width = 1024
canvas.height = 576

context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = 'Game_Resources/My_Game_Assets/My_Pokemon_Game_Map.png'

const playerImage = new Image()
playerImage.src = 'Game_Resources/Character_Movement/playerDown.png'


class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position
    this.image = image
  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y)
  }
}

const background = new Sprite({
  position: { x: -1315, y: -580 },
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

function animate() { //movement animation loop function
  window.requestAnimationFrame(animate) //infinite loop
  /*  window -  The browser's global object (tons of web APIs live on it)

      💡Tons of methods for this that can requent animation frames, local storage, set timeout, etc.

      requestAnimationFrame - Asks the browser to animate the next frame, then calls the callback function (the parameter)
  */
  background.draw()
  context.drawImage(
    playerImage,


    //----- cropped -----
    0, // x-coord that we want to begin cropping from (top left)
    0, // y-coord that we want to begin cropping from (top left)
    playerImage.width / 4, // crop width: 1/4 of the 4 clones
    playerImage.height,


    //----- actual -----
    (canvas.width / 2) - ((playerImage.width / 4) / 2),
    (canvas.height / 2) - (playerImage.height / 2),
    playerImage.width / 4, // crop width: 1/4 of the 4 clones
    playerImage.height,
  )

  if (keys.w.pressed && lastKey === 'w') background.position.y += 3
  else if (keys.a.pressed && lastKey === 'a') background.position.x += 3
  else if (keys.s.pressed && lastKey === 's') background.position.y -= 3
  else if (keys.d.pressed && lastKey === 'd') background.position.x -= 3
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
