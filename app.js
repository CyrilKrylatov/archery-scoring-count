/**
 * Enable :active pseudo-element on iOS
 * {@link https://stackoverflow.com/a/12686281}
 */

document.addEventListener('touchstart', () => {}, true)

document.addEventListener('click', ({ target }) => {
    if (target.closest('button').classList.contains('js-score')) {
        updateTotal(target)
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
    document.querySelectorAll('[data-hint-count]').forEach(button => {
        button.removeAttribute('data-hint-count')
    })
}

/**
 * Add number of hint inside the button
 * @param {Object} button
 */

function addHint (button) {
    const hints = button.getAttribute('data-hint-count')
    if (!hints) {
        button.setAttribute('data-hint-count', '1')
        return
    }
    button.setAttribute('data-hint-count', Number(hints) + 1)
}