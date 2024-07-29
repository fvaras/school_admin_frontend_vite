import { Breadcrumbs, Heading } from '@/components/ui/custom'

const TimeTablePage = () => {
  return (
    <>
        <Breadcrumbs items={[
            { text: 'Admin', link: '/teacher/dashboard' },
        ]} />

        <Heading variant="title2">TimeTablePage</Heading>
    </>
  )
}

export default TimeTablePage