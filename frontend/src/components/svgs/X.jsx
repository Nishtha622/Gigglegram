// const XSvg = (props) => (
// 	<svg aria-hidden='true' viewBox='0 0 24 24' {...props}>
// 		<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
// 	</svg>
// );
// export default XSvg;
const XSvg = (props) => (
  <svg aria-hidden="true" viewBox="0 0 40 40" className="fixed-image" {...props}>
      <image href="logo-light.png" x="0" y="0" height="40" width="40" />
  </svg>
);

export default XSvg;
  