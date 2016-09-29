THREE.EnvironmentParticles = function(_count, _texture) {
  // create the particle variables
  var particleCount = _count || 1000;
  var particles = new THREE.Geometry();
  // create the particle variables
  var particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: Math.random() * 0.15,
    map: new THREE.TextureLoader().load(_texture),
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: true,
    depthTest: true,
    opacity: Math.random() + 0.75
  });

  // now create the individual particles
  for (var p = 0; p < particleCount; p++) {

    // create a particle with random
    // position values, -250 -> 250
    var pX = Math.random() * 50 - 25,
        pY = Math.random() * 50 - 25,
        pZ = Math.random() * 50 - 25,
        particle = new THREE.Vector3(pX, pY, pZ);

    // add it to the geometry
    particles.vertices.push(particle);
  }

  // create the particle system
  this.particleSystem = new THREE.Points(particles, particleMaterial);
  // add it to the scene
  scene.add(this.particleSystem);

  // also update the particle system to
  // sort the particles which enables
  // the behaviour we want
  this.particleSystem.sortParticles = true;

  this.update = function() {

    var verts = this.particleSystem.geometry.vertices;

    var deltaTime = Date.now() * 0.0005;

    var rnd = Math.random() * 0.0025;

    for(var i = 0; i < verts.length; i++) {

        var vert = verts[i];

        vert.x += Math.sin( deltaTime * 0.2 ) * rnd;
        vert.y += Math.cos( deltaTime * 0.4 ) * rnd;
        vert.z += Math.cos( deltaTime * 0.6 ) * rnd;

    }

    this.particleSystem.geometry.verticesNeedUpdate = true;

  };

}
