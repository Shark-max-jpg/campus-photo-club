'use strict';
// 功能：欢迎提示、返回顶部、寄语节点增删与存储。
window.onload = function () {
    const registration = readLocal(REGISTRATION_KEY, null);
    const nickname = registration && registration.username;
    alert(typeof nickname === 'string' && nickname ? `欢迎回来，${nickname}` : '欢迎来到拾光摄影社');
};
document.getElementById('back-top').addEventListener('click', () => window.scrollTo({ top: 0 }));
const WALL_KEY = 'shiguang.wall';
const stored = readLocal(WALL_KEY, []);
const entries = Array.isArray(stored) ? stored.filter(item => item && typeof item.nick === 'string' && typeof item.text === 'string') : [];
const list = document.getElementById('messages');
const form = document.getElementById('message-form');
const status = document.getElementById('wall-status');
function saveMessages(message) {
    try {
        localStorage.setItem(WALL_KEY, JSON.stringify(entries));
        status.textContent = message;
    } catch {
        status.textContent = '页面已更新，但浏览器不允许本地保存。';
    }
}
function appendMessage(entry) {
    const row = document.createElement('li');
    const content = document.createElement('div');
    const author = document.createElement('strong');
    author.appendChild(document.createTextNode(entry.nick));
    content.appendChild(author);
    content.appendChild(document.createTextNode(entry.text));
    const remove = document.createElement('a');
    remove.href = '#wall';
    remove.appendChild(document.createTextNode('删除'));
    remove.addEventListener('click', event => {
        event.preventDefault();
        entries.splice(entries.indexOf(entry), 1);
        list.removeChild(row);
        saveMessages('已删除该条寄语。');
    });
    row.appendChild(content);
    row.appendChild(remove);
    list.appendChild(row);
}
entries.forEach(appendMessage);
form.addEventListener('submit', event => {
    event.preventDefault();
    const nick = document.getElementById('nickname').value.trim();
    const text = document.getElementById('message').value.trim();
    if (nick === '' || text === '') {
        status.textContent = '请填写昵称和寄语，不能只输入空格。';
        return;
    }
    const entry = { nick, text };
    entries.push(entry);
    appendMessage(entry);
    saveMessages('寄语已发表。');
    form.reset();
});
