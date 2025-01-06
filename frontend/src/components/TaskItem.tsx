import { useState } from "react";
import { CheckButton } from "src/components";
import { updateTask } from "src/api/tasks";
import styles from "src/components/TaskItem.module.css";
import { Link } from "react-router-dom";
import { UserTag } from "src/components";
import type { Task } from "src/api/tasks";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = () => {
    setLoading(true);
    updateTask({ ...task, isChecked: !task.isChecked, assignee: task.assignee?._id })
      .then((result) => {
        if (result.success) {
          setTask(result.data);
        } else {
          alert(result.error);
        }
        setLoading(false);
      })
      .catch((reason) => alert(reason));
  };

  return (
    <div className={styles.item}>
      {/* render CheckButton here */}

      <CheckButton checked={task.isChecked} onPress={handleToggleCheck} disabled={isLoading} />

      <div
        className={
          task.isChecked ? `${styles.textContainer} ${styles.checked}` : styles.textContainer
        }
      >
        <Link
          to={{
            pathname: `/task/${task._id}`,
          }}
          className={styles.titleLink}
        >
          <span className={styles.title}>{task.title}</span>
        </Link>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
      <div>
        <UserTag user={task.assignee} className={styles.userTag} />
      </div>
    </div>
  );
}
