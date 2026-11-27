'use strict';
// 功能：动态表格增删、确认报名与跳转。作者：爱思办公（AI 辅助开发）。
const schedule = document.getElementById('schedule');
const bodyRows = schedule.tBodies[0];
const activityStatus = document.getElementById('activity-status');
function addActivity(name, date, place) {
    // 只把输入作为文字写入单元格，不解析 HTML。
    const row = bodyRows.insertRow(-1);
    for (const value of [name, date, place]) row.insertCell().textContent = value;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'outline';
    remove.textContent = '删除';
    remove.setAttribute('aria-label', `删除：${name}`);
    remove.addEventListener('click', () => {
        schedule.deleteRow(row.rowIndex);
        activityStatus.textContent = `已删除「${name}」。`;
    });
    row.insertCell().appendChild(remove);
}
addActivity('冬日校园采风', '2026-12-05', '图书馆广场');
addActivity('期末作品交流', '2026-12-19', '社团活动室');
const activityForm = document.getElementById('activity-form');
activityForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('event-name').value.trim();
    const date = document.getElementById('event-date').value;
    const place = document.getElementById('event-place').value.trim();
    if (name === '' || date === '' || place === '') {
        activityStatus.textContent = '请填写完整的活动名称、时间和地点。';
        return;
    }
    addActivity(name, date, place);
    activityStatus.textContent = `已添加「${name}」。`;
    activityForm.reset();
});
document.getElementById('join').addEventListener('click', () => {
    if (confirm('确定前往报名页面吗？') === true) {
        alert('即将跳转到在线报名页面。');
        location.href = 'register.html';
    }
});
