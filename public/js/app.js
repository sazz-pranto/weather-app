console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();  // prevents the page from reloding after form submission
    const location = search.value;
    if(location === "") {
        messageOne.textContent = 'You must enter a locaiton!';
        return;
    }
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address='+ encodeURIComponent(location))
    .then(response => {
        response.json().then(data => {
            if(!data.error) {
                messageOne.textContent = `Location: ${data.location}`;
                messageTwo.textContent = `Temperature is ${data.temperature} degrees right now`;
            } else {
                messageOne.textContent = data.error;
            }
        })
    })
})