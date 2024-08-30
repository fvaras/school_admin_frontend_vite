import { Breadcrumbs, Heading } from '@/components/ui/custom'
import AllEventsTable from '../views/AllEventsTable'
import { useTranslation } from 'react-i18next'

const AllEventsPage = () => {

    const { t } = useTranslation()

    return (
        <>
            <Breadcrumbs items={[
                { text: 'Admin', link: '/admin/dashboard' },
                { text: 'Events' },
            ]} />

            <Heading variant="title2">{t('ADMINMODULE.EVENTS.ALL.TITLE')}</Heading>

            <AllEventsTable></AllEventsTable>
        </>
    )
}

export default AllEventsPage