import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Users() {

    const dataThParent = [
        "#",
        "username",
        "email",
        "role",
        "Action",
    ];

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/users', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then((res) => {
                const sortedUsers = res.data.data.sort((a, b) => a.email.localeCompare(b.email));
                setUsers(sortedUsers);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const columnDatabase = {
        "username": null,
        "email": null,
        "role": null,
    };

    const buttons = [
        "edit",
        "delete",
        "create",
        "trash",
    ];

    const endpoints = {
        "store": "http://localhost:8000/users/store",
        "trash": "http://localhost:8000/users/trash",
        "detail": "http://localhost:8000/users/{id}",
        "delete": "http://localhost:8000/users/delete/{id}",
        "update": "http://localhost:8000/users/update/{id}",
    };

    const columnDetailModalDelete = 'username';

    const judulModalEdit = 'Users';
 
    const inputData ={
        "email": {
            "type": "text",
            "options": null,
        },
        "username": {
            "type": "text",
            "options": null,
        },
        "password": {
            "type": "text",
            "options": null,
        },
        "role": {
            "type": "select",
            "options": ['admin', 'staff'],
        },
    };

    return (
        <>
            <Navbar />
            <div className="p-3">
                <Table dataTh={dataThParent} dataTd={users} columnDb={columnDatabase}
                    buttonData={buttons} endpoints={endpoints} columnDetail={columnDetailModalDelete}
                    judulModalEdit={judulModalEdit} inputData={inputData} />
            </div>
        </>
    );
}
