import image from"../../../src/images/image.png";
const XSvg = (props) => (
    <svg aria-hidden="false" viewBox="0 0 24 24" {...props}>
        <image
            href={image}
            x='0'
            y="0"
            width="14"
            height="14" // Adjust the height to match your SVG size
        />
    </svg>
);

export default XSvg;
