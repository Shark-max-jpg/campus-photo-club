'use strict';
// 功能：统一生成导航与页脚，封装本地存储读取。
const REGISTRATION_KEY = 'shiguang.registration';
const SESSION_KEY = 'shiguang.registration.submitted';
const currentPage = document.body.dataset.page;
const links = [['home', 'index.html', '首页'], ['photo', 'photo.html', '社团风采'], ['activity', 'activity.html', '社团活动'], ['register', 'register.html', '在线报名']];
const nav = document.createElement('nav');
nav.className = 'wrap site-nav';
nav.setAttribute('aria-label', '主导航');
const brand = document.createElement('a');
brand.className = 'brand';
brand.href = 'index.html';
brand.innerHTML = '<span aria-hidden="true">◈</span>拾光摄影社';
nav.appendChild(brand);
const menu = document.createElement('ul');
menu.className = 'nav-links';
for (const [key, file, title] of links) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = file;
    link.textContent = title;
    if (key === currentPage) link.setAttribute('aria-current', 'page');
    item.appendChild(link);
    menu.appendChild(item);
}
nav.appendChild(menu);
document.getElementById('site-header').appendChild(nav);
document.getElementById('site-footer').innerHTML = '<div class="wrap footer-content"><p>拾光摄影社 · 制作小组：物联2502班第7组</p><p>照片墙来源：<a href="https://www.zime.edu.cn/whjd/xygy.htm">浙江机电职业技术大学官网「校园光影」</a>；<a href="photo.html#credits">查看全部图片来源</a>。</p></div>';
function readLocal(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
    } catch {
        return fallback;
    }
}
