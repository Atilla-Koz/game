import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

function About() {
  return (
    <div className="about">
      <h1>
        <FontAwesomeIcon icon={faInfoCircle} /> Hakkımızda
      </h1>
      <p>Biz kimiz ve ne yapıyoruz hakkında bilgiler...</p>
    </div>
  )
}

export default About 