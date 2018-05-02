export const formComponentStyles = {
    flex: '1 0 276px'
};

export const inputGroupStyles = {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 10px 10px 0'
};

export const groupHeaderStyles = {
    fontSize: '18px',
    margin: '20px 0',
    fontWeight: 'bold'
};

export const inputWrapperStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
};

export const inputComponentStyles = {
    flex: '1 0 250px',
    margin: '0 1rem 0 0',
};

export const inputComponentRequiredStyles = {
    color: '#dc3545'
}

export const inputStyles = `
    width: 100%;
    padding: 10px 0 10px 5px;
    border-radius: 5px;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    box-sizing: border-box;
    &:focus {
        color: #495057;
        background-color: #fff;
        border-color: #80bdff;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    }
`;

export const selectStyles = {
    padding: '13px 0 12px 5px',
    fontSize: '16px'
}

export const buttonStyles = `
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 14px;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin: 15px 15px 0 0;
    &:focus {
        border-color: #80bdff;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    }
`;


export const primaryButtonStyles = `
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    &:hover {
        text-decoration: none;
        color: #fff;
        background-color: #0069d9;
        border-color: #0062cc;
    }
    &:focus {
        border-color: #80bdff;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    }
`;