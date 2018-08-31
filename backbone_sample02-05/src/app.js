var Backbone = require('../node_modules/backbone/backbone');
var $ = require('../node_modules/jquery/dist/jquery');
var _ = require('../node_modules/underscore/underscore');

//=============================================
// viewとmodelを連携させる
//=============================================
var MyModel = Backbone.Model.extend({
  defaults: {
    name: 'default name',
    text: 'default text',
    like: 10
  },
  initialize: function (attrs, options) {
    console.log("attrs", attrs);
    console.log("options", options);
  },
  validate: function (attrs) {
    if (attrs.text.length === 0) {
      return "入力されていません";
    }
  },
  method: function() {

  }
});
var myModel = new MyModel({name: 'kazukichi', text: 'sample test', like: 0});

var MyView = Backbone.View.extend({
  events: {
    "click .js-click-like" : "countUp",
  },
  initialize: function(){
    _.bindAll(this, "render");
    this.model.bind("change", this.render); // データが変化したらthis.renderを呼び出す（再描画する）
    this.render();
  },
  /**
   * お気に入りカウントアップ
   */
  countUp: function(){
    this.model.set({like: this.model.get('like') + 1});
  },
  render: function(){
    console.log('render');
    var compiled = _.template($('#template1').html());
    $(this.el).html(compiled({
      name: this.model.get('name'),
      text: this.model.get('text'),
      like: this.model.get('like')
    }));
  }
});
new MyView({el: $("#app"), model: myModel});