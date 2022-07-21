import { useRef, useEffect, useState, Fragment } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import coffeeShopModel from '../assets/model/coffeeShop.glb'
import backgroundMusic from '../assets/sound/Persona5.mp3'
import whoosh from '../assets/sound/whoosh.mp3'
import loadGLTFModel from './util/loadGLTFModel'
import loadText from './util/loadText'
import Navigation from './navigation'
import ProjectRaycaster from './util/projectRaycaster'
import ProgressBar from './progressBar'
import EnterButton from './enterButton'
import ProjectContent from './projectContent'

const CoffeeShop = () => {
  const canvasRef = useRef()
  const [loading, setLoading] = useState(true)
  const [enter, setEnter] = useState(false)
  const [progress, setProgress] = useState(0)
  const [renderer, setRenderer] = useState()
  const [camera, setCamera] = useState()
  const [controls, setControls] = useState()
  const [coffee, setCoffee] = useState(null)
  const [BGM, setBGM] = useState(null)
  const [moveSound, setMoveSound] = useState(null)

  useEffect(() => {
    const { current: container } = canvasRef
    if (container && !renderer) {
      const renderer = initRenderer(container)
      const scene = new THREE.Scene()
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
        timer = setTimeout(() => {
          setLoading(false)
        }, 800)
      }
      manager.onProgress = async (url, itemsLoaded, itemsTotal) => {
        setProgress((itemsLoaded / itemsTotal) * 100)
      }

      //load sound
      initSound(camera)

      //load text model
      loadText(scene)

      //raycaster
      ProjectRaycaster(scene, camera, setCoffee)

      // onMouseMove = (e) => {
      //   const target = new THREE.Vector3()
      //   const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 )
      //   const mouse = new THREE.Vector2()
      //   // mouse.x = ( e.clientX - (windowHalf.x/ 2) )
      //   // mouse.y = ( e.clientY - (windowHalf.y / 2) )
      //   mouse.x = (e.clientX - windowHalf.x)
      //   mouse.y = (e.clientY - windowHalf.y)
      //   console.log(mouse)
      //   gsap.to(camera.rotation, {
      //     x: 5-3*mouse.x,
      //     // y: 3+3*mouse.y,
      //     duration: 0.01,
      //     ease: 'power2.out'
      //   })
      //   // mouse.x = ( e.clientX - windowHalf.x );
      //   // mouse.y = ( e.clientY - windowHalf.y );
      //   console.log(controls)
      // }

      // const mouse = new THREE.Vector2()
      // const target = new THREE.Vector3();
      // const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );
      // onMouseMove = (e) => {
      //   mouse.x = ( e.clientX - windowHalf.x );
      //   mouse.y = ( e.clientY - windowHalf.x );
      // }
      let req = null
      const animate = () => {
        // console.log(mouse)
        // target.x = ( 1 - mouse.x ) * 0.0002;
        // target.y = ( 1 - mouse.y ) * 0.0002;
        
        // camera.position.x += 0.05 * ( target.x - camera.position.x );
        // camera.position.y += 0.05 * ( target.y - camera.position.y );
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
      }
    }
  }, [])

  //add renderer
  initRenderer = (container) => {
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
  initEnv = (scene) => {
    // const pmremGenerator = new THREE.PMREMGenerator(renderer)
    // scene.environment = pmremGenerator.fromScene(
    //   new RoomEnvironment(),
    //   0.04
    // ).texture
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)
  }

  //add Orbit Controls
  initControls = (camera, renderer) => {
    const controls = new OrbitControls(camera, renderer)
    controls.target.set(0, 0.7, 0)
    controls.update()
    controls.enableDamping = false
    controls.enablePan = true
    setControls(controls)
    return controls
  }

  //add Perspective Camera
  initCamera = () => {
    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight
    )
    camera.position.set(-31, 34, 50)
    setCamera(camera)
    return camera
  }

  initSound = (camera) => {
    const listener = new THREE.AudioListener()
    camera.add(listener)
    const BGM = new THREE.Audio(listener)
    const moveSound = new THREE.Audio(listener)
    const audioLoader = new THREE.AudioLoader()
    audioLoader.load(backgroundMusic, function (buffer) {
      BGM.setBuffer(buffer)
      BGM.setLoop(true)
      BGM.setVolume(0.15)
      setBGM(BGM)
    })
    audioLoader.load(whoosh, function (buffer) {
      moveSound.setBuffer(buffer)
      moveSound.setLoop(false)
      moveSound.setVolume(0.5)
      setMoveSound(moveSound)
    })
  }

  initEnter = () => {
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


  // window.addEventListener('click', () => {
  //   console.log(camera.position)
  //   console.log(controls.target)
  // })

  return (
    <div
      onClick={(e) => {
        onMouseClick(e)
      }}
      // onMouseMove={(e) => {
      //   onMouseMove(e)
      // }}
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
          <Navigation camera={camera} controls={controls} moveSound={moveSound}/>
          {coffee && (
            <ProjectContent coffee={coffee}/>
          )}
        </Fragment>
      )}
    </div>
  )
}

export default CoffeeShop