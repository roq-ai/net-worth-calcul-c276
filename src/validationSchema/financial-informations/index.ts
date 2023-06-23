import * as yup from 'yup';

export const financialInformationValidationSchema = yup.object().shape({
  asset: yup.string().required(),
  liability: yup.string().required(),
  income: yup.string().required(),
  organization_id: yup.string().nullable(),
});
