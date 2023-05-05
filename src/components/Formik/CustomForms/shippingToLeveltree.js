import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner, Alert as BootStrapAlert } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { HemaLabel, FormSelect, Button, FormTextarea, FormCheckbox, Alert, FormMultiSelect } from '../../../utils';
import { NameKit, Cancel, Confirm, ChangeReason, BlackSearch, Add } from '../../../HemeIconLibrary';
import Heading from '../../../pages/logistOrchestra/logisticComponents/heading';
import { resetSelectedRule, setSelectedKitToAssign } from '../../../Store/reducers/logistic';
import {
  assignShippingRuleAction,
  assignKitsAction,
  assignGeneralAssemblyAction,
  unAssignKitsAction,
  regionDetailIdAction,
  getAllCountryForRegionDetailAction,
  getAllSitesForCountryDetailAction,
  getAllLogisticLevelNode,
} from '../../../Actions/logistic';
import { setForm, showSuccessReducer } from '../../../Store/reducers/uiSettings';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const Label = ({ children }) => <span style={{ fontSize: 12 }}>{children}</span>;

const FormikForm = () => {
  const { common, assembly, logistic, uisettings } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [checked, setchecked] = useState([]);
  const [expanded, setexpanded] = useState([]);
  const [allregionstree, setallregionstree] = useState([]);
  const [selectedCountry, setselectedCountry] = useState('');
  const [searchquery, setSearchquery] = useState('');
  useEffect(() => {
    ((async) => {
      var filtertree;
      if (logistic?.allLowerLeveltree) {
        filtertree =
          logistic?.allLowerLeveltree?.map((data) => {
            return {
              ...data,
              value: data.name + data.id,
              label: data.name,
              children: data?.children?.map((child) => {
                return {
                  ...child,
                  value: child.name + child.id,
                  label: child.name,
                  children: [],
                  children: child?.children?.map((child) => {
                    return {
                      ...child,
                      value: child.name + child.id,
                      label: child.name,
                    };
                  }),
                };
              }),
            };
          }) || [];
        console.log('custard');
        if (filtertree) {
          if (
            uisettings.formName === 'assign-shipping-region-level' ||
            uisettings?.formName === 'assign-kit-region-level' ||
            uisettings?.formName === 'assign-initial-kit-region-level'
          ) {
            filtertree = filtertree?.filter((f) => f.id === logistic.selectedRegion.id).reduce((acc, cur) => acc.concat(cur.children), []);
            console.log('filtertree', filtertree);
            setallregionstree(filtertree);
          } else if (
            uisettings?.formName === 'assign-shipping-country-level' ||
            uisettings?.formName === 'assign-initial-kit-country-level' ||
            uisettings?.formName === 'assign-kit-country-level'
          ) {
            filtertree = filtertree?.reduce((acc, cur) => acc.concat(cur.children), []);
            filtertree = filtertree?.filter((f) => f.id === logistic?.selectedCountry.id).reduce((acc, cur) => acc.concat(cur.children), []);
            setallregionstree(filtertree);
          } else {
            setallregionstree(filtertree);
          }
        }
      }
    })();
  }, [logistic]);
  useEffect(() => {
    ((async) => {
      // if (!!value) {
      //   dispatch(setAllProtocols(logistic.allProtocols?.filter((study) => study.name?.toLowerCase()?.includes(value.toLowerCase()))));
      // } else {
      //   getAllProtocolsAction();
      // }
      if (logistic?.allLowerLeveltree && searchquery) {
        const filtertree =
          logistic.allLowerLeveltree
            ?.filter((tree) => tree.name?.toLowerCase()?.includes(searchquery.toLowerCase()))
            ?.map((data) => {
              return {
                ...data,
                value: data.name + data.id,
                label: data.name,
                children: data?.children?.map((child) => {
                  return {
                    ...child,
                    value: child.name + child.id,
                    label: child.name,
                    children: [],
                    children: child?.children?.map((child) => {
                      return {
                        ...child,
                        value: child.name + child.id,
                        label: child.name,
                      };
                    }),
                  };
                }),
              };
            }) || [];

        if (filtertree) {
          setallregionstree(filtertree);
        }
      } else {
        getAllLogisticLevelNode(logistic?.selectedProtocol?.id);
      }
    })();
  }, [searchquery]);

  return (
    <Formik
      initialValues={{
        regionId: '',
        action: 'raja',
      }}
      enableReinitialize
      validate={(values) => {
        const errors = {};
        if (!checked.length > 0) {
          errors.regionId = 'Required';
        }
        if (!values.changeReason && logistic.selectedProtocolDetail?.qc?.status?.id === 3) {
          errors.changeReason = 'Required';
        }

        return errors;
      }}
      onSubmit={async (values) => {
        var countryIds = [];
        var result;
        var kitAssembliesIds = [];
        // shipping ids

        // remove duplicate country ids
        let uniqueIds = new Set();
        let uniqueCountryArray = selectedCountry.filter((obj) => {
          if (!uniqueIds.has(obj.value)) {
            uniqueIds.add(obj.value);
            return true;
          }
          return false;
        });

        console.log(uniqueCountryArray);
        if (
          uisettings.formName === 'assign-shipping-study-level' ||
          uisettings?.formName === 'assign-initial-kit-study-level' ||
          uisettings?.formName === 'assign-kit-study-level'
        ) {
          uniqueCountryArray?.map((country) => {
            const selectedId = country.value.match(/\d+/g)?.[0];
            if (country.treeDepth === 0 && country.checked) {
              countryIds.push({ id: parseInt(selectedId), levelId: 2 });

              country.children?.map((child) => {
                countryIds.push({ id: child.id, levelId: child.level });
                if (child.children?.length > 0) {
                  child.children?.map((subchild) => {
                    countryIds.push({ id: subchild.id, levelId: subchild.level });
                  });
                }
              });
            } else if (country.treeDepth === 1 && country.checked) {
              countryIds.push({ id: country.parent.id, levelId: country.parent.level || 2 });

              countryIds.push({ id: parseInt(selectedId), levelId: 3 });
              country.children?.map((child) => {
                countryIds.push({ id: child.id, levelId: child.level });
              });
            } else if (country.treeDepth === 2 && country.checked) {
              countryIds.push({ id: country.parent.id, levelId: country.parent.level || 2 });

              countryIds.push({ id: parseInt(selectedId), levelId: 3 });
            }
          });
        } else if (
          uisettings.formName === 'assign-shipping-region-level' ||
          uisettings?.formName === 'assign-kit-region-level' ||
          uisettings?.formName === 'assign-initial-kit-region-level'
        ) {
          uniqueCountryArray?.map((country) => {
            const selectedId = country.value.match(/\d+/g)?.[0];
            if (country.treeDepth === 0 && country.checked) {
              countryIds.push({ id: parseInt(selectedId), levelId: 3 });

              country.children?.map((child) => {
                countryIds.push({ id: child.id, levelId: child.level });
                // if (child.children?.length > 0) {
                //   child.children?.map((subchild) => {
                //     countryIds.push({ id: subchild.id, levelId: subchild.level });
                //   });
                // }
              });
            } else if (country.treeDepth === 1 && country.checked) {
              countryIds.push({ id: country.parent.id, levelId: country.parent.level || 3 });

              countryIds.push({ id: parseInt(selectedId), levelId: 3 });
              country.children?.map((child) => {
                countryIds.push({ id: child.id, levelId: child.level });
              });
            } else if (country.treeDepth === 2 && country.checked) {
              countryIds.push({ id: country.parent.id, levelId: country.parent.level || 3 });

              countryIds.push({ id: parseInt(selectedId), levelId: 3 });
            }
          });
        } else if (
          uisettings.formName === 'assign-shipping-country-level' ||
          uisettings?.formName === 'assign-initial-kit-country-level' ||
          uisettings?.formName === 'assign-kit-country-level'
        ) {
          uniqueCountryArray?.map((country) => {
            const selectedId = country.value.match(/\d+/g)?.[0];
            if (country.treeDepth === 0 && country.checked) {
              countryIds.push({ id: parseInt(selectedId), levelId: 4 });
            } else if (country.treeDepth === 1 && country.checked) {
              countryIds.push({ id: country.parent.id, levelId: country.parent.level || 3 });

              countryIds.push({ id: parseInt(selectedId), levelId: 3 });
              country.children?.map((child) => {
                countryIds.push({ id: child.id, levelId: child.level });
              });
            } else if (country.treeDepth === 2 && country.checked) {
              countryIds.push({ id: country.parent.id, levelId: country.parent.level || 3 });

              countryIds.push({ id: parseInt(selectedId), levelId: 3 });
            }
          });
        }
        console.log('countryIds', countryIds);
        if (values.action === 'assign') {
          // shipping ids

          if (uisettings.formName === 'assign-shipping-study-level') {
            const shippingIds = logistic?.selectedProtocolDetail?.shippingRules?.map((rule) => {
              return rule.shippingCondition.id;
            });
            result = await assignShippingRuleAction('protocols', logistic?.selectedProtocol?.id, {
              shippingConditionIds: shippingIds,
              assignTo: countryIds,
              changeReason: values.changeReason,
            });
          } else if (uisettings.formName === 'assign-shipping-region-level') {
            const shippingIds = logistic?.selectedRegionDetail?.shippingRules?.map((rule) => {
              return rule.shippingCondition.id;
            });
            result = await assignShippingRuleAction('regions', logistic?.selectedRegion?.id, {
              shippingConditionIds: shippingIds,
              assignTo: countryIds,
              changeReason: values.changeReason,
            });
          } else if (uisettings?.formName === 'assign-shipping-country-level') {
            const shippingIds = logistic?.selectedCountryDetail?.shippingRules?.map((rule) => {
              return rule.shippingCondition.id;
            });
            result = await assignShippingRuleAction('countries', logistic?.selectedCountry?.id, {
              shippingConditionIds: shippingIds,
              assignTo: countryIds,
              changeReason: values.changeReason,
            });
          } else if (uisettings?.formName === 'assign-kit-study-level') {
            logistic?.selectedProtocolDetail?.logisticBuilderKits?.map(async (kit) => {
              if (kit.checked) {
                kitAssembliesIds = [];
                kit?.assemblies?.map((ass) => {
                  if (ass.checked) {
                    kitAssembliesIds.push(ass.id);
                  }
                });
                result = await assignKitsAction({
                  logisticBuilderKitId: kit?.id,
                  logisticBuilderKitAssemblyIds: kitAssembliesIds,
                  children: countryIds,
                  changeReason: values.changeReason,
                });
              }
            });
          } else if (uisettings?.formName === 'assign-kit-region-level') {
            logistic?.selectedRegionDetail?.logisticBuilderKits?.map(async (kit) => {
              if (kit.checked) {
                kitAssembliesIds = [];
                kit?.assemblies?.map((ass) => {
                  if (ass.checked) {
                    kitAssembliesIds.push(ass.id);
                  }
                });
                result = await assignKitsAction({
                  logisticBuilderKitId: kit?.id,
                  logisticBuilderKitAssemblyIds: kitAssembliesIds,
                  children: countryIds,
                  changeReason: values.changeReason,
                });
              }
            });
          } else if (uisettings?.formName === 'assign-kit-country-level') {
            logistic?.selectedCountryDetail?.logisticBuilderKits?.map(async (kit) => {
              if (kit.checked) {
                kitAssembliesIds = [];
                kit?.assemblies?.map((ass) => {
                  if (ass.checked) {
                    kitAssembliesIds.push(ass.id);
                  }
                });
                result = await assignKitsAction({
                  logisticBuilderKitId: kit?.id,
                  logisticBuilderKitAssemblyIds: kitAssembliesIds,
                  children: countryIds,
                  changeReason: values.changeReason,
                });
              }
            });
          } else if (uisettings?.formName === 'assign-initial-kit-study-level') {
            result = await assignGeneralAssemblyAction('protocols', logistic?.selectedProtocol?.id, {
              initRequestAssembly: {
                id: logistic?.selectedProtocolDetail?.initialRequestAssembly?.id,
              },
              assignTo: countryIds,
              changeReason: values.changeReason,
            });
          } else if (uisettings?.formName === 'assign-initial-kit-region-level') {
            result = await assignGeneralAssemblyAction('regions', logistic?.selectedRegion?.id, {
              initRequestAssembly: {
                id: logistic?.selectedRegionDetail?.initialRequestAssembly?.id,
              },
              assignTo: countryIds,
              changeReason: values.changeReason,
            });
          } else if (uisettings?.formName === 'assign-initial-kit-country-level') {
            result = await assignGeneralAssemblyAction('countries', logistic?.selectedCountry?.id, {
              initRequestAssembly: {
                id: logistic?.selectedCountryDetail?.initialRequestAssembly?.id,
              },
              assignTo: countryIds,
              changeReason: values.changeReason,
            });
          }
        } else {
          if (uisettings?.formName === 'assign-kit-study-level') {
            logistic?.selectedProtocolDetail?.logisticBuilderKits?.map(async (kit) => {
              if (kit.checked) {
                kitAssembliesIds = [];
                kit.assemblies.map((ass) => {
                  if (ass.checked) {
                    kitAssembliesIds.push(ass.id);
                  }
                });
                result = await unAssignKitsAction({
                  logisticBuilderKitId: kit?.id,
                  logisticBuilderKitAssemblyIds: kitAssembliesIds,
                  children: countryIds,
                  changeReason: values.changeReason,
                });
              }
            });
          }
        }

        // if (result?.status === 200) {
        dispatch(setForm({ state: false, type: '' }));
        dispatch(showSuccessReducer(`Configuration are applied to lower level.`));
        if (logistic?.selectedRegion?.id) {
          await regionDetailIdAction(logistic?.selectedRegion?.id);
        }
        if (logistic?.selectedCountry?.id) {
          await getAllCountryForRegionDetailAction(logistic?.selectedCountry?.id);
        }
        if (logistic?.selectedSite?.id) {
          await getAllSitesForCountryDetailAction(logistic?.selectedSite?.id);
        }

        // }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className="max-w-[600px]  overflow-auto m-auto flex flex-col justify-between h-[calc(100%-100px)]">
          <div>
            <Heading heading="Details" />

            <div className="relative mb-[16px]">
              <span className="absolute top-[12px] left-[10px] ">
                <BlackSearch />
              </span>
              <input
                type="text"
                name="Search"
                value={searchquery}
                placeholder="Search..."
                onChange={(e) => setSearchquery(e.target.value)}
                className="w-full rounded border-2 border-[#DEE2E6] pr-[10px] py-[5px] pl-[30px]"
              />
            </div>
            {allregionstree?.length > 0 ? (
              <>
                <div className={'w-full lower-level-tree'}>
                  <CheckboxTree
                    nodes={allregionstree}
                    checked={checked}
                    expanded={expanded}
                    onCheck={(checked, data) => {
                      console.log(data);
                      setchecked(checked);
                      setselectedCountry([...selectedCountry, data]);
                    }}
                    onClick={(data) => {
                      console.log(data);
                    }}
                    onExpand={(expanded) => setexpanded(expanded)}
                  />
                  {errors.regionId && <div className="error text-[red] text-[12px] pt-[2px]">{errors.regionId}</div>}
                </div>
                {logistic.selectedProtocolDetail?.qc?.status?.id === 3 && (
                  <div className=" gap-[15px] items-center w-full block">
                    <HemaLabel text={'Change Reason'} Icon={<ChangeReason />} required={true} className={`mb-[10px]`} />

                    <FormTextarea placeholder="write edit reason" onChange={handleChange} onBlur={handleBlur} name={'changeReason'} value={values?.changeReason} />

                    {errors.changeReason && <div className="error text-[red] text-[12px] pt-[2px]">{errors.changeReason}</div>}
                  </div>
                )}
              </>
            ) : !!searchquery ? (
              <BootStrapAlert variant="warning">No result found</BootStrapAlert>
            ) : (
              <BootStrapAlert variant="warning">Please add region to proceed further</BootStrapAlert>
            )}

            <Alert type="error" />
            <div className="flex gap-[8px] justify-end my-[20px]">
              <Button
                cta={() => {
                  dispatch(setForm({ state: false, type: '' }));
                }}
                type="button"
                text="Cancel"
                bg="bg-white"
                border="border-primary1"
                color="text-primary1"
                Icon={<Cancel />}
              />

              {isSubmitting ? (
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
                <>
                  {uisettings?.formName === 'assign-kit-study-level' && (
                    <Button type="submit" cta={() => setFieldValue('action', 'Unassign')} text="Unassign" bg="bg-primary1" color="text-white" Icon={<Add color=" #fff" />} />
                  )}

                  <Button type="submit" cta={() => setFieldValue('action', 'assign')} text="Assign" bg="bg-primary1" color="text-white" Icon={<Add color=" #fff" />} />
                </>
              )}
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default FormikForm;
