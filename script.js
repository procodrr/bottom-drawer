function makeBottomDrawer(bottomDrawer) {
  let startPosition
  let startTime
  let startClientY
  let pointerdown = false
  let slideAmount = 0

  bottomDrawer.addEventListener('pointerdown', (e) => {
    startTime = Date.now()
    pointerdown = true
    startPosition = e.clientY - slideAmount
    startClientY = e.clientY
  })

  bottomDrawer.addEventListener('pointerup', (e) => {
    const swipeAmount = startClientY - e.clientY
    pointerdown = false

    if (
      slideAmount > bottomDrawer.clientHeight / 2 ||
      (Date.now() - startTime < 120 && swipeAmount < -80)
    ) {
      slideAmount = bottomDrawer.clientHeight - 35
    }

    if (
      slideAmount < bottomDrawer.clientHeight / 2 ||
      (Date.now() - startTime < 120 && swipeAmount > 80)
    ) {
      slideAmount = 0
    }

    bottomDrawer.style.transform = `translateY(${slideAmount}px)`
  })

  bottomDrawer.addEventListener('pointermove', (e) => {
    if (!pointerdown) return
    slideAmount = e.clientY - startPosition
    if (slideAmount < 0) slideAmount = 0
    bottomDrawer.style.transform = `translateY(${slideAmount}px)`
  })
}

makeBottomDrawer(document.querySelector('.bottom-drawer'))
