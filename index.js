const inputEL = document.getElementById('input-el');
const saveBtn = document.getElementById('save-btn');
const ulEl = document.getElementById('ul-el');
const tabBtn = document.getElementById('tab-btn');
const deleteBtn = document.getElementById('delete-btn');
const localStorageLinks = localStorage.getItem('savedLinks');

let myLinks = [];

if (localStorageLinks) {
  myLinks = JSON.parse(localStorageLinks);
} else {
  //pass
}

saveBtn.addEventListener('click', function() {
  let inputValue = inputEL.value;
  myLinks.push(inputValue);
  localStorage.setItem('savedLinks', JSON.stringify(myLinks))
  inputEL.value = '';
  render(myLinks);
});


tabBtn.addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLinks.push(tabs[0].url);
    localStorage.setItem('savedLinks', JSON.stringify(myLinks));
    render(myLinks);
  })
});


deleteBtn.addEventListener('dblclick', function() {
  localStorage.clear();
  myLinks = [];
  render(myLinks);
});


function render(links) {
  let allLinks = '';
  for (const link of links) {
    allLinks += `
    <li><a href=${link} target='_blank'>${link}</a></li>
    `;
  }
  ulEl.innerHTML = allLinks;
}


render(myLinks);
