import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

function Contact() {
  return (
    <div className="contact">
      <h1>
        <FontAwesomeIcon icon={faEnvelope} /> İletişim
      </h1>
      <p>Bizimle iletişime geçin...</p>
    </div>
  )
}

export default Contact 