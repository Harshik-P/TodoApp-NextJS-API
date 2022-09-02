export const getServerSideProps = async context => {
    const data = await fetch(`https://task-manager-aryankush25.herokuapp.com/tasks`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBmMmQ5M2IxYTdhZTAwMTY1Mzk0YTQiLCJpYXQiOjE2NjIwMzY1NTR9.MHc26Om2Td0zFUE58TdHrz_HgB7xl527GInyE6XQPk0`
        },
    });
    let jsonData = await data.json();

    return {
        props: {
            jsonData,
        }
    }
}