import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllUsersTable from '../views/AllUsersTable'
import { useTranslation } from 'react-i18next';

const AllUsersPage = () => {
    const { t } = useTranslation();
    
    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Users' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.USER.ALL.TITLE')}</Heading>

            <AllUsersTable></AllUsersTable>
        </>
    )
}

export default AllUsersPage