var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var core;

var triangles = ['triangles1', 'triangles2', 'triangles3'];

var waves = ['wave0', 'wave1'];

var gargantua = new THREE.Object3D();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls( camera, renderer.domElement );
//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var deviceControls = new THREE.DeviceOrientationControls( gargantua );

var light = new THREE.AmbientLight( 0xffffff, 0.1 ); // soft white light
scene.add( light );

var sphere = new THREE.SphereGeometry( 0.5, 16, 8 );

var light1 = new THREE.PointLight( 0xff5000, 2, 50 );
light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff5000 } ) ) );
scene.add( light1 );

var light2 = new THREE.PointLight( 0xff0600, 2, 50 );
light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0600 } ) ) );
scene.add( light2 );

var light3 = new THREE.PointLight( 0xff00ff, 2, 50 );
light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff00ff } ) ) );
scene.add( light3 );

var light4 = new THREE.PointLight( 0x99f040, 2, 50 );
light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x99f040 } ) ) );
scene.add( light4 );

var material = new THREE.MeshPhongMaterial( { color: 0x333333, shading: THREE.SmoothShading } );

function initCore() {
    var loader = new THREE.JSONLoader();
    loader.load('./js/models/gargantua.json', function(geometry) {
        var mesh = new THREE.Mesh(geometry, material);
        gargantua.add(mesh);
    });
}

core = initCore();

function initTriangles() {
    for(var i=0; i<triangles.length; i++){
      var loader = new THREE.JSONLoader();
      loader.load('./js/models/triangles'+i+'.json', function(geometry) {
          var mesh = new THREE.Mesh(geometry, material);
          gargantua.add(mesh);
      });
    }
}

initTriangles();

function initWaves() {
    for(var i=0; i<waves.length; i++){
      var loader = new THREE.JSONLoader();
      loader.load('./js/models/wave'+i+'.json', function(geometry) {
          var mesh = new THREE.Mesh(geometry, material);
          gargantua.add(mesh);

      });
    }
}

initWaves();

scene.add(gargantua);

var particles_yellow = new THREE.EnvironmentParticles(1000, "./js/textures/particle_yellow.png");

var particles_red = new THREE.EnvironmentParticles(1000, "./js/textures/particle_red.png");

camera.position.z = 7;

var render = function () {
  requestAnimationFrame( render );
  gargantua.rotation.y += 0.0001;

  controls.update();

  deviceControls.update();

  var time = Date.now() * 0.0005;

  light1.position.x = Math.sin( time * 0.7 ) * 30;
  light1.position.y = Math.cos( time * 0.5 ) * 40;
  light1.position.z = Math.cos( time * 0.3 ) * 30;

  light2.position.x = Math.cos( time * 0.3 ) * 30;
  light2.position.y = Math.sin( time * 0.5 ) * 40;
  light2.position.z = Math.sin( time * 0.7 ) * 30;

  light3.position.x = Math.sin( time * 0.7 ) * 30;
  light3.position.y = Math.cos( time * 0.3 ) * 40;
  light3.position.z = Math.sin( time * 0.5 ) * 30;

  light4.position.x = Math.sin( time * 0.3 ) * 30;
  light4.position.y = Math.cos( time * 0.7 ) * 40;
  light4.position.z = Math.sin( time * 0.5 ) * 30;

  particles_yellow.update();
  particles_red.update();

  renderer.render(scene, camera);
};

render();

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}, false);
