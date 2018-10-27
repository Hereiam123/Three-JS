/////////////////////////////////////////
// Scene Setup
/////////////////////////////////////////

var scene, camera, renderer, controls, container, loading;

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(10, 1, 1, 1000);
camera.position.set(-5, 12, 10);
camera.lookAt(scene.position);

renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setClearColor(0x000000, 0);
container = document.getElementById("container");
loading = document.getElementsByClassName("loader");
renderer.setSize(300, 300);
container.appendChild(renderer.domElement);

/////////////////////////////////////////
// Trackball Controller
/////////////////////////////////////////

controls = new THREE.TrackballControls(camera, container);
controls.rotateSpeed = 5.0;
controls.zoomSpeed = 3.2;
controls.minDistance = 10;
controls.maxDistance = 20;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = true;
controls.staticMoving = false;
controls.dynamicDampingFactor = 0.2;

/////////////////////////////////////////
// Lighting
/////////////////////////////////////////

var iphone_color = "#FAFAFA",
  ambientLight = new THREE.AmbientLight("#EEEEEE"),
  hemiLight = new THREE.HemisphereLight(iphone_color, iphone_color, 0),
  light = new THREE.PointLight(iphone_color, 1, 100);

hemiLight.position.set(0, 50, 0);
light.position.set(0, 20, 10);

scene.add(ambientLight);
scene.add(hemiLight);
scene.add(light);

/////////////////////////////////////////
// Utilities
/////////////////////////////////////////

var axisHelper = new THREE.AxisHelper(1.25);
scene.add(axisHelper);

/////////////////////////////////////////
// Render Loop
/////////////////////////////////////////

function renderPhone() {
  renderer.render(scene, camera);
}

// Render the scene when the controls have changed.
// If you don’t have other animations or changes in your scene,
// you won’t be draining system resources every frame to render a scene.
controls.addEventListener("change", renderPhone);

// Avoid constantly rendering the scene by only
// updating the controls every requestAnimationFrame
function animationLoop() {
  requestAnimationFrame(animationLoop);
  controls.update();
}

animationLoop();

/////////////////////////////////////////
// Window Resizing
/////////////////////////////////////////

/*window.addEventListener('resize', function () {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
			controls.handleResize();
			renderPhone();
		}, false);*/

/////////////////////////////////////////
// Object Loader
/////////////////////////////////////////

var dae,
  loader = new THREE.ColladaLoader();

function loadCollada(collada) {
  dae = collada.scene;
  dae.position.set(0.4, 0, 0.8);
  scene.add(dae);
  renderPhone();
}

function loadProgress(callback) {
  if (callback.loaded === 601013) {
    var loaderWrap = document.getElementsByClassName("loaderWrap")[0];
    var containerWrap = document.getElementById("containerWrap");
    loaderWrap.classList.add("done");
    containerWrap.classList.add("done");
  }
}

loader.options.convertUpAxis = true;
loader.load("./assets/model.dae", loadCollada, loadProgress);
