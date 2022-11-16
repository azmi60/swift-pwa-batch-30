import Button from '@common_button';
import PasswordField from '@common_password';
import Select from '@common_select';
import TextField from '@common_textfield';
import Typography from '@common_typography';
import useStyles from '@core_modules/register/pages/default/components/style';
import DateDayJs from '@date-io/dayjs';
import { breakPointsUp } from '@helper_theme';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import OtpBlock from '@plugin_otp';
import classNames from 'classnames';
import ReCAPTCHA from 'react-google-recaptcha';
import Box from '@material-ui/core/Box';
import useCustomStyles from './customStyle';

const RegisterView = ({
    t,
    formik,
    enableOtp,
    setdisabled,
    handleChangePhone,
    handleWa,
    handleChangeDate,
    phoneIsWa,
    enableRecaptcha,
    sitekey,
    handleChangeCaptcha,
    handleChangeWa,
    disabled,
    recaptchaRef,
    gender,
    dob,
}) => {
    const styles = useStyles();
    const customStyles = useCustomStyles();
    const desktop = breakPointsUp('sm');

    return (
        <Box className={customStyles.pageContainer}>
            <form className={classNames('col-md-6', styles.container)} onSubmit={formik.handleSubmit}>
                <TextField
                    id="register-firstname-textfield"
                    label={t('common:form:firstName')}
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.firstName && formik.errors.firstName)}
                    errorMessage={(formik.touched.firstName && formik.errors.firstName) || null}
                />
                <TextField
                    id="register-lastname-textfield"
                    label={t('common:form:lastName')}
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.lastName && formik.errors.lastName)}
                    errorMessage={(formik.touched.lastName && formik.errors.lastName) || null}
                />
                <TextField
                    id="register-email-textfield"
                    label="Email"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.email && formik.errors.email)}
                    errorMessage={(formik.touched.email && formik.errors.email) || null}
                />
                {gender && (
                    <Select
                        className="genderField"
                        options={[
                            { label: 'Male', value: 1 },
                            { label: 'Female', value: 2 },
                        ]}
                        label={t('common:form:gender')}
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        helperText={t('common:form:select')}
                        error={!!(formik.touched.gender && formik.errors.gender)}
                        errorMessage={(formik.touched.gender && formik.errors.gender) || null}
                    />
                )}
                {dob && (
                    <DatePicker
                        fullWidth
                        label={t('common:form:dob')}
                        name="dob"
                        value={formik.values.dob}
                        onChange={handleChangeDate}
                        error={!!(formik.touched.dob && formik.errors.dob)}
                        helperText={(formik.touched.dob && formik.errors.dob) || null}
                    />
                )}
                <PasswordField
                    id="register-password-passfield"
                    label="Password"
                    showVisible
                    showPasswordMeter
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.password && formik.errors.password)}
                    errorMessage={(formik.touched.password && formik.errors.password) || null}
                />
                <TextField
                    id="register-passwordConfirm-textfield"
                    label={t('common:form:confirm')}
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                    errorMessage={(formik.touched.confirmPassword && formik.errors.confirmPassword) || null}
                />
                {enableOtp ? (
                    <>
                        <OtpBlock
                            type="register"
                            setDisabled={setdisabled}
                            phoneProps={{
                                id: 'register-phonenumber-textfield',
                                name: 'phoneNumber',
                                value: formik.values.phoneNumber,
                                onChange: handleChangePhone,
                                error: !!(formik.errors.phoneNumber && formik.touched.phoneNumber),
                                errorMessage: (formik.touched.phoneNumber && formik.errors.phoneNumber) || null,
                            }}
                            codeProps={{
                                id: 'register-otp-textfield',
                                name: 'otp',
                                value: formik.values.otp,
                                onChange: formik.handleChange,
                                error: !!(formik.touched.otp && formik.errors.otp),
                                errorMessage: (formik.touched.otp && formik.errors.otp) || null,
                                footer: (
                                    <FormControlLabel
                                        onChange={handleWa}
                                        className={styles.checkWa}
                                        control={<Checkbox id="register-waRegitered-checkbox" name="whastapptrue" color="primary" size="small" />}
                                        label={<Typography variant="p">{t('register:isWhatsapp')}</Typography>}
                                    />
                                ),
                            }}
                        />
                        {!phoneIsWa && (
                            <TextField
                                id="register-waNumber-textfield"
                                type="phone"
                                label={`${t('common:form:phoneNumber')} Whatsapp`}
                                name="whatsappNumber"
                                value={formik.values.whatsappNumber}
                                onChange={handleChangeWa}
                                error={!!(formik.touched.whatsappNumber && formik.errors.whatsappNumber)}
                                errorMessage={(formik.touched.whatsappNumber && formik.errors.whatsappNumber) || null}
                            />
                        )}
                    </>
                ) : null}
                <div className={styles.footer}>
                    <FormControlLabel
                        value={formik.values.subscribe}
                        onChange={formik.handleChange}
                        name="subscribe"
                        control={<Checkbox id="register-newsletter-checkbox" name="subscribe" color="primary" size="small" />}
                        label={(
                            <Typography variant="p" letter="capitalize" className="row center">
                                {t('register:subscribe')}
                            </Typography>
                        )}
                        style={{ marginBottom: enableRecaptcha ? 25 : 0 }}
                    />

                    {enableRecaptcha ? (
                        <>
                            <ReCAPTCHA sitekey={sitekey} onChange={handleChangeCaptcha} ref={recaptchaRef} />
                            {formik.errors.captcha && <Typography color="red">{formik.errors.captcha}</Typography>}
                        </>
                    ) : null}
                    <Button
                        disabled={disabled}
                        fullWidth={!desktop}
                        className={styles.btnSigin}
                        id="register-btnRegister"
                        type="submit"
                        align={desktop ? 'left' : 'center'}
                    >
                        <Typography variant="span" type="bold" letter="uppercase">
                            {t('register:button')}
                        </Typography>
                    </Button>
                </div>
            </form>
            <IllustrationBox />
        </Box>
    );
};

const IllustrationBox = () => {
    const customStyles = useCustomStyles();

    return (
        <Box className={customStyles.illustrationBox}>
            <img className={customStyles.illustrationImg} alt="Shopping Cart Illustration" src="/assets/img/Shopping-cart_Monochromatic.svg" />
        </Box>
    );
};

const RegisterViewProvider = (props) => (
    <MuiPickersUtilsProvider utils={DateDayJs}>
        <RegisterView {...props} />
    </MuiPickersUtilsProvider>
);

export default RegisterViewProvider;
