import { List, Button, Spin, Empty } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'

import useTranslator from '../../../shared/hooks/useTranslator'
import Allergy from '../../../shared/model/Allergy'
import usePatientAllergies from '../../hooks/usePatientAllergies'

interface Props {
  patientId: string
}

export const AllergiesList = (props: Props) => {
  const { patientId } = props
  const history = useHistory()
  const { t } = useTranslator()
  const { data, status } = usePatientAllergies(patientId)

  if (data === undefined || status === 'loading') {
    return <Spin />
  }

  if (data.length === 0) {
    return <Empty description={t('patient.allergies.warning.noAllergies')} />
  }

  return (
    <>
      {data.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(allergy: Allergy) => {
            const { id, name } = allergy
            return (
              <List.Item
                actions={[
                  <Button
                    key="view"
                    onClick={() => history.push(`/patients/${patientId}/allergies/${id}`)}
                  >
                    {t('actions.view')}
                  </Button>,
                ]}
              >
                <List.Item.Meta title={name} />
              </List.Item>
            )
          }}
        />
      ) : (
        <Empty description={t('patient.allergies.warning.noAllergies')} />
      )}
    </>
  )
}
