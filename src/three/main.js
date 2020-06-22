import * as THREE from "three";
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls";
import {
    RGBA_ASTC_10x10_Format
} from "three";
let container = document.createElement("div");
let appEl = document.getElementById("app");
window.three = {};
document.body.insertBefore(container, appEl);
// appEl.parentNode.insertBefore(container, appEl.nextSibling)

// three.camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         1,
//         1000
//     );

three.camera = new THREE.OrthographicCamera(
    window.innerWidth / -250,
    window.innerWidth / 250,
    window.innerHeight / 250,
    window.innerHeight / -250,
    1,
    1000
);

three.camera.position.z = 5;
three.scene = new THREE.Scene();

three.ambientLight = new THREE.AmbientLight(0xffffff);
three.scene.add(three.ambientLight);

let geometry = new THREE.SphereGeometry(0.5, 10, 10);
let material = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0xffffff,
});

let sphere = new THREE.Mesh(geometry, material);
three.scene.add(sphere);

three.renderer = new THREE.WebGLRenderer({
    antialias: true,
    // alpha: true
});

// three.renderer.setClearColor(0x101010);
three.renderer.setPixelRatio(window.devicePixelRatio);
three.renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(three.renderer.domElement);

function animate() {
    sphere.rotation.z += 0.005;
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.005;
    upDatePos()
    // sphere.position.y += 0.005;
    requestAnimationFrame(animate);
    three.renderer.render(three.scene, three.camera);
}

function onWindowResize() {
    three.camera.aspect = window.innerWidth / window.innerHeight;
    three.camera.updateProjectionMatrix();
    three.renderer.setSize(window.innerWidth, window.innerHeight);
}

function lerp(value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}

var mouseX = window.innerWidth / 2
var mouseY = window.innerHeight / 2

function upDatePos() {
    let posX = sphere.position.x
    let posY = sphere.position.y
    // let dist = Math.sqrt(Math.pow(mouseX - posX, 2) + Math.pow(mouseY - posY, 2))
    let newX = lerp(posX, mouseX / 120, 0.1)
    let newY = lerp(posY, -mouseY / 120, 0.1)
    sphere.position.x = newX
    sphere.position.y = newY
}

function onMouseMove(e) {
    mouseX = (e.x - window.innerWidth / 2)
    mouseY = (e.y - window.innerHeight / 2)
}

window.addEventListener("resize", onWindowResize, false);
window.addEventListener("mousemove", onMouseMove)
// window.three.controls = new OrbitControls(three.camera, three.renderer.domElement);

animate();