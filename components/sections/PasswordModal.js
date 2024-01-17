import { useState } from 'react';
import styles from './PasswordModal.module.css';

const PasswordModal = ({ onClose, onConfirm }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const [inputI, setInputI] = useState("");
  const [inputII, setInputII] = useState("");
  const [isEqual, setIsEqual] = useState(null);

const handleCompare = () => {
    const equal = inputI == inputII;
    setIsEqual(equal);
    if(equal) {
      onConfirm();
    }
}

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h2>Change email</h2>
          <button className={styles.close_btn} onClick={onClose}>
            ✖
          </button>
        </div>
        <div className={styles.modalBody}>
          <p>Please enter your password, so your email will be changed!</p>
          <br />
          <input
          className={styles.modal_input}
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setInputI(e.target.value)}
          />
          <input
           className={styles.modal_input}
            type="password"
            placeholder="Enter Password again"
            value={confirmPassword}
            onChange={(e) => setInputII(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          {isEqual !== null && (
            <p>
                Equal
            </p>
          )}
        </div>
        <div className={styles.modal_footer}>
          <p>🔒 Data security and legal information... 📜</p>
          <button type="submit" className={styles.confirm_btn} onClick={handleCompare}>
            Confirm Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;