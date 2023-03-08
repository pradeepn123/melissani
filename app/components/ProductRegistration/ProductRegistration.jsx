import React, {useState} from 'react';
import { Button } from '~/components';

export function ProductRegistration({data}) {
    // Using FormData
    // const form = document.getElementById('product-registration-form');
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
        phone: '',
        order_number: '',
        purchase_date: '',
        purchased_from: '-',
        notify_check: false
    });

    const inputsHandler = (event) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setInputField({ ...inputField, [name]: value});
    }

    function submitForm(event) {
        event.preventDefault();
        console.log("selected fields>", inputField)
    }

    function GetFieldObject(field_value){
        const data = field_value.field_value;
        return data.map((field_value_item, field_value_index) =>
            (
                <div className="relative z-0 w-full mb-6 group" key={field_value_index}>
                    <label htmlFor={field_value_item.id} className="block mb-2 text-sm font-medium field-label font-tertiary">{field_value_item.field_name}</label>
                    <input type={field_value_item.field_type} id={field_value_item.id} name={field_value_item.id} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg sm:text-md focus:ring-blue-500 focus:border-blue-500 field-input font-tertiary"
                            onChange={inputsHandler} value={inputField[field_value_item.id]} required/>
                </div>
            )
        )
    }
    return (
        <section className='product-registration-section h-full'>
            <div className="card grid">
                <h1 className="card-title font-primary">
                    {data.title}
                </h1>
                <form className="form" id="product-registration-form">
                {data.form_fields && data.form_fields.map((field_value, field_index) =>
                    <div key={field_index}>
                        {(field_value.name !== undefined || field_value.contact_details !== undefined || field_value.order_details !== undefined) &&
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <GetFieldObject field_value={field_value.name !== undefined ? field_value.name : field_value.contact_details !== undefined ? field_value.contact_details : field_value.order_details}/>
                            </div>
                        }
                        
                        { field_value.field_type === 'select' && (
                            <div className="grid md:grid-cols-1">
                                <div className="mb-6">
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
                            </div>
                        )}

                        {field_value.field_type === 'checkbox' && (
                            <div className="grid md:grid-cols-1">
                                <div className="mb-0">
                                    <input id={field_value.id} type="checkbox" defaultChecked={inputField[field_value.id]} className="w-4 h-4 border border-gray-300 rounded" 
                                        onChange={inputsHandler} />
                                    <label htmlFor={field_value.id} className="ml-2 text-sm font-medium checkbox-label font-tertiary">{field_value.field_name}</label>
                                </div>
                            </div>
                        )}
                            
                    </div>
                )}
                <Button type="submit" variant='primary' className='font-medium w-full submit-btn mb-6' onSubmit={submitForm}>{data.button_text}</Button>
                </form>
                <p className="warranty-text font-tertiary">
                    {data.warranty_text}
                    <span className="learn-more-text">
                        <a href={data.learn_more_link}>
                            {data.learn_more_text}
                        </a>
                    </span>
                </p>
            </div>
        </section>
    )
}
