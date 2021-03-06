console.log('Client side javascript file is loaded!')

// 'https://puzzle.mead.io/puzzle'

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const city = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?city=' + city).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast[0].description;
            }
        })
    })
})
