import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { getTask } from "src/api/tasks";
import { Button, Page } from "src/components";
import { useParams } from "react-router-dom";
import type { Task } from "src/api/tasks";
import styles from "src/pages/TaskDetail.module.css";
import { TaskForm } from "src/components";
import { UserTag } from "src/components";

export function TaskDetail() {
  const [task, setTask] = useState<Task>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getTask(id)
        .then((result) => {
          if (result.success && result.data) {
            setTask(result.data);
            document.title = `${result.data.title} | TSE Todos`;
          } else {
            setIsError(true);
          }
        })
        .catch(() => {
          setIsError(true);
        });
    }
  }, [id]);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleFormSubmit = (updatedTask: Task) => {
    setTask(updatedTask);
    setIsEdit(false);
  };

  if (isError) {
    return (
      <Page>
        <Helmet>
          <title>Cannot find task</title>
        </Helmet>
        <Link to="/">Back to home</Link>
        <p>This task doesn&apos;t exist!</p>
      </Page>
    );
  }
  if (isEdit) {
    return (
      <Page>
        <Helmet>
          <title>Edit Task</title>
        </Helmet>
        <div className={styles.pageContentWrapper}>
          <TaskForm mode={"edit"} task={task} onSubmit={handleFormSubmit} />
        </div>
      </Page>
    );
  }
  if (!isEdit) {
    return (
      <Page>
        <Helmet>
          <title>Task Detail</title>
        </Helmet>
        <div className={styles.pageContentWrapper}>
          <p>
            {/* `<Link>` renders an `<a>` element with a correct `href` attribute
        but uses the react-router library's client-side routing so the new page
        loads faster (see https://reactrouter.com/en/main/components/link) */}
            <Link to="/">Back to home</Link>
          </p>
          <div className={styles.titleDiv}>
            <div className={styles.titleTextDiv}>
              <span className={styles.formTitle}>{task?.title}</span>
            </div>
            <div>
              <Button kind="primary" type="button" label="Edit task" onClick={handleEdit} />
            </div>
          </div>

          <div className={styles.descriptionDiv}>
            <p className={styles.descriptionText}>{task?.description}</p>
          </div>

          <div className={styles.assigneeContainer}>
            <p className={styles.assigneeText}>Assignee</p>
            <div className={styles.userTagContainer}>
              <UserTag user={task?.assignee} />
              {/* <div className={styles.photoContainer}>
              <p>Pho</p>
            </div> */}
              {/* <div className={styles.usernameTextContainer}>
              <p className={styles.usernameText}>{task?._id}</p>
            </div> */}
            </div>
          </div>

          <div className={styles.statusContainer}>
            <p className={styles.statusLeftText}>Status</p>
            <div className={styles.statusRightContainer}>
              {task?.isChecked ? (
                <p className={styles.statusRightText}>Done</p>
              ) : (
                <p className={styles.statusRightText}>Not done</p>
              )}
            </div>
          </div>

          <div className={styles.dateContainer}>
            <p className={styles.dateLeftText}>Date Created</p>
            <div className={styles.dateRightContainer}>
              <p className={styles.dateRightText}>
                {new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(
                  task?.dateCreated,
                )}
              </p>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
