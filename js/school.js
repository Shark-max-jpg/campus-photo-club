'use strict';
// 功能：通过 opener 将校名回填到报名页，然后关闭子窗口。
const schoolOptions = document.querySelectorAll('#school-list a');
for (const option of schoolOptions) {
    option.addEventListener('click', event => {
        event.preventDefault();
        try {
            if (window.opener && !window.opener.closed) {
                const school = window.opener.document.getElementById('school');
                if (school !== null) {
                    school.value = option.textContent.trim();
                    window.opener.document.getElementById('register-status').textContent = `已选择：${school.value}`;
                    self.close();
                    return;
                }
            }
        } catch {
            // file:// 禁止读取 opener.document 时，改用跨窗口消息，收到确认后再关窗。
            const school = option.textContent.trim();
            const target = location.protocol === 'file:' ? '*' : location.origin;
            window.opener.postMessage({ type: 'shiguang:select-school', school }, target);
            document.getElementById('school-status').textContent = `正在回填：${school}。若窗口未关闭，请手动填写。`;
            return;
        }
        document.getElementById('school-status').textContent = `未能连接报名页。请手动填写：${option.textContent.trim()}`;
    });
}
window.addEventListener('message', event => {
    const fromAllowedOrigin = location.protocol === 'file:' ? ['null', 'file://'].includes(event.origin) : event.origin === location.origin;
    if (window.opener && event.source === window.opener && fromAllowedOrigin && event.data && event.data.type === 'shiguang:school-received') self.close();
});
