import React, {useState} from 'react'

export default function projectContent({ coffee }) {
  
  getContent=()=>{
    switch (coffee.name) {
      case 'CoffeeEquipment1':
        return `Topic: Dental clinic management system\n
              Description: A backend system to manage doctors, nurses and patients\n
              Architecture：Vue.js/Spring Boot/MySQL\n
              OnGoing...`

      case 'CoffeeEquipment2':
        return `Topic: Personal profile\n
              Description: A 3D coffee shop to introduct myself \n
              Architecture：React and three.js`      

      case 'CoffeeEquipment3':
        return `Topic: Talent Management System???\n
              Description: A backend to manage empolyer and applicant.\n
              Architecture：React/.net core/MySQL`

      case 'CoffeeEquipment4':
        return `Topic: To be determined...
          ░░░░░░░█▐▓▓░████▄▄▄█▀▄▓▓▓▌█
          ░░░░░▄█▌▀▄▓▓▄▄▄▄▀▀▀▄▓▓▓▓▓▌█
          ░░░▄█▀▀▄▓█▓▓▓▓▓▓▓▓▓▓▓▓▀░▓▌█
          ░░█▀▄▓▓▓███▓▓▓███▓▓▓▄░░▄▓▐█▌
          ░█▌▓▓▓▀▀▓▓▓▓███▓▓▓▓▓▓▓▄▀▓▓▐█
          ▐█▐██▐░▄▓▓▓▓▓▀▄░▀▓▓▓▓▓▓▓▓▓▌█▌
          █▌███▓▓▓▓▓▓▓▓▐░░▄▓▓███▓▓▓▄▀▐█
          █▐█▓▀░░▀▓▓▓▓▓▓▓▓▓██████▓▓▓▓▐█
          ▌▓▄▌▀░▀░▐▀█▄▓▓██████████▓▓▓▌█▌
          ▌▓▓▓▄▄▀▀▓▓▓▀▓▓▓▓▓▓▓▓█▓█▓█▓▓▌█
          █▐▓▓▓▓▓▓▄▄▄▓▓▓▓▓▓█▓█▓█▓█▓▓▓▐█`

      case 'CoffeeEquipment5':
        return `Topic: To be determined...
          ░░░░░░░█▐▓▓░████▄▄▄█▀▄▓▓▓▌█
          ░░░░░▄█▌▀▄▓▓▄▄▄▄▀▀▀▄▓▓▓▓▓▌█
          ░░░▄█▀▀▄▓█▓▓▓▓▓▓▓▓▓▓▓▓▀░▓▌█
          ░░█▀▄▓▓▓███▓▓▓███▓▓▓▄░░▄▓▐█▌
          ░█▌▓▓▓▀▀▓▓▓▓███▓▓▓▓▓▓▓▄▀▓▓▐█
          ▐█▐██▐░▄▓▓▓▓▓▀▄░▀▓▓▓▓▓▓▓▓▓▌█▌
          █▌███▓▓▓▓▓▓▓▓▐░░▄▓▓███▓▓▓▄▀▐█
          █▐█▓▀░░▀▓▓▓▓▓▓▓▓▓██████▓▓▓▓▐█
          ▌▓▄▌▀░▀░▐▀█▄▓▓██████████▓▓▓▌█▌
          ▌▓▓▓▄▄▀▀▓▓▓▀▓▓▓▓▓▓▓▓█▓█▓█▓▓▌█
          █▐▓▓▓▓▓▓▄▄▄▓▓▓▓▓▓█▓█▓█▓█▓▓▓▐█`

      case 'CoffeeEquipment6':
        return `Topic: To be determined...
          ░░░░░░░█▐▓▓░████▄▄▄█▀▄▓▓▓▌█
          ░░░░░▄█▌▀▄▓▓▄▄▄▄▀▀▀▄▓▓▓▓▓▌█
          ░░░▄█▀▀▄▓█▓▓▓▓▓▓▓▓▓▓▓▓▀░▓▌█
          ░░█▀▄▓▓▓███▓▓▓███▓▓▓▄░░▄▓▐█▌
          ░█▌▓▓▓▀▀▓▓▓▓███▓▓▓▓▓▓▓▄▀▓▓▐█
          ▐█▐██▐░▄▓▓▓▓▓▀▄░▀▓▓▓▓▓▓▓▓▓▌█▌
          █▌███▓▓▓▓▓▓▓▓▐░░▄▓▓███▓▓▓▄▀▐█
          █▐█▓▀░░▀▓▓▓▓▓▓▓▓▓██████▓▓▓▓▐█
          ▌▓▄▌▀░▀░▐▀█▄▓▓██████████▓▓▓▌█▌
          ▌▓▓▓▄▄▀▀▓▓▓▀▓▓▓▓▓▓▓▓█▓█▓█▓▓▌█
          █▐▓▓▓▓▓▓▄▄▄▓▓▓▓▓▓█▓█▓█▓█▓▓▓▐█`

      default:
        return
    }
  }

  return (
    <div
      className="nes-container is-dark"
      style={{
        overflowX: 'hidden',
        position: 'absolute',
        bottom: '0',
        width: '70vw',
        height: '35vh',
        marginBottom: '80px',
        alignSelf: 'center',
        whiteSpace: 'pre-line'
      }}
    >
      {getContent()}
    </div>
  )
}
