import { NextPage } from 'next'
import { useState } from 'react'

import styles from './login.module.css'

const INPUT_NAMES = {
  USERNAME: 'username',
  PASSWORD: 'password',
}

const LoginPage: NextPage = () => {
  const [formValues, setFormValues] = useState({
    [INPUT_NAMES.USERNAME]: '',
    [INPUT_NAMES.PASSWORD]: '',
  })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    // TODO: login endpoint
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Username:
        <input
          type="text"
          onChange={handleChange}
          name={INPUT_NAMES.USERNAME}
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          onChange={handleChange}
          name={INPUT_NAMES.PASSWORD}
        />
      </label>

      <button type="submit">Login</button>
    </form>
  )
}

export default LoginPage
