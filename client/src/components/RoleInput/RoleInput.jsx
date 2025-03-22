import styles from './RoleInput.module.sass';

function RoleInput({ id, infoRole, strRole, type, field }) {
  return (
    <label htmlFor={id}>
      <div className={styles.roleContainer}>
        <input {...field} id={id} type={type} />
        <div className={styles.infoRoleContainer}>
          <span className={styles.role}>{strRole}</span>
          <span className={styles.infoRole}>{infoRole}</span>
        </div>
      </div>
    </label>
  );
}

export default RoleInput;
