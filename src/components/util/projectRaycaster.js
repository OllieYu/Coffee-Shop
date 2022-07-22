import React from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import mapSkill from '../../assets/texture/mapSkill.png'
import mapMe from '../../assets/texture/mapMe.png'

function ProjectRaycaster(scene, camera, setCoffee) {
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  const textureSkill = new THREE.TextureLoader().load(mapSkill)
  const textureMe = new THREE.TextureLoader().load(mapMe)
  textureSkill.flipY = false
  textureMe.flipY = false
  let selected = null
  let tween1 = null
  let tween2 = null
  let tween3 = null

  selectedAnimation = (obj) => {
    tween1 = gsap.timeline()
    tween1
      .to(obj.position, {
        y: obj.position.y + 50,
        duration: 0.8,
        ease: 'linear'
      })
      .to(obj.position, {
        y: obj.position.y + 200,
        duration: 1,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
    tween2 = gsap.to(obj.rotation, {
      x: 0.3,
      duration: 1,
      ease: 'power2.out'
    })
    tween3 = gsap.to(obj.rotation, {
      y: Math.PI * 2,
      duration: 3,
      ease: 'linear',
      repeat: -1
    })
  }

  unselectedAnimation = () => {
    tween1.pause(0)
    tween2.pause(0)
    tween3.pause(0)
  }

  onMouseClick = (e) => {
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
        if (selected == null) {
          selectedAnimation(current)
        } else if (selected !== current) {
          unselectedAnimation(selected)
          selectedAnimation(current)
        }
        selected = current
        setCoffee(current)
      } else if (selected) {
        unselectedAnimation(selected)
        selected = null
        setCoffee(null)
      }
    }
  }
}

export default ProjectRaycaster
