import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerLeft">The Odin Project</div>
      <div className="spacer"></div>
      <div className="footerRight">
        <div className="column1">
          <div>About</div>
          <div>FAQ</div>
          <div>Blog</div>
        </div>
        <div className="column2">
          <div>Success Stories</div>
          <div>Contribute</div>
          <div>Terms of Use</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
