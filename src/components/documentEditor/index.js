import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { registerLicense } from '@syncfusion/ej2-base';
import { useRef } from 'react';

DocumentEditorContainerComponent.Inject(Toolbar);
const LICENSE_KEY = process.env.REACT_APP_SYNCFUSION_LICENSE_KEY;

// Registering Syncfusion license key
registerLicense(LICENSE_KEY);

const DocumentEditorDialog = ({ docFile, setisdocLoaded, docRef, uisettings }) => {
  const spreadRef = useRef(null);

  const handleCreated = () => {
    if (!docFile) {
      return;
    }
    initialize();
  };

  const initialize = () => {
    fetch(docFile)
      .then((res) => res.blob())
      .then((myBlob) => {
        function convertBlobToFile(blob, fileName) {
          if (blob) {
            blob.lastModifiedDate = new Date();
            blob.name = fileName;
          }
          return blob;
        }
        const myFile = convertBlobToFile(myBlob, 'testdoc');
        loadFile(myFile);
      });

    // convert docx file to sdft format and load it in editor
    const loadFile = (file) => {
      const ajax = new XMLHttpRequest();
      ajax.open('POST', 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/Import', true);
      ajax.onreadystatechange = () => {
        if (ajax.readyState === 4) {
          if (ajax.status === 200 || ajax.status === 304) {
            // open SFDT text in document editor
            docRef.current?.documentEditor.open(ajax.responseText);
          }
        }
      };
      const formData = new FormData();
      formData.append('files', file);
      ajax.send(formData);
    };
  };

  return (
    <>
      {/* {(fileExtension === 'docx' || fileExtension === 'doc') && ( */}

      <DocumentEditorContainerComponent
        id="container"
        height={'740px'}
        ref={docRef}
        created={handleCreated}
        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
        enableToolbar={true}
        restrictEditing={uisettings?.formName === 'view-doc-template' ? true : false}
      />
      {/* )} */}
    </>
  );
};
export default DocumentEditorDialog;
