import { useField } from 'formik';
import classNames from 'classnames';

function ImageUpload(props) {
  const [field, meta, helpers] = useField(props.name);
  const { uploadContainer, inputContainer, imgStyle } = props.classes;
  const onChange = (e) => {
    const node = window.document.querySelector('#imagePreview');
    const file = e.target.files[0];
    const imageType = /image.*/;
    if (!file.type.match(imageType)) {
      e.target.value = '';
    } else {
      field.onChange(file);
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg)</span>
        <input
          {...field}
          accept='.jpg, .png, .jpeg'
          id='fileInput'
          type='file'
          onClick={onChange}
        />
        <label htmlFor='fileInput'>Chose file</label>
      </div>
      <img
        alt='user'
        className={classNames({ [imgStyle]: Boolean(field.value) })}
        id='imagePreview'
      />
    </div>
  );
}

export default ImageUpload;
