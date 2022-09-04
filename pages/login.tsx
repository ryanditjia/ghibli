import { useRouter } from 'next/router'
import { useState } from 'react'
import type { NextPage } from 'next'

import styles from './login.module.css'
import { ACCEPTED_CREDENTIAL } from '../lib/contants'

const INPUT_NAMES = {
  USERNAME: 'username',
  PASSWORD: 'password',
}

const LoginPage: NextPage = () => {
  const router = useRouter()
  const [formValues, setFormValues] = useState({
    [INPUT_NAMES.USERNAME]: '',
    [INPUT_NAMES.PASSWORD]: '',
  })
  const [submissionState, setSubmissionState] = useState<
    'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'
  >('IDLE')

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()
    setSubmissionState('SUBMITTING')
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(formValues),
    })

    if (!res.ok) {
      setSubmissionState('ERROR')
    } else {
      setSubmissionState('SUCCESS')
      router.push('/')
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const renderHelpText = () => {
    if (submissionState === 'IDLE') {
      return (
        <div className={styles.help_text}>
          Username: {ACCEPTED_CREDENTIAL.USERNAME}, password:{' '}
          {ACCEPTED_CREDENTIAL.PASSWORD}{' '}
        </div>
      )
    }

    if (submissionState === 'ERROR') {
      return (
        <div className={styles.error_text}>
          Login failed, please check your credentials again.
        </div>
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Username:
        <input
          type="text"
          onChange={handleChange}
          name={INPUT_NAMES.USERNAME}
          value={formValues[INPUT_NAMES.USERNAME]}
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          onChange={handleChange}
          name={INPUT_NAMES.PASSWORD}
          value={formValues[INPUT_NAMES.PASSWORD]}
        />
      </label>

      {renderHelpText()}

      <button type="submit" disabled={submissionState === 'SUBMITTING'}>
        Login
      </button>
    </form>
  )
}

export default LoginPage
