(function(window) {

  'use strict';

  function extend(a, b) {
    for(var key in b) {
      if(b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function each(collection, callback) {
    for (var i = 0; i < collection.length; i++) {
      var item = collection[i];
      callback(item);
    }
  }

  function Menu(options) {
    this.options = extend({}, this.options);
    extend(this.options, options);
    this._init();
  }

  Menu.prototype._init = function() {
    this.body = document.body;
    this.wrapper = document.querySelector(this.options.wrapper);
    this.mask = document.querySelector(this.options.maskId);
    this.menu = document.querySelector('#menu-basket');
    this.gray = document.querySelector('#gray');
    this.blur = document.querySelector('#blur');
    this.menuOpeners = document.querySelectorAll(this.options.menuOpenerClass);
    this._initEvents();
  };

  Menu.prototype._initEvents = function() {

    this.mask.addEventListener('click', function(e) {
      e.preventDefault();
      this.close();
    }.bind(this));
  };

  Menu.prototype.open = function() {
    this.gray.classList.add('has-active-menu');
    this.blur.classList.add('has-active-menu-blur');
    this.wrapper.classList.add('has-' + this.options.type);
    this.menu.classList.add('is-active');
    this.mask.classList.add('is-active');
    this.disableMenuOpeners();
  };

  Menu.prototype.close = function() {
    this.gray.classList.remove('has-active-menu');
    this.blur.classList.remove('has-active-menu-blur');
    this.wrapper.classList.remove('has-' + this.options.type);
    this.menu.classList.remove('is-active');
    this.mask.classList.remove('is-active');
    this.enableMenuOpeners();
  };

  Menu.prototype.disableMenuOpeners = function() {
    each(this.menuOpeners, function(item) {
      item.disabled = true;
    });
  };

  Menu.prototype.enableMenuOpeners = function() {
    each(this.menuOpeners, function(item) {
      item.disabled = false;
    });
  };

  window.Menu = Menu;

})(window);

var slideRight = new Menu({
  wrapper: '#o-wrapper',
  type: 'slide-right',
  menuOpenerClass: '.btn_basket',
  maskId: '#mask'
});

var slideRightBtn = document.querySelector('#btn_basket_right');

slideRightBtn.addEventListener('click', function(e) {
  e.preventDefault;
  slideRight.open();
});
