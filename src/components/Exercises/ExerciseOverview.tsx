import React, { useCallback, useEffect } from 'react';
import { getMuscles } from 'services';
import { setMuscles, useExerciseStateValue } from 'state';
import { Box, Button, Container, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import { CategoryFilter } from "components/Exercises/Filter/CategoryFilter";
import { EquipmentFilter } from "components/Exercises/Filter/EquipmentFilter";
import { MuscleFilter } from "components/Exercises/Filter/MuscleFilter";
import { OverviewCard } from "components/Exercises/Detail/OverviewCard";
import { useTranslation } from "react-i18next";

export const ContributeExerciseBanner = () => {
    const [t, i18n] = useTranslation();

    return <Box
        marginTop={4}
        padding={4}
        sx={{
            width: "100%",
            backgroundColor: "#ebebeb",
        }}
    >
        <Typography gutterBottom variant="h4" component="div">
            {t('missing-exercise')}
        </Typography>

        <Typography gutterBottom variant="body1" component="div">
            {t('missing-exercise-description')}
        </Typography>

        <Button variant="contained">
            {t('contribute-exercise')}
        </Button>
    </Box>;
};

export const ExerciseOverview = () => {
    const [state, dispatch] = useExerciseStateValue();
    const [t, i18n] = useTranslation();

    // Using useCallback so that I can use this fetchWeight method in
    // useEffect and elsewhere.
    const fetchMuscles = useCallback(async () => {
        try {
            const receivedMuscles = await getMuscles();
            dispatch(setMuscles(receivedMuscles));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchMuscles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchMuscles]);

    return (
        <Container maxWidth="lg">
            <Typography gutterBottom variant="h3" component="div">
                {t('exercises')}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <CategoryFilter />
                    <EquipmentFilter />
                    <MuscleFilter muscles={state.muscles} />
                </Grid>
                <Grid item xs={9}>
                    <ImageList cols={3}>
                        <ImageListItem>
                            <OverviewCard />
                        </ImageListItem>
                        <ImageListItem>
                            <OverviewCard />
                        </ImageListItem>
                        <ImageListItem>
                            <OverviewCard />
                        </ImageListItem>
                        <ImageListItem>
                            <OverviewCard />
                        </ImageListItem>
                        <ImageListItem>
                            <OverviewCard />
                        </ImageListItem>
                        <ImageListItem>
                            <OverviewCard />
                        </ImageListItem>
                        <ImageListItem>
                            <OverviewCard />
                        </ImageListItem>
                        <ImageListItem>
                            <OverviewCard />
                        </ImageListItem>
                    </ImageList>
                    <ContributeExerciseBanner
                    />
                </Grid>
            </Grid>
        </Container>
    );
};