import React from 'react';
import classnames from 'classnames';
function Alert (props){
    const { type, message } = props;
    
    return (
        <div className={classnames("alert", type)} role="alert">
            {message}
        </div>
    )
}

export default Alert;