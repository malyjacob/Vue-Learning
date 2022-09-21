## 创建一个 VUE 实例

每个 vue 应用都是通过用 vue 函数创建一个新的 Vue 实例开始的：

```javascript
var vm = new Vue({
  // options
});
```

<br/>

## 数据和方法

当一个 Vue 实例被创建时，它将 data 对象中的所有的 property 加入到 Vue 的响应式系统中。当这些 property 的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

```javascript
// ours object of data
var data = { a: 1 };

// thisb object combine to an instance of Vue
var vm = new Vue({
  data: data,
});

// get the property of this instance of Vue
// return the field in original data
vm.a == data.a; // => true;

// setting the property will imapactthe original data;
vm.a = 2
data.a // => 2

// And vice versa
data.a = 3
vm.a // => 3

```
当这些数据改变时，视图会进行重渲染。值得注意的是只有当实例被创建时就已经存在于 data 中的 property 才是响应式的。

这里唯一的例外是使用`Object.freeze()`，这会阻止修改现有的 property，也意味着响应系统无法再追踪变化.<br/>

***js:***
```javascript
var obj = {
  foo: 'bar'
}

Object.freeze(obj)

new Vue({
  el: '#app',
  data: obj
})
```
***html***
```Html
<div id="app">
  <p>{{ foo }}</p>
  <!-- 这里的 `foo` 不会更新！ -->
  <button v-on:click="foo = 'baz'">Change it</button>
</div>
```
除了数据 property，Vue 实例还暴露了一些有用的实例 property 与方法。它们都有前缀 $，以便与用户定义的 property 区分开来。例如：
```javascript
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})
```
<br/>

## 实例生命周期钩子
每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。
***js:***
```javascript
new Vue({
    data: { a: 1 },
    created: function() {
        // `this` 指向vm 实例
        console.log('a is: ' + this.a);
    }
});
// => "a is: 1"
```
生命周期钩子的 this 上下文指向调用它的 Vue 实例。

## 生命周期图示
<img alt='textDocument' width='600' src='https://cn.vuejs.org/images/lifecycle.png'></img>








