import { useEffect, useState } from 'react'
import { getUserJWT } from './api/user';
import styles from '../styles/Home.module.css'
import { removeTokenCookie } from '../src/auth/tokenCookies';
import { Router, useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { addTasks, deleteTasks, toggleTasks, getTasks } from '../store/action';
import { wrapper } from '../store/store.js';

export default function Home({ userJWT }) {

    let [todoItem, setTodoItem] = useState("");
    const items = useSelector((state) => state.allTasks.tasks);
    const dispatch = useDispatch();

    const router = useRouter();

    console.log(userJWT);
    useEffect(() => {
        handleGetTasks();
    }, [])


    const handleGetTasks = async () => {
        const data = await fetch(`https://task-manager-aryankush25.herokuapp.com/tasks`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userJWT}`,
            },
        });
        let jsonData = await data.json();
        console.log(jsonData)
        dispatch(getTasks(jsonData));
    }

    const handleAdd = async () => {
        if (todoItem) {
            const res = await fetch(`https://task-manager-aryankush25.herokuapp.com/tasks`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userJWT}`,
                },
                body: JSON.stringify({ description: todoItem, completed: false }),
            });
            let jsonData = await res.json();
            console.log(jsonData, "added task");
            setTodoItem("");
            dispatch(addTasks(jsonData));
        }
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    }


    const handleToggle = async (id, completed) => {
        const res = await fetch(`https://task-manager-aryankush25.herokuapp.com/tasks/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userJWT}`,
            },
            body: JSON.stringify({ completed: !completed }),
        });
        let jsonData = await res.json();
        console.log(jsonData)
        dispatch(toggleTasks(jsonData));
    }


    const handleDelete = async (id) => {
        const res = await fetch(`https://task-manager-aryankush25.herokuapp.com/tasks/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userJWT}`,
            },
        });
        const data = await res.json();
        console.log(data)
        dispatch(deleteTasks(data));
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

export const getServerSideProps = wrapper.getServerSideProps(() => async (context) => {
    const userJWT = getUserJWT(context.req);
    return {
        props: {
            userJWT: userJWT
        }
    }
});