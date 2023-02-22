import { addHours, differenceInSeconds } from 'date-fns';
import { useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import Swal from 'sweetalert2';
import { es } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useMemo } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// for react date picker
registerLocale('es', es);

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const [isOpen, setisOpen] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: 'Santiago',
    notes: 'Espinosa',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) {
      return '';
    }
    return formValues.title.length > 0 ? '' : 'is-invalid';
  }, [formValues.title, formSubmitted]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onSumbit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Incorrect Dates', 'Please check the provided dates', 'error');
      return;
    }

    if (formValues.title.length <= 0) {
      return;
    }

    //TODO
    // Close modal
    // errors in screen
  };

  const onCloseModal = () => {
    setisOpen(false);
  };

  return (
    <Modal
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSumbit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            className="form-control"
            onChange={(event) => onDateChanged(event, 'start')}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className="form-control"
            onChange={(event) => onDateChanged(event, 'end')}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
