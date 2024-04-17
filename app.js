document.addEventListener('click', ({ target }) => {
    if (target.closest('button').classList.contains('js-score')) {
        updateTotal(target)
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
