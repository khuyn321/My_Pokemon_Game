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

let backgroundImageX = -785
let playerImageX = -785

function animate() { //movement animation loop function
  window.requestAnimationFrame(animate) //infinite loop
  /*  window -  The browser's global object (tons of web APIs live on it)

      💡Tons of methods for this that can requent animation frames, local storage, set timeout, etc.

      requestAnimationFrame - Asks the browser to animate the next frame, then calls the callback function (the parameter)
  */

  context.drawImage(image, -1315, -580)
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
}
animate()

window.addEventListener('keydown', (e) => {
  /*  addEventListener(type, handler, options?)  -  Subscribes to user events (keyboard, mouse, touch, resize, etc.)
  
      💡 You might see options like { once: true }, { passive: true }, or { capture: true }
  */


  // console.log(e.key)
  switch (e.key) {
    case 'w':
      console.log('pressed w key')
      break
    case 'a':
      console.log('pressed a key')
      break
    case 's':
      console.log('pressed s key')
      break
    case 'd':
      console.log('pressed d key')
      break
  }
})
