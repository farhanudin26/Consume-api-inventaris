import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Table({ dataTh, dataTd, columnDb, buttonData, endpoints, columnDetail, judulModalEdit, inputData }) {
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [endpointReplaced, setEndpointReplaced] = useState({});
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);

    function handleModalDelete(id) {
        //ambil data endpoint
        const endpointsDetail = endpoints['detail'];
        const endpointsDelete = endpoints['delete'];
        //replace/ganti {id} dari endpoint dengan id yang diklik
        const detailReplaced = endpointsDetail.replace('{id}', id);
        const deleteReplaced = endpointsDelete.replace('{id}', id);

        //simpan di object baru
        const replaced = {
            "detail": detailReplaced,
            "delete": deleteReplaced
        }

        //kirim ke state
        setEndpointReplaced(replaced);
        //ubah state agar modal tampil
        setIsOpenModalDelete(true);
    }

    function handleModalEdit(id) {
        //ambil data endpoint
        const endpointsDetail = endpoints['detail'];
        const endpointsUpdate = endpoints['update'];
        //replace/ganti {id} dari endpoint dengan id yang diklik
        const detailReplaced = endpointsDetail.replace('{id}', id);
        const updateReplaced = endpointsUpdate.replace('{id}', id);

        //simpan di object baru
        const replaced = {
            "detail": detailReplaced,
            "update": updateReplaced
        }

        //kirim ke state
        setEndpointReplaced(replaced);
        //ubah state agar modal tampil
        setIsOpenModalEdit(true);
    }

    function handleModalAdd() {
        const replaced = {
            "store": endpoints['store']
        }
        setEndpointReplaced(replaced)
        setIsOpenModalAdd(true)
    }

    const navigate = useNavigate();

    function handleRestore(id) {
        //ubah {id} menjadi id yang di klik
        const endpointRestore = endpoints['restore'].replace("{id}", id)
        axios.get(endpointRestore, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                //ketika berhasil, arahkab   n ke path /stuffs
                navigate('/stuffs','/users')
            })
            .catch(err => {
                console.log(err)
            })
    }
    


    return (
        <>
        <br></br><br></br>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg"><br></br>
                <div className="flex justify-end mb-5">
                    {
                        buttonData.includes("create") ? (
                            <button onClick={handleModalAdd} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 
                    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create</button>

                        ) : ''
                    }
                    {
                        buttonData.includes("trash") ? (
                            <Link to={'/stuffs/trash'} class="f ml-3 focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 
                    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Trash</Link>

                        ) : ''
                    }
                    {
                        buttonData.includes("trash") ? (
                            <Link to={'/users/trash'} class="f ml-3 focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 
                    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Trash | users</Link>

                        ) : ''
                    }
                </div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {dataTh.map((data, index) => (
                                <th scope="col" class="px-6 py-3 dark:text-black" key={index}>{data}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(dataTd).map(([index, value]) => (
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700  hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td class="px-6 py-4 "> {parseInt(index) + 1}.</td>
                                    {
                                        Object.entries(columnDb).map(([i, v]) => (
                                            <td class="px-6 py-4">{
                                                !v ? value[i] : value[i.replace(/[!@#$%^&*]/, '')] ? value[i.replace(/[!@#$%^&*]/, '')][v] : '0'
                                            } </td>
                                        ))
                                    }
                                    <td class="px-6 py-4">
                                        {
                                            buttonData.includes("edit") ? (
                                                <a onClick={() => handleModalEdit(value.id)} href="#" class="font-medium text-blue-600
                                     dark:text-blue-500 hover:underline">Edit | </a>
                                            ) : ''
                                        }
                                        {
                                            buttonData.includes("delete") ? (
                                                <a onClick={() => handleModalDelete(value.id)} href="#" class="font-medium text-red-600
                                     dark:text-red-500 hover:underline"> Delete</a>
                                            ) : ''
                                        }
                                        {
                                            buttonData.includes("restore") ? (
                                                <a onClick={() => handleRestore(value.id)} href="#" class="font-medium text-green-600
                                     dark:text-green-500 hover:underline"> Restore | </a>
                                            ) : ''
                                        }
                                        {
                                            buttonData.includes("permanent-delete") ? (
                                                <a href="#" class="font-medium text-red-600
                                     dark:text-red-500 hover:underline"> Permanent  Delete</a>
                                            ) : ''
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <ModalDelete isOpen={isOpenModalDelete}
                closeModal={() => setIsOpenModalDelete(false)} endpoints={endpointReplaced} columnDetail={columnDetail} />
            <ModalEdit isOpen={isOpenModalEdit} closeModal={() => setIsOpenModalEdit(false)} judulModal={judulModalEdit} inputData={inputData}
                endpoints={endpointReplaced} />
            <ModalAdd isOpen={isOpenModalAdd} closeModal={() => setIsOpenModalAdd(false)} judulModal={judulModalEdit}
                inputData={inputData} endpoints={endpointReplaced} />
        </>
    );
}
