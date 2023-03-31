import React, { useState, useRef } from 'react';
import { Button } from '~/components';

import { useForm, ValidationError } from '@formspree/react';


export function ProductRegistration({data}) {

    const formRef = useRef(null);
    const [state, handleSubmit] = useForm("xeqwlwwz");

    function GetFieldObject(field_value){
        const data = field_value.field_value;
        return data.map((field_value_item, field_value_index) => <div
            className="relative z-0 w-full mb-6 group"
            key={`product-registration-${field_value_index}`}
        >
            <label
                htmlFor={field_value_item.id}
                className="block mb-2 text-sm font-medium field-label font-tertiary"
            >
                {field_value_item.field_name}
            </label>
            <input
                type={field_value_item.field_type}
                id={field_value_item.id}
                name={field_value_item.id}
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg sm:text-md focus:ring-blue-500 focus:border-blue-500 field-input font-tertiary"
                required
            />
        </div>)
    }

    if (state.succeeded) {
        return <section className='contact-section h-full'>
            <div className="card grid">
                <h1 className="card-title font-primary">
                    Thank you for your registration request.
                </h1>
            </div>
        </section>
    }

    return (
        <section className='product-registration-section h-full'>
            <div className="card grid">
                <h1 className="card-title font-primary">
                    {data.title}
                </h1>
                <form
                    className="form"
                    id="product-registration-form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    {data.form_fields && data.form_fields.map((field_value, field_index) => <div
                        key={`product-registration-form-${field_index}`}
                    >
                        {(field_value.name !== undefined || field_value.contact_details !== undefined || field_value.order_details !== undefined) && <div
                            className="grid md:grid-cols-2 md:gap-6"
                        >
                            <GetFieldObject
                                field_value={field_value.name !== undefined ? field_value.name : field_value.contact_details !== undefined ? field_value.contact_details : field_value.order_details}
                            />
                        </div>}

                        {field_value.field_type === 'select' && <div
                            className="grid md:grid-cols-1"
                        >
                            <div className="mb-6">
                                <label
                                    htmlFor={field_value.id}
                                    className="block mb-2 text-sm font-medium field-label font-tertiary"
                                >
                                    {field_value.field_name}
                                </label>
                                <select
                                    id={field_value.id}
                                    name={field_value.id}
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 field-input font-tertiary"
                                    required
                                >
                                    {field_value.select_options.map((option_item, option_index) => <option
                                        key={`select-options-${option_index}-${field_value.id}`}
                                        value={option_item.option}
                                    >
                                        {option_item.option}
                                    </option>)}
                                </select>
                            </div>
                        </div>}

                        {field_value.field_type === 'checkbox' && <div
                            className="grid md:grid-cols-1"
                        >
                            <div className="mb-0">
                                <input
                                    id={field_value.id}
                                    type="checkbox"
                                    defaultChecked
                                    className="w-4 h-4 border border-gray-300 rounded" 
                                />
                                <label
                                    htmlFor={field_value.id}
                                    className="ml-2 text-sm font-medium checkbox-label font-tertiary"
                                >
                                    {field_value.field_name}
                                </label>
                            </div>
                        </div>}
                    </div>)}
                    <Button
                        type="submit"
                        variant='primary'
                        className='font-medium w-full submit-btn mb-6'
                    >
                        {data.button_text}
                    </Button>
                </form>
                <p className="warranty-text font-tertiary">
                    {data.warranty_text}
                    <span className="learn-more-text learn_more_text cursor-pointer">
                        <a href={data.learn_more_link}>
                            {data.learn_more_text}
                        </a>
                    </span>
                </p>
            </div>
        </section>
    )
}
