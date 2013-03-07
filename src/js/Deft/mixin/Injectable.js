// Generated by CoffeeScript 1.6.1
/*
Copyright (c) 2012 [DeftJS Framework Contributors](http://deftjs.org)
Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
*/

/**
* A mixin that marks a class as participating in dependency injection. Used in conjunction with Deft.ioc.Injector.
* @deprecated 0.8 Deft.mixin.Injectable has been deprecated and can now be omitted - simply use the \'inject\' class annotation on its own.
*/

Ext.define('Deft.mixin.Injectable', {
  requires: ['Deft.core.Class', 'Deft.ioc.Injector', 'Deft.log.Logger'],
  /**
  	@private
  */

  onClassMixedIn: function(targetClass) {
    Deft.Logger.deprecate('Deft.mixin.Injectable has been deprecated and can now be omitted - simply use the \'inject\' class annotation on its own.');
  }
}, function() {
  var createInjectionInterceptor;
  if (Ext.getVersion('extjs') && Ext.getVersion('core').isLessThan('4.1.0')) {
    createInjectionInterceptor = function() {
      return function() {
        if (!this.$injected) {
          Deft.Injector.inject(this.inject, this, false);
          this.$injected = true;
        }
        return this.callOverridden(arguments);
      };
    };
  } else {
    createInjectionInterceptor = function() {
      return function() {
        if (!this.$injected) {
          Deft.Injector.inject(this.inject, this, false);
          this.$injected = true;
        }
        return this.callParent(arguments);
      };
    };
  }
  Deft.Class.registerPreprocessor('inject', function(Class, data, hooks, callback) {
    var dataInjectObject, identifier, _i, _len, _ref;
    if (Ext.isString(data.inject)) {
      data.inject = [data.inject];
    }
    if (Ext.isArray(data.inject)) {
      dataInjectObject = {};
      _ref = data.inject;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        identifier = _ref[_i];
        dataInjectObject[identifier] = identifier;
      }
      data.inject = dataInjectObject;
    }
    Deft.Class.hookOnClassCreated(hooks, function(Class) {
      Class.override({
        constructor: createInjectionInterceptor()
      });
    });
    Deft.Class.hookOnClassExtended(data, function(Class, data, hooks) {
      var _ref1;
      Deft.Class.hookOnClassCreated(hooks, function(Class) {
        Class.override({
          constructor: createInjectionInterceptor()
        });
      });
      if ((_ref1 = data.inject) == null) {
        data.inject = {};
      }
      Ext.applyIf(data.inject, Class.superclass.inject);
    });
  }, 'before', 'extend');
});
