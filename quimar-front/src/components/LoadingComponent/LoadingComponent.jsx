import React from 'react';
import { Spinner } from 'react-bootstrap';
import style from './LoadingComponent.module.css'; // Importa tu CSS para estilos personalizados

const LoadingComponent = ({ text = "Cargando..." }) => {
  return (
    <div className={style.loadingContainer}>
      <Spinner animation="border" role="status" aria-hidden="true" />
      <span className="visually-hidden">{text}</span>
    </div>
  );
}

export default LoadingComponent;