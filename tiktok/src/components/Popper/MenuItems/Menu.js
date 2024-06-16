import Button from '~/components/Button';

function MenuItem({ data, onClick }) {
    const mystyle = {
        margin: '0',
        display: 'flex',
        flexdirection: 'column',
        justifyContent: 'flex-start',
    };
    return (
        <Button style={mystyle} letfIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

export default MenuItem;
