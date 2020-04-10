import React from 'react';

function Input ({ type, name,placeholder, onChange, onBlur, value, error, touched, message }) {
    const classnames = (error && touched) ?
        "form-control is-invalid" :
        (value && touched) ? "form-control is-valid" : "form-control";
    return (
        <div className="input-group mb-3">
            <input
                className={classnames}
                placeholder={placeholder}
                type={type}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                required
            />
            <div className="invalid-feedback">
                { error }
            </div>
        </div>
    )
}

export default Input;