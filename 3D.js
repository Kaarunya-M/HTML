const boxesContainer = document.getElementById('boxes')
const btn = document.getElementById('btn')

btn.addEventListener('click', () => boxesContainer.classList.toggle('small'))

function createBoxes() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      const box = document.createElement('div')
      box.classList.add('box')
      box.style.backgroundPosition = `${-j * 50}px ${-i * 50}px`
      boxesContainer.appendChild(box)
    }
  }
}

createBoxes()