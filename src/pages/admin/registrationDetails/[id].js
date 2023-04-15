import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import instance from '@/Helpers/axios'
import { toast } from 'react-toastify'


function registrationDetails() {
    const router = useRouter()
    const [data, setData] = useState(null)

    useEffect(() => {
        if (router.query.id === null || router.query.id == undefined) return
        else {
            instance.get('/admin/registration', { params: { id: router.query.id } })
                .then((response) => {
                    setData(response.data.data)
                })
                .catch((err) => toast("Error Occured"))
        }
    }, [router.query.id])


    const TextDisplay = ({ label, value }) => {
        return (
            <div className="flex justify-between items-center mb-4">
                <span className="font-medium font-medium w-24">{label}:</span>
                <span>{value}</span>
            </div>
        );
    };

    const markAsRead = async () => {
       await instance.patch('/admin/registration/markasread', null, { params: { id: router.query.id } })
            .then((response) => {
                setData(response.data)
                toast("Registration Marked As Read")
            }).catch((err) => {
                toast("Error Occured")
            })
    }

    return (
        <>
            {data !== null && <div className="h-screen flex flex-col items-center ">
                <h1 className="text-2xl font-bold mb-4">Registration Details</h1>
                <div className="border border-gray-300 rounded-lg p-4">
                    <TextDisplay label="Name" value={data.name} />
                    <TextDisplay label="College" value={data.college} />
                    <TextDisplay label="Department" value={data.department} />
                    <TextDisplay label="Email" value={data.email} />
                    <TextDisplay label="Phone" value={data.phone} />
                    <TextDisplay label="Event" value={data.event} />
                    <TextDisplay label="Items" value={`${data.items.map((item) => ` ${item}  `)} `} />
                    <div className="flex justify-end mt-4">
                        {data.valid === true && <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-4">
                            VALID
                        </button>}
                        <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded" onClick={()=>markAsRead()}>
                            Mark As Read
                        </button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default registrationDetails