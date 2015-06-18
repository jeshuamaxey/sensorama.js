(function(window){
    'use strict';
    /*
     * returns the Sensorama object to be attached to the global scope
     */
    function defineSensorama(){
      
      function Sensorama() {
        var aspectRatio = window.innerWidth / window.innerHeight;
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.scene = new THREE.Scene();
        this.effect = new THREE.StereoEffect(this.renderer);

        this.camera = new THREE.PerspectiveCamera(90, aspectRatio, 0.001, 700);
        this.scene.add(this.camera);

        this.controls = new THREE.DeviceOrientationControls(this.camera, true);

        this.orbitControls = new THREE.OrbitControls(
          this.camera, this.renderer.domElement
        );
        this.orbitControls.noZoom = true;
        this.orbitControls.noPan = true;
        this.orbitControls.autoRotate = false;

        window.addEventListener('resize', this.resize.bind(this), false);

        this._initControls = this.initControls.bind(this);
        
        window.addEventListener(
          'deviceorientation', this._initControls, false
        );

        setTimeout(this.resize.bind(this), 0);
        this.animate = this.animate.bind(this);
        setTimeout(this.play.bind(this), 0);

      }

      Sensorama.prototype.initControls = function ( event ) {
        if ( event.alpha ) {

          window.removeEventListener(
            'deviceorientation', this._initControls, false);

          this.renderer.domElement.addEventListener(
            'click', this.fullscreen.bind(this), false);

          this.orbitControls.enabled = false;
          this.controls.connect();
          this.controls.update();
        }
      };

      Sensorama.prototype.animate = function() {
        if (!this._playing) {
          return;
        }
        requestAnimationFrame(this.animate);
        this.update();
        this.render();
      };

      Sensorama.prototype.pause = function() {
        this._playing = false;
      };

      Sensorama.prototype.play = function() {
        if (this._playing) {
          return;
        }
        this._playing = true;
        this.animate();
      };

      Sensorama.prototype.update = function() {
        // hack to resize if width and height change
        var requireResize = this.width !== window.innerWidth ||
                            this.height !== window.innerHeight;
        if (requireResize) {
          this.resize();
        }
        this.camera.updateProjectionMatrix();
        if (this.controls.freeze === false) {
          this.controls.update();
        } else {
          this.orbitControls.update();
        }
      };

      Sensorama.prototype.render = function() {
        this.effect.render(this.scene, this.camera);
      };

      Sensorama.prototype.fullscreen = function() {
        if (this.renderer.domElement.requestFullscreen) {
          this.renderer.domElement.requestFullscreen();
        } else if (this.renderer.domElement.msRequestFullscreen) {
          this.renderer.domElement.msRequestFullscreen();
        } else if (this.renderer.domElement.mozRequestFullScreen) {
          this.renderer.domElement.mozRequestFullScreen();
        } else if (this.renderer.domElement.webkitRequestFullscreen) {
          this.renderer.domElement.webkitRequestFullscreen();
        }
      };

      Sensorama.prototype.resize = function() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
        this.effect.setSize(this.width, this.height);
      };

      return Sensorama;
    }

    // if we don't have THREE.js, log an error to the console
    if (typeof(THREE) === 'undefined') {
      console.error('Sensorama requires THREE.js to be defined: '+
        'https://threejs.org');
    }
    // if Sensorama already exists, log a warning to the console
    else if (typeof(Sensorama) !== 'undefined') {
      console.warn('Sensorama is already defined');
    }
    // otherwise, add Sensorama to global scope
    else {
      window.Sensorama = defineSensorama();
    }
})(window);
