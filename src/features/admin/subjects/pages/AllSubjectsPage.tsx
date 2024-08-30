import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllSubjectsTable from '../views/AllSubjectsTable'
import { useTranslation } from 'react-i18next'

const AllSubjectsPage = () => {

    const { t } = useTranslation()

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Subjects' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.SUBJECT.ALL.TITLE')}</Heading>

            <AllSubjectsTable></AllSubjectsTable>
        </>
    )
}

export default AllSubjectsPage