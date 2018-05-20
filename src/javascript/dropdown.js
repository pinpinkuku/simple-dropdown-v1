/**
 * 下拉选择框类
 * @param {Element} el 组件初始化父元素
 * @param {Object} opt 组件初始化参数
 * @param {Array} list 下拉选项
 * @param {number} value 输入框的值
 */
function dropdown(el, opts, list, value) {
    if (!el) {
        return;
    }

    // 默认选项
    var defaults = {
        selectedStyle: '#333333',
        hoverStyle: '#dddddd',
        template: '<div class="ui-dropdown">' +
            '<input class="drop-down-toggle"/> ' +
            '<i class="drop-down-caret"></i>' +
            '</div>',
        ulTemplate: '<ul class="drop-down-menu">{li}</ul></div>',
        liTemplate: '<li>{value}</li>'
    };

    // 赋初始值值
    this.opts = $.extend({}, defaults, opts) || defaults;
    this.list = list || [];
    this.value = value || '';
    this.el = el;

    // 输入框显示项
    this.valueStr = '';

    this.create(el);
    this.init(list, value, el, opts);
    this.bindEvent();
}

/**
 * 选择组件类的原型方法 
 */


dropdown.prototype.init = function (list, value, el) {
    var self = this;
    var liArr = [];
    var valueStr = '';

    // 输入框DOM
    self.inputEl = $(this.el + ' .drop-down-toggle');

    if (list.length > 0) {
        for (var i = 0; i < list.length; i++) {
            liArr.push(self.opts.liTemplate.replace(/\{value\}/, list[i].name));

            if (list[i].value === value) {
                valueStr = list[i].name;
            }
        }
    }

    self.liStr = liArr.join('');
    self.ulStr = self.opts.ulTemplate.replace(/\{li\}/, self.liStr);

    self.ulDOM = $(self.ulStr);
    // 为输入框赋值
    $(el + ' .drop-down-toggle').val(valueStr);
}

// 创建DOM
dropdown.prototype.create = function (el) {
    var self = this;
    self.el = el;
    $(el).html(this.opts.template);
}

// 设置数据 
dropdown.prototype.setData = function (results, value) {
    if (results) {
        this.list = results;
    }

    if (value) {
        this.value = value;
    }

    this.init(this.list, this.value, this.el, this.opts);
}

// 绑定事件
dropdown.prototype.bindEvent = function () {
    var self = this;

    // 切换显示状态
    self.inputEl.on('click', function (e) {
        if (self.isShow) {
            self.close(e);
            self.isShow = false;
        } else {
            self.show(e.target);
            self.isShow = true;
        }

        e.stopPropagation();
    }).on('input', function (e) {
        var valueStr = self.inputEl.val();

        self.hilightItem(valueStr);
    });

    // 点击空白处进行关闭
    $(document).on('click', function (ev) {
        var target = ev.target || ev.srcElement;
        if (!target) {
            return;
        };

        self.close();
    })

}

// 显示选项框
dropdown.prototype.show = function () {
    var self = this;
    // 计算显示的位置
    var pos = self.getPos(self.inputEl, 50);

    // 设置显示样式
    self.ulDOM.css({
        'position': 'absolute',
        'top': pos.top,
        'left': pos.left,
        'width': self.inputEl.width() + 9,
        'height': 100
    });

    // 事件代理
    self.ulDOM.on('click', function (e) {
        self.inputEl.val(e.target.innerText);
        self.close();
    });

    // 进行显示
    $('body').append(self.ulDOM);
}

/**
 * 关闭选项
 */
dropdown.prototype.close = function (e) {
    this.ulDOM.remove();
}

/**
 * 获取元素相对位置
 * @param  {Object} field 元素
 * @return {Object} 包含left和top
 */
dropdown.prototype.getPos = function (field, maxHeight) {
    var p = $(field).offset(),
        scrollBarPos = $(window).height() + $(document).scrollTop();
    var topPos = p.top + field.outerHeight(),
        leftPos = p.left;
    var topPos = (topPos + maxHeight) > scrollBarPos ? (p.top - maxHeight - 2) : topPos;
    return {
        top: topPos,
        left: leftPos
    };
}

/**
 * 标红选项
 */
dropdown.prototype.hilightItem = function (filterStr) {
    var self = this;
    var ulEl = $('ul');
    if (ulEl[0]) {
        // 清除标红
        var ulStr = ulEl[0].innerHTML;
        ulStr = ulStr.replace(/\<font color=\"red\"\>/g, '');
        ulStr = ulStr.replace(/\<\/font\>/g, '');

        if (filterStr) {
            // 重新标红
            var textArr = ulStr.split(filterStr);
            var liStr = textArr.join('<font color="red">' + filterStr + '</font>');
        } else {
            liStr = ulStr;
        }

        ulEl.html(liStr);
    }
}