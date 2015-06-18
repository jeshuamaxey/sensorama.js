describe('Sensorama.js', function() {

  beforeEach( function() {
    console = {};
    consoleMethods = ['log', 'warn', 'error'];
    consoleMethods.forEach(function(method, i) {
      console[method] = jasmine.createSpy(method);  
    });
  });

  describe('including Sensorama.js', function() {
    it('should create a Sensorama instance without erroring', function() {
      var sensorama = new Sensorama();
      expect(sensorama).not.toEqual(undefined);
    });

    /*
     * these 2 are proving difficult to test because it needs to affect the 
     * global scope before the Sensorama library is run. Is this possible?
     *
     **/

    // it('should log an error when THREE isn\'t defined and you attempt to '+
    //    'create a Sensorama instance', function() {
    //   THREE = undefined;
    //   var sensorama = new Sensorama();
    //   expect(console.error).toHaveBeenCalled();
    // });

    // it('should log a warning if Sensorama is already defined', function() {
    //   Sensorama
    //   var sensorama = new Sensorama();
    //   expect(sensorama).to.not.equal(undefined);
    // });
  });

  describe('instatiating a sensorama', function() {

    it('should create a Sensorama instance with all properties listed in ' +
       'the documentation', function() {
      var sensorama = new Sensorama();
      var properties = [
        'renderer',
        'scene',
        'effect',
        'camera',
        'controls',
        'orbitControls'
      ];
      properties.forEach(function(prop, i) {
        expect(sensorama[prop]).toBeDefined();
      });
    });

    it('should create a Sensorama instance with all methods listed in the ' +
       'documentation', function() {
      var sensorama = new Sensorama();
      var methods = [
        'initControls',
        'animate',
        'pause',
        'play',
        'update',
        'render',
        'fullscreen',
        'resize'
      ];
      methods.forEach(function(method, i) {
        expect(sensorama[method]).toBeDefined();
        expect(typeof sensorama[method]).toEqual('function');
      });
    });

    it('should create a Sensorama instance with the default values listed ' +
       'in the documentation', function() {
        var sensorama = new Sensorama();
        var defaults = [{
          prop: 'renderer',
          value: new THREE.WebGLRenderer({ antialias: true })
        }];
        defaults.forEach(function(df, i) {
          // expect(sensorama[df.prop]).toEqual(df.value);
        });
    });

  });

});
