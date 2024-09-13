import { useEffect, useState } from 'react'
import { Breadcrumbs, Combobox, Heading } from '@/components/ui/custom'
import AllPlanningsTable from '../views/AllPlanningsTable'
import { IPlanningTableRowDTO } from '../../models/IPlanning'
import { usePlannings, useSubjects } from '../../hooks'
import { LabelValueDTO } from '@/models/TLabelValueDTO'
import { useTranslation } from 'react-i18next'

const AllPlanningsPage = () => {
    const [subjectList, setSubjectList] = useState<LabelValueDTO<string>[]>([])
    const [plannings, setPlannings] = useState<IPlanningTableRowDTO[]>([])

    const { t } = useTranslation()

    const { getForList: getSubjects } = useSubjects()
    const { getAllPlannings } = usePlannings()

    useEffect(() => {
        loadInitialData()
    }, [])

    const loadInitialData = async () => {
        const _subjectList = await getSubjects()
        setSubjectList(_subjectList)
    }

    const loadPlannings = async (subjectId: string) => {
        const data = await getAllPlannings(subjectId)
        setPlannings(data)
    }

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/teacher/dashboard' },
                { text: 'Plannings' },
            ]} />

            <Heading variant="title2">{t('STUDENTMODULE.PLANNING.ALL.TITLE')}</Heading>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                    <Combobox
                        label={t('STUDENTMODULE.FIELDNAMES.SUBJECTNAME')}
                        options={subjectList ?? []}
                        onChange={async (value: string | number) => await loadPlannings(value as string)}
                    />
                </div>
            </div>

            <AllPlanningsTable
                plannings={plannings}
            />
        </>
    )
}

export default AllPlanningsPage