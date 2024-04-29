/**
 * Common variables
 */

const totalElement = document.querySelector('.js-total')
const asideElement = document.querySelector('.js-aside')
const tbodyElement = asideElement.querySelector('tbody')
const localHistory = JSON.parse(window.localStorage.getItem('archeryhistory')) || []
const templateElement = document.getElementById('history-template')

/**
 * Wording
 */

const wording = {
  arrow: '{number} arrow',
  arrows: '{number} arrows'
}

document.addEventListener('click', ({ target }) => {
  const button = target.closest('button')
  if (!button) {
    return
  }

  if (button.classList.contains('js-score')) {
    updateTotal(button)
    setActive(button)
    addHint(button)
  }

  if (button.classList.contains('js-reset')) {
    save()
    build()
    reset()
  }
})

build()

/**
 * Update total with the score stored within the data-score attribute
 * @param {Object} dataset
 */

function updateTotal ({ dataset }) {
  totalElement.textContent = Number(dataset.score) + Number(totalElement.textContent)
}

/**
 * Mark button as active
 * @param {Object} button
 */

function setActive (button) {
  button.setAttribute('data-active', 'true')
}

/**
 * Add number of hint inside the button
 * @param {Object} button
 */

function addHint (button) {
  button.dataset.count = Number(button.dataset.count) + 1
  const hintsElements = button.querySelector('span')
  if (!hintsElements) {
    return
  }
  const count = button.dataset.count
  const dictionnary = count < 2 ? wording.arrow : wording.arrows
  hintsElements.textContent = dictionnary.replace('{number}', count)
}

/**
 * Reset elements
 */

function reset () {
  totalElement.textContent = '0'
  document.querySelectorAll('[data-active]').forEach(button => {
    button.removeAttribute('data-active')
    button.dataset.count = '0'
    button.querySelector('span').textContent = wording.arrow.replace('{number}', '0')
  })
}

/**
 * Save to history
 */

function save () {
  const scoringButtons = document.querySelectorAll('.js-score')
  const score = []
  scoringButtons.forEach(({ dataset }) => {
    if (dataset.count === '0') {
      return
    }
    for (let i = 0; i < Number(dataset.count); i++) {
      score.push(dataset.score)
    }
  })
  localHistory.push({
    date: new Date().toLocaleDateString(),
    scores: score
  })
  window.localStorage.setItem('archeryhistory', JSON.stringify(localHistory))
}

/**
 * Build history
 * {@link https://kittygiraudel.com/2022/09/30/templating-in-html/}
 */

function build () {
  if (localHistory.length === 0) {
    return
  }

  asideElement.hidden = localHistory.length === 0
  tbodyElement.replaceChildren()
  localHistory.reverse().forEach(({ date, scores }) => {
    const content = templateElement.content.cloneNode(true)
    const tdElements = content.querySelectorAll('td')
    tdElements[0].textContent = date
    tdElements[1].textContent = scores.reverse().toString().replaceAll(',', ', ')
    tbodyElement.append(content)
  })
}
