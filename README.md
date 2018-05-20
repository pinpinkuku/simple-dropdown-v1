## 如何使用？

*   下载工程解压后，直接在浏览器中打开 `index.html` 接口看到效果

## 需求

需求：请在 48 小时内完成以下两个题目。代码请提交到 github，并将 github 链接发回给我。

*   实现下拉框组件，并给出一个可展示效果的页面，主要用原生 JS 实现，可以用 JQuery。基本要求需要全部完成，扩展要求是展示自己的好机会，自行选择完成部分或全部。

*   基本要求：基本功能同 select 元素，可以下拉选择支持直接输入，输入时下拉列表的选项自动前缀匹配，匹配到的前缀用红色文字展示支持异步加载数据兼容主流浏览器

*   扩展要求：用测试代码来测试组件功能支持大量数据（比如 10w+，考虑如何提高输入时的匹配效率）

## 功能设计

*   通过原型方式封装组件
*   组件中可以通过以下方式进行初始化

```javascript
select2 = new dropdown(
    "#select2",
    {
        color: "red"
    },
    list,
    1
);
```

> 第一个参数为组件初始化的容器，通过该容器的位置可以控制组件的初始化位置;

> 第二个参数为一些初始化配置项，比如控制下拉框中鼠标滑过的样式、当前选中项的样式等（部分功能未实现）;

> 第三个参数为下拉框数据

> 第四个参数为当前选中项

*   通过原型接口 `dropbox.prototype.setData(list, value);` 来实现异步加载数据后渲染组件
*   在输入框中输入，进行动态标红时，只操作一次 DOM，以便提高性能
*   通过事件代理，提高性能

## 遗留问题

*   目前没有处理下拉选项非常多的场景，测试发现当下拉框选项为 10 万时，页面会有卡死现象。
*   初步设想通过`分页加载`方式，控制下拉框中鼠标滚轮的事件来动态渲染指定条数选项到页面中，以提高性能。
