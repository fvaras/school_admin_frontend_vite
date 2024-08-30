import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllTeachersTable from '../views/AllTeachersTable'
import { useTranslation } from 'react-i18next';

const AllTeachersPage = () => {
    const { t } = useTranslation();
    
    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Teachers' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.TEACHER.ALL.TITLE')}</Heading>

            <AllTeachersTable></AllTeachersTable>
        </>
    )
}

export default AllTeachersPage