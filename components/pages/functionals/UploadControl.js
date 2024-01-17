import classes from './UploadControl.module.css';
const UploadControl = ({ children, value, onChange, disabled, accept }) => {
    
    return (
      <label htmlFor="contained-button-file" className={classes.upload_control}>
        <input
          value={value}
          accept={accept}
          disabled={disabled}
          style={{ display: 'none' }}
          id="contained-button-file"
          multiple
          type="file"
          onChange={disabled ? () => {} : onChange}
        />
        {children}
      </label>
    );
  };

  export default UploadControl;