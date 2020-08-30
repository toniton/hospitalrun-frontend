import { Button, List, Spin, Space, Card } from 'antd'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useAddBreadcrumbs from '../../../page-header/breadcrumbs/useAddBreadcrumbs'
import PatientRepository from '../../../shared/db/PatientRepository'
import useTranslator from '../../../shared/hooks/useTranslator'
import Patient from '../../../shared/model/Patient'
import { Permissions } from '../../../shared/model/Permissions'
import { RootState } from '../../../shared/store'
import { removeRelatedPerson } from '../../patient-slice'
import { AddRelatedPersonModalButton } from './AddRelatedPersonModal'

interface Props {
  patient: Patient
}

export const RelatedPersonTab = (props: Props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const navigateTo = (location: string) => {
    history.push(location)
  }
  const { patient } = props
  const { t } = useTranslator()
  const { permissions } = useSelector((state: RootState) => state.user)
  const [relatedPersons, setRelatedPersons] = useState<Patient[] | undefined>(undefined)

  const breadcrumbs = [
    {
      i18nKey: 'patient.relatedPersons.label',
      location: `/patients/${patient.id}/relatedpersons`,
    },
  ]
  useAddBreadcrumbs(breadcrumbs)

  useEffect(() => {
    const fetchRelatedPersons = async () => {
      const fetchedRelatedPersons: Patient[] = []
      if (patient.relatedPersons) {
        await Promise.all(
          patient.relatedPersons.map(async (person) => {
            const fetchedRelatedPerson = await PatientRepository.find(person.patientId)
            fetchedRelatedPersons.push({ ...fetchedRelatedPerson, type: person.type })
          }),
        )
      }

      setRelatedPersons(fetchedRelatedPersons)
    }

    fetchRelatedPersons()
  }, [patient.relatedPersons])

  const onRelatedPersonDelete = (relatedPersonId: string) => {
    dispatch(removeRelatedPerson(patient.id, relatedPersonId))
  }

  return (
    <Card bordered={false}>
      <Space style={{ marginBottom: 16 }}>
        {permissions.includes(Permissions.WritePatients) && <AddRelatedPersonModalButton />}
      </Space>
      {relatedPersons ? (
        <List
          itemLayout="horizontal"
          dataSource={relatedPersons}
          renderItem={(relative) => {
            const { id, givenName, familyName = '', type = '' } = relative
            return (
              <List.Item
                actions={[
                  <Button key="view" onClick={() => navigateTo(`/patients/${id}`)}>
                    {t('actions.view')}
                  </Button>,
                  <Button key="delete" onClick={() => onRelatedPersonDelete(id)}>
                    {t('actions.delete')}
                  </Button>,
                ]}
              >
                <List.Item.Meta title={`${givenName} ${familyName}`} description={type} />
              </List.Item>
            )
          }}
        />
      ) : (
        <Spin />
      )}
    </Card>
  )
}
