import '../components/Image.css';

const Image = (props) => {
  if (!props.image) {
    return null;
  }

  const {
    src,
    height,
    width
  } = props.image.image;

  return (
    <div className="imageContainer">
      <img src={src} height={height} width={width} />
    </div>
  )
}

export default Image;
