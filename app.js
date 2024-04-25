document.addEventListener('click', ({ target }) => {
    const button = target.closest('button')
    if (button.classList.contains('js-score')) {
        updateTotal(button)
        setActive(button)
        addHint(button)
    }

    if (button.classList.contains('js-reset')) {
        reset()
    }
})

/**
 * Common elements
 */

const totalElement = document.querySelector('.js-total')

/**
 * Wording
 */

const wording = {
    arrow: '{number} arrow',
    arrows: '{number} arrows'
}

/**
 * Update total with the score stored within the data-score attribute
 * @param {Object} target
 */

function updateTotal (target) {
    const score = Number(target.getAttribute('data-score'))
    const actualScore = Number(totalElement.textContent)
    totalElement.textContent = score + actualScore
}

/**
 * Reset elements
 */

function reset () {
    totalElement.textContent = '0'
    document.querySelectorAll('[data-active]').forEach(button => {
        button.removeAttribute('data-active')
        button.querySelector('span').textContent = wording.arrow.replace('{number}', '0')
    })
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
