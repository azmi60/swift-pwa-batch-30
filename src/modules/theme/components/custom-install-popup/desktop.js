import Button from '@material-ui/core/Button';
import useStyles from '@core_modules/theme/components/custom-install-popup/style';
import TagManager from 'react-gtm-module';

const DesktopInstall = ({ installMessage = 'Install' }) => {
    const styles = useStyles();

    const onClick = () => {
        const timestamp = Date.now();
        const identifier = `${(Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100))}_${timestamp}`;
        const dataLayer = {
            event: 'countPopupInstallation',
            eventCategory: 'Count Popup Installation',
            eventAction: 'Installed',
            eventLabel: 'installPWA',
            eventValue: identifier,
        };
        TagManager.dataLayer({ dataLayer });
    };

    return (
        <div id="popup-desktop__install" className={styles.popupInstallDesktop}>
            {installMessage}
            {' '}
            <Button
                id="btn-install"
                variant="contained"
                color="primary"
                className={styles.btnInstallDesktop}
                onClick={onClick}
            >
                Install
            </Button>
        </div>
    );
};

export default DesktopInstall;
