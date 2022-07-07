import { useRef, useEffect, useState, Fragment } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TextGeometry }from 'three/examples/jsm/geometries/TextGeometry'
import coffeeShopModel from '../assets/coffeeShop.glb'
import loadGLTFModel from './loadGLTFModel'
import gsap from 'gsap'
import { FontLoader } from 'three/examples/jsm/loaders/fontloader'

const CoffeeShop = () => {
    const canvasRef = useRef()
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState(0)
    const [renderer, setRenderer] = useState()
  
  
    useEffect(() => {
      const { current: container } = canvasRef
      if (container && !renderer) {
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
  
        const scene = new THREE.Scene()
        //add Perspective Camera
        const camera = new THREE.PerspectiveCamera(
          30,
          window.innerWidth / window.innerHeight
        )
        camera.position.set(-31, 34, 50)
        // const initialCameraPosition = new THREE.Vector3(
        //   20 * Math.sin(0.2 * Math.PI),
        //   10,
        //   20 * Math.cos(0.2 * Math.PI)
        // );

        //add ambient Light
        const ambientLight = new THREE.AmbientLight(0xcccccc, 1)
        scene.add(ambientLight)
        
        //add Orbit Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.target.set(0, 0.7, 0)
        controls.update()
        controls.enableDamping = false
        controls.enablePan = true
        
        //load model
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
        

        const textLoad = new FontLoader()
        
        const font = textLoad.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',function(font){
          　var txtGeo = new TextGeometry('Y_Yu',{
                  font: font,
                  size: 0.3,
                  height: 0.03,
                  curveSegments: 100,
                  bevelEnabled: true,
                  bevelThickness: 0.001,
                  bevelSize: 0.0005,
               　　bevelSegments: 10
              });
        　　var txtMater = new THREE.MeshBasicMaterial({color: 0xfadacb});
           var txtMesh = new THREE.Mesh(txtGeo,txtMater);
           txtGeo.rotateX(-Math.PI/2);
           txtGeo.rotateY(0.7);
           txtMesh.position.set(1.5,0.1,-1.5);
           scene.add(txtMesh);
       });

        //loading progress
        manager.onLoad = function () {
          timer = setTimeout(() => {
            setLoading(false)
          }, 50)
          gsap.to(controls.object.position, {
            x:5,
            y:3,
            z:5.6,
            duration: 2,
            ease: 'power2.out'
            // onUpdate: () => {
            //     camera.lookAt(controls.target)
            // }
        })
        }
  
        manager.onProgress = async (url, itemsLoaded, itemsTotal) => {
          setProgress((itemsLoaded / itemsTotal) * 100)
        }
  
        toMe = () => {
          gsap.to(controls.object.position, {
              x:5.2666723107851,
              y:3.945134151481592,
              z:-0.334172258811552,
              duration: 1.5,
              ease: 'power2.out',
          })
          gsap.to(controls.target, {
              x:0.8439831767287866,
              y:-0.6119460685867475,
              z:-1.0909485007302122,
              duration: 1.5,
              ease: 'power2.out'
              // onUpdate: () => {
              //     camera.lookAt(controls.target)
              // }
          })
          
      }

        toAbout = () => {
            gsap.to(controls.object.position, {
                x:0.37590085647125704,
                y:0.3758875643100988,
                z:0.5556856584049695,
                duration: 1.5,
                ease: 'power2.out',
            })
            gsap.to(controls.target, {
                x:0.3222232250305656,
                y:0.26973060768776,
                z:0.023572226956689025,
                duration: 1.5,
                ease: 'power2.out'
                // onUpdate: () => {
                //     camera.lookAt(controls.target)
                // }
            })
            
        }

        toProject = () => {
            gsap.to(controls.object.position, {
                x:0.22872587002151068,
                y:0.48851509821204314,
                z:0.009777768366045395,
                duration: 1.5,
                ease: 'power2.out',
            })
            gsap.to(controls.target, {
                x:0.43745293657515133,
                y:0.4517064975377385,
                z:0.09375796482458582,
                duration: 1.5,
                ease: 'power2.out'
                // onUpdate: () => {
                //     camera.lookAt(controls.target)
                // }
            })
            
        }

        let req = null
        const animate = () => {
          req = requestAnimationFrame(animate)
          controls.update()
  
          window.onresize = function () {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
          }
  
          // window.addEventListener('click', (e) => {
          //   console.log(controls.object.position)
          //   console.log(controls.target)
          // })

          renderer.render(scene, camera)
        }
  
        return () => {
          cancelAnimationFrame(req)
          renderer.dispose()
        }
      }
    }, [])
  
    return (
      <div
        style={{
          margin: 0,
          height: '100vh',
          width: '100vw',
          backgroundColor: '#bfe3dd'
        }}
        ref={canvasRef}
      >
        {loading ? (
          <div
            style={{
              height: '100vh',
              width: '100vw',
              position: 'fixed',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <span style={{ alignSelf: 'center' }}>Boiling the water...</span>
            <progress
              style={{ width: '60vw', alignSelf: 'center' }}
              className="nes-progress is-error"
              value={progress}
              max="100"
            />
          </div>
        ) : (
        <div style={{position: 'fixed'}}>
          <div className="btnGroup">
            <button type="button" onClick={() => toMe() }className="nes-btn is-primary">
                Ollie Yu
            </button>
            <button type="button" onClick={() => toProject()} className="nes-btn is-primary">
                Project
            </button>
            <button type="button" onClick={() => toAbout()} className="nes-btn is-primary">
                About
            </button>
          </div>
          <section className="icon-list">
            <a href="mailto:ollieyyq@gmail.com">
                <i className="nes-icon gmail is-medium nes-pointer"></i>
            </a>
                <a href="https://github.com/OllieYu">
            <i className="nes-icon github is-medium nes-pointer"></i>
            </a>
            <a href="https://www.linkedin.com/in/ollie-yu-7a23851b9/">
                <i className="nes-icon linkedin is-medium nes-pointer"></i>
            </a>
          </section>
        </div>
        )}
      </div>
    )
  }

  export default CoffeeShop