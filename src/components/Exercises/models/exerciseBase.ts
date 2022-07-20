import { Adapter } from "utils/Adapter";
import { ExerciseImage, ExerciseImageAdapter, } from "components/Exercises/models/image";
import { Equipment, EquipmentAdapter, } from "components/Exercises/models/equipment";
import { Muscle, MuscleAdapter } from "components/Exercises/models/muscle";
import { Category, CategoryAdapter, } from "components/Exercises/models/category";
import { ExerciseTranslation } from "components/Exercises/models/exerciseTranslation";
import { ENGLISH_LANGUAGE_ID } from "utils/consts";
import { Language } from "components/Exercises/models/language";

export class ExerciseBase {
    translations: ExerciseTranslation[] = [];

    constructor(
        public id: number | null,
        public uuid: string | null,
        public category: Category,
        public equipment: Equipment[],
        public muscles: Muscle[],
        public musclesSecondary: Muscle[],
        public images: ExerciseImage[],
        public variationId: number | null,
        translations?: ExerciseTranslation[]
        /*
                license: number,
                licenseAuthor: string,
                 */
    ) {
        if (translations) {
            this.translations = translations;
        }
    }

    // Returns the users translation or english as a fallback
    //
    // Note that we still check for the case that no english translation can be
    // found. While this can't happen for the "regular" wger server, other local
    // instances might have deleted the english translation or added new exercises
    // without an english translation.
    getTranslation(userLanguage?: Language): ExerciseTranslation {
        const language = userLanguage != null ? userLanguage.id : ENGLISH_LANGUAGE_ID;

        let translation = this.translations.find(t => t.language === language);
        if (!translation) {
            translation = this.translations.find(t => t.language === ENGLISH_LANGUAGE_ID);
        }

        if (!translation) {
            console.warn(`No translation found for exercise base ${this.uuid} (${this.id}) for language ${language}`);
            return this.translations[0];
        }
        return translation!;
    }

    get mainImage(): ExerciseImage | undefined {
        return this.images.find(i => i.isMain);
    }

    get sideImages(): ExerciseImage[] {
        return this.images.filter(i => !i.isMain);
    }

}


export class ExerciseBaseAdapter implements Adapter<ExerciseBase> {
    fromJson(item: any): ExerciseBase {

        const categoryAdapter = new CategoryAdapter();
        const equipmentAdapter = new EquipmentAdapter();
        const muscleAdapter = new MuscleAdapter();
        const imageAdapter = new ExerciseImageAdapter();

        return new ExerciseBase(
            item.id,
            item.uuid,
            categoryAdapter.fromJson(item.category),
            item.equipment.map((e: any) => (equipmentAdapter.fromJson(e))),
            item.muscles.map((m: any) => (muscleAdapter.fromJson(m))),
            item.muscles_secondary.map((m: any) => (muscleAdapter.fromJson(m))),
            item.images.map((i: any) => (imageAdapter.fromJson(i))),
            item.variations,
            /*
            item.license,
            item.license_author,
             */
        );
    }

    /**
     * Don't return all properties, since not all items can be updated (they would
     * be ignored by the server, but it's better to not send too much anyway)
     */
    toJson(item: ExerciseBase): any {
        return {
            id: item.id,
            uuid: item.uuid,
            category: item.category.id,
            equipment: item.equipment.map(e => e.id),
            muscles: item.muscles.map(m => m.id),
            // eslint-disable-next-line camelcase
            muscles_secondary: item.musclesSecondary.map(m => m.id),
            images: item.images.map(i => new ExerciseImageAdapter().toJson(i)),
        };
    }
}


export type addExerciseDataType = {
    nameEn: string;
    descriptionEn: string;
    alternativeNamesEn: string[];

    languageId: number | null;
    nameTranslation: string;
    alternativeNamesTranslation: string[];
    descriptionTranslation: string;

    category: number | string | null; // MUI menu option have values number, string or null
    muscles: number[];
    musclesSecondary: number[];
    equipment: number[];
    variationId: number | null;

    images: string[];
};
