import styles from "src/components/TaskItem.module.css";

import type { User } from "src/api/users";

export interface UserTagProps {
  user?: User | null;
  className?: string;
}

export function UserTag({ user: user, className: className }: UserTagProps) {
  if (user === null || !user) {
    return <p>Not assigned</p>;
  }
  return (
    <div className={`${styles.container} ${className || ""}`}>
      {user ? (
        <div>
          <img
            src={user.profilePictureURL || "/userDefault.svg"}
            alt="AltText"
            className={styles.avatar}
          />
          <span className={styles.name}>{user.name}</span>
        </div>
      ) : (
        <span className={styles.notAssigned}>Not assigned</span>
      )}
    </div>
  );
}
