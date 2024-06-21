import React, { memo, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function Lending() {
    const dataThParent = [
        "#",
        "stuff_id",
        "Name",
        "Waktu",
        "user_id",
        "notes",
        "total",
        "Action"
    ];

    const [lendings, setLending] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/lendings', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                setLending(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const columnDatabase = {
        "stuff_id": null,
        "name": null,
        "date_time": null,
        "user_id": null,
        "notes": null,
        "total_stuff": null
    };

    const buttons = [
        "edit",
        "delete",
        "create",
    ];

    const endpoints = {
        "detail": "http://localhost:8000/lendings/{id}",
        "delete": "http://localhost:8000/lendings/delete/{id}",
        "update": "http://localhost:8000/lendings/update/{id}",
        "store": "http://localhost:8000/lendings/store",
    };

    const columnDetailModalDelete = 'stuff_id';

    const judulModalEdit = 'Lending';

    const inputData = {
        "stuff_id": {
            "type": "int",
            "options": null,
        },
        "name": {
            "type": "text",
            "options": null
        },
        "date_time": {
            "type": "datetime-local",
            "options": null
        },
        "notes": {
            "type": "text",
            "options": null
        },
        "total_stuff": {
            "type": "text",
            "options": null
        },
    };

    return (
        <>
            <Navbar />
            <div className="p-10"><br></br>
                <Table
                    dataTh={dataThParent}
                    dataTd={lendings}
                    columnDb={columnDatabase}
                    buttonData={buttons}
                    endpoints={endpoints}
                    columnDetail={columnDetailModalDelete}
                    judulModalEdit={judulModalEdit}
                    inputData={inputData}
                />
            </div>
        </>
    );
}
