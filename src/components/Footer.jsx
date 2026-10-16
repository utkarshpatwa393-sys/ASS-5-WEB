function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          🐾 <strong>PawPedia</strong> - Dog Breed Encyclopedia & Gallery
        </p>
        <p>
          Powered by{' '}
          <a
            href="https://dog.ceo/dog-api/"
            target="_blank"
            rel="noreferrer"
          >
            Dog CEO API
          </a>{' '}
          • Built with React & React Router
        </p>
      </div>
    </footer>
  );
}

export default Footer;
