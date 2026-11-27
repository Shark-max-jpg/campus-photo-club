'use strict';
// 功能：选校弹窗、表单校验、最小化保存及延时提示。
const registerForm = document.getElementById('register-form');
const registerStatus = document.getElementById('register-status');
const submitButton = document.getElementById('submit-registration');
let successTimer = 0;
let schoolPopup = null;
const schoolNames = ['浙江大学', '浙江工业大学', '杭州电子科技大学', '浙江理工大学', '杭州师范大学', '浙江机电职业技术大学'];
document.getElementById('choose-school').addEventListener('click', () => {
    if (schoolPopup && !schoolPopup.closed) {
        schoolPopup.focus();
        return;
    }
    schoolPopup = window.open('school.html', '', 'width=400,height=420,left=200,top=100,scrollbars=yes');
    if (schoolPopup === null) registerStatus.textContent = '弹窗被浏览器拦截，请允许弹窗后重试，或直接输入学校。';
});
// Chrome 双击打开时可能把各 file:// 页面隔离；仅接受自己打开的窗口与白名单校名。
window.addEventListener('message', event => {
    if (schoolPopup === null || event.source !== schoolPopup || !event.data || event.data.type !== 'shiguang:select-school') return;
    const fromAllowedOrigin = location.protocol === 'file:' ? ['null', 'file://'].includes(event.origin) : event.origin === location.origin;
    if (!fromAllowedOrigin || !schoolNames.includes(event.data.school)) return;
    document.getElementById('school').value = event.data.school;
    registerStatus.textContent = `已选择：${event.data.school}`;
    schoolPopup.postMessage({ type: 'shiguang:school-received' }, location.protocol === 'file:' ? '*' : location.origin);
});
function invalid(id, message) {
    alert(message);
    document.getElementById(id).focus();
}
registerForm.addEventListener('submit', event => {
    event.preventDefault();
    if (successTimer !== 0) return;
    const value = id => document.getElementById(id).value;
    const username = value('username').trim();
    const password = value('password');
    const college = value('college').trim();
    const school = value('school').trim();
    if (username === '') return invalid('username', '请输入用户名。');
    if ((password.length < 6) === true) return invalid('password', '密码至少需要 6 位。');
    if ((password === value('password-again')) === false) return invalid('password-again', '两次输入的密码不一致。');
    if (/^[0-9]{11}$/.test(value('phone').trim()) === false) return invalid('phone', '联系电话必须是 11 位数字。');
    if (college === '') return invalid('college', '请输入所在学院。');
    if (school === '') return invalid('school', '请输入或选择所在学校。');
    submitButton.disabled = true;
    registerStatus.textContent = '正在保存报名信息…';
    successTimer = window.setTimeout(() => {
        try {
            // 只保存欢迎语与实训要求所需字段；密码和联系方式不落地。
            localStorage.setItem(REGISTRATION_KEY, JSON.stringify({ username, college, school }));
            sessionStorage.setItem(SESSION_KEY, 'true');
            registerStatus.textContent = '报名信息提交成功。可返回首页查看欢迎语。';
            document.getElementById('password').value = '';
            document.getElementById('password-again').value = '';
            alert('报名信息提交成功');
        } catch {
            registerStatus.textContent = '无法完成浏览器存储，请检查站点存储权限后重试。';
        } finally {
            successTimer = 0;
            submitButton.disabled = false;
        }
    }, 550);
});
registerForm.addEventListener('reset', () => {
    if (successTimer !== 0) window.clearTimeout(successTimer);
    successTimer = 0;
    submitButton.disabled = false;
    registerStatus.textContent = '';
});
