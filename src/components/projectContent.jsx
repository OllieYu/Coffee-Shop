import React from 'react'

export default function projectContent({ coffee }) {
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
        alignSelf: 'center'
      }}
    >
      <p style={{ whiteSpace: 'pre-line' }}>
        {(() => {
          switch (coffee.name) {
            case 'CoffeeEquipment1':
              return `Topic: Dental clinic management system\n
                    Description: The dental clinic management system is a??\n
                    Architecture：Vue.js/Spring Boot/MySQL\n
                    OnGoing...`

            case 'CoffeeEquipment2':
              return `Topic: Personal profile\n
                    Description: The dental clinic management system is a???\n
                    Architecture：React and three.js`

            case 'CoffeeEquipment3':
              return `Topic: Talent Management System???\n
                    Description: The dental clinic management system is a???\n
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
        })()}
      </p>
    </div>
  )
}
