import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllGuardiansTable from '../views/AllGuardiansTable'
import { useTranslation } from 'react-i18next'

const AllGuardiansPage = () => {
    
    const { t } = useTranslation()
    
    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Guardians' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.GUARDIAN.ALL.TITLE')}</Heading>

            <AllGuardiansTable></AllGuardiansTable>
        </>
    )
}

export default AllGuardiansPage