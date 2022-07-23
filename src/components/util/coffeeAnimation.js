import gsap from 'gsap'

let tween1 = null
let tween2 = null
let tween3 = null

export const selectedAnimation = (obj) => {
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

export const unselectedAnimation = () => {
  tween1.pause(0)
  tween2.pause(0)
  tween3.pause(0)
}
