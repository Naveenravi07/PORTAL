import React, { useState } from 'react'
import instance from '@/Helpers/axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

function RegistrationForm() {
    const router = useRouter()
    const [body] = useState({ items: [], })
    const events = ['Coding Challenge', 'Capture The Shot', 'Logo Quiz', 'PC ASSEMBLING DISASSEMBLING COMPETITION', 'VR & GAMING EXPERIENCE CENTRE', 'ENGINEERING DESIGN']
    const [isVrSelected, setIsVRSelected] = useState(false)

    async function handleRegister(e) {
        e.preventDefault()
        if (body.items) {
            body.items = body.items.map((item) => item.value)
        }
        instance.post('/admin/register', body)
            .then((response) => {
                toast("Applied Successfully")
                router.push(`/admin/registrationDetails/${response.data.data._id}`)
            })
            .catch((err) => toast("Error Occured"))
    }

    function getType(item) {
        if (['name', 'college', 'department'].includes(item)) return 'text'
        else if (item == 'email') return 'email'
        else if (item === 'phone') return 'tel'
        else return 'text'
    }

    return (

        <form style={{ display: 'flex', flexDirection: "column" }} >
            <h1>Registration</h1>
            {
                ['name', 'college', 'department', 'email', 'phone',].map((item) => {
                    return (
                        <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                                <label >
                                    {item}
                                </label>
                            </div>
                            <div >
                                <input id="inline-full-name" type={() => getType(item)} onChange={(e) => body[item] = e.target.value} />
                            </div>
                        </div>
                    )
                })
            }
            <div className='event_parent'>
                <label htmlFor="">Events</label>
                <select name="Event" id="" onChange={(e) => {
                    if (e.target.value == "VR & GAMING EXPERIENCE CENTRE") setIsVRSelected(true)
                    else setIsVRSelected(false)
                    body.event = e.target.value
                }}> Events
                    {
                        events.map((event, index) => {
                            return (
                                <option name={event}>{event}</option>
                            )
                        })
                    }
                </select>
            </div>

            {isVrSelected && <div className='item_parent'>
                {[{ value: "VR EXPIRENCE", count: 0 }, { value: "VR GAMING", count: 0 }, { value: "PS5", count: 0 }, { value: "STEERING WHEEL", count: 0 }].map((item) => {
                    return (
                        <button style={{ borderRadius: '10px', padding: '5px' }} onClick={(e) => {
                            e.preventDefault()
                            item.count = item.count + 1
                            if (item.count % 2 !== 0) {
                                body.items.push(item)
                                e.target.style.background = "#219ebc"
                            } else {
                                body.items.pop(item)
                                e.target.style.background = "white"
                            }
                        }}>{item.value}</button>
                    )
                })}
            </div>}
            <button onClick={(e) => handleRegister(e)} class='submitButton' type='submit'>Register</button>
        </form>

    )
}

export default RegistrationForm