import React, {useState} from 'react';
import { Button } from '~/components';

export function ProductRegistration({data}) {

    // Using FormData
    // const form = document.getElementById('contact-form');
    // const data = new FormData(form);
    // var object = {};
    // data.forEach(function (value, key) {
    //     object[key] = value;
    // });
    // console.log(JSON.stringify(object));

    const [inputField , setInputField] = useState({
        first_name: '',
        last_name: '',
        email: '',
        purchased: '-',
        purchased_from: '-',
        message: ''
    });

    const inputsHandler = (event) =>{
        setInputField({ ...inputField, [event.target.name]: event.target.value });
    }

    function submitForm(event) {
        event.preventDefault();
        console.log("selected fields>", inputField)
    }
    return (
        <section className='contact-section h-full'>
            <div className="card grid">
                <h1 className="card-title font-primary">
                    {data.title}
                </h1>
                <form className="contact-form" id="contact-form">
                    <div className="grid md:grid-cols-2 md:gap-6">
                    {data.form_fields && data.form_fields[0]?.name.map((field_value, field_index) =>
                        (<div className="relative z-0 w-full mb-6 group" key={field_index}>
                            <label htmlFor={field_value.id} className="block mb-2 text-sm font-medium field-label font-tertiary">{field_value.field_name}</label>
                            <input type={field_value.field_type} id={field_value.id} name={field_value.id} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg sm:text-md focus:ring-blue-500 focus:border-blue-500 field-input font-tertiary"
                                onChange={inputsHandler} value={inputField[field_value.id]} required/>
                        </div>))}
                    </div>
                    {data.form_fields && data.form_fields.map((field_value, field_index) =>
                    ( field_value !== 'name' &&
                        <div className="grid md:grid-cols-1" key={field_index}>
                            { field_value.field_type === 'email' && <div className="mb-6" key={field_index}>
                                <label htmlFor={field_value.id} className="block mb-2 text-sm font-medium field-label font-tertiary">{field_value.field_name}</label>
                                <input type={field_value.field_type} id={field_value.id} name={field_value.id} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg sm:text-md focus:ring-blue-500 focus:border-blue-500 field-input font-tertiary"
                                    onChange={inputsHandler} value={inputField[field_value.id]} required/>
                            </div> }
                            { field_value.field_type === 'select' && <div className="mb-6" key={field_index}>
                                <label htmlFor={field_value.id} className="block mb-2 text-sm font-medium field-label font-tertiary">{field_value.field_name}</label>
                                <select id={field_value.id} name={field_value.id} className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 field-input font-tertiary"
                                    onChange={inputsHandler} required>
                                    <option value="" hidden>{inputField[field_value.id]}</option>
                                    {field_value.select_options.map((option_item, option_index) => (
                                        <option key={option_index} value={option_item.option}>
                                            {option_item.option}
                                        </option>)
                                    )}
                                </select>
                            </div>
                            }
                            {field_value.field_type === 'textarea' && <div className="mb-6" key={field_index}>
                                <label htmlFor={field_value.id} className="block mb-2 text-sm font-medium field-label font-tertiary">{field_value.field_name}</label>
                                <textarea id={field_value.id} name={field_value.id} rows="4" className="block p-4 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 field-input font-tertiary" placeholder="Type here..."
                                    onChange={inputsHandler} value={inputField[field_value.id]} required></textarea>
                            </div>}
                        </div>
                    ))}
                    <Button type="submit" variant='primary' className='font-medium w-full submit-btn' onSubmit={submitForm}>{data.button_text}</Button>
                </form>
            </div>
        </section>
    )
}
