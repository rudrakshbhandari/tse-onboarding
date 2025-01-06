import styles from "src/components/UserTag.module.css";

import type { User } from "src/api/users";

export interface UserTagProps {
  user?: User | null;
  className?: string;
}

export function UserTag({ user, className }: UserTagProps) {
  if (user === null || !user) {
    // alert("hi");
    return <p>Not assigned</p>;
  }
  return (
    <div className={`${styles.container} ${className || ""}`}>
      {user ? (
        <div className={styles.userTagContainer}>
          <div>
            <img
              src={user.profilePictureURL || "/userDefault.svg"}
              alt="Alt Text"
              className={styles.avatar}
            />
          </div>
          <div className={styles.userTextContainer}>
            <span className={styles.name}>{user.name}</span>
          </div>
        </div>
      ) : (
        <span className={styles.notAssigned}>Not assigned</span>
      )}
    </div>
  );
}
