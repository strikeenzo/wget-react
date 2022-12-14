import React from 'react';
import {
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Switch,
    Typography
} from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslation } from "react-i18next";
import { Muscle } from "components/Exercises/models/muscle";
import { getTranslationKey } from "utils/strings";
import { MuscleOverview } from "components/Muscles/MuscleOverview";
import { LightTooltip } from "components/Core/Tooltips/LightToolTip";

type MuscleFilterProps = {
    muscles: Muscle[];
    selectedMuscles: Muscle[];
    setSelectedMuscles: (muscles: Muscle[]) => void;
}

export const MuscleFilter = ({ muscles, selectedMuscles, setSelectedMuscles }: MuscleFilterProps) => {

    const [t] = useTranslation();

    const handleToggle = (value: Muscle) => () => {
        const currentIndex = selectedMuscles.indexOf(value);
        const newChecked = [...selectedMuscles];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setSelectedMuscles(newChecked);
    };

    return (
        <div data-testid={"muscles"}>
            <Paper sx={{ mt: 2 }}>
                <Typography gutterBottom variant="h6" m={2}>
                    {t('exercises.muscles')}
                </Typography>
                <List sx={{ maxHeight: "500px", overflowY: "auto" }}>
                    {muscles.map((m) => {
                        const labelId = `checkbox-list-label-${m.id}`;

                        return (
                            <ListItem
                                key={m.id}
                                disablePadding
                                secondaryAction={
                                    <LightTooltip
                                        title={
                                            <MuscleOverview
                                                primaryMuscles={[m]}
                                                secondaryMuscles={[]}
                                                isFront={m.isFront}
                                            />
                                        }
                                        placement="right"
                                        arrow>
                                        <IconButton edge="end" aria-label="comments">
                                            <InfoOutlinedIcon />
                                        </IconButton>
                                    </LightTooltip>
                                }
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(m)} dense>
                                    <ListItemIcon>
                                        <Switch
                                            key={`muscle-${m.id}`}
                                            edge="start"
                                            checked={selectedMuscles.indexOf(m) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>

                                    <ListItemText
                                        id={labelId}
                                        primary={m.name}
                                        secondary={m.nameEn !== '' ? t(getTranslationKey(m.nameEn)) : ''} />

                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        </div>
    );
};