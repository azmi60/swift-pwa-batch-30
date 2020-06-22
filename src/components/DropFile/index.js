import Typography from '@components/Typography';
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from '@i18n';

const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

const DropFile = ({
    label = 'Upload Files',
    title = '',
    showListFile = true,
    acceptedFile = 'image/*,.pdf,.doc,.docx,xls,xlsx,.zip,.rar',
    maxSize = 2000000,
    multiple = true,
    handleDrop = () => {},
    getBase64 = () => {},
    error = false,
}) => {
    const { t } = useTranslation(['common']);
    const [dropFile, setDropFile] = React.useState([]);
    const onDrop = useCallback((files) => {
        if (files && files.length > 0) {
            if (multiple) {
                setDropFile([...dropFile, ...files]);
            } else {
                setDropFile([files[0]]);
            }

            handleDrop(files);
        }
        // Do something with the files
    }, []);
    const onDropAccepted = async (files) => {
        // eslint-disable-next-line array-callback-return
        let filebase64 = [];
        for (let ind = 0; ind < files.length; ind += 1) {
            // eslint-disable-next-line no-await-in-loop
            const baseCode = await toBase64(files[ind]);
            if (baseCode) {
                filebase64 = [...filebase64, {
                    baseCode,
                    file: files[ind],
                }];
            }
        }
        getBase64(filebase64);
    };

    const messageError = `${t('common:fileUpload:reject') + acceptedFile}& max file ${maxSize / 1000000}Mb`;

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: acceptedFile,
        onDropAccepted,
        onDropRejected: () => window.toastMessage({
            open: true,
            text: messageError,
            variant: 'error',
        }),
        maxSize,
    });

    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        breturnWidth: 2,
        breturnRadius: 2,
        breturnColor: '#eeeeee',
        breturnStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'breturn .24s ease-in-out',
    };

    const activeStyle = {
        breturnColor: '#2196f3',
    };

    const acceptStyle = {
        breturnColor: '#00e676',
    };

    const rejectStyle = {
        breturnColor: '#ff1744',
    };

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
    }), [
        isDragActive,
        isDragReject,
        isDragAccept,
    ]);

    return (
        <div className="column">
            {
                title && title !== '' ? (<Typography variant="label" type="semiBold" color={error ? 'red' : 'default'}>{title}</Typography>)
                    : null
            }
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                {
                    isDragActive
                        ? <p>{t('common:fileUpload:dragActive')}</p>
                        : <p>{t('common:fileUpload:dragNonActive')}</p>
                }
            </div>
            <Typography color={error ? 'red' : 'default'}>{label}</Typography>
            <div className="column">
                {
                    showListFile && dropFile.length > 0 && dropFile.map((file, index) => (<Typography key={index}>{file.name}</Typography>))
                }
            </div>
        </div>
    );
};

export default DropFile;