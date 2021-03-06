import { useRef, useEffect, useState, Fragment } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import coffeeShopModel from '../assets/model/coffeeShop.glb'
import backgroundMusic from '../assets/sound/Persona5.mp3'
import whoosh from '../assets/sound/whoosh.mp3'
import loadGLTFModel from './util/loadGLTFModel'
import loadText from './util/loadText'
import mapSkill from '../assets/texture/mapSkill.png'
import mapMe from '../assets/texture/mapMe.png'
import Navigation from './navigation'
import {selectedAnimation, unselectedAnimation} from './util/coffeeAnimation'
import ProgressBar from './progressBar'
import EnterButton from './enterButton'
import ProjectContent from './projectContent'

const CoffeeShop = () => {
  const canvasRef = useRef()
  const [renderer, setRenderer] = useState()
  const [camera, setCamera] = useState()
  const [controls, setControls] = useState()
  const [BGM, setBGM] = useState(null)
  const [scene, setScene] = useState()
  const [raycaster, setRaycaster] = useState()
  const [textureSkill, setTextureSkill] = useState()
  const [textureMe, setTextureMe] = useState()
  const [moveSound, setMoveSound] = useState(null)
  const [currentTab, setCurrentTab] = useState('')
  const [loading, setLoading] = useState(true)
  const [enter, setEnter] = useState(false)
  const [progress, setProgress] = useState(0)
  const [coffee, setCoffee] = useState(null)
  const [selectedCoffee, setSelectedCoffee] = useState(null)

  useEffect(() => {
    const { current: container } = canvasRef
    if (container && !renderer) {
      const renderer = initRenderer(container)
      const scene = new THREE.Scene()
      setScene(scene)
      initEnv(scene)
      const camera = initCamera()
      const controls = initControls(camera, renderer.domElement)
      //load coffee shopmodel
      const manager = new THREE.LoadingManager()
      loadGLTFModel(
        scene,
        coffeeShopModel,
        {
          receiveShadow: true,
          castShadow: true
        },
        manager
      ).then(() => {
        animate()
      })

      //loading progress manager
      manager.onLoad = function () {
        setTimeout(() => {
          setLoading(false)
        }, 800)
      }
      manager.onProgress = async (url, itemsLoaded, itemsTotal) => {
        setProgress((itemsLoaded / itemsTotal) * 100)
      }

      //load sound
      const { moveSound } = initSound(camera)

      //load text model
      loadText(scene)

      //raycaster
      const raycaster = new THREE.Raycaster()
      setRaycaster(raycaster)
      const textureSkill = new THREE.TextureLoader().load(mapSkill)
      const textureMe = new THREE.TextureLoader().load(mapMe)
      textureSkill.flipY = false
      textureMe.flipY = false
      setTextureSkill(textureSkill)
      setTextureMe(textureMe)


      const escapeHandler = () => {
        restorePosition(camera, controls, moveSound)
      }
      document.addEventListener('keydown', escapeHandler, false)

      let req = null
      const animate = () => {
        window.onresize = function () {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        }
        controls.update()
        req = requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }

      return () => {
        cancelAnimationFrame(req)
        renderer.dispose()
        document.removeEventListener('keydown', escapeHandler, false)
      }
    }
  }, [])

  //add renderer
  const initRenderer = (container) => {
    const scW = container.clientWidth
    const scH = container.clientHeight
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(scW, scH)
    renderer.outputEncoding = THREE.sRGBEncoding
    container.appendChild(renderer.domElement)
    setRenderer(renderer)
    return renderer
  }

  //add environment
  const initEnv = (scene) => {
    // const pmremGenerator = new THREE.PMREMGenerator(renderer)
    // scene.environment = pmremGenerator.fromScene(
    //   new RoomEnvironment(),
    //   0.04
    // ).texture
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)
  }

  //add Orbit Controls
  const initControls = (camera, renderer) => {
    const controls = new OrbitControls(camera, renderer)
    controls.target.set(0, 0.7, 0)
    controls.update()
    controls.enableDamping = true
    controls.enablePan = false
    controls.maxPolarAngle = Math.PI / 2
    controls.maxDistance = 20
    setControls(controls)
    return controls
  }

  //add Perspective Camera
  const initCamera = () => {
    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight
    )
    camera.position.set(-31, 34, 50)
    setCamera(camera)
    return camera
  }

  const initSound = (camera) => {
    const listener = new THREE.AudioListener()
    camera.add(listener)
    const BGM = new THREE.Audio(listener)
    const moveSound = new THREE.Audio(listener)
    const audioLoader = new THREE.AudioLoader()
    audioLoader.load(backgroundMusic, function (buffer) {
      BGM.setBuffer(buffer)
      BGM.setLoop(true)
      BGM.setVolume(0.15)
    })
    audioLoader.load(whoosh, function (buffer) {
      moveSound.setBuffer(buffer)
      moveSound.setLoop(false)
      moveSound.setVolume(0.5)
    })
    setBGM(BGM)
    setMoveSound(moveSound)
    return { BGM, moveSound }
  }

  const initEnter = () => {
    BGM.play()
    gsap.to(camera.position, {
      x: 5,
      y: 3,
      z: 5.6,
      duration: 1.5,
      ease: 'power2.out',
      onStart: () => {
        moveSound.play()
      }
    })
    setEnter(true)
  }

  const restorePosition = (camera, controls, moveSound) => {
    setCurrentTab('init')
    setCoffee(null)
    gsap.to(camera.position, {
      x: 5,
      y: 3,
      z: 5.6,
      duration: 1.5,
      ease: 'power2.out',
      onStart: () => {
        moveSound.play()
        controls.enabled = true
      }
    })
    gsap.to(controls.target, {
      x: 0,
      y: 0.7,
      z: 0,
      duration: 1.5,
      ease: 'power2.out'
    })
  }
  const mouse = new THREE.Vector2()
  const onMouseMove = (e, currentTab) => {
    if (!(currentTab === 'about')) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      var ratio = 0.2
      if (scene) {
        gsap.to(scene.rotation, {
          y: mouse.x * ratio,
          // x: -mouse.y * ratio,
          duration: 1,
          ease: 'power2.out'
        })
      }
    }
  }

  const onMouseClick = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const found = raycaster.intersectObjects(scene.children, true)
    if (found.length) {
      let current = found[0].object
      while (current.parent.parent.parent !== null) {
        current = current.parent
      }

      if (current.name.startsWith('Menu')) {
        if (current.name == 'MenuSkill') {
          current.material.map = textureSkill
        } else if (current.name == 'MenuMe') {
          current.material.map = textureMe
        }
      }

      if (current.name.startsWith('CoffeeEquipment')) {
        if (selectedCoffee == null) {
          selectedAnimation(current)
        } else if (selectedCoffee !== current) {
          unselectedAnimation(selectedCoffee)
          selectedAnimation(current)
        }
        setSelectedCoffee(current)
        setCoffee(current)
      } else if (selectedCoffee) {
        unselectedAnimation(selectedCoffee)
        setSelectedCoffee(null)
        setCoffee(null)
      }
    }
  }

  return (
    <div
      onClick={(e) => {
        onMouseClick(e)
      }}
      onMouseMove={(e) => {
        if (typeof onMouseMove === 'function') {
          onMouseMove(e, currentTab)
        }
      }}
      style={{
        margin: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: '#bfe3dd',
        display: 'flex',
        flexDirection: 'column'
      }}
      ref={canvasRef}
    >
      {!enter ? (
        <div
          style={{
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#bfe3dd'
          }}
        >
          {!loading ? (
            <EnterButton initEnter={initEnter} />
          ) : (
            <ProgressBar progress={progress} />
          )}
        </div>
      ) : (
        <Fragment>
          <Navigation
            camera={camera}
            controls={controls}
            moveSound={moveSound}
            setCurrentTab={setCurrentTab}
          />
          {coffee && <ProjectContent coffee={coffee} />}
        </Fragment>
      )}
    </div>
  )
}

export default CoffeeShop
