import { useEffect, useState } from 'react'
import Button from '../button/Button'
import styles from './Modal.module.scss'

interface Props {
  setOpenModal: (e?: any) => void
  videoUrl?: string
  title?: string
  description?: string
}

const Modal = ({ setOpenModal, videoUrl, title, description }: Props) => {
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenModal(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [setOpenModal])
  return (
    <div className={styles.modal}>
      <div className={styles.container} onClick={(e: any) => e.stopPropagation()}>
        <div className={styles.closeModal_container} onClick={() => setOpenModal(false)}>
          <div className={styles.closeModal}>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={styles.sub_container}>
          <iframe src={videoUrl} width="100%" height="100%" allow="autoplay" style={{ borderRadius: '2rem' }}></iframe>
        </div>
        <div className={styles.title}>
          <h1>{title}</h1>
        </div>
        <div className={styles.text}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Modal
