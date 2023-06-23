import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createFinancialInformation } from 'apiSdk/financial-informations';
import { Error } from 'components/error';
import { financialInformationValidationSchema } from 'validationSchema/financial-informations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { FinancialInformationInterface } from 'interfaces/financial-information';

function FinancialInformationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FinancialInformationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFinancialInformation(values);
      resetForm();
      router.push('/financial-informations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FinancialInformationInterface>({
    initialValues: {
      asset: '',
      liability: '',
      income: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: financialInformationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Financial Information
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="asset" mb="4" isInvalid={!!formik.errors?.asset}>
            <FormLabel>Asset</FormLabel>
            <Input type="text" name="asset" value={formik.values?.asset} onChange={formik.handleChange} />
            {formik.errors.asset && <FormErrorMessage>{formik.errors?.asset}</FormErrorMessage>}
          </FormControl>
          <FormControl id="liability" mb="4" isInvalid={!!formik.errors?.liability}>
            <FormLabel>Liability</FormLabel>
            <Input type="text" name="liability" value={formik.values?.liability} onChange={formik.handleChange} />
            {formik.errors.liability && <FormErrorMessage>{formik.errors?.liability}</FormErrorMessage>}
          </FormControl>
          <FormControl id="income" mb="4" isInvalid={!!formik.errors?.income}>
            <FormLabel>Income</FormLabel>
            <Input type="text" name="income" value={formik.values?.income} onChange={formik.handleChange} />
            {formik.errors.income && <FormErrorMessage>{formik.errors?.income}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'financial_information',
  operation: AccessOperationEnum.CREATE,
})(FinancialInformationCreatePage);
