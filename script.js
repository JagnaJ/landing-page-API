const postsContainer = document.getElementById('posts-container');

// Функция для получения всех постов
async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Ошибка при получении постов:', error);
    }
}

// Функция для отображения постов на странице
function displayPosts(posts) {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body.substring(0, 100)}...</p>
            <button onclick="showPostDetails(${post.id})">Show more</button>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Функция для получения и отображения деталей поста
async function showPostDetails(postId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const post = await response.json();
        displayModal(post);
    } catch (error) {
        console.error('Ошибка при получении деталей поста:', error);
    }
}

// Функция для отображения модального окна с деталями поста
function displayModal(post) {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
    `;
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

// Закрытие модального окна при клике на крестик
const closeModal = document.getElementsByClassName('close')[0];
closeModal.onclick = function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Закрытие модального окна при клике вне его содержимого
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Инициализация
fetchPosts();
