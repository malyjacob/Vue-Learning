# Prop
<br/>

## Prop 的大小写
HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：
```javascript
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```
```Html
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```
<br/>

## Prop 类型
到这里，我们只看到了以字符串数组形式列出的 prop：
```javascript
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```
但是，通常你希望每个 prop 都有指定的值类型。这时，你可以以对象形式列出 prop，这些 property 的名称和值分别是 prop 各自的名称和类型：
```javascript
props: {
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: String,
    callback: Function,
    contactsPromise: Promise // or any other constructor. 
}
```
<br/>

## 传递静态或动态Prop
像这样，你已经知道了可以像这样给 prop 传入一个静态的值：
```Html
<blog-post title="My journey with Vue"></blog-post>
```
你也知道 prop 可以通过 v-bind 动态赋值，例如:
```Html
<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title="post.title"></blog-post>

<!-- 动态赋予一个复杂表达式的值 -->
<blog-post
  v-bind:title="post.title + ' by ' + post.author.name"
></blog-post>
```
在上述两个示例中，我们传入的值都是字符串类型的，但实际上任何类型的值都可以传给一个 prop。
<br/>

### 传入一个数字
```Html
<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:likes="42"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:likes="post.likes"></blog-post>
```
### 传入一个布尔值
```Html
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<blog-post is-published></blog-post>

<!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:is-published="false"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:is-published="post.isPublished"></blog-post>
```
### 传入一个数组
```Html
<!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:comment-ids="post.commentIds"></blog-post>
```
### 传入一个对象
```Html
<!-- 即便对象是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post
  v-bind:author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:author="post.author"></blog-post>
```
### 传入一个对象的所有property
如果你想要将一个对象的所有 property 都作为 prop 传入，你可以使用不带参数的 v-bind (取代 v-bind:prop-name)。例如，对于一个给定的对象 post：
```javascript
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```
下面的模板：
```Html
<blog-post v-bind="post"></blog-post>
```
等价于：
```Html
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```
<br/>

## Prop 验证
为了定制 prop 的验证方式，你可以为 props 中的值提供一个带有验证需求的对象，而不是一个字符串数组。例如：
```javascript
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```
当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。
<br/>

## 非Prop的Attribute
一个非 prop 的 attribute 是指传向一个组件，但是该组件并没有相应 prop 定义的 attribute。

例如，想象一下你通过一个 Bootstrap 插件使用了一个第三方的 <bootstrap-date-input> 组件，这个插件需要在其 \<input> 上用到一个 data-date-picker attribute。我们可以将这个 attribute 添加到你的组件实例上：  
```Html
<bootstrap-date-input data-date-picker="activated"></bootstrap-date-input>
```
然后这个 data-date-picker="activated" attribute 就会自动添加到 <bootstrap-date-input> 的根元素上.
<br/>

### 替换/合并已有的Attribute
想象一下 <bootstrap-date-input> 的模板是这样的：
```Html
<input type="date" class="form-control">
```
为了给我们的日期选择器插件定制一个主题，我们可能需要像这样添加一个特别的类名：
```Html
<bootstrap-date-input
  data-date-picker="activated"
  class="date-picker-theme-dark"
></bootstrap-date-input>
```
在这种情况下，我们定义了两个不同的 class 的值：
- `from-control`,这是在组件的模板内设置好的
- `data-picker-theme-dark`，这是从组件的父级传入的

对于绝大多数 attribute 来说，从外部提供给组件的值会替换掉组件内部设置好的值。所以如果传入 type="text" 就会替换掉 type="date" 并把它破坏！庆幸的是，class 和 style attribute 会稍微智能一些，即两边的值会被合并起来，从而得到最终的值：form-control date-picker-theme-dark。
<br/>

### 禁用Attribute继承
如果你不希望组建的根元素继承attribute，你可以在组建的选项中设置`inheritAttrs: false`。例如：
```javascript
Vue.component('my-component', {
    inheritAttrs: false,
    // ................
});
```
这尤其适合配合实例的`$attrs` property 使用，还property 包含了传递给一个组件的attribute名和attribute值，例如：
```javascript
{
    required: true,
    placeholder: 'Enter your username'
}
```
有了`inheritAttrs: false` 和 `$attrs`，你可u一手动决定这些attribute会被赋予哪个元素。在撰写基础组件的时候时常会用到的：
```javascript
Vue.component('base-input',{
    inheritAttrs: false,
    props: ['label', 'value'],
    template: `
    <label>
        {{label}}
        <input
          v-bind="$attrs"
          v-bind:value="value"
          v-on:input="$emit("input", $event.target.value)">
    </label>
    `
})
```
<br/>

> 注意 `inheritAttrs: false`选项不会影响`style`和`class`的绑定的。


