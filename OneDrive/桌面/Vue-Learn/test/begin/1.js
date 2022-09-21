/*
* i --> insert mode, press `esc` to go back to the normal mode
* x --> delete a char at the position of the cursor
* :wq --> save + exit
* dd --> delete the current row and storage it.
* p --> paste
* h-j-k-l --> move left/down/up/right
* :help --> show relevant help about command line options
* 
* 1. various insertions mode
* a --> insert after the cursor
* i --> insert before the cursor
* o --> insert a new line after current line
* O --> insert anew line before current line
* cw --> replace the string after the current cursor until the end of a word

* 2. move cursor
* 0 --> to the top
* ^ --> to the first position where is not blank string at the current line
* $ --> to the end the current line
* g_ --> to the last position where is not blank string at the current line
* /pattern  --> search the pattern (we can press n to the next one matched)
* 
* 3. copy and paste
* p/P --> paste after current cursor or before current line
* yy --> copy
* 
* 
*/





// example 1
var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
  },
});

// example 2
var app2 = new Vue({
  el: "#app-2",
  data: {
    message: "page was loaded on " + new Date().toLocaleString(),
  },
});

// example 3
var app3 = new Vue({
  el: "#app-3",
  data: {
    seen: true,
  },
});

// example 4
var app4 = new Vue({
  el: "#app-4",
  data: {
    todos: [
      { text: "learn javascript" },
      { text: "learn Vue" },
      { text: "make a brilliant project" },
    ],
  },
});

// example 5
var app5 = new Vue({
  el: "#app-5",
  data: {
    message: "Hello Vue.js",
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split("").reverse().join("");
    },
  },
});

// example 6
var app = new Vue({
  el: "#app-6",
  data: {
    message: "Hello Vue.js",
  },
});

// example 7
// define a new component called todo-item.
Vue.component("todo-item", {
  props: ["todo"],
  template: "<li>{{todo.text}}</li>",
});

var app7 = new Vue({
  el: "#app-7",
  data: {
    groceryList: [
      { id: 0, text: "vegetables" },
      { id: 1, text: "cheese" },
      { id: 2, text: "bread" },
    ],
  },
});

