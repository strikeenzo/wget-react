import React, { useCallback } from 'react';
import { WeightEntry } from "components/BodyWeight/model";
import * as yup from 'yup';
import { Form, Formik } from "formik";
import { Button, Stack, TextField } from "@mui/material";
import { Trans } from "react-i18next";
import { t } from "i18next";
import { SetState, useStateValue } from "state";
import { updateWeight } from "services/weight";

interface WeightFormProps {
    weightEntry: WeightEntry
}

export const WeightForm = ({ weightEntry }: WeightFormProps) => {

    const [state, dispatch] = useStateValue();

    const updateWeightEntry = useCallback(async (entry: WeightEntry) => {
        const action = { type: SetState.UPDATE_WEIGHT, payload: entry };
        dispatch(action);
    }, []);

    const validationSchema = yup.object({
        weight: yup
            .number()
            .min(30, 'Min weight is 30 kg')
            .max(300, 'Max weight is 300 kg')
            .required('Weight field is required'),
    });


    return (
        <Formik
            initialValues={{
                weight: weightEntry.weight,
                date: weightEntry.date.toISOString().split('T')[0],
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {

                weightEntry.weight = values.weight;
                weightEntry.date = new Date(values.date);
                const newWeightEntry = await updateWeight(weightEntry);
                await updateWeightEntry(newWeightEntry);
            }}
        >
            {formik => (
                <Form>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            id="weight"
                            label={t('weight')}
                            error={
                                Boolean(formik.errors.weight && formik.touched.weight)
                            }
                            helperText={
                                Boolean(formik.errors.weight && formik.touched.weight)
                                    ? formik.errors.weight
                                    : ''
                            }
                            {...formik.getFieldProps('weight')}
                        />


                        <TextField
                            fullWidth
                            id="date"
                            type={'date'}
                            label={t('date')}
                            {...formik.getFieldProps('date')}
                        />

                    </Stack>
                    <Button color="primary" variant="contained" type="submit" sx={{ mt: 2 }}>
                        <Trans i18nKey={'submit'} />
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
