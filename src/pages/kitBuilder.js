import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, NavDropdown } from 'react-bootstrap';
import { Alert as AlertBootstrap } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { filter } from 'smart-array-filter';
import DataTable from 'react-data-table-component';

import { ConfirmKitBuilder } from '../components/Formik/AllForms/confirmKitBuilder';
import HemaHeadingWithSubText from '../utils/HemaHeadingWithSubText';
import { Button, FormSearch, Alert, HemaValue, Pagination, FilterColumn } from '../utils';
import Spinner from 'react-bootstrap/Spinner';
import actionDots from '../../src/assets/images/actionDots.svg';
import {
  Add,
  RowExpand,
  ActionDots,
  RowCollapsed,
  AddInventoryPurple,
  ExpiryAlertPurple,
  CopyDocumentPurple,
  DeletePurple,
  CreateTranslation,
  CreateItemPurple,
  CopyColor,
  DeleteColor,
  KitTemplate,
  DocTemplate,
  Delete,
  ViewIcon,
  Art,
  Copy,
  Assemblies,
  Next,
} from '../HemeIconLibrary';
import { inventoryKitBuilder } from '../components/Formik/AllForms/inventoryKitbuilder';
import { addAssembly } from '../components/Formik/AllForms/addAssembly';

import FormContainer from '../components/Formik/formContainer';
import { quantityChcek, itemValidator } from '../components/Formik/allFormValidation';
import { Remove } from '../components/Formik/AllForms/remove';
import { setForm, setFormName, editFormReducer, setFormCloseReducer, showSuccessReducer, setFormLoaderReducer } from '../Store/reducers/uiSettings';
import { createNewItem } from '../components/Formik/AllForms/createNewItem';
import { addDocTemplate } from '../components/Formik/AllForms/createDocTemplate';
import { addDocTemplateLang } from '../components/Formik/AllForms/createDocTranslation';
import { KitTemplateColumn, AssemblyDataTable, DocumentTemplateDataTable } from '../components/Tables';
import { Confirm, Cancel } from '../HemeIconLibrary';
import { getAllItemAction, uploadFileItemAction, updateNewItemAction } from '../Actions/inventory';
import { droptownItemsForAssemblyAction, getAllInventoryLanguages } from '../Actions/common';
import { getAssemblyInboundConditionAction } from '../Actions/logistic';
import { setDropdownValue } from '../Store/reducers/common';
import DocumentEditor from '../components/documentEditor';
import { createKitBuilderAction, getKitBuilderAction, buildNewKitAction, removeBuildKitAction } from '../Actions/kitBuilder';
import { getTestingLabsAction, getAssembliesTypeAction, createAssemblyAction, getAllAssembliesAction, removeAssemblyAction, removeAssemblyItemAction } from '../Actions/assembly';
import {
  getAlldocTemplateAction,
  createDocTemplateAction,
  removeDocTemplateAction,
  getdocTemplateType,
  createDocTempVersionAction,
  updateDocTemplateFileAction,
  removeDocVersionAction,
  mergfieldsByType,
  getdocCopyNameAction,
} from '../Actions/documentTemplate';
import { sortedData } from '../helpers/sort';
import { setKitTemplateFilter } from '../Store/reducers/kitBuilder';
import { setdocTemplateFilter } from '../Store/reducers/documentTemplate';
export const ExpendedDataRows = ({ data }) => {
  return (
    <div className=" w-full py-[10px]  border-b border-[#DEE2E6]">
      <DataTable
        customStyles={{
          table: {
            style: { background: 'transparent !important', border: 'none' },
          },
          head: { style: { display: 'none' } },
          cells: {
            style: {
              // borderBottom:"none",
              // flexGrow: '1 !important',
              // justifyContent: 'left !important',
            },
          },
          rows: {
            style: {
              borderBottom: 'none !important',
              paddingLeft: '50px',
              paddingRight: '100px',
            },
          },
        }}
        data={data.items}
        columns={[
          {
            selector: (row, index) => <HemaValue text={`${index + 1}. ${row?.name}`} />,
          },
          {
            selector: (row) => <HemaValue text={row?.itemPerKit} />,
          },
          {
            selector: (row) => <HemaValue text={row?.availableToBuild} />,
          },
        ]}
      />
    </div>
  );
};

const KitBuilder = () => {
  const dispatch = useDispatch();
  const { uisettings, builder, common, docTemplate, assembly } = useSelector((state) => state);
  const { kitTemplateFilter } = builder;
  const { docTemplateFilter } = docTemplate;
  /* form states */
  const [CTA, setCTA] = useState();
  const [formName, setformName] = useState();
  const [formIcon, setFormIcon] = useState();
  const [formValidation, setFormValidation] = useState();
  const [updatedData, setUpdatedData] = useState();
  // const [editFormState, setEditFormState] = useState();
  const [activeTab, setactiveTab] = useState('Template');
  const [filterbuilder, setfilterbuilder] = useState(null);
  const [filterAssembly, setFilterAssembly] = useState(null);
  const [filterDocument, setFilterDocument] = useState(null);
  const [searchQuery, setsearchQuery] = useState('');
  const [searchQueryAssembly, setsearchQueryAssembly] = useState('');
  const [searchQueryDocument, setSearchQueryDocument] = useState('');
  const [allItemsInTemplate, setAllItemsInTemplate] = useState();
  const [dropdownItemList, setDropDownItemList] = useState();
  // const [editorValue, seteditorValue] = useState('');
  const [openEditor, setopenEditor] = useState('');
  const [isdocLoaded, setisdocLoaded] = useState(false);
  const [okBtnText, setokBtnText] = useState();
  const [okBtnIcon, setokBtnIcon] = useState();
  const [cancelBtnText, setCancelBtnText] = useState();
  const [cancelBtnIcon, setSancelBtnIcon] = useState();
  const docRef = useRef(null);

  const editInventoryCTA = (id) => {
    setCTA(() => async (data) => {
      const imageToUpload = data.fileId;
      const createNewIem = await updateNewItemAction(id, data);
      if (createNewIem?.data?.id) {
        if (imageToUpload) {
          const imageCreation = await uploadFileItemAction(createNewIem.data?.id, imageToUpload);
          if (imageCreation.data.id) {
            dispatch(setFormCloseReducer());
          }
        } else {
          dispatch(setFormCloseReducer());
        }

        dispatch(setFormLoaderReducer(false));
      }
    });
    setFormValidation((error, values) => (error, values) => {
      itemValidator(error, values);
    });
  };

  // control item thresold switch
  useEffect(() => {
    createNewItem[7].disabled = !common.switch.threshold;
  }, [common.switch.threshold]);

  const createKitBuilderCTA = (item, state) => {
    setCTA(() => async (data) => {
      dispatch(setFormLoaderReducer(true));
      const createNewIem = await createKitBuilderAction(data);
      if (createNewIem?.status === 200) {
        // dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`${data.name} Kit created.`));
        createNewItem[4].options = common.allTypes;
        createNewItem[1].placeholder = 'H-kit';
        createNewItem[1].initialValue = 1;
        createNewItem[0].disabled = true;
        createNewItem[1].disabled = true;
        createNewItem[0].initialValue = data.name;

        setformName('Create New Item');
        setFormIcon(<CreateItemPurple />);
        // createNewItem = createNewItem?.filter((item) => item.name !== "change_reason");
        setUpdatedData(createNewItem?.filter((item) => item.name !== 'change_reason'));
        editInventoryCTA(createNewIem.data?.item?.id);
        dispatch(setFormName('additem'));
      }
      dispatch(setFormLoaderReducer(false));
    });
  };

  const addkitTemplate = async (data, store) => {
    dispatch(setFormLoaderReducer(true));
    const { uisettings, builder } = store;
    dispatch(setFormLoaderReducer(true));
    const createNewIem = await buildNewKitAction(uisettings.editForm?.id, {
      qty: uisettings.editForm?.selectedQuantity,
      storageLocationId: data?.locationId?.id,
      closeToExpiryAlert: data.closeToExpiryAlert,
      closeToExpiryDays: data.closeToExpiryNumberOfDays,
      items: builder.buildKit?.items?.map((item) => {
        return item.lots.map((lot, counter) => {
          if (counter === 0) {
            return { id: lot.id };
          }
        })?.[0];
      }),
    });
    dispatch(setFormLoaderReducer(false));
    if (createNewIem?.status === 200) {
      dispatch(setFormCloseReducer());
      dispatch(showSuccessReducer(`${createNewIem?.data?.quantity} ${createNewIem?.data?.item?.name} Kit added.`));
    }
    dispatch(setFormLoaderReducer(false));
  };

  const deleteKitTemplate = (item) => {
    setCTA(() => async (data) => {
      dispatch(setFormLoaderReducer(true));
      const deleteNewIem = await removeBuildKitAction(item.id, data.change_reason);
      if (deleteNewIem?.status === 200) {
        dispatch(showSuccessReducer(`${item?.name}  deleted.`));
        dispatch(setFormCloseReducer());
      }
      dispatch(setFormLoaderReducer(false));
    });
  };

  const deleteAssemblyCTA = (item, type, parent) => {
    setCTA(() => async (data) => {
      dispatch(setFormLoaderReducer(true));

      var deleteNewIem;
      if (type === 'item') {
        deleteNewIem = await removeAssemblyItemAction(item?.id, data.change_reason, parent);
      } else {
        deleteNewIem = await removeAssemblyAction(item?.id, data.change_reason);
      }

      if (deleteNewIem?.status === 200) {
        dispatch(showSuccessReducer(`${data?.itemTodelete}  deleted.`));
        dispatch(setFormCloseReducer());
      }
      dispatch(setFormLoaderReducer(false));
    });
  };

  const deleteDocumentVersionCTA = (item, docId) => {
    setCTA(() => async (data) => {
      dispatch(setFormLoaderReducer(true));

      var deleteNewIem = await removeDocVersionAction(docId, item?.id);

      if (deleteNewIem?.status === 200) {
        dispatch(showSuccessReducer(`Thank You Translation deleted.`));
        dispatch(setFormCloseReducer());
      }
      dispatch(setFormLoaderReducer(false));
    });
  };

  const deleteDocumentTemplateCTA = (item, type, parent) => {
    setCTA(() => async (data) => {
      dispatch(setFormLoaderReducer(true));

      var deleteNewIem = await removeDocTemplateAction(item?.id, data.change_reason.trim(), parent);
      if (deleteNewIem?.status === 200) {
        dispatch(showSuccessReducer(`Thank You Document deleted.`));
        dispatch(setFormCloseReducer());
      }
      dispatch(setFormLoaderReducer(false));
    });
  };

  //callallEnventoryRequiredAPI
  useEffect(() => {
    getKitBuilderAction();
    getAllItemAction();
    getTestingLabsAction();
    getAssembliesTypeAction();
    getAllAssembliesAction();
    getAssemblyInboundConditionAction();
    droptownItemsForAssemblyAction();
    getdocTemplateType();
    getAlldocTemplateAction();
    getAllInventoryLanguages();
  }, []);

  //search for kit builder
  useEffect(() => {
    (async () => {
      if (searchQuery) {
        const searchResult = filter(builder?.allTemplates, {
          keywords: searchQuery, // search for any field that contains the "Do" string

          caseSensitive: false,
        });
        setfilterbuilder(searchResult);
      } else {
        setfilterbuilder(builder?.allTemplates);
      }
    })();
  }, [searchQuery, builder?.allTemplates]);

  //search for kit assembly
  useEffect(() => {
    (async () => {
      if (searchQueryAssembly) {
        const searchResult = filter(assembly.allAssemblies, {
          keywords: searchQueryAssembly, // search for any field that contains the "Do" string

          caseSensitive: false,
        });
        setFilterAssembly(searchResult);
      } else {
        setFilterAssembly(assembly.allAssemblies);
      }
    })();
  }, [searchQueryAssembly, assembly.allAssemblies]);

  //search for kit document
  useEffect(() => {
    (async () => {
      if (searchQueryDocument) {
        const searchResult = filter(docTemplate?.alldocTemplate, {
          keywords: searchQueryDocument, // search for any field that contains the "Do" string

          caseSensitive: false,
        });
        setFilterDocument(searchResult);
      } else {
        setFilterDocument(docTemplate?.alldocTemplate);
      }
    })();
  }, [searchQueryDocument, docTemplate?.alldocTemplate]);

  // create assemblies
  const createAssemblyCTA = () => {
    setCTA(() => async (data, items) => {
      dispatch(setFormLoaderReducer(true));
      const createNewIem = await createAssemblyAction({
        ...data,
        testingLabId: data?.testingLabId || null,
        inboundShippingConditionId: data?.inboundShippingConditionId || null,
        items: items?.map((item) => {
          return {
            ...item,
            quantity: item.qty || item.quantity,
            itemId: item.itemId || item.id,
          };
        }),
      });
      if (createNewIem?.status === 200) {
        dispatch(setFormCloseReducer());
        dispatch(showSuccessReducer(`Assembly ${data.name} created.`));
      }
      dispatch(setFormLoaderReducer(false));
    });
  };
  // create Doctemplate
  const createDocTemplateCTA = (item, mode) => {
    if (mode !== 'view-doc-template') {
      setCTA(() => async (data) => {
        dispatch(setFormLoaderReducer(true));
        var createNewIem;
        if (mode === 'copy-document-template') {
          setopenEditor(item);
          // createNewIem = await createDocTemplateAction(item, mode);
        } else {
          await mergfieldsByType(data.templateTypeId);
          createNewIem = await createDocTemplateAction(data, mode);
          if (createNewIem?.status === 200) {
            dispatch(setFormCloseReducer());

            if (createNewIem && mode !== 'copy-document-template') {
              setopenEditor(createNewIem?.data);
            }
          } else {
            setopenEditor('');
          }
        }
        dispatch(setFormLoaderReducer(false));
      });
    } else {
      setopenEditor(item);
    }
  };
  const handleSaveChangesClicked = () => {
    docRef.current?.documentEditor.saveAsBlob('Docx').then(async (exportedDocument) => {
      // onSave(exportedDocument);
      if (uisettings?.formName === 'create-document-language') {
        createdocTemplateVersion(exportedDocument);
      } else if (uisettings?.formName === 'copy-document-template') {
        dispatch(setFormLoaderReducer(true));
        const createNewIem = await createDocTemplateAction(openEditor, 'copy-document-template');
        if (createNewIem?.status === 200) {
          dispatch(showSuccessReducer(`${createNewIem?.data?.name} Collection document Copy created.`));
          setopenEditor('');
        }
      } else {
        updateDocTemplateFileCTA(exportedDocument);
      }
      dispatch(setFormLoaderReducer(false));
      dispatch(setForm({ state: false, type: '' }));
    });
  };

  const updateDocTemplateFileCTA = async (exportedDocument) => {
    dispatch(setFormLoaderReducer(true));
    const formData = new FormData();
    formData.append('file', exportedDocument);
    const createNewDoc = await updateDocTemplateFileAction(openEditor?.id, formData);
    if (createNewDoc?.status === 200) {
      dispatch(setFormCloseReducer());
      dispatch(showSuccessReducer(` Document  added.`));
      setopenEditor('');
    }
    dispatch(setFormLoaderReducer(false));
  };

  const openEditorforVersion = (edit) => {
    setCTA(() => async (data, items) => {
      if (edit) {
        setopenEditor({ ...edit, versionId: data.versionId });
      } else {
        setopenEditor('');
      }
    });
  };
  const createdocTemplateVersion = async (exportedDocument) => {
    // setCTA(() => async (data) => {

    const formData = new FormData();
    formData.append('file', exportedDocument);
    dispatch(setFormLoaderReducer(true));
    const res = await createDocTempVersionAction(openEditor?.id, openEditor?.versionId, formData);
    if (res?.status === 200) {
      dispatch(setFormCloseReducer());
      dispatch(showSuccessReducer(`New translation created.`));
      setopenEditor('');
    }
    dispatch(setFormLoaderReducer(false));
    // });
  };
  const getdocumentCopyName = async (docId) => {
    const res = await getdocCopyNameAction(docId);
    if (res?.status === 200) {
      return res;
    }
  };

  const ExpendedDataRowsForAssembly = ({ data }) => {
    const dispatch = useDispatch();
    return (
      <div className=" w-full py-[10px]  border-b border-[#DEE2E6]">
        <DataTable
          customStyles={{
            table: {
              style: { background: 'transparent !important', border: 'none' },
            },
            head: { style: { display: 'none' } },
            rows: {
              style: {
                borderBottom: 'none !important',
                paddingLeft: '50px',
                //paddingRight: '100px',
              },
            },
          }}
          data={data.items}
          columns={[
            {
              selector: (row, index) => <HemaValue text={`${row?.item?.name}`} />,
            },

            {
              selector: (row) => <HemaValue text={row?.quantity} />,
            },
            {
              cell: (row) => {
                return (
                  <div className="flex-grow four">
                    <div className="flex justify-end gap-[5px] meta ">
                      <Button
                        Icon={<DeleteColor />}
                        color="text-white"
                        bg="bg-bgActionDots"
                        cta={() => {
                          Remove[0].label = 'Assembly Name';
                          Remove[0].initialValue = row?.item?.name;
                          setUpdatedData(Remove);
                          setformName('Delete Assembly Item');
                          setFormIcon(<DeletePurple />);
                          dispatch(
                            setForm({
                              state: true,
                              type: 'deleteItem',
                            }),
                          );
                          deleteAssemblyCTA(row, 'item', data?.id);
                        }}
                      />
                    </div>
                  </div>
                );
              },
              ignoreRowClick: true,
              allowOverflow: true,
              button: true,
            },
          ]}
        />
      </div>
    );
  };

  const ExpendedDataRowsForDocTemplate = ({ data }) => {
    const dispatch = useDispatch();
    return (
      <div className=" w-full py-[10px]  border-b border-[#DEE2E6]">
        <DataTable
          customStyles={{
            table: {
              style: { background: 'transparent !important', border: 'none' },
            },
            head: { style: { display: 'none' } },
            rows: {
              style: {
                borderBottom: 'none !important',
                paddingLeft: '50px',
                //paddingRight: '100px',
              },
            },
          }}
          data={data.translations}
          columns={[
            {
              selector: (row, index) => <HemaValue text={`${row?.name}`} />,
            },

            {
              cell: (row) => {
                return (
                  <div className="flex-grow four">
                    <div className="flex justify-end gap-[5px] meta ">
                      <Button
                        Icon={<ViewIcon />}
                        color="text-white"
                        bg="bg-bgActionDots"
                        cta={() => {
                          dispatch(editFormReducer(row));
                          setformName('View Document Teamplate ');
                          setFormIcon(<ViewIcon />);
                          addDocTemplate[0].disabled = true;
                          addDocTemplate[0].initialValue = data?.name;
                          addDocTemplate[1].placeholder = data?.type?.name;
                          addDocTemplate[1].initialValue = data?.type?.id;
                          addDocTemplate[1].disabled = true;
                          setUpdatedData(addDocTemplate);
                          dispatch(
                            setForm({
                              state: true,
                              type: 'view-doc-template',
                            }),
                          );
                          createDocTemplateCTA(row, 'view-doc-template');
                        }}
                      />
                      <Button
                        Icon={<DeleteColor />}
                        color="text-white"
                        bg="bg-bgActionDots"
                        cta={() => {
                          Remove[0].label = 'Version Name';
                          Remove[0].initialValue = row?.name;
                          setUpdatedData(Remove);
                          setformName('Delete Document Version');
                          setFormIcon(<DeletePurple />);
                          dispatch(
                            setForm({
                              state: true,
                              type: 'deleteItem',
                            }),
                          );
                          deleteDocumentVersionCTA(row, data?.id);
                        }}
                      />
                    </div>
                  </div>
                );
              },
              ignoreRowClick: true,
              allowOverflow: true,
              button: true,
            },
          ]}
        />
      </div>
    );
  };

  // sorting for kit template
  const caseInsensitiveSort = (rowA, rowB) => {
    const a = rowA.name?.toLowerCase();
    const b = rowB.name?.toLowerCase();

    if (a > b) {
      return 1;
    }

    if (b > a) {
      return -1;
    }

    return 0;
  };

  const availableNumberSort = (rowA, rowB) => {
    const a = rowA.availableToBuild;
    const b = rowB.availableToBuild;

    if (a > b) {
      return 1;
    }

    if (b > a) {
      return -1;
    }

    return 0;
  };

  const sortQuantitySum = (rowA, rowB) => {
    const itemOneQtySum = rowA.items?.reduce((accumulator, currentValue) => accumulator + currentValue.itemPerKit, 0);
    const itemTwoQtySum = rowB.items?.reduce((accumulator, currentValue) => accumulator + currentValue.itemPerKit, 0);

    if (itemOneQtySum > itemTwoQtySum) {
      return 1;
    }

    if (itemTwoQtySum > itemOneQtySum) {
      return -1;
    }

    return 0;
  };
  //filter for kit builder
  useEffect(() => {
    if (Object.keys(kitTemplateFilter)?.length) {
      const filterResult = builder?.allTemplates?.filter((port) => {
        if (
          (kitTemplateFilter?.name?.length ? kitTemplateFilter?.name.includes(port.name) : true) &&
          (kitTemplateFilter?.availableToBuild?.length ? kitTemplateFilter.availableToBuild?.includes(port.availableToBuild) : true) &&
          (kitTemplateFilter?.qtyPerItem?.length ? kitTemplateFilter.qtyPerItem?.includes(port.qtyPerItem) : true)
          // (kitTemplateFilter.role?.length ? kitTemplateFilter.role?.includes(port.role.name) : true)
        ) {
          return true;
        } else {
          return false;
        }
      });
      setfilterbuilder(filterResult);
    } else {
      setfilterbuilder(builder?.allTemplates);
    }
  }, [JSON.stringify(kitTemplateFilter)]);
  // filter document template
  useEffect(() => {
    if (Object.keys(docTemplateFilter)?.length) {
      const filterResult = docTemplate?.alldocTemplate?.filter((port) => {
        if (
          (docTemplateFilter?.name?.length ? docTemplateFilter?.name.includes(port.name) : true) &&
          (docTemplateFilter?.type?.length ? docTemplateFilter?.type?.includes(port.type.name) : true)
        ) {
          return true;
        } else {
          return false;
        }
      });
      setFilterDocument(filterResult);
    } else {
      setFilterDocument(docTemplate?.alldocTemplate);
    }
  }, [JSON.stringify(docTemplateFilter)]);

  if (openEditor?.id) {
    return (
      <>
        <div className="flex gap-[10px] justify-between items-end mb-[30px]">
          <HemaHeadingWithSubText heading="Document Editor" />
        </div>
        <Alert type="error" />
        {uisettings?.formName === 'create-document' && docTemplate.mergeField && (
          <div className="flex gap-[10px] mb-[10px]">
            {docTemplate.mergeField?.map((field) => {
              return (
                <div
                  className=" px-[20px] py-[5px] rounded-[5px] bg-white cursor-pointer"
                  onClick={() => {
                    let fieldCode = `MERGEFIELD  ${field.name}  \\* MERGEFORMAT `;
                    let fieldResult = `«${field?.mergeFieldKey}»`;
                    docRef.current?.documentEditor.editor.insertField(fieldCode, fieldResult);
                    docRef.current?.documentEditor.updateFields();
                  }}
                >
                  {field.name}
                </div>
              );
            })}
          </div>
        )}
        <DocumentEditor docFile={openEditor ? openEditor?.file?.storageUrl : null} setisdocLoaded={setisdocLoaded} docRef={docRef} uisettings={uisettings} />
        <div className="flex gap-[8px] justify-end my-[20px]">
          <Button
            cta={() => {
              setopenEditor(false);
              dispatch(setForm({ state: false, type: '' }));
            }}
            type="button"
            text={uisettings.formName === 'view-doc-template' ? 'Close' : 'Cancel'}
            bg="bg-white"
            border="border-primary1"
            color="text-primary1"
            Icon={<Cancel />}
          />
          {uisettings?.formName !== 'view-doc-template' &&
            (uisettings.formLoader ? (
              <Button
                type="submit"
                bg="bg-primary1"
                text={
                  <>
                    <Spinner animation="grow" size="sm" variant="light" />
                    <Spinner animation="grow" size="sm" variant="light" />
                    <Spinner animation="grow" size="sm" variant="light" />
                  </>
                }
              />
            ) : (
              <Button
                type="button"
                cta={async () => {
                  handleSaveChangesClicked();
                }}
                text="Save & Close"
                bg="bg-primary1"
                color="text-white"
                Icon={<Confirm />}
              />
            ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex gap-[10px] justify-between items-end">
          <HemaHeadingWithSubText heading="Template Builder" sub="Manage your template here." />
        </div>

        <Alert />
        <div className="bg-white rounded-[5px] px-[10px] py-[15px] mt-[27px] mb-[13px] inventory-tabs">
          <Tabs
            defaultActiveKey={activeTab}
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={(key) => {
              setactiveTab(key);
            }}
          >
            <Tab
              eventKey="Template"
              title={
                <div className="flex items-center title-icon gap-[7px]">
                  <KitTemplate /> Kit Templates
                </div>
              }
            >
              <>
                <div className="flex justify-between mt-[35px]">
                  <FormSearch w="w-[400px]" searchQuery={searchQuery} setsearchQuery={setsearchQuery} />
                  <Button
                    text="Create Kit Template"
                    Icon={<Add color="white" />}
                    color="text-white"
                    bg="bg-primary1"
                    cta={() => {
                      dispatch(editFormReducer(null));
                      setformName('Create Kit Template');
                      setFormIcon(<AddInventoryPurple />);
                      dispatch(setForm({ state: true, type: 'create-kit-template' }));
                      createKitBuilderCTA();
                    }}
                  />
                </div>
                {filterbuilder ? (
                  filterbuilder?.length > 0 || Object.keys(kitTemplateFilter)?.length ? (
                    <DataTable
                      expandableIcon={{
                        expanded: <RowExpand />,
                        collapsed: <RowCollapsed />,
                      }}
                      columns={[
                        {
                          name: <HemaValue text={'Kit Template Name'} className="font-normal text-[#000000]" />,
                          sortable: true,
                          filterable: true,
                          selector: (row, index) => (
                            <>
                              {index === 0 ? (
                                <FilterColumn
                                  columnName="name"
                                  setRedux={setKitTemplateFilter}
                                  reduxValues={kitTemplateFilter || []}
                                  options={Array.from(new Set(builder?.allTemplates?.map((filter) => filter.name)))}
                                />
                              ) : (
                                <HemaValue text={row.name} />
                              )}
                            </>
                          ),
                          sortFunction: caseInsensitiveSort,
                          sortId: 'name',
                        },
                        {
                          name: <HemaValue text={'Quantity Per Kit'} className="font-normal text-[#000000]" />,
                          sortable: true,
                          sortFunction: sortQuantitySum,
                          selector: (row, index) => (
                            <>
                              {index === 0 ? (
                                <FilterColumn
                                  columnName="qtyPerItem"
                                  setRedux={setKitTemplateFilter}
                                  reduxValues={kitTemplateFilter || []}
                                  options={Array.from(new Set(builder?.allTemplates?.map((filter) => filter.qtyPerItem)))}
                                />
                              ) : (
                                <HemaValue text={row?.qtyPerItem} />
                              )}
                            </>
                          ),
                        },
                        {
                          name: <HemaValue text={'Available to Build'} className="font-normal text-[#000000]" />,
                          sortable: true,
                          selector: (row, index) => (
                            <>
                              {index === 0 ? (
                                <FilterColumn
                                  columnName="availableToBuild"
                                  setRedux={setKitTemplateFilter}
                                  reduxValues={kitTemplateFilter || []}
                                  options={Array.from(new Set(builder?.allTemplates?.map((filter) => filter.availableToBuild)))}
                                />
                              ) : (
                                <HemaValue text={row.availableToBuild} />
                              )}
                            </>
                          ),
                          sortFunction: availableNumberSort,
                          sortId: 'availableToBuild',
                        },
                        {
                          name: <HemaValue text={'Actions'} className="font-normal text-[#000000]" />,
                          cell: (row) => {
                            return (
                              <div className="flex-grow four">
                                <div className="flex justify-end gap-[5px] meta ">
                                  <Button
                                    Icon={<Add />}
                                    color="text-white"
                                    bg="bg-bgActionDots"
                                    cta={() => {
                                      dispatch(editFormReducer(row));
                                      inventoryKitBuilder[0].initialValue = row.name;
                                      setformName('Build Kit');
                                      setFormIcon(<AddInventoryPurple />);
                                      setUpdatedData(inventoryKitBuilder);
                                      dispatch(setForm({ state: true, type: 'addKit' }));
                                      setFormValidation(() => (error, values, store) => {
                                        quantityChcek(error, values, store);
                                      });
                                      setCTA(() => async (data) => {
                                        dispatch(
                                          editFormReducer({
                                            ...row,
                                            selectedQuantity: data?.qty,
                                          }),
                                        );
                                        setformName(`${row.name} Kit Template`);
                                        setFormIcon(<AddInventoryPurple />);
                                        dispatch(
                                          setForm({
                                            state: true,
                                            type: 'edit-kit-template',
                                          }),
                                        );
                                        setCTA(() => async () => {
                                          dispatch(
                                            setForm({
                                              state: true,
                                              type: 'confirm-kit-template',
                                            }),
                                          );
                                          setokBtnText('Confirm');
                                          setUpdatedData(ConfirmKitBuilder);
                                          setformName('Build Kit');
                                          setFormIcon(<CreateItemPurple />);
                                          dispatch(setFormLoaderReducer(false));
                                          setCTA(() => async (data, undefined, store) => {
                                            addkitTemplate(data, store);
                                          });
                                        });
                                      });
                                    }}
                                  />
                                  <NavDropdown
                                    title={<Button Icon={<ActionDots />} color="text-white" bg="bg-bgActionDots" />}
                                    className="hema-ellipse-dropdown"
                                    // id="navbarScrollingDropdown"
                                  >
                                    <NavDropdown.Item
                                      className="mb-1"
                                      onClick={() => {
                                        dispatch(editFormReducer(row));
                                        createKitBuilderCTA();
                                        setformName('Copy Kit Template');
                                        setFormIcon(<AddInventoryPurple />);
                                        dispatch(
                                          setForm({
                                            state: true,
                                            type: 'copy-kit-template',
                                          }),
                                        );
                                      }}
                                    >
                                      <div className="flex gap-[10px] items-center">
                                        <Copy color="#3D88E0" />
                                        <HemaValue text="Copy" />
                                      </div>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                      className="mb-1"
                                      onClick={() => {
                                        dispatch(editFormReducer(row));
                                        Remove[0].label = 'Kit Template Name';
                                        Remove[0].initialValue = 'Kit Template Name';
                                        setUpdatedData(Remove);
                                        setformName('Delete Kit Template');
                                        setFormIcon(<DeletePurple />);
                                        dispatch(
                                          setForm({
                                            state: true,
                                            type: 'deleteItem',
                                          }),
                                        );
                                        deleteKitTemplate(row);
                                      }}
                                    >
                                      <div className="flex gap-[10px] items-center">
                                        <Delete color="#3D88E0" />
                                        <HemaValue text="Delete" />
                                      </div>
                                    </NavDropdown.Item>
                                  </NavDropdown>
                                </div>
                              </div>
                            );
                          },
                          ignoreRowClick: true,
                          allowOverflow: true,
                          button: true,
                        },
                      ]}
                      pagination={true}
                      data={[{}, ...filterbuilder]}
                      expandableRows
                      expandableRowsComponent={ExpendedDataRows}
                      onSort={(row, direction, sorted) => {
                        setfilterbuilder(sortedData(row.sortId, direction, sorted)?.filter((data) => Object.keys(data)?.length));
                      }}
                      paginationComponent={(e) => {
                        return <Pagination e={e} />;
                      }}
                    />
                  ) : (
                    <AlertBootstrap variant="warning" className="text-center mt-[20px]">
                      No Kit Templates to Show. Please add by clicking on Create Kit Template.
                    </AlertBootstrap>
                  )
                ) : (
                  <>
                    <br />
                    <Skeleton count={4} />
                    <br />
                    <Skeleton count={4} />
                    <br />
                    <Skeleton count={4} />
                  </>
                )}
              </>
            </Tab>
            <Tab
              eventKey="Document"
              title={
                <div className="flex items-center title-icon gap-[7px] ">
                  <DocTemplate /> Document Templates
                </div>
              }
            >
              <>
                <div className="flex justify-between mt-[35px]">
                  <FormSearch w="w-[400px]" searchQuery={searchQueryDocument} setsearchQuery={setSearchQueryDocument} />
                  <Button
                    text="Create Document Template"
                    Icon={<Add color="white" />}
                    color="text-white"
                    bg="bg-primary1"
                    cta={() => {
                      setformName('Create Document Template');
                      setFormIcon(<AddInventoryPurple />);
                      addDocTemplate[0].initialValue = '';
                      addDocTemplate[0].disabled = false;
                      addDocTemplate[1].disabled = false;
                      addDocTemplate[1].placeholder = 'Select Document Type';
                      addDocTemplate[1].options = docTemplate?.alldocTemplateType;
                      addDocTemplate[1].initialValue = '';
                      setokBtnIcon(<Next />);
                      setokBtnText('Next');
                      setUpdatedData(addDocTemplate);
                      dispatch(setForm({ state: true, type: 'create-document' }));
                      createDocTemplateCTA();
                    }}
                  />
                </div>
                {filterDocument ? (
                  filterDocument?.length > 0 || Object.keys(docTemplateFilter)?.length ? (
                    <DataTable
                      expandableIcon={{
                        expanded: <RowExpand />,
                        collapsed: <RowCollapsed />,
                      }}
                      columns={[
                        {
                          name: <HemaValue text={'Document Template Name'} className="font-normal text-[#000000]" />,
                          sortable: true,
                          selector: (row, index) => (
                            <>
                              {index === 0 ? (
                                <FilterColumn
                                  columnName="name"
                                  setRedux={setdocTemplateFilter}
                                  reduxValues={docTemplateFilter || []}
                                  options={Array.from(new Set(docTemplate?.alldocTemplate?.map((filter) => filter.name)))}
                                />
                              ) : (
                                <HemaValue text={row?.name} />
                              )}
                            </>
                          ),
                          sortId: 'name',
                        },
                        {
                          name: <HemaValue text={'Document Type'} className="font-normal text-[#000000]" />,
                          sortable: true,
                          selector: (row) => <HemaValue text={row?.type?.name} />,
                          selector: (row, index) => (
                            <>
                              {index === 0 ? (
                                <FilterColumn
                                  columnName="type"
                                  setRedux={setdocTemplateFilter}
                                  reduxValues={docTemplateFilter || []}
                                  options={Array.from(new Set(docTemplate?.alldocTemplate?.map((filter) => filter.type.name)))}
                                />
                              ) : (
                                <HemaValue text={row?.type?.name} />
                              )}
                            </>
                          ),
                          sortId: 'type.name',
                        },
                        {
                          name: <HemaValue text={'Actions'} className="font-normal text-[#000000]" />,
                          cell: (row, index) => {
                            return (
                              <div className="flex-grow four">
                                {index !== 0 && (
                                  <div className="flex justify-end gap-[5px] meta ">
                                    <Button
                                      Icon={<ViewIcon />}
                                      color="text-white"
                                      bg="bg-bgActionDots"
                                      cta={() => {
                                        dispatch(editFormReducer(row));
                                        setformName('View Document Teamplate ');
                                        setFormIcon(<ViewIcon />);
                                        addDocTemplate[0].disabled = true;
                                        addDocTemplate[0].initialValue = row.name;
                                        addDocTemplate[1].placeholder = row?.type?.name;
                                        addDocTemplate[1].initialValue = row?.type?.id;
                                        addDocTemplate[1].disabled = true;
                                        setUpdatedData(addDocTemplate);
                                        dispatch(
                                          setForm({
                                            state: true,
                                            type: 'view-doc-template',
                                          }),
                                        );
                                        createDocTemplateCTA(row, 'view-doc-template');
                                      }}
                                    />

                                    <NavDropdown
                                      title={<Button Icon={<img src={actionDots} />} color="text-white" bg="bg-bgActionDots" />}
                                      className="hema-ellipse-dropdown"
                                      // id="navbarScrollingDropdown"
                                    >
                                      <NavDropdown.Item
                                        className="mb-1"
                                        onClick={async () => {
                                          const res = await getdocumentCopyName(row?.id);

                                          dispatch(
                                            editFormReducer({
                                              ...row,
                                              name: res?.data,
                                            }),
                                          );
                                          setformName('Copy Document Template');
                                          setFormIcon(<CopyDocumentPurple />);
                                          addDocTemplate[0].disabled = false;
                                          addDocTemplate[0].initialValue = res?.data;
                                          addDocTemplate[1].placeholder = row?.type?.name;
                                          addDocTemplate[1].initialValue = row?.type?.id;
                                          addDocTemplate[1].disabled = true;
                                          setUpdatedData(addDocTemplate);
                                          dispatch(
                                            setForm({
                                              state: true,
                                              type: 'copy-document-template',
                                            }),
                                          );
                                          createDocTemplateCTA({ ...row, name: res?.data }, 'copy-document-template');
                                        }}
                                      >
                                        <div className="flex gap-[10px] items-center">
                                          <Copy color="#3D88E0" />
                                          <HemaValue text="Copy" />
                                        </div>
                                      </NavDropdown.Item>
                                      <NavDropdown.Item
                                        className="mb-1"
                                        onClick={() => {
                                          dispatch(editFormReducer(row));
                                          setformName('Create New Translation ');
                                          setFormIcon(<CreateTranslation />);
                                          addDocTemplateLang[0].disabled = true;
                                          addDocTemplateLang[0].initialValue = row.name;
                                          addDocTemplateLang[1].options = common?.allInventorylanguages;
                                          addDocTemplateLang[1].initialValue = '';
                                          setUpdatedData(addDocTemplateLang);
                                          dispatch(
                                            setForm({
                                              state: true,
                                              type: 'create-document-language',
                                            }),
                                          );
                                          openEditorforVersion(row);
                                        }}
                                      >
                                        <div className="flex gap-[10px] items-center">
                                          <Art color="#3D88E0" />
                                          <HemaValue text="Create new translation" />
                                        </div>
                                      </NavDropdown.Item>
                                      <NavDropdown.Item
                                        className="mb-1"
                                        onClick={() => {
                                          dispatch(editFormReducer(row));
                                          Remove[0].label = 'Document Template Name';
                                          Remove[0].initialValue = row?.name;
                                          setUpdatedData(Remove);
                                          setformName('Delete Document Template');
                                          setFormIcon(<DeletePurple />);
                                          dispatch(
                                            setForm({
                                              state: true,
                                              type: 'deleteItem',
                                            }),
                                          );
                                          deleteDocumentTemplateCTA(row);
                                        }}
                                      >
                                        <div className="flex gap-[10px] items-center">
                                          <Delete color="#3D88E0" />
                                          <HemaValue text="Delete" />
                                        </div>
                                      </NavDropdown.Item>
                                    </NavDropdown>
                                  </div>
                                )}
                              </div>
                            );
                          },
                          ignoreRowClick: true,
                          allowOverflow: true,
                          button: true,
                        },
                      ]}
                      data={[{}, ...filterDocument]}
                      expandableRows
                      expandableRowsComponent={ExpendedDataRowsForDocTemplate}
                      onSort={(row, direction, sorted) => {
                        setFilterDocument(sortedData(row.sortId, direction, sorted)?.filter((data) => Object.keys(data)?.length));
                      }}
                      pagination={true}
                      paginationComponent={(e) => {
                        return <Pagination e={e} />;
                      }}
                    />
                  ) : (
                    <AlertBootstrap variant="warning" className="text-center mt-[16px]">
                      No Document Template to Show. Please add by clicking on + Create Document Template.
                    </AlertBootstrap>
                  )
                ) : (
                  <>
                    <br />
                    <Skeleton count={4} />
                    <br />
                    <Skeleton count={4} />
                    <br />
                    <Skeleton count={4} />
                  </>
                )}
              </>
            </Tab>
            <Tab
              eventKey="Assemblies"
              title={
                <div className="flex items-center title-icon gap-[7px]">
                  <Assemblies /> Assemblies
                </div>
              }
            >
              <>
                <div className="flex justify-between mt-[35px]">
                  <FormSearch w="w-[400px]" searchQuery={searchQueryAssembly} setsearchQuery={setsearchQueryAssembly} />
                  <Button
                    text="Create Assembly"
                    Icon={<Add color="white" />}
                    color="text-white"
                    bg="bg-primary1"
                    cta={() => {
                      setformName('Create Assembly');
                      dispatch(setDropdownValue());
                      setFormIcon(<AddInventoryPurple />);
                      addAssembly[1].options = common.allAssemblyTypes?.map((ass) => {
                        if (ass.name === 'Return Kit Assembly') {
                          return {
                            ...ass,
                            name: 'Inbound Assembly',
                          };
                        } else if (ass.name === 'General Assembly') {
                          return {
                            ...ass,
                            name: 'Outbound Assembly',
                          };
                        }
                      });
                      addAssembly[1].disabled = false;
                      addAssembly[2].disabled = false;
                      addAssembly[3].disabled = false;
                      addAssembly[2].options = common.allTestingLabs;
                      addAssembly[3].options = common.allShipping;
                      addAssembly[0].initialValue = '';
                      addAssembly[1].initialValue = '';
                      addAssembly[1].placeholder = 'Select';
                      addAssembly[2].initialValue = '';
                      addAssembly[2].placeholder = 'select';
                      setAllItemsInTemplate([]);
                      setUpdatedData(addAssembly);
                      dispatch(setForm({ state: true, type: 'create-assembly' }));
                      setDropDownItemList('assemblyItem');
                      createAssemblyCTA();
                    }}
                  />
                </div>
                {filterAssembly ? (
                  filterAssembly?.length > 0 ? (
                    <DataTable
                      expandableIcon={{
                        expanded: <RowExpand />,
                        collapsed: <RowCollapsed />,
                      }}
                      columns={[
                        ...AssemblyDataTable,
                        {
                          name: <HemaValue text={'Actions'} className="font-normal text-[#000000]" />,
                          cell: (row) => {
                            return (
                              <div className="flex-grow four">
                                <div className="flex justify-end gap-[5px] meta ">
                                  <Button
                                    Icon={<CopyColor />}
                                    color="text-white"
                                    bg="bg-bgActionDots"
                                    cta={() => {
                                      dispatch(editFormReducer(row));
                                      dispatch(setDropdownValue());
                                      setformName('Copy Assembly');
                                      setFormIcon(<ExpiryAlertPurple />);

                                      addAssembly[0].initialValue = row.name + ' Copy';
                                      // addAssembly[1].options = common.allAssemblyTypes;
                                      addAssembly[1].options = common.allAssemblyTypes?.map((ass) => {
                                        if (ass.name === 'Return Kit Assembly') {
                                          return {
                                            ...ass,
                                            name: 'Inbound Assembly',
                                          };
                                        } else if (ass.name === 'General Assembly') {
                                          return {
                                            ...ass,
                                            name: 'Outbound Assembly',
                                          };
                                        }
                                      });
                                      addAssembly[2].options = common.allTestingLabs;
                                      addAssembly[2].disabled = row?.assemblyType?.name === 'General Assembly' ? true : false;
                                      addAssembly[3].disabled = row?.assemblyType?.name === 'General Assembly' ? true : false;
                                      addAssembly[1].disabled = row?.assemblyType?.name === 'General Assembly' ? true : false;
                                      addAssembly[3].options = common.allShipping;
                                      addAssembly[1].initialValue = row?.assemblyType?.id;
                                      addAssembly[1].placeholder = row?.assemblyType?.name;
                                      addAssembly[2].initialValue = row?.testingLab?.id;
                                      addAssembly[2].placeholder = row?.testingLab?.name;
                                      addAssembly[3].initialValue = row?.inboundShippingCondition?.id;
                                      addAssembly[3].placeholder = row?.inboundShippingCondition?.name;
                                      setAllItemsInTemplate(row?.items);
                                      setUpdatedData(addAssembly);
                                      dispatch(
                                        setForm({
                                          state: true,
                                          type: 'create-assembly',
                                        }),
                                      );
                                      createAssemblyCTA();
                                    }}
                                  />
                                  <Button
                                    Icon={<DeleteColor />}
                                    color="text-white"
                                    bg="bg-bgActionDots"
                                    cta={() => {
                                      dispatch(editFormReducer(row));
                                      Remove[0].label = 'Assembly Name';
                                      Remove[0].initialValue = row?.name;
                                      setUpdatedData(Remove);
                                      setformName('Delete Assembly');
                                      setFormIcon(<DeletePurple />);
                                      dispatch(
                                        setForm({
                                          state: true,
                                          type: 'deleteItem',
                                        }),
                                      );
                                      deleteAssemblyCTA(row);
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          },
                          ignoreRowClick: true,
                          allowOverflow: true,
                          button: true,
                        },
                      ]}
                      data={filterAssembly}
                      expandableRows
                      pagination={true}
                      expandableRowsComponent={ExpendedDataRowsForAssembly}
                      onSort={(row, direction, sorted) => {
                        setFilterAssembly(sortedData(row.sortId, direction, sorted));
                      }}
                      paginationComponent={(e) => {
                        return <Pagination e={e} />;
                      }}
                    />
                  ) : (
                    <AlertBootstrap variant="warning" className="text-center">
                      No Inventory Items to Show. Please add by clicking on Create New Item.
                    </AlertBootstrap>
                  )
                ) : (
                  <>
                    <br />
                    <Skeleton count={4} />
                    <br />
                    <Skeleton count={4} />
                    <br />
                    <Skeleton count={4} />
                  </>
                )}
              </>
            </Tab>
          </Tabs>
        </div>

        {uisettings?.openform && (
          <FormContainer
            cta={CTA}
            formType={updatedData}
            formName={formName}
            Icon={formIcon}
            formValidation={formValidation}
            setUpdatedData={setUpdatedData}
            setformName={setformName}
            setFormIcon={setFormIcon}
            allItemsInTemplate={allItemsInTemplate}
            dropDownItemList={dropdownItemList}
            cancelBtnIcon={cancelBtnIcon}
            cancelBtnText={cancelBtnText}
            okBtnIcon={okBtnIcon}
            okBtnText={okBtnText}
            setokBtnIcon={setokBtnIcon}
            setokBtnText={setokBtnText}
          />
        )}
      </>
    );
  }
};

export default KitBuilder;
