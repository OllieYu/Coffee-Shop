import React from 'react'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/fontloader'
import * as THREE from 'three'

function loadText(scene) {
  const textLoad = new FontLoader()
  textLoad.load(
    'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
    function (font) {
      let txtGeo = new TextGeometry('Y_Yu', {
        font: font,
        size: 0.3,
        height: 0.03,
        curveSegments: 100,
        bevelEnabled: true,
        bevelThickness: 0.001,
        bevelSize: 0.0005,
        bevelSegments: 10
      })
      let subTxtGeo = new TextGeometry('IT Guy \nCat lover', {
        font: font,
        size: 0.16,
        height: 0.03,
        curveSegments: 100,
        bevelEnabled: true,
        bevelThickness: 0.001,
        bevelSize: 0.0005,
        bevelSegments: 10
      })
      let txtMater = new THREE.MeshBasicMaterial({ color: 0xfadacb })
      let txtMesh = new THREE.Mesh(txtGeo, txtMater)
      let subTxtMater = new THREE.MeshBasicMaterial({ color: 0xfadacb })
      let subTxtMesh = new THREE.Mesh(subTxtGeo, subTxtMater)
      txtGeo.rotateX(-Math.PI / 2)
      txtGeo.rotateY(0.7)
      txtMesh.position.set(1.5, 0.1, -1.5)
      subTxtGeo.rotateX(-Math.PI / 2)
      subTxtGeo.rotateY(0.7)
      subTxtMesh.position.set(2, 0.1, -1.1)
      scene.add(txtMesh)
      scene.add(subTxtMesh)
    }
  )
}

export default loadText
