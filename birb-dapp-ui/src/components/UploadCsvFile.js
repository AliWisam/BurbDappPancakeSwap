import React, { Fragment} from 'react';
import { DropzoneDialog } from 'material-ui-dropzone';
import {
  updateTopHoldersMetaMask,
  updateTopHoldersWalletConnect,
  updateTopHoldersBscWallet
} from '../services/AdditionalFunctions';

const UploadCsvFile = ({ open, setOpen, addr, contract }) => {
  // const [file, setFile] = useState([]);
  // const [data, setData] = useState([]);

  const handleFileClose = () => {
    setOpen(false);
  };

  let fileReader;
  var content;
  const handleFileRead = () => {
    content = fileReader.result;
    var arrayData = content.split('\n');
    // setData(content.split('\n'));
    var arrData = arrayData.map((data) => data.trim());
    var originalData = arrData.slice(0, arrayData.length - 1);
    // console.log(originalData);

    ////////////Call Wraper

    if (localStorage.getItem('wallet-header') === 'metamask') {
      updateTopHoldersMetaMask(addr, originalData);
    }if (localStorage.getItem('wallet-header') === 'binance') {
      updateTopHoldersBscWallet(addr, originalData);
    } else if (localStorage.getItem('walletconnect')) {
      updateTopHoldersWalletConnect(contract, originalData);
    }
  };

  const handleSave = (savedFile) => {
    //Saving files to state for further use and closing Modal.
    // setFile(savedFile[0]);
    setOpen(false);
    // //////////FileReader to read file
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(savedFile[0]);
  };

  return (
    <>
      <Fragment>
        <DropzoneDialog
          open={open}
          dialogTitle="Upload Csv"
          onSave={(savedFile, e) => handleSave(savedFile)}
          acceptedFiles={['.csv']}
          showPreviews={true}
          filesLimit={1}
          maxFileSize={5000000}
          //   showPreviewsInDropzone={true}
          onClose={handleFileClose}
        />
      </Fragment>
    </>
  );
};

export default UploadCsvFile;
