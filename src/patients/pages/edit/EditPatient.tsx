import { Spinner, Button, Toast } from '@hospitalrun/components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import useAddBreadcrumbs from '../../../page-header/breadcrumbs/useAddBreadcrumbs'
import useTitle from '../../../page-header/title/useTitle'
import useTranslator from '../../../shared/hooks/useTranslator'
import Patient from '../../../shared/model/Patient'
import { RootState } from '../../../shared/store'
import { GeneralInformation } from '../../forms/GeneralInformation'
import { fetchPatient, updatePatient } from '../../patient-slice'

const getPatientCode = (p: Patient): string => {
  if (p) {
    return p.code
  }

  return ''
}

const EditPatient = () => {
  const { t } = useTranslator()
  const history = useHistory()
  const dispatch = useDispatch()

  const [patient, setPatient] = useState({} as Patient)
  const { givenName, familyName = '', suffix = '' } = patient
  patient.fullName = `${givenName} ${familyName} ${suffix}`.trim()

  const { patient: reduxPatient, status, updateError } = useSelector(
    (state: RootState) => state.patient,
  )

  useTitle(`${t('patients.editPatient')}: ${patient.fullName} (${getPatientCode(reduxPatient)})`)

  const breadcrumbs = [
    { i18nKey: 'patients.label', location: '/patients' },
    { text: patient.fullName, location: `/patients/${reduxPatient.id}` },
    { i18nKey: 'patients.editPatient', location: `/patients/${reduxPatient.id}/edit` },
  ]
  useAddBreadcrumbs(breadcrumbs, true)

  useEffect(() => {
    setPatient(reduxPatient)
  }, [reduxPatient])

  const { id } = useParams()
  useEffect(() => {
    if (id) {
      dispatch(fetchPatient(id))
    }
  }, [id, dispatch])

  const onCancel = () => {
    history.push(`/patients/${patient.id}`)
  }

  const onSuccessfulSave = (updatedPatient: Patient) => {
    history.push(`/patients/${updatedPatient.id}`)
    Toast(
      'success',
      t('states.success'),
      `${t('patients.successfullyUpdated')} ${patient.fullName}`,
    )
  }

  const onSave = async () => {
    await dispatch(updatePatient(patient, onSuccessfulSave))
  }

  if (status === 'loading') {
    return <Spinner color="blue" loading size={[10, 25]} type="ScaleLoader" />
  }

  return (
    <div>
      <GeneralInformation patient={patient} isEditable error={updateError} />
      <div className="row float-right">
        <div className="btn-group btn-group-lg">
          <Button className="btn-save mr-2" color="success" onClick={onSave}>
            {t('actions.save')}
          </Button>
          <Button className="btn-cancel" color="danger" onClick={onCancel}>
            {t('actions.cancel')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EditPatient
