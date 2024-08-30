import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllGradesTable from '../views/AllGradesTable'
import { useTranslation } from 'react-i18next'

const AllGradesPage = () => {

    const { t } = useTranslation()

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Grades' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.GRADE.ALL.TITLE')}</Heading>

            <AllGradesTable></AllGradesTable>
        </>
    )
}

export default AllGradesPage