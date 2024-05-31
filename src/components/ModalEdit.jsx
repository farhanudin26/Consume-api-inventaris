import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ModalEdit({ isOpen, closeModal, judulModal, inputData, endpoints }) {

    if (!isOpen) {
        return null;
    }

    const [dataDetail, setDataDetail] = useState({});
    
    useEffect(() => {
        axios.get(endpoints['detail'], {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                const data = res.data.data;
                data.password = "";  // Kosongkan nilai password
                setDataDetail(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [endpoints]);

    function handleChange(e) {
        const { name, value } = e.target;
        setDataDetail(dataSebelumnya => ({
            ...dataSebelumnya,
            [name]: value
        }));
    }

    function handleUpdate(e) {
        e.preventDefault();
        const dataToUpdate = { ...dataDetail, password: dataDetail.password || "" };  // ketika di edit password di modal nya kosong,kalau ga di update masih pake pw yg lama kalo pw nya di isi pake pw yg baru
        axios.patch(endpoints['update'], dataToUpdate, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="relative p-2 w-full max-w-xs max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Edit Data {judulModal}
                            </h3>
                            <button onClick={closeModal} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm 
                            w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-3 md:p-4">
                            <form className="space-y-3" onSubmit={handleUpdate}>
                                {
                                    Object.entries(inputData).map(([index, item]) => (
                                        <div className="mb-4" key={index}>
                                            {
                                                item.type === "select" ? (
                                                    <div>
                                                        <label htmlFor={index} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{index}</label>
                                                        <select id={index} name={index} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-600
                                                         dark:border-gray-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={dataDetail[index]} onChange={handleChange}>
                                                            <option hidden selected disabled>Select {index}</option>
                                                            {
                                                                item.options.map((opt, i) => (
                                                                    <option key={i} value={opt}>{opt}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label htmlFor={index} className="block text-sm font-medium text-gray-900 dark:text-white capitalize mb-1">{index}</label>
                                                        <input type={item.type} name={index} id={index} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5
                                                         dark:bg-gray-600 dark:border-gray-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={dataDetail[index]} onChange={handleChange} />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ))
                                }
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Data</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
