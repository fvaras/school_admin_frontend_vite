import { useState } from "react";
import { axiosAuthInstance as axios } from "@/lib/axios";
import { LabelValueDTO, PKFKPair } from "@/models/TLabelValueDTO";

export const useSubjects = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getWithGradeByTeacherForList = async (): Promise<PKFKPair<string, string>[]> => {
        setLoading(true)
        const { data } = await axios.get<PKFKPair<string, string>[]>(`api/teacher/subject/`)
        setLoading(false)
        return data
    }

    const mapSubjectGradesPkFkToLabelValueWithData = (listSubjectsGrades: PKFKPair<string, string>[]): LabelValueDTO<string>[] => {
        return listSubjectsGrades.map<LabelValueDTO<string>>((subjectPKGradeFK: PKFKPair<string, string>) => (
            {
                label: `${subjectPKGradeFK.labelValuePK.label} / ${subjectPKGradeFK.labelValueFK.label}`,
                value: subjectPKGradeFK.labelValuePK.value,
                data: subjectPKGradeFK
            }
        ))
    }

    return {
        loading,
        error,
        getWithGradeByTeacherForList,
        mapSubjectGradesPkFkToLabelValueWithData
    }
}