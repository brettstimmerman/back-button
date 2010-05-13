var Y = YUI({logInclude: {TestRunner: true}}).use('console', 'test', 'gallery-back-button', function (Y) {

var BB, testCase = new Y.Test.Case({
  
  name: 'back-button tests',
  
  setUp: function () {
    BB = new Y.BackButton({storageNode:'#bb-data'});
  },
  
  tearDown: function () {
    BB.clear();
  },
  
  testAddGetArray: function () {
    var foo;
    
    Y.Assert.isUndefined(BB.get('foo'));
    
    BB.add('foo', ['bar', 'baz']);
    foo = BB.get('foo');
    
    Y.Assert.isArray(foo);
    Y.Assert.areSame(foo[0], 'bar');
    Y.Assert.areSame(foo[1], 'baz');
  },
  
  testAddGetNumber: function () {
    Y.Assert.isUndefined(BB.get('foo'));
    BB.add('foo', 32);
    Y.Assert.areSame(BB.get('foo'), 32);
  },
  
  testAddGetObject: function () {
    var foo = {bar: 'baz'}, item;
    
    Y.Assert.isUndefined(BB.get('foo'));
    
    BB.add('foo', foo);
    item = BB.get('foo');
    
    Y.Assert.isObject(item);
    Y.Assert.areSame(item.bar, foo.bar);
  },
  
  testAddGetString: function () {
    Y.Assert.isUndefined(BB.get('foo'));
    BB.add('foo', 'bar');
    Y.Assert.areSame(BB.get('foo'), 'bar');
  },
  
  testAddStringAddGetNull: function () {
    Y.Assert.isUndefined(BB.get('foo'));
    BB.add('foo', 'bar');
    BB.add('foo', null);
    Y.Assert.isNull(BB.get('foo'));
  },
  
  testAddStringAddGetNull: function () {
    var data;
    
    Y.Assert.isUndefined(BB.get('foo'));
    
    BB.add('foo', 'bar');
    BB.add('foo', undefined);
    
    data = BB.get();
    
    Y.Assert.isObject(data);
    Y.Assert.isUndefined(data['foo']);
    Y.Assert.isTrue(Y.Object.owns(data, 'foo'));
  },
  
  testAddGetKeyAsNumber: function () {
    Y.Assert.isUndefined(BB.get(1));
    BB.add(1, 'one');
    Y.Assert.isUndefined(BB.get(1));
  },
  
  testAddGetKeyAsStringNoValue: function () {
    Y.Assert.isUndefined(BB.get('foo'));
    BB.add('foo');
    Y.Assert.isUndefined(BB.get('foo'));
  },
  
  testAddGetKeyAsObject: function () {
    var foo = { bar: 'baz' },
        qux = { quux: 'quuux' },
        data;
    
    Y.Assert.isUndefined(BB.get('foo'));
    Y.Assert.isUndefined(BB.get('qux'));
    
    BB.add('foo', foo);
    BB.add('qux', qux);
    
    data = BB.get();
    
    Y.Assert.isObject(data);
    Y.Assert.areSame(data['foo'].bar, foo.bar);
    Y.Assert.areSame(data['qux'].quux, qux.quux);
  },
  
  testClear: function () {
    Y.Assert.isUndefined(BB.get('foo'));
    BB.add('foo', 'bar');
    Y.Assert.areSame(BB.get('foo'), 'bar');
    BB.clear();
    Y.Assert.isUndefined(BB.get('foo'));
  },
  
  testAddClearAdd: function () {
    Y.Assert.isUndefined(BB.get('foo'));
    BB.add('foo', 'bar').clear().add('baz', 'qux');
    Y.Assert.isUndefined(BB.get('foo'));
    Y.Assert.areSame(BB.get('baz'), 'qux');
  },
  
  testReturn: function () {
    var handle;
    
    BB.add('foo', 'bar');
    
    // Simulate a real-world 'return' event by firing the event before adding
    // subscribers.
    BB._fireReturnEvent();
    
    handle = BB.on('return', function (e) {
      var foo = e.data['foo'];
      
      Y.Assert.areSame(foo, 'bar');
      Y.Assert.isUndefined(BB.get('foo'));
      BB.detach(handle);
    });
  },
  
  testReturnAddGet: function () {
    var handle;
    
    BB.add('foo', 'bar');
    
    BB._fireReturnEvent();
    
    handle = BB.on('return', function (e) {
      var foo = e.data['foo'],
          baz;
      
      Y.Assert.areSame(foo, 'bar');
      Y.Assert.isUndefined(BB.get('foo'));
      
      BB.add('baz', 'qux');
      baz = BB.get('baz');
      
      Y.Assert.areSame(baz, 'qux');
      BB.detach(handle);
    });
  }

});

Y.Test.Runner.add(testCase);

var yconsole = new Y.Console({
  height     : '500px',
  newestOnTop: false,
  style      : 'block',
  width      : '100%'
});

yconsole.render('#log');

Y.on('load', function () { Y.Test.Runner.run(); });

});