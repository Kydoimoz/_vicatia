import React from 'react';
import styles from "./delAccount.module.css";

const DeleteAccountModal = ({ onClose, onConfirm }) => {


    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h2>Are you sure to delete your account permanently?</h2>
                    <button className={styles.close_btn} onClick={onClose}>
                        ✖
                    </button>
                </div>
                <div className={styles.modalBody}>
                    <p>
                        Deleting your account is an irreversible action. Are you sure you want to proceed?
                    </p>
                </div>
                <div className={styles.modal_footer}>
                    <p>
                        🔒 Data security and legal information... 📜
                    </p>
                    <form onSubmit={onConfirm}>
                        <button type="submit" className={styles.confirm_btn}>
                            Confirm Delete
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;