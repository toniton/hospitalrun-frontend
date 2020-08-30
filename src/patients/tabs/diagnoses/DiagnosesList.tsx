import { List, Empty } from 'antd'
import React from 'react'

import useTranslator from '../../../shared/hooks/useTranslator'
import Diagnosis from '../../../shared/model/Diagnosis'

interface Props {
  data: Diagnosis[] | undefined
}

export const DiagnosesList = (props: Props) => {
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
          renderItem={(diagnosis: Diagnosis) => {
            const { name } = diagnosis
            return (
              <List.Item>
                <List.Item.Meta title={name} />
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
