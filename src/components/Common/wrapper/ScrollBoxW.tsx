import ScrollBoxComponent from 'components/Common/scrollbox/ScrollBoxComponent';

export const ScrollBoxW = (props) => {
    return (
        <ScrollBoxComponent {...props} children={[]} childrenNew={props.children}/>
    );
};
