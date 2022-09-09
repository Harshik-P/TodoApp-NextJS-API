import { useState } from 'react'
import { getUserJWT } from './api/user';
import styles from '../styles/Home.module.css'
import { removeTokenCookie } from '../src/auth/tokenCookies';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, getAddTasks, getToggleTasks, getDeleteTasks } from '../store/actions/tasks';

export default function Home({ userJWT }) {

    let [todoItem, setTodoItem] = useState("");
    const items = useSelector((state) => state.allTasks.tasks);
    const dispatch = useDispatch();

    const router = useRouter();

    dispatch(getTasks(userJWT));

    const handleGetTasks = async () => {
        dispatch(getTasks(userJWT));
    }

    const handleAdd = async () => {
        if (todoItem) {
            setTodoItem("");
            dispatch(getAddTasks({ userJWT, todoItem }));
        }
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    }


    const handleToggle = async (id, completed) => {
        dispatch(getToggleTasks({ userJWT, id, completed }));
    }


    const handleDelete = async (id) => {
        dispatch(getDeleteTasks({ userJWT, id }));
    }


    const handleLogout = () => {
        console.log("pressing");
        removeTokenCookie();
        router.replace('/');
    }

    return (
        <div className={styles.Home}>
            <div className={styles.logout}>
                <h1 className={styles.heading}>TODO APP</h1>
                <button className={styles.logout_button} onClick={handleLogout}> Logout </button>
            </div>
            <div>
                <input type="text" className={styles.inputField}
                    value={todoItem}
                    placeholder="Create task"
                    onChange={(e) => setTodoItem(e.target.value)}
                    onKeyDown={handleEnter}
                ></input>
            </div>

            <div className={styles.ulList}>
                <ul className={styles.itemListActive}>
                    {
                        items.filter(({ completed, description, _id }) => completed == false)
                            .map(({ _id, description, completed }) => (
                                <div className={styles.layout}>
                                    <div className={styles.task_disp}>
                                        <li className={styles.eachItem} key={_id} onClick={() => handleToggle(_id, completed)}>{description}</li>
                                    </div>
                                    <div className={styles.buttons}>
                                        <button onClick={() => handleDelete(_id)}> Delete </button>
                                    </div>
                                </div>
                            ))
                    }
                </ul>
                <ul className={styles.itemListInActive}>
                    {
                        items.filter(({ completed, description, _id }) => completed == true)
                            .map(({ _id, description, completed }) => (
                                <div className={styles.layout}>
                                    <div className={styles.task_disp_inactive}>
                                        <li className={styles.eachItem} key={_id} onClick={() => handleToggle(_id, completed)}>{description}</li>
                                    </div>
                                    <div className={styles.buttons}>
                                        <button onClick={() => handleDelete(_id)}> Delete </button>
                                    </div>
                                </div>
                            ))
                    }
                </ul>

            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const userJWT = await getUserJWT(context.req);

    if (!userJWT) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            userJWT: userJWT
        }
    }
}