import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <p> &copy; 2024 GiggleGram. All rights reserved. &nbsp;&nbsp;&nbsp;
        <Link to="/privacy-policy">Privacy Policy</Link>
        <div style={{display:"inline-block"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <Link to="/cookie-policy">Cookie Policy</Link>
        <div style={{display:"inline-block"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <Link to="/terms-of-use">Terms of Use</Link>
      </p>
    </footer>
  );
}

export default Footer;