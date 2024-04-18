document.addEventListener('click', ({ target }) => {
    if (target.closest('button').classList.contains('js-score')) {
        updateTotal(target)
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
 * Reset total score
 */

function reset () {
    totalElement.textContent = '0'
}
