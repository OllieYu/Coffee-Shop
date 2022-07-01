import * as THREE from 'three'

import Stats from 'three/examples/jsm/libs/stats.module.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import LittlestTokyo from '/assets/LittlestTokyo.glb'


let mixer

const clock = new THREE.Clock()
const container = document.getElementById('container')

const stats = new Stats()
container.appendChild(stats.dom)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.outputEncoding = THREE.sRGBEncoding
container.appendChild(renderer.domElement)

const pmremGenerator = new THREE.PMREMGenerator(renderer)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xbfe3dd)
scene.environment = pmremGenerator.fromScene(
  new RoomEnvironment(),
  0.04
).texture

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  100
)
camera.position.set(4, 2, 6)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 0.5, 0)
controls.update()
controls.enablePan = false
controls.enableDamping = true

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("/gltf/")
dracoLoader.setDecoderConfig({type: 'js'});
dracoLoader.preload(); 

const loader = new GLTFLoader()
loader.setDRACOLoader(dracoLoader)
loader.load(
  '/assets/LittlestTokyo.glb',
  function (gltf) {
    const model = gltf.scene
    model.position.set(0, 0, 1)
    model.rotation.y = -0.4
    model.scale.set(0.0003, 0.0003, 0.0003)
    scene.add(model)

    // mixer = new THREE.AnimationMixer(model)
    // mixer.clipAction(gltf.animations[0]).play()

    animate()
  },
  undefined,
  function (e) {
    console.error(e)
  }
)

window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)

  const delta = clock.getDelta()

  // mixer.update(delta)

  controls.update()

  stats.update()

  renderer.render(scene, camera)
}
