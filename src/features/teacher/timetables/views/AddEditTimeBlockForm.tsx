import { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTranslation } from 'react-i18next'
import { FormComboboxField, FormInputField, FormRadioGroupField, FormToogleButtonField } from '@/components/ui/custom/forms'
import { Form, FormField } from '@/components/ui/form'
import { ButtonLoading } from '@/components/ui/custom'
import { ITimeBlockTableRowDTO, ITimeBlockForCreationDTO, ITimeBlockForUpdateDTO } from '../../models/ITimeBlock'
import { LabelValueDTO } from '@/models/TLabelValueDTO'

const formSchema = z.object({
  id: z.string(),
  day: z.string().min(1, { message: "Required" }).max(5, { message: "Required" }),
  isRecess: z.boolean(),
  blockName: z.string().nullable(),
  subjectId: z.string().nullable(),
  startTime: z.string().min(4, { message: "Required" }),
  endTime: z.string().min(4, { message: "Required" }),
  color: z.string()
})

interface IProps {
  mode: 'ADD' | 'EDIT'
  timeBlock: ITimeBlockTableRowDTO
  gradeId: string
  subjectList: LabelValueDTO<string>[]
  loading: boolean
  onSubmit: (id: string | null, timeBlock: ITimeBlockForCreationDTO | ITimeBlockForUpdateDTO) => void
  onDelete: (id: string) => void
}

const AddEditTimeBlockForm = ({ timeBlock, gradeId, subjectList, mode, loading, onSubmit, onDelete }: IProps) => {

  const { t } = useTranslation()

  const [days, setDays] = useState<{ value: string; label: string }[]>([])

  useEffect(() => {
    setDays([
      { label: t('GENERAL.DAYS.MO'), value: '1' },
      { label: t('GENERAL.DAYS.TU'), value: '2' },
      { label: t('GENERAL.DAYS.WE'), value: '3' },
      { label: t('GENERAL.DAYS.TH'), value: '4' },
      { label: t('GENERAL.DAYS.FR'), value: '5' },
    ])
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: mode == 'ADD' ? '' : timeBlock.id,
      day: timeBlock.day.toString(),
      isRecess: timeBlock.isRecess,
      blockName: timeBlock.blockName,
      subjectId: timeBlock.subjectId!,
      startTime: timeBlock.start,
      endTime: timeBlock.end,
      color: timeBlock.color!
    },
  })

  useEffect(() => {
    loadData()
  }, [timeBlock])

  const loadData = async () => {
    console.log('timeBlock', timeBlock)
    if (mode === 'ADD') {
      // form.setValue('type', timeBlock.type!)
      form.setValue('id', '')
    }
    // else if (mode === 'EDIT') {
    // }
    form.setValue('day', timeBlock!.day.toString())
    form.setValue('isRecess', timeBlock!.isRecess)
    form.setValue('blockName', timeBlock!.blockName)
    form.setValue('subjectId', timeBlock!.subjectId!)
    form.setValue('startTime', timeBlock!.start)
    form.setValue('endTime', timeBlock!.end)
    form.setValue('color', timeBlock!.color!)
  }

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    if (mode === 'ADD') {
      const newTimeBlock: ITimeBlockForCreationDTO = {
        year: (new Date()).getFullYear(),
        day: Number(values.day),
        start: values.startTime,
        end: values.endTime,
        isRecess: values.isRecess,
        blockName: values.isRecess ? values.blockName! : '',
        color: values.color,
        subjectId: values.isRecess ? null : values.subjectId,
        gradeId: gradeId
      }
      onSubmit(null, newTimeBlock)
    } else {
      const existingTimeBlock: ITimeBlockForUpdateDTO = {
        year: timeBlock.year!,
        day: Number(values.day),
        start: values.startTime,
        end: values.endTime,
        isRecess: values.isRecess,
        blockName: values.isRecess ? values.blockName! : '',
        color: values.color,
        subjectId: values.isRecess ? null : values.subjectId
      }
      onSubmit(timeBlock!.id, existingTimeBlock!)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4 -mx-2">
          <div className="col-start-1 col-end-3">
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                // <FormInputField
                //   field={field}
                //   label={t('TEACHERMODULE.FIELDNAMES.DAY')}
                //   placeholder="day"
                // />
                <FormRadioGroupField
                  field={field}
                  label={t('TEACHERMODULE.FIELDNAMES.DAY')}
                  options={days}
                // onOptionClick={handleProfileChange}
                />
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="isRecess"
            render={({ field }) => (
              <FormToogleButtonField
                field={field}
                label={t('TEACHERMODULE.FIELDNAMES.ISRECESS')}
                description={t('TEACHERMODULE.FIELDNAMES.ISRECESS')}
              />
            )}
          />

          {form.getValues().isRecess ? (
            <FormField
              control={form.control}
              name="blockName"
              render={({ field }) => (
                <FormInputField
                  field={field}
                  label={t('TEACHERMODULE.FIELDNAMES.BLOCKNAME')}
                  placeholder=""
                />
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="subjectId"
              render={({ field }) => (
                <FormComboboxField
                  field={field}
                  label={t('TEACHERMODULE.FIELDNAMES.SUBJECTNAME')}
                  placeholder=""
                  options={subjectList}
                />
              )}
            />
          )}

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormInputField
                field={field}
                label={t('TEACHERMODULE.FIELDNAMES.STARTTIME')}
                placeholder="Pick a time"
                type="time"
              />
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormInputField
                field={field}
                label={t('TEACHERMODULE.FIELDNAMES.ENDTIME')}
                placeholder="Pick a time"
                type="time"
              />
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormInputField
                field={field}
                label={t('TEACHERMODULE.FIELDNAMES.COLOR')}
                placeholder="color"
                type='color'
              />
            )}
          />

        </div>
        <div className="col-start-1 col-end-3 flex justify-between">
          <ButtonLoading loading={loading} type="submit">{t('TEACHERMODULE.FIELDNAMES.SAVEBUTTON')}</ButtonLoading>
          {mode === 'EDIT' &&
            <ButtonLoading loading={loading} type="button" variant="destructive" onClick={() => onDelete(timeBlock!.id)}>{t('TEACHERMODULE.FIELDNAMES.DELETEBUTTON')}</ButtonLoading>
          }
        </div>
      </form>
    </Form>
  )
}

export default AddEditTimeBlockForm