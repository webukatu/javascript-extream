var Backbone = require('../node_modules/backbone/backbone');
var $ = require('../node_modules/jquery/dist/jquery');
var _ = require('../node_modules/underscore/underscore');

//=============================================
// ModelとViewの連携でItemを作る
//=============================================
var Item = Backbone.Model.extend({
  defaults: {
    text: '',
    isDone: false,
    editMode: false
  }
});

var ItemView = Backbone.View.extend({
  template: _.template($('#template-list-item').html()),
  events: {
    'click .js-toggle-done': 'toggleDone',
    'click .js-click-trash': 'remove',
    'click .js-todo_list-text': 'showEdit',
    'keyup .js-todo_list-editForm': 'closeEdit'
  },
  initialize: function (options) {
    _.bindAll(this, 'toggleDone', 'render', 'remove', 'showEdit', 'closeEdit');
    // オブザーバパターンを利用してモデルのイベントを購読
    this.model.bind('change', this.render);
    this.model.bind('destroy', this.remove);
  },
  update: function (text) {
    this.model.set({text: text}); // change が発生し、this.render が呼ばれる
  },
  toggleDone: function () {
    this.model.set({isDone: !this.model.get('isDone')});
  },
  remove: function () {
    this.$el.remove();
    return this;
  },
  showEdit: function () {
    this.model.set({editMode: true});
  },
  closeEdit: function (e) {
    if(e.keyCode === 13 && e.shiftKey === true){
      this.model.set({text: e.currentTarget.value, editMode: false});
    }
  },
  render: function () {
    console.log('render item');
    var template = this.template(this.model.attributes);
    this.$el.html(template);
    return this;
  }
});

//=============================================
// Collectionの使い方
//=============================================
// BackboneにはControllerはない
// CollectionはModelを複数扱うためのオブジェクト

var LIST = Backbone.Collection.extend({
  model: Item
});

var item1 = new Item({text: 'sample todo1'});
var item2 = new Item({text: 'sample todo2'});
var list = new LIST([item1, item2]);
// これと同じこと
var list2 = new LIST([{text: 'sample todo3'}, {text: 'sample todo4'}]);
console.log(list);
console.log(list2);

// eachはunderscoreのメソッド
list.each(function(e, i) {
  console.log('[' + i + '] ' + e.get('text'));
});


//=============================================
// CollectionとModelとViewの連携
//=============================================
var ListView = Backbone.View.extend({
  el: $('.js-todo_list'),
  collection: list,
  initialize: function(){
    _.bindAll(this, 'render', 'addItem', 'appendItem');
    this.collection.bind('add', this.appendItem);
    this.render();
  },
  addItem: function (text) {
    var model = new Item({text: text});
    this.collection.add(model); // add イベントが発生し、this.appendItem が呼ばれる
  },
  appendItem: function (model) {
    var itemView = new ItemView({model: model});
    this.$el.append(itemView.render().el);
  },
  render: function () {
    console.log('render list');
    var that = this;
    this.collection.each(function(model, i) {
      that.appendItem(model);
    });
    return this;
  }
});
var listView = new ListView({collection: list});
listView.addItem('sample2');
listView.addItem('sample3');