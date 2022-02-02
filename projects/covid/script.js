
// get real data
async function getPosts() {
    const url = "https://covid19-api.com/country/all?format=json";
    let response = await fetch(url);
    let posts = await response.json();
    //console.log(posts);
    renderPosts(posts);
}

// test local data
function getSample() {
    // data from sample.js
    renderPosts(data);
}

// test toggling cell color
function select() {
    this.classList.remove('country');
    this.classList.add('highlight');
}

function renderPosts(posts) {
    posts.forEach((post) => {
        let newDiv1 = document.createElement('div');
        newDiv1.className = "cell country";
        newDiv1.innerHTML = post.country;
        //newDiv1.onclick = select;
        let newDiv2 = document.createElement('div');
        newDiv2.className = "cell confirmed";
        newDiv2.innerHTML = post.confirmed;
        let newDiv3 = document.createElement('div');
        newDiv3.className = "cell critical";
        newDiv3.innerHTML = post.critical;
        let newDiv4 = document.createElement('div');
        newDiv4.className = "cell deaths";
        newDiv4.innerHTML = post.deaths;
        let newDiv5 = document.createElement('div');
        newDiv5.className = "cell recovered";
        newDiv5.innerHTML = post.recovered;
        let container = document.getElementById('container');
        container.appendChild(newDiv1);
        container.appendChild(newDiv2);
        container.appendChild(newDiv3);
        container.appendChild(newDiv4);
        container.appendChild(newDiv5);
    });
}

getPosts();
//getSample();