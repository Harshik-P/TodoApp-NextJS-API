import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home({ jsonData }) {

    let [todoItem, setTodoItem] = useState("");
    let [items, setItems] = useState([{}]);


    useEffect(() => {
        getTasks();
    })


    const getTasks = async () => {
        const data = await fetch(`https://task-manager-aryankush25.herokuapp.com/tasks`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBmMmQ5M2IxYTdhZTAwMTY1Mzk0YTQiLCJpYXQiOjE2NjIwMzY1NTR9.MHc26Om2Td0zFUE58TdHrz_HgB7xl527GInyE6XQPk0`
            },
        });
        let jsonData = await data.json();
        setItems(jsonData);
    }

    const handleAdd = async () => {
        if (todoItem) {
            const res = await fetch(`https://task-manager-aryankush25.herokuapp.com/tasks`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBmMmQ5M2IxYTdhZTAwMTY1Mzk0YTQiLCJpYXQiOjE2NjIwMzY1NTR9.MHc26Om2Td0zFUE58TdHrz_HgB7xl527GInyE6XQPk0`
                },
                body: JSON.stringify({ description: todoItem, completed: false }),
            });
            console.log(res, "added task");
            setTodoItem("");
            getTasks();
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
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBmMmQ5M2IxYTdhZTAwMTY1Mzk0YTQiLCJpYXQiOjE2NjIwMzY1NTR9.MHc26Om2Td0zFUE58TdHrz_HgB7xl527GInyE6XQPk0`
            },
            body: JSON.stringify({ completed: !completed }),
        });
        console.log(res)
        getTasks();

    }


    const handleDelete = async (id) => {
        const res = await fetch(`https://task-manager-aryankush25.herokuapp.com/tasks/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBmMmQ5M2IxYTdhZTAwMTY1Mzk0YTQiLCJpYXQiOjE2NjIwMzY1NTR9.MHc26Om2Td0zFUE58TdHrz_HgB7xl527GInyE6XQPk0`
            },
        });
        const data = await res.json();
        console.log(data)
        getTasks();
    }

    return (
        <div className={styles.Home}>
            <h1>TODO APP</h1>
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
                                        {/* <button> Update </button> */}
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
                                        {/* <button> Update </button> */}
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



export const getServerSideProps = async context => {
    // console.log("running");


    const res = await fetch(`https://task-manager-aryankush25.herokuapp.com/users/me`, {
        // credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBmMmQ5M2IxYTdhZTAwMTY1Mzk0YTQiLCJpYXQiOjE2NjIwMzY1NTR9.MHc26Om2Td0zFUE58TdHrz_HgB7xl527GInyE6XQPk0`
        },
    });
    const cont = await res.json();
    // console.log(cont);



    const data = await fetch(`https://task-manager-aryankush25.herokuapp.com/tasks`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBmMmQ5M2IxYTdhZTAwMTY1Mzk0YTQiLCJpYXQiOjE2NjIwMzY1NTR9.MHc26Om2Td0zFUE58TdHrz_HgB7xl527GInyE6XQPk0`
        },
    });
    let jsonData = await data.json();
    // console.log(jsonData);

    return {
        props: {
            jsonData,
        }
    }
}