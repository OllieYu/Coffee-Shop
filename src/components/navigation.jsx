import React, { Fragment } from 'react'
import gsap from 'gsap'
import './navigation.css'

function Navigation({camera,controls,moveSound}) {
  toMe = () => {
      gsap.to(camera.position, {
        x: 5.2666723107851,
        y: 3.945134151481592,
        z: -0.334172258811552,
        duration: 1,
        ease: 'power2.out',
        onStart: () => {
          moveSound.play()
        }
      })
      gsap.to(controls.target, {
        x: 0.8439831767287866,
        y: -0.6119460685867475,
        z: -1.0909485007302122,
        duration: 1,
        ease: 'power2.out',
        onComplete: ()=>{
          controls.enabled = false; // activate the controler again after animation
        }
      })
    }

    toAbout = () => {
      gsap.to(camera.position, {
        x: 0.37937865949564364,
        y: 0.34447916269433865,
        z: 0.5905731859495336,
        duration: 1,
        ease: 'power2.out',
        onStart: () => {
          moveSound.play()
        }
      })
      gsap.to(controls.target, {
        x: 0.32177351325183107,
        y: 0.3464994530902155,
        z: 0.01952909361410751,
        duration: 1,
        ease: 'power2.out',
        onComplete: ()=>{
          controls.enabled = false; // activate the controler again after animation
        }
      })
    }

    toProject = () => {
      gsap.to(camera.position, {
        x: 0.1019304615211028,
        y: 0.5037491116865992,
        z: -0.03008975680903206,
        duration: 1,
        ease: 'power4.out',
        onStart: () => {
          moveSound.play()
        }
      })
      gsap.to(controls.target, {
        x: 0.431541,
        y: 0.426914,
        z: 0.097586,
        duration: 1,
        ease: 'power4.out',
        onComplete: () => {
          controls.enabled = false // activate the controler again after animation
        }
      })
    }
  return (
    <Fragment>
      <div style={{position:'fixed'}} className="btnGroup">
        <button
          type="button"
          onClick={() => toMe()}
          className="nes-btn is-primary"
        >
          Ollie Yu
        </button>
        <button
          type="button"
          onClick={() => toProject()}
          className="nes-btn is-primary"
        >
          Project
        </button>
        <button
          type="button"
          onClick={() => toAbout()}
          className="nes-btn is-primary"
        >
          About
        </button>
      </div>
      <section style={{position:'fixed'}} className="icon-list">
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
    </Fragment>
  )
}

export default Navigation
