/**
 * Created by chengf on 2016/12/22.
 */

const fs = require("fs");

// panel/index.js
Editor.Panel.extend({
    style: fs.readFileSync(Editor.url("packages://table_tool") + "/panel/css/index.css") + "",

    template: fs.readFileSync(Editor.url("packages://table_tool") + "/panel/html/index.html") + "",

    $: {
        btn: '#btn',
        label: '#label',
    },

    ready () {
        this.$btn.addEventListener('confirm', () => {
            this.$label.innerText = '你好';
            setTimeout(() => {
                this.$label.innerText = '--';
            }, 500);
        });
    },
});