import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function UsersTrash() {
    const dataThParent = [
        "#",
        "username",
        "email",
        "role",
        "Action",
    ]

    const [users, setUsers] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/users/trash', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                setUsers(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const columnDatabase = {
        
        "username": null,
        "email": null,
        "role": null,
    }

    const buttons = [
        "restore",
        "permanent-delete",
    ]

    const endpoints = {
        "restore": "http://localhost:8000/users/trash/restore/{id}",
        "permanent-delete": "http://localhost:8000/users/trash/permanent-delete/{id}"
    }

    const columnDetailModalDelete = ''

    const judulModalEdit = ''

    const inputData = {}

    return (

        <>
            <Navbar />
            <div className="m-20 ">
                <Table dataTh={dataThParent} dataTd={users} columnDb={columnDatabase}
                buttonData={buttons} endpoints={endpoints} columnDetail={columnDetailModalDelete}
                judulModalEdit={judulModalEdit} inputData={inputData}
            />
            </div>
            
        </>
    )
}