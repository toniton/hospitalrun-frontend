import { Toast } from '@hospitalrun/components'
import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useAddBreadcrumbs from '../../../page-header/breadcrumbs/useAddBreadcrumbs'
import useTitle from '../../../page-header/title/useTitle'
import useTranslator from '../../../shared/hooks/useTranslator'
import Patient from '../../../shared/model/Patient'
import { RootState } from '../../../shared/store'
import { GeneralInformation } from '../../forms/GeneralInformation'
import { createPatient } from '../../patient-slice'
import { isPossibleDuplicatePatient } from '../../util/is-possible-duplicate-patient'
import DuplicateNewPatientModal from './DuplicateNewPatientModal'

const breadcrumbs = [
  { i18nKey: 'patients.label', location: '/patients' },
  { i18nKey: 'patients.newPatient', location: '/patients/new' },
]

const NewPatient = () => {
  const { t } = useTranslator()
  const history = useHistory()
  const dispatch = useDispatch()
  const { createError } = useSelector((state: RootState) => state.patient)
  const { patients } = Object(useSelector((state: RootState) => state.patients))

  const [patient, setPatient] = useState<Patient | any>({})
  const [duplicatePatient, setDuplicatePatient] = useState<Patient | undefined>(undefined)
  const [showDuplicateNewPatientModal, setShowDuplicateNewPatientModal] = useState<boolean>(false)

  const testPatient = {
    givenName: 'Kelly',
    familyName: 'Clark',
    sex: 'female',
    dateOfBirth: '1963-01-09T05:00:00.000Z',
  } as Patient

  useTitle(t('patients.newPatient'))
  useAddBreadcrumbs(breadcrumbs, true)

  const onCancel = () => {
    history.push('/patients')
  }

  const onSuccessfulSave = useCallback(
    (newPatient: Patient) => {
      history.push(`/patients/${newPatient.id}`)
      Toast(
        'success',
        t('states.success'),
        `${t('patients.successfullyCreated')} ${newPatient.fullName}`,
      )
    },
    [history, t],
  )

  const onSubmit = useCallback(
    (newPatient: Patient) => {
      setPatient(newPatient)
      let duplicatePatients = []
      if (patients !== undefined) {
        duplicatePatients = patients.filter((existingPatient: any) =>
          isPossibleDuplicatePatient(newPatient, existingPatient),
        )
      }

      if (duplicatePatients.length > 0) {
        setShowDuplicateNewPatientModal(true)
        setDuplicatePatient(duplicatePatients as Patient)
      } else {
        dispatch(createPatient(newPatient, onSuccessfulSave))
      }

      const testCase = [isPossibleDuplicatePatient(newPatient, testPatient)]
      if (testCase.length > 0) {
        return true
      }
      return false
    },
    [dispatch, onSuccessfulSave, patients, testPatient],
  )

  const createDuplicateNewPatient = () => {
    dispatch(createPatient(patient, onSuccessfulSave))
  }

  const closeDuplicateNewPatientModal = () => {
    setShowDuplicateNewPatientModal(false)
  }

  return (
    <div>
      <GeneralInformation
        patient={patient}
        isEditable
        onSubmit={onSubmit}
        onCancel={onCancel}
        error={createError}
      />

      <DuplicateNewPatientModal
        duplicatePatient={duplicatePatient}
        show={showDuplicateNewPatientModal}
        toggle={closeDuplicateNewPatientModal}
        onContinueButtonClick={createDuplicateNewPatient}
        onCloseButtonClick={closeDuplicateNewPatientModal}
      />
    </div>
  )
}

export default NewPatient
