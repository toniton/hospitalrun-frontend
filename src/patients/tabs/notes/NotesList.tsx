import { List, Empty } from 'antd'
import React from 'react'

import useTranslator from '../../../shared/hooks/useTranslator'
import Note from '../../../shared/model/Note'

interface Props {
  data: Note[] | undefined
}

export const NoteList = (props: Props) => {
  const { data } = props
  const { t } = useTranslator()

  if (data === undefined) {
    return <Empty description={t('patient.diagnoses.warning.noDiagnoses')} />
  }

  return (
    <>
      {data.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(note: Note) => {
            const { text, date } = note
            return (
              <List.Item>
                <List.Item.Meta title={new Date(date).toLocaleString()} description={text} />
              </List.Item>
            )
          }}
        />
      ) : (
        <Empty description={t('patient.diagnoses.warning.noDiagnoses')} />
      )}
    </>
  )
}
