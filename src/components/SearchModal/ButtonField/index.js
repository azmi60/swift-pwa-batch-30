import Button from '@Button';
import Typography from '@Typography';
import useStyles from './style';

const ButtonField = ({ placeholder = '', onClick }) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <Button
                variant="text"
                onClick={onClick}
                className={styles.searchButton}
            >
                <Typography
                    variant="span"
                    type="semiBold"
                    className={styles.placeholder}
                >
                    {placeholder}
                </Typography>
            </Button>
        </div>
    );
};

export default ButtonField;
