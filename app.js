document.addEventListener('click', ({ target }) => {
    if (target.closest('button').classList.contains('js-score')) {
        updateTotal(target)
        setActive(target)
        addHint(target)
    }

    if (target.closest('button').classList.contains('js-reset')) {
        reset()
    }
})

/**
 * Common elements
 */

const totalElement = document.querySelector('.js-total')

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
        button.querySelector('span').textContent = '0'
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
    const hintsElements = button.querySelector('span')
    if (!hintsElements) {
        return
    }
    const hint = hintsElements.textContent.trim()
    hintsElements.textContent = Number(hint) + 1
}