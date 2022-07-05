import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

function loadGLTFModel(scene, glbPath, options, LoadingManager) {
    const dracoLoaderPath = 'three/examples/js/libs/draco/gltf/'
    const { receiveShadow, castShadow } = options
    return new Promise((resolve, reject) => {
      const dracoLoader = new DRACOLoader(LoadingManager)
      dracoLoader.setDecoderPath(dracoLoaderPath)
      dracoLoader.setDecoderConfig({ type: 'js' })
      dracoLoader.preload()
      const loader = new GLTFLoader(LoadingManager)
      loader.setDRACOLoader(dracoLoader)
      loader.load(
        glbPath,
        (gltf) => {
          const obj = gltf.scene
          obj.name = 'coffeeShop'
          obj.position.y = 0
          obj.position.x = 0
          obj.receiveShadow = receiveShadow
          obj.castShadow = castShadow
          obj.scale.set(0.0003, 0.0003, 0.0003)
          scene.add(obj)
  
          obj.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = castShadow
              child.receiveShadow = receiveShadow
            }
          })
  
          setTimeout(() => {
            resolve(obj)
          }, 50)
        },
        undefined,
        function (error) {
          console.log(error)
          reject(error)
        }
      )
    })
  }

  export default loadGLTFModel