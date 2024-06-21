import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import ImageModal from "../components/ImageModal";
import axios from "axios";

export default function Inbound() {
    const dataThParent = [
        "#",
        "stuff_id",
        "Total",
        "Waktu",
        "proof_file",
        "Action"
    ];

    const [inbound, setInbound] = useState([]);
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/inbound-stuffs/data', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                setInbound(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleImageClick = (imageSrc) => {
        setImageSrc(imageSrc);
        setShowImageModal(true);
    };

    const columnDatabase = {
        "stuff_id": null,
        "total": null,
        "date": null,
        "proof_file": null,
    };

    const buttons = [
        "edit",
        "delete",
        "create",
        "trash"
    ];

    const endpoints = {
        "detail": "http://localhost:8000/inbound-stuffs/{id}",
        "delete": "http://localhost:8000/inbound-stuffs/delete/{id}",
        "update": "http://localhost:8000/inbound-stuffs/update/{id}",
        "store": "http://localhost:8000/inbound-stuffs/store",
        "trash": "http://localhost:8000/inbound-stuffs/trash",
    };

    const columnDetailModalDelete = 'name';

    const judulModalEdit = 'Inbound';

    const inputData = {
        "stuff_id": {
            "type": "text",
            "options": null,
        },
        "total": {
            "type": "int",
            "options": null
        },
        "date": {
            "type": "date",
            "options": null
        },
        "proof_file": {
            "type": "file",
            "options": null
        },
    };

    return (
        <>
            <Navbar />
            <div className="p-10"><br></br>
                <Table
                    dataTh={dataThParent}
                    dataTd={inbound}
                    columnDb={columnDatabase}
                    buttonData={buttons}
                    endpoints={endpoints}
                    columnDetail={columnDetailModalDelete}
                    judulModalEdit={judulModalEdit}
                    inputData={inputData}
                    handleImageClick={handleImageClick}
                />
            </div>
            <ImageModal
                show={showImageModal}
                imageSrc={imageSrc}
                onClose={() => setShowImageModal(false)}
            />
        </>
    );
}
