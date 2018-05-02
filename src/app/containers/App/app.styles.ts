import { injectGlobal } from 'react-emotion';

export const appContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1600px',
    margin: 'auto',
    marginTop: '5%'
};

export const wrapperStyle = {
    display: 'flex',
    flexWrap: 'wrap'
}

injectGlobal`
    .react-datepicker__input-container,
    .react-datepicker-wrapper {
        display: block;
    }`;