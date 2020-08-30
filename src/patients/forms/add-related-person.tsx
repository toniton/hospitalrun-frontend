import { Alert } from '@hospitalrun/components'
import { Form, Input, Select } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import PatientRepository from '../../shared/db/PatientRepository'
import useTranslator from '../../shared/hooks/useTranslator'
import Patient from '../../shared/model/Patient'
import { RootState } from '../../shared/store'

const { Option } = Select
type Props = {
  form: FormInstance
  onFinish: (values: any) => void
}
export const AddRelatedPersonForm = (props: Props) => {
  const { t } = useTranslator()
  const { form, onFinish } = props
  const [patients, setPatients] = useState<Patient[]>()
  const { patient, relatedPersonError } = useSelector((state: RootState) => state.patient)

  const onSearch = async (query: string) => {
    const data: Patient[] = await PatientRepository.search(query)
    setPatients(data.filter((p: Patient) => p.id !== patient.id))
  }

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      {relatedPersonError?.message && (
        <Alert color="danger" title={t('states.error')} message={t(relatedPersonError?.message)} />
      )}
      <Form.Item name="patientId" label={t('patient.relatedPerson')} rules={[{ required: true }]}>
        <Select
          id="patientId"
          showSearch
          defaultActiveFirstOption={false}
          filterOption={false}
          onSearch={onSearch}
          notFoundContent={null}
        >
          {patients &&
            patients.map((d) => (
              <Option key={d.id} value={d.id}>
                {d.fullName}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="type"
        label={t('patient.relatedPersons.relationshipType')}
        rules={[{ required: true }]}
      >
        <Input id="type" name="type" type="text" />
      </Form.Item>
    </Form>
  )
}
