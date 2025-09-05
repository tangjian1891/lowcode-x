# HTML5 语义化

**HTML**（HyperText Markup Language，超文本标记语言）是构建网页的基础标记语言。它通过一系列**标签**（Tag）来描述网页的结构和内容。

标签规范：

1. **标签**与**标签属性**会将所有的大写转为小写，允许连字符`-`，建议统一小写，但是**属性值**区分大小写,因为属性值是字符串。
2. HTML内置标签都是单个单词。
3. **元素**通常由开始标签、内容和结束标签构成。而**空元素**（void element）不得包含任何内容，也没有结束标签。HTML 语法中不存在真正的“自闭合标签”；形如 `<br />` 与 `<br>` 等价（结尾的 `/` 会被解析器忽略）。参考：[Self-closing tags — MDN](https://developer.mozilla.org/en-US/docs/Glossary/Void_element#self-closing_tags)。

## Form

表单用于采集并提交用户数据。Form非常重要，几乎所有网站都离不开表单。理解表单的工作原理和最佳实践对于前端开发至关重要。

### Form常用属性

form提交：同步提交，模拟浏览器地址栏跳转效果，返回text/html,页面会跳转刷新，这是html与浏览器行为。传统多页面项目，jsp，前后不分离。
ajax提交：异步提交，页面不刷新，返回application/json,这是js行为。SPA单页应用，前后分离。

#### 本身属性

1. action:提交地址
2. enctype:默认`application/x-www-form-urlencoded`,文件上传用`multipart/form-data`。常见这两种。
3. method:默认GET请求,可选POST请求。只支持这两种。
   1. 如果是GET请求，enctype无效,因为GET请求没有请求体，自动为`application/x-www-form-urlencoded`。
   2. POST+任意enctype都可以。注意payload请求体中数据格式的变化。
   3. 请求体来说，常见的就是三种类型，如果出现文件类型，必须使用`multipart/form-data`。

### 易用性与可访问性：

1. label标签。扩大元素可点击区域。label标签可以使用for属性关联控件的id，点击label标签，等同于点击for属性对应的控件。你还可以直接用label标签包裹控件，效果一样，这也就不用for属性了。
   > element-plus如果不想要label标签的功能，可以手动给一个for属性，空字符串即可。
2. placeholder属性,占位符文本。

### 提交表单

1. button标签。只有type="submit"才会提交表单,恰好button的默认type="submit"。
2. input标签。手动设置type="submit"。也会提交表单。

   > 拦截按钮提交。在按钮上绑定event.preventDefault()即可。
   > 阻止所有提交（按钮、回车、js调用submit）。在submit事件上绑定event.preventDefault()即可。

3. 回车提交。如果form内只有一个input控件，会自动触发提交，隐式的提交可以额外加一个hidden的input控件，防止误触发提交。建议显示增加回车keydown事件，手动触发submit事件。

### 控件与类型：

- `input` 常见 `type`: `text`、`password` 、`file`、`checkbox`、`radio`、。
  - 使用用checked属性默认选中。
  - 其中checkbox与radio需要同一类型，同一name。且单项value值是内置的，适合选项类的选择。
  - 其中radio选项选中后，原生radio不支持指定取消。不过可以通过js设置checked属性取消（比较麻烦，还要记录上一次值）。
- `textarea` 多行文本输入。
- `select` 里使用 `option`；可用 `multiple` 支持多选。
  - 使用selected属性，指定默认选中项。
  - 单选默认会对第一个选项选中。通用的方式是给一个空值的选项。
  - multiple多选后，是平铺的。

提交细节与坑：

- 未选中的 `checkbox`/`radio` 不会提交；`checkbox` 的未显式 `value` 默认值为字符串 `"on"`。
- `disabled` 字段不会提交；`readonly` 字段会提交但不可编辑。
- 同名控件会提交为多个同键值对（后端需按数组解析）。
