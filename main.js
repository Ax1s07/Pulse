document.addEventListener('DOMContentLoaded', function() {
    const user = firebase.auth().currentUser;

    if (user) {
        document.getElementById('profileLink').style.display = 'block';
        document.getElementById('userEmail').innerText = `Logged in as: ${user.email}`;
    } else {
        document.getElementById('profileLink').style.display = 'none';
        if (window.location.pathname !== '/register.html') {
            window.location.href = 'index.html';
        }
    }

    document.getElementById('registerForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                window.location.href = 'index.html';
            })
            .catch(error => {
                alert(error.message);
            });
    });
});

function postMessage() {
    const postContent = document.getElementById('postContent').value;
    if (postContent.trim() === '') {
        alert('Please enter some content.');
        return;
    }

    const feed = document.getElementById('feed');
    const newPost = document.createElement('div');
    newPost.className = 'post';

    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/800x400'; // Placeholder image
    img.alt = 'Post Image';

    const content = document.createElement('div');
    content.className = 'post-content';
    content.innerText = postContent;

    const actions = document.createElement('div');
    actions.className = 'post-actions';

    const likeButton = document.createElement('button');
    likeButton.innerText = 'Like';
    actions.appendChild(likeButton);

    const commentButton = document.createElement('button');
    commentButton.innerText = 'Comment';
    actions.appendChild(commentButton);

    newPost.appendChild(img);
    newPost.appendChild(content);
    newPost.appendChild(actions);

    feed.prepend(newPost);
    document.getElementById('postContent').value = '';
}

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = 'index.html';
    });
}

function deleteAccount() {
    const user = firebase.auth().currentUser;
    user.delete().then(() => {
        alert('Account deleted.');
        window.location.href = 'index.html';
    }).catch(error => {
        alert(error.message);
    });
}
