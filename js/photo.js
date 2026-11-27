'use strict';
// 功能：for 循环批量绑定六张照片，读取 title 并替换标题。
const photos = document.querySelectorAll('.gallery img');
const caption = document.getElementById('photo-caption');
const panel = document.getElementById('caption-panel');
let lastPhoto = null;
document.getElementById('close-caption').addEventListener('click', () => {
    panel.hidden = true;
    caption.textContent = '';
    if (lastPhoto) lastPhoto.focus();
});
if (location.hash === '#credits') document.getElementById('credits').open = true;
window.addEventListener('hashchange', () => {
    if (location.hash === '#credits') document.getElementById('credits').open = true;
});
for (let i = 0; i < photos.length; i += 1) {
    const photo = photos[i];
    photo.parentElement.addEventListener('click', () => {
        lastPhoto = photo.parentElement;
        caption.textContent = photo.getAttribute('title');
        panel.hidden = false;
    });
}
